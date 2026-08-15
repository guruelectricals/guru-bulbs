import { NextResponse } from "next/server";
import { sendContactEmails } from "@/lib/form-email";
import {
  isRateLimited,
  validateContactSubmission,
} from "@/lib/form-validation";

export async function POST(request: Request) {
  try {
    if (isRateLimited(request)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please wait a few minutes before submitting again.",
        },
        { status: 429 },
      );
    }

    const body = await request.json();
    if (typeof body?.company === "string" && body.company.trim()) {
      return NextResponse.json({
        success: true,
        message: "Contact form submitted successfully.",
      });
    }

    const submission = validateContactSubmission(body);
    const id = `contact-${crypto.randomUUID()}`;

    await sendContactEmails({ id, ...submission });

    return NextResponse.json({
      success: true,
      message: "Contact form submitted successfully.",
      id,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to submit contact form.";
    const isValidationError =
      message.startsWith("Please provide") ||
      message.startsWith("Please provide a valid") ||
      message.endsWith("is too long.") ||
      message === "Invalid form submission.";

    console.error("Contact form submission failed:", error);
    return NextResponse.json(
      {
        success: false,
        message: isValidationError
          ? message
          : "We could not send your message right now. Please try again shortly.",
      },
      { status: isValidationError ? 400 : 503 },
    );
  }
}
