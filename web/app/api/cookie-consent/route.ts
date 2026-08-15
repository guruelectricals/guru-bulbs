import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { consent } = body;

    if (!consent || !["all", "essential", "declined"].includes(consent)) {
      return NextResponse.json(
        { error: "Invalid consent option provided" },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Standardized consent log output for server analytics / audit
    console.log(`[COOKIE CONSENT LOG] Timestamp: ${timestamp} | Choice: ${consent} | UserAgent: ${userAgent}`);

    return NextResponse.json({
      success: true,
      consent,
      timestamp,
      message: "Visitor cookie preference saved successfully.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to log cookie consent choice" },
      { status: 500 }
    );
  }
}
