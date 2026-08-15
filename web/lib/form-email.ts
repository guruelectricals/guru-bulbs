type ContactEmailSubmission = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
};

type DealershipEmailSubmission = {
  id: string;
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

const brandName = "Guru Bulbs";
const defaultFrom = "Guru Bulbs <onboarding@resend.dev>";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatMultiline(value: string) {
  return escapeHtml(value).replace(/\r?\n/g, "<br />");
}

function displayValue(value?: string) {
  return value ? escapeHtml(value) : "Not provided";
}

function emailShell(preheader: string, title: string, content: string) {
  return `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
  <body style="margin:0;padding:0;background:#f6f4ef;color:#24211c;font-family:Arial,Helvetica,sans-serif;">
    <span style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</span>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:32px 12px;background:#f6f4ef;"><tr><td align="center">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#ffffff;border:1px solid #e8e2d5;border-radius:16px;overflow:hidden;">
        <tr><td style="padding:24px 32px;background:#211f1a;color:#f9c843;font-size:20px;font-weight:700;letter-spacing:.4px;">${brandName}</td></tr>
        <tr><td style="padding:32px;">
          <h1 style="margin:0 0 20px;color:#211f1a;font-size:24px;line-height:1.3;">${escapeHtml(title)}</h1>
          ${content}
        </td></tr>
        <tr><td style="padding:20px 32px;background:#faf8f3;color:#746f64;font-size:12px;line-height:1.6;">This message was sent from the ${brandName} website.</td></tr>
      </table>
    </td></tr></table>
  </body>
</html>`;
}

function detailsRow(label: string, value: string) {
  return `<tr><td style="width:160px;padding:10px 0;border-bottom:1px solid #eee8dc;color:#746f64;font-size:13px;font-weight:700;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:10px 0;border-bottom:1px solid #eee8dc;color:#24211c;font-size:14px;line-height:1.5;">${value}</td></tr>`;
}

function getBaseOptions() {
  return {
    from: process.env.RESEND_FROM_EMAIL || defaultFrom,
    replyTo: process.env.RESEND_REPLY_TO_EMAIL || undefined,
  };
}

type ResendEmail = {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
};

async function sendOrThrow(email: ResendEmail) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: email.from,
      to: [email.to],
      reply_to: email.replyTo,
      subject: email.subject,
      html: email.html,
      text: email.text,
    }),
  });

  const result = (await response.json().catch(() => null)) as {
    id?: string;
    message?: string;
    name?: string;
  } | null;

  if (!response.ok) {
    throw new Error(
      result?.message || result?.name || "Resend could not send the email.",
    );
  }

  return result?.id;
}

async function sendAutoReply(email: ResendEmail) {
  try {
    return await sendOrThrow(email);
  } catch (error) {
    // A customer confirmation must never make a successfully delivered inquiry look failed.
    // This commonly occurs while the Resend sending domain is still in test mode.
    console.error("Customer auto-reply could not be sent:", error);
    return undefined;
  }
}

export async function sendContactEmails(submission: ContactEmailSubmission) {
  const recipient =
    process.env.RESEND_CONTACT_TO_EMAIL || process.env.RESEND_TO_EMAIL;

  if (!recipient) {
    throw new Error("RESEND_CONTACT_TO_EMAIL is not configured.");
  }

  const baseOptions = getBaseOptions();
  const internalHtml = emailShell(
    `New contact inquiry from ${submission.name}`,
    "New contact inquiry",
    `<table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      ${detailsRow("Reference", escapeHtml(submission.id))}
      ${detailsRow("Name", escapeHtml(submission.name))}
      ${detailsRow("Email", escapeHtml(submission.email))}
      ${detailsRow("Subject", escapeHtml(submission.subject))}
      ${detailsRow("Message", formatMultiline(submission.message))}
    </table>
    <p style="margin:24px 0 0;color:#746f64;font-size:13px;">Reply to this email to respond directly to ${escapeHtml(submission.name)}.</p>`,
  );
  const confirmationHtml = emailShell(
    "We received your message.",
    `Thanks for getting in touch, ${submission.name}`,
    `<p style="margin:0 0 16px;font-size:15px;line-height:1.7;">We have received your inquiry and our lighting team will review it shortly.</p>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.7;"><strong>Your reference:</strong> ${escapeHtml(submission.id)}</p>
    <p style="margin:0;color:#746f64;font-size:14px;line-height:1.6;">For your records, your subject was: ${escapeHtml(submission.subject)}</p>`,
  );

  const notificationId = await sendOrThrow({
    ...baseOptions,
    to: recipient,
    replyTo: submission.email,
    subject: `[Contact] ${submission.subject}`,
    html: internalHtml,
    text: `New contact inquiry\nReference: ${submission.id}\nName: ${submission.name}\nEmail: ${submission.email}\nSubject: ${submission.subject}\n\n${submission.message}`,
  });

  const autoReplyId = await sendAutoReply({
    ...baseOptions,
    to: submission.email,
    subject: `We received your message — ${brandName}`,
    html: confirmationHtml,
    text: `Hi ${submission.name},\n\nWe received your inquiry and our lighting team will review it shortly.\n\nYour reference: ${submission.id}\nSubject: ${submission.subject}\n\n${brandName}`,
  });

  return { notificationId, autoReplyId };
}

export async function sendDealershipEmails(
  submission: DealershipEmailSubmission,
) {
  const recipient =
    process.env.RESEND_DEALERSHIP_TO_EMAIL ||
    process.env.RESEND_CONTACT_TO_EMAIL ||
    process.env.RESEND_TO_EMAIL;

  if (!recipient) {
    throw new Error("RESEND_DEALERSHIP_TO_EMAIL is not configured.");
  }

  const baseOptions = getBaseOptions();
  const internalHtml = emailShell(
    `New dealership application from ${submission.businessName}`,
    "New dealership application",
    `<table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      ${detailsRow("Reference", escapeHtml(submission.id))}
      ${detailsRow("Business", escapeHtml(submission.businessName))}
      ${detailsRow("Owner", escapeHtml(submission.owner))}
      ${detailsRow("Email", escapeHtml(submission.email))}
      ${detailsRow("Phone", escapeHtml(submission.phone))}
      ${detailsRow("Address", escapeHtml(submission.address))}
      ${detailsRow("PAN / VAT", displayValue(submission.pan))}
      ${detailsRow("Website / social", displayValue(submission.website))}
      ${detailsRow("Time in business", escapeHtml(submission.businessDuration))}
      ${detailsRow("Current products", formatMultiline(submission.currentProducts))}
      ${detailsRow("Interests", submission.interests.length ? submission.interests.map(escapeHtml).join(", ") : "Not provided")}
      ${detailsRow("Preferred territory", displayValue(submission.territory))}
      ${detailsRow("Business description", submission.businessDescription ? formatMultiline(submission.businessDescription) : "Not provided")}
    </table>
    <p style="margin:24px 0 0;color:#746f64;font-size:13px;">Reply to this email to respond directly to ${escapeHtml(submission.owner)}.</p>`,
  );
  const confirmationHtml = emailShell(
    "Your dealership application has been received.",
    `Thanks for applying, ${submission.owner}`,
    `<p style="margin:0 0 16px;font-size:15px;line-height:1.7;">We have received the dealership application for <strong>${escapeHtml(submission.businessName)}</strong>. Our trade team will review it and contact you within two business days.</p>
    <p style="margin:0;color:#746f64;font-size:14px;line-height:1.6;"><strong>Your reference:</strong> ${escapeHtml(submission.id)}</p>`,
  );

  const notificationId = await sendOrThrow({
    ...baseOptions,
    to: recipient,
    replyTo: submission.email,
    subject: `[Dealership] ${submission.businessName}`,
    html: internalHtml,
    text: `New dealership application\nReference: ${submission.id}\nBusiness: ${submission.businessName}\nOwner: ${submission.owner}\nEmail: ${submission.email}\nPhone: ${submission.phone}\nAddress: ${submission.address}\nPAN/VAT: ${submission.pan || "Not provided"}\nWebsite/social: ${submission.website || "Not provided"}\nTime in business: ${submission.businessDuration}\nCurrent products: ${submission.currentProducts}\nInterests: ${submission.interests.join(", ") || "Not provided"}\nPreferred territory: ${submission.territory || "Not provided"}\nBusiness description: ${submission.businessDescription || "Not provided"}`,
  });

  const autoReplyId = await sendAutoReply({
    ...baseOptions,
    to: submission.email,
    subject: `We received your dealership application — ${brandName}`,
    html: confirmationHtml,
    text: `Hi ${submission.owner},\n\nWe received the dealership application for ${submission.businessName}. Our trade team will review it and contact you within two business days.\n\nYour reference: ${submission.id}\n\n${brandName}`,
  });

  return { notificationId, autoReplyId };
}
