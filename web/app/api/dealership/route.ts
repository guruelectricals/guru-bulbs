import { NextResponse } from "next/server";
import { saveFormSubmission } from "@/lib/form-submissions";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.RESEND_TO_EMAIL || "hello@gurubulbs.com";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      businessName,
      owner,
      phone,
      email,
      address,
      businessDuration,
      currentProducts,
      interests,
      territory,
      businessDescription,
      pan,
      website,
    } = body || {};

    if (!businessName || !owner || !phone || !email || !address || !businessDuration || !currentProducts) {
      return NextResponse.json(
        { success: false, message: "Please provide all required fields." },
        { status: 400 },
      );
    }

    const record = await saveFormSubmission("dealership", {
      businessName,
      owner,
      phone,
      email,
      address,
      pan,
      website,
      businessDuration,
      currentProducts,
      interests: Array.isArray(interests) ? interests : [],
      territory,
      businessDescription,
      submittedAt: new Date().toISOString(),
    });

    try {
      await resend.emails.send({
        from: "Guru Bulbs Dealership <onboarding@resend.dev>",
        to: toEmail,
        subject: `New Dealership Application: ${businessName}`,
        html: `
          <h2>New Dealership Application</h2>
          <p><strong>Business Name:</strong> ${businessName}</p>
          <p><strong>Owner Name:</strong> ${owner}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Address:</strong> ${address}</p>
          <p><strong>PAN:</strong> ${pan || 'N/A'}</p>
          <p><strong>Website/Social:</strong> ${website || 'N/A'}</p>
          <p><strong>Business Duration:</strong> ${businessDuration}</p>
          <p><strong>Current Products:</strong> ${currentProducts}</p>
          <p><strong>Product Interests:</strong> ${Array.isArray(interests) ? interests.join(', ') : 'None'}</p>
          <p><strong>Preferred Territory:</strong> ${territory || 'N/A'}</p>
          <p><strong>Business Description:</strong></p>
          <p>${businessDescription ? businessDescription.replace(/\n/g, '<br/>') : 'N/A'}</p>
        `,
      });
    } catch (emailError) {
      console.error("Failed to send email via Resend:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: "Dealership application submitted successfully.",
      id: record.id,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to submit dealership application.",
      },
      { status: 500 },
    );
  }
}
