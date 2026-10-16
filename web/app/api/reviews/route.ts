import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSanityWriteClient } from "@/lib/sanity.write";
import { isRateLimited } from "@/lib/form-validation";

export async function POST(request: Request) {
  try {
    if (isRateLimited(request)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please wait a few minutes before submitting another review.",
        },
        { status: 429 },
      );
    }

    const body = await request.json();

    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const role = typeof body?.role === "string" ? body.role.trim() : "";
    const quote = typeof body?.quote === "string" ? body.quote.trim() : "";
    const ratingRaw = Number(body?.rating);
    const rating =
      Number.isInteger(ratingRaw) && ratingRaw >= 1 && ratingRaw <= 5
        ? ratingRaw
        : 5;

    if (!name || name.length < 2) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide your full name (at least 2 characters).",
        },
        { status: 400 },
      );
    }

    if (!role || role.length < 2) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide your role or customer title.",
        },
        { status: 400 },
      );
    }

    if (!quote || quote.length < 5) {
      return NextResponse.json(
        {
          success: false,
          message: "Please write a review of at least 5 characters.",
        },
        { status: 400 },
      );
    }

    if (quote.length > 400) {
      return NextResponse.json(
        {
          success: false,
          message: "Review is too long (maximum 400 characters).",
        },
        { status: 400 },
      );
    }

    // Derive 2-letter uppercase initials
    const nameParts = name.split(/\s+/).filter(Boolean);
    const initials =
      nameParts.length >= 2
        ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
        : name.slice(0, 2).toUpperCase();

    const client = getSanityWriteClient();

    const doc = await client.create({
      _type: "testimonial",
      name,
      initials,
      role,
      quote,
      rating,
      displayOrder: 0,
      isActive: true,
    });

    try {
      revalidatePath("/");
    } catch {
      // Revalidation fallback
    }

    return NextResponse.json({
      success: true,
      message: "Your review has been successfully submitted and published!",
      review: {
        _id: doc._id,
        name: doc.name,
        initials: doc.initials,
        role: doc.role,
        quote: doc.quote,
        rating: doc.rating,
      },
    });
  } catch (error: unknown) {
    console.error("Failed to submit review to Sanity:", error);
    const message =
      error instanceof Error ? error.message : "Failed to submit review.";
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit review. Please try again shortly.",
        detail: process.env.NODE_ENV === "development" ? message : undefined,
      },
      { status: 500 },
    );
  }
}
