const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTHS = {
  name: 120,
  email: 254,
  subject: 180,
  message: 5000,
  businessName: 180,
  owner: 120,
  phone: 40,
  address: 300,
  pan: 80,
  website: 500,
  businessDuration: 80,
  currentProducts: 2000,
  territory: 180,
  businessDescription: 3000,
} as const;

export type ValidatedContactSubmission = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ValidatedDealershipSubmission = {
  businessName: string;
  owner: string;
  phone: string;
  email: string;
  address: string;
  pan?: string;
  website?: string;
  businessDuration: string;
  currentProducts: string;
  interests: string[];
  territory?: string;
  businessDescription?: string;
};

function cleanString(
  value: unknown,
  field: keyof typeof MAX_LENGTHS,
  required = false,
) {
  if (typeof value !== "string") {
    if (required) throw new Error(`Please provide ${field}.`);
    return undefined;
  }

  const cleaned = value.trim();
  if (!cleaned) {
    if (required) throw new Error(`Please provide ${field}.`);
    return undefined;
  }
  if (cleaned.length > MAX_LENGTHS[field]) {
    throw new Error(`${field} is too long.`);
  }

  return cleaned;
}

function validEmail(value: string) {
  if (!EMAIL_PATTERN.test(value))
    throw new Error("Please provide a valid email address.");
  return value.toLowerCase();
}

export function validateContactSubmission(
  body: unknown,
): ValidatedContactSubmission {
  if (!body || typeof body !== "object")
    throw new Error("Invalid form submission.");
  const values = body as Record<string, unknown>;

  return {
    name: cleanString(values.name, "name", true)!,
    email: validEmail(cleanString(values.email, "email", true)!),
    subject: cleanString(values.subject, "subject", true)!,
    message: cleanString(values.message, "message", true)!,
  };
}

export function validateDealershipSubmission(
  body: unknown,
): ValidatedDealershipSubmission {
  if (!body || typeof body !== "object")
    throw new Error("Invalid form submission.");
  const values = body as Record<string, unknown>;
  const rawInterests = Array.isArray(values.interests) ? values.interests : [];
  const interests = rawInterests
    .filter((value): value is string => typeof value === "string")
    .map((value) => value.trim())
    .filter(Boolean)
    .slice(0, 12)
    .map((value) => value.slice(0, 100));

  return {
    businessName: cleanString(values.businessName, "businessName", true)!,
    owner: cleanString(values.owner, "owner", true)!,
    phone: cleanString(values.phone, "phone", true)!,
    email: validEmail(cleanString(values.email, "email", true)!),
    address: cleanString(values.address, "address", true)!,
    pan: cleanString(values.pan, "pan"),
    website: cleanString(values.website, "website"),
    businessDuration: cleanString(
      values.businessDuration,
      "businessDuration",
      true,
    )!,
    currentProducts: cleanString(
      values.currentProducts,
      "currentProducts",
      true,
    )!,
    interests,
    territory: cleanString(values.territory, "territory"),
    businessDescription: cleanString(
      values.businessDescription,
      "businessDescription",
    ),
  };
}

const rateLimitWindowMs = 10 * 60 * 1000;
const maxSubmissionsPerWindow = 5;
const attempts = new Map<string, number[]>();

export function isRateLimited(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const key = forwardedFor?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const activeAttempts = (attempts.get(key) || []).filter(
    (timestamp) => now - timestamp < rateLimitWindowMs,
  );

  if (activeAttempts.length >= maxSubmissionsPerWindow) {
    attempts.set(key, activeAttempts);
    return true;
  }

  attempts.set(key, [...activeAttempts, now]);
  return false;
}
