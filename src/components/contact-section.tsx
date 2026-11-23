
"use client";

import { useActionState } from "react";
import {
  submitInquiry,
  type InquiryField,
  type InquiryState,
} from "@/app/actions";
import TurnstileWidget from "./turnstile-widget";

const initialState: InquiryState = {
  success: false,
  message: "",
};

const invalidBorder = "border-red-400 focus:border-red-500";

export default function ContactSection() {
  const [state, formAction, isPending] = useActionState(
    submitInquiry,
    initialState
  );

  const inputClasses =
    "w-full rounded-xl border border-[#e4ddd1] bg-white px-4 py-3.5 text-sm text-[#172b46] placeholder:text-[#9aa2ad] transition-all duration-200 focus:border-[#a4824e] focus:outline-none focus:ring-2 focus:ring-[#c5a46d]/20 disabled:cursor-not-allowed disabled:opacity-60";

  const labelClasses =
    "mb-2 block text-sm font-medium text-[#172b46]";

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-white py-24 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">

        {/* Contact Introduction */}
        <div className="flex flex-col justify-center">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#a4824e]">
            Get in Touch
          </p>

          <h2
            id="contact-heading"
            className="max-w-lg text-3xl font-semibold leading-tight tracking-tight text-[#172b46] sm:text-4xl lg:text-5xl"
          >
            Let&apos;s start a
            <span className="block text-[#b18d55]">
              conversation.
            </span>
          </h2>

          <p className="mt-7 max-w-lg text-base leading-8 text-[#687386]">
            Have a question or want to learn more about our cleaning
            services? Send us a message. We would be happy to hear
            from you.
          </p>

          <div className="mt-10 border-l-2 border-[#a4824e] pl-6">
            <h3 className="font-semibold text-[#172b46]">
              How can we help?
            </h3>

            <p className="mt-2 max-w-md text-sm leading-7 text-[#687386]">
              Share a few details about your inquiry, and our team
              can follow up with you.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="rounded-[2rem] border border-[#e9e4ee] bg-[#fcfbfd] p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-9">
          <h3 className="text-xl font-semibold text-[#172b46]">
            Send us a message
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#687386]">
            Fields marked with * are required.
          </p>

          <form
            action={formAction}
            aria-busy={isPending}
            className="mt-8 space-y-5"
          >
            {/* Full Name */}
            <div>
              <label htmlFor="name" className={labelClasses}>
                Full name *
              </label>

              <input
                id="name"
                name="name"
                aria-invalid={state.errors?.name ? true : undefined}
                aria-describedby={
                  state.errors?.name ? "name-error" : undefined
                }
                type="text"
                required
                minLength={2}
                maxLength={100}
                autoComplete="name"
                defaultValue={state.values?.name}
                placeholder="Enter your full name"
                disabled={isPending}
                className={`${inputClasses} ${
                  state.errors?.name ? invalidBorder : ""
                }`}
              />

              <FieldError field="name" errors={state.errors} />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className={labelClasses}>
                Email address *
              </label>

              <input
                id="email"
                name="email"
                aria-invalid={state.errors?.email ? true : undefined}
                aria-describedby={
                  state.errors?.email ? "email-error" : undefined
                }
                type="email"
                required
                maxLength={254}
                autoComplete="email"
                defaultValue={state.values?.email}
                placeholder="you@example.com"
                disabled={isPending}
                className={`${inputClasses} ${
                  state.errors?.email ? invalidBorder : ""
                }`}
              />

              <FieldError field="email" errors={state.errors} />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className={labelClasses}>
                Phone number
                <span className="ml-1 font-normal text-[#9aa2ad]">
                  (optional)
                </span>
              </label>

              <input
                id="phone"
                name="phone"
                aria-invalid={state.errors?.phone ? true : undefined}
                aria-describedby={
                  state.errors?.phone ? "phone-error" : undefined
                }
                type="tel"
                maxLength={30}
                autoComplete="tel"
                defaultValue={state.values?.phone}
                placeholder="Enter your phone number"
                disabled={isPending}
                className={`${inputClasses} ${
                  state.errors?.phone ? invalidBorder : ""
                }`}
              />

              <FieldError field="phone" errors={state.errors} />
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="service" className={labelClasses}>
                Subject
              </label>

              <select
                key={state.values?.service ?? "default"}
                id="service"
                name="service"
                aria-invalid={
                  state.errors?.service ? true : undefined
                }
                aria-describedby={
                  state.errors?.service ? "service-error" : undefined
                }
                defaultValue={
                  state.values?.service ?? "General inquiry"
                }
                disabled={isPending}
                className={`${inputClasses} cursor-pointer ${
                  state.errors?.service ? invalidBorder : ""
                }`}
              >
                <option value="General inquiry">General inquiry</option>
                <option value="Packing & Unpacking">
                  Packing &amp; unpacking
                </option>
                <option value="Laundry and Ironing">
                  Laundry and ironing
                </option>
                <option value="Cleaning">Cleaning</option>
                <option value="Organization">Organization</option>
                <option value="Cleaning services">
                  Cleaning services
                </option>
                <option value="Other">Other</option>
              </select>

              <FieldError field="service" errors={state.errors} />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className={labelClasses}>
                Message *
              </label>

              <textarea
                id="message"
                name="message"
                aria-invalid={
                  state.errors?.message ? true : undefined
                }
                aria-describedby={
                  state.errors?.message ? "message-error" : undefined
                }
                required
                minLength={1}
                maxLength={5000}
                rows={5}
                defaultValue={state.values?.message}
                placeholder="How can we help you?"
                disabled={isPending}
                className={`${inputClasses} resize-y ${
                  state.errors?.message ? invalidBorder : ""
                }`}
              />

              <FieldError field="message" errors={state.errors} />
            </div>

            {/* Cloudflare Turnstile Protection */}
            <TurnstileWidget resetKey={state} />

            {/* Submission Feedback */}
            {state.message && (
              <div
                role={state.success ? "status" : "alert"}
                aria-live="polite"
                className={`rounded-xl border px-4 py-3 text-sm leading-6 ${
                  state.success
                    ? "border-green-200 bg-green-50 text-green-800"
                    : "border-red-200 bg-red-50 text-red-800"
                }`}
              >
                {state.message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#172b46] px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#263f5e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a4824e] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Sending..." : "Send Message"}

              {!isPending && (
                <span aria-hidden="true" className="ml-3">
                  →
                </span>
              )}
            </button>

            {/* Privacy Notice */}
            <p className="text-center text-xs leading-5 text-[#858090]">
              Your information will be used to respond to your inquiry.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function FieldError({
  field,
  errors,
}: {
  field: InquiryField;
  errors: InquiryState["errors"];
}) {
  const message = errors?.[field];

  if (!message) return null;

  return (
    <p id={`${field}-error`} className="mt-2 text-sm text-red-700">
      {message}
    </p>
  );
}
