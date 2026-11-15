
"use server";

import { createClient } from "@/lib/supabase/server";

type InquiryState = {
  success: boolean;
  message: string;
};

export async function submitInquiry(
  _previousState: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const service = formData.get("service");
  const message = formData.get("message");

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof phone !== "string" ||
    typeof service !== "string" ||
    typeof message !== "string"
  ) {
    return {
      success: false,
      message: "Please complete the form using valid information.",
    };
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();
  const cleanPhone = phone.trim();
  const cleanService = service.trim();
  const cleanMessage = message.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!cleanName || cleanName.length > 100) {
    return {
      success: false,
      message: "Please enter a valid name (maximum 100 characters).",
    };
  }

  if (
    !cleanEmail ||
    cleanEmail.length > 254 ||
    !emailPattern.test(cleanEmail)
  ) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    };
  }

  if (cleanPhone.length > 30) {
    return {
      success: false,
      message: "Your phone number must not exceed 30 characters.",
    };
  }

  if (cleanService.length > 100) {
    return {
      success: false,
      message: "Please select a valid subject.",
    };
  }

  if (!cleanMessage || cleanMessage.length > 5000) {
    return {
      success: false,
      message: "Please enter a message (maximum 5,000 characters).",
    };
  }

  try {
    const supabase = await createClient();

    const { error } = await supabase.from("inquiries").insert({
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone || null,
      service: cleanService || "Not specified",
      message: cleanMessage,
    });

    if (error) {
      return {
        success: false,
        message:
          "We could not submit your message right now. Please try again later.",
      };
    }

    return {
      success: true,
      message:
        "Thank you! Your inquiry has been submitted successfully.",
    };
  } catch {
    return {
      success: false,
      message:
        "Something went wrong while submitting your inquiry. Please try again later.",
    };
  }
}
