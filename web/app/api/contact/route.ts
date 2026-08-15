import { NextResponse } from "next/server";
import { saveFormSubmission } from "@/lib/form-submissions";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.RESEND_TO_EMAIL || "hello@gurubulbs.com";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body || {};

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "Please provide all required fields." },
        { status: 400 },
      );
    }

    const record = await saveFormSubmission("contact", {
      name,
      email,
      subject,
      message,
      submittedAt: new Date().toISOString(),
    });

    try {
      await resend.emails.send({
        from: "Guru Bulbs Contact <onboarding@resend.dev>",
        to: toEmail,
        subject: `New Contact Inquiry: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br/>')}</p>
        `,
      });
    } catch (emailError) {
      console.error("Failed to send email via Resend:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: "Contact form submitted successfully.",
      id: record.id,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to submit contact form.",
      },
      { status: 500 },
    );
  }
}
