// Emails each new inquiry to the business inbox through Resend (FR-02.4).
// Called after the inquiry is saved. A failure is logged and never shown to
// the customer, because the inquiry is already stored (NFR-07, TC-08).
type Inquiry = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

export async function sendInquiryEmail(inquiry: Inquiry) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_NOTIFY_EMAIL;
  if (!apiKey || !to) {
    console.error("Inquiry email not sent: RESEND_API_KEY or INQUIRY_NOTIFY_EMAIL is not set.");
    return;
  }

  const received = new Date().toLocaleString("en-US", {
    timeZone: "America/Chicago",
    dateStyle: "medium",
    timeStyle: "short",
  });
  const site = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ");

  const text = [
    "New inquiry from the Rush Connect website",
    "",
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone || "Not given"}`,
    `Interested in: ${inquiry.service}`,
    `Received: ${received}`,
    "",
    "Message:",
    inquiry.message,
    "",
    "Reply to this email to answer the customer directly.",
    site ? `See all inquiries: https://${site}/admin/inquiries` : "",
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Rush Connect <onboarding@resend.dev>",
        to: [to],
        reply_to: inquiry.email,
        subject: oneLine(`New inquiry: ${inquiry.service} from ${inquiry.name}`).slice(0, 150),
        text,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) {
      console.error(`Inquiry email failed: Resend returned ${response.status}`, await response.text());
    }
  } catch (error) {
    console.error("Inquiry email failed: request error", error);
  }
}
