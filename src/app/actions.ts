"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { after } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendInquiryEmail } from "@/lib/inquiry-email";
import { verifyTurnstile } from "@/lib/turnstile";

export type InquiryField = "name" | "email" | "phone" | "service" | "message";

export type InquiryState = {
  success: boolean;
  message: string;
  // One message per field, shown beside that field (UC-02).
  errors?: Partial<Record<InquiryField, string>>;
  // What the visitor typed, sent back so the form keeps it after an error.
  values?: Partial<Record<InquiryField, string>>;
};

// Subjects that are always allowed in addition to Evelyn's services.
const GENERAL_SUBJECTS = ["General inquiry", "Other"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Follows Activity Diagram 1: rate limit -> bot check -> validate -> save -> email.
export async function submitInquiry(
  _previousState: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const text = (key: string) => {
    const value = formData.get(key);
    return typeof value === "string" ? value.trim() : "";
  };
  const values = {
    name: text("name"),
    email: text("email").toLowerCase(),
    phone: text("phone"),
    service: text("service") || "General inquiry",
    message: text("message"),
  };

  const supabase = await createClient();
  const ip = await visitorIp();

  // 1. Rate limit: 3 submissions per 10 minutes per visitor (FR-02.6).
  const { data: allowed, error: limitError } = await supabase.rpc("allow_submission", {
    p_kind: "inquiry",
    p_source: hashSource(ip),
  });
  if (limitError) {
    // Don't turn real customers away if the check itself is unavailable;
    // the bot check below still applies.
    console.error("Rate limit check failed", limitError.message);
  } else if (allowed === false) {
    return {
      success: false,
      message: "Too many requests. Please wait a few minutes and try again.",
      values,
    };
  }

  // 2. Bot check (Cloudflare Turnstile).
  if (!(await verifyTurnstile(text("cf-turnstile-response"), ip))) {
    return {
      success: false,
      message: "We couldn't verify you're a person. Please wait a moment and try again.",
      values,
    };
  }

  // 3. Validate every field and collect all the problems at once (FR-02.2).
  const errors: InquiryState["errors"] = {};
  if (!values.name) errors.name = "Please enter your name.";
  else if (values.name.length > 100) errors.name = "Please keep your name under 100 characters.";

  if (!values.email) errors.email = "Please enter your email address.";
  else if (values.email.length > 254 || !EMAIL_PATTERN.test(values.email))
    errors.email = "Please enter a valid email address, like name@example.com.";

  if (values.phone.length > 30) errors.phone = "Please keep the phone number under 30 characters.";

  if (!(await isKnownSubject(supabase, values.service)))
    errors.service = "Please choose one of the options in the list.";

  if (!values.message) errors.message = "Please enter a message.";
  else if (values.message.length > 5000)
    errors.message = "Please keep your message under 5,000 characters.";

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Please fix the highlighted fields and try again.",
      errors,
      values,
    };
  }

  // 4. Save the inquiry. The database sets status = New and the timestamp (FR-02.3).
  const { error } = await supabase.from("inquiries").insert({
    name: values.name,
    email: values.email,
    phone: values.phone || null,
    service: values.service,
    message: values.message,
  });
  if (error) {
    console.error("Inquiry insert failed", error.message);
    return {
      success: false,
      message: "We could not submit your message right now. Please try again later.",
      values,
    };
  }

  // 5. Email Evelyn after the response is sent, so the customer isn't kept
  //    waiting and an email problem can't undo the saved inquiry (NFR-07).
  after(() => sendInquiryEmail(values));

  return {
    success: true,
    message: "Thank you! Your inquiry has been submitted successfully.",
  };
}

async function visitorIp() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || null;
}

// Only a hash of the IP is stored, never the address itself (NFR-09).
function hashSource(ip: string | null) {
  return createHash("sha256").update(ip ?? "unknown").digest("hex");
}

async function isKnownSubject(
  supabase: Awaited<ReturnType<typeof createClient>>,
  service: string,
) {
  if (GENERAL_SUBJECTS.includes(service)) return true;
  const { data, error } = await supabase.from("services").select("name");
  // If the list can't be loaded, don't block the customer over it.
  if (error || !data) return true;
  return data.some((row) => row.name === service);
}
