import { NextResponse } from "next/server";
import { sendDealershipEmails } from "@/lib/form-email";
import {
  isRateLimited,
  validateDealershipSubmission,
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
    if (typeof body?.confirmation === "string" && body.confirmation.trim()) {
      return NextResponse.json({
        success: true,
        message: "Dealership application submitted successfully.",
      });
    }

    const submission = validateDealershipSubmission(body);
    const id = `dealership-${crypto.randomUUID()}`;

    await sendDealershipEmails({ id, ...submission });

    return NextResponse.json({
      success: true,
      message: "Dealership application submitted successfully.",
      id,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to submit dealership application.";
    const isValidationError =
      message.startsWith("Please provide") ||
      message.startsWith("Please provide a valid") ||
      message.endsWith("is too long.") ||
      message === "Invalid form submission.";

    console.error("Dealership application submission failed:", error);
    return NextResponse.json(
      {
        success: false,
        message: isValidationError
          ? message
          : "We could not send your application right now. Please try again shortly.",
      },
      { status: isValidationError ? 400 : 503 },
    );
  }
}
