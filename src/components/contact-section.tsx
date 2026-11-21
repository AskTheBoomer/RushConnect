
"use client";

import { useActionState } from "react";
import { submitInquiry } from "@/app/actions";

const initialState = {
  success: false,
  message: "",
};

export default function ContactSection() {
  const [state, formAction, isPending] = useActionState(
    submitInquiry,
    initialState,
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
            <span className="block text-[#a4824e]">
              conversation.
            </span>
          </h2>

          <p className="mt-7 max-w-lg text-base leading-8 text-[#687386]">
            Have a question or want to learn more about my
            services? Send me a message. I would be happy
            to hear from you.
          </p>

          <div className="mt-10 border-l-2 border-[#c5a46d] pl-6">
            <h3 className="font-semibold text-[#172b46]">
              How can I help?
            </h3>

            <p className="mt-2 max-w-md text-sm leading-7 text-[#687386]">
              Share a few details about your inquiry, and I
              will get back to you as soon as possible.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="rounded-[2rem] border border-[#e8e2d7] bg-[#faf8f3] p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-9">

          <h3 className="text-xl font-semibold text-[#172b46]">
            Send me a message
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
              <label
                htmlFor="name"
                className={labelClasses}
              >
                Full name *
              </label>

              <input
                id="name"
                name="name"
                type="text"
                required
                minLength={2}
                maxLength={100}
                autoComplete="name"
                placeholder="Enter your full name"
                disabled={isPending}
                className={inputClasses}
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className={labelClasses}
              >
                Email address *
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                maxLength={254}
                autoComplete="email"
                placeholder="you@example.com"
                disabled={isPending}
                className={inputClasses}
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className={labelClasses}
              >
                Phone number
                <span className="ml-1 font-normal text-[#9aa2ad]">
                  (optional)
                </span>
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                maxLength={30}
                autoComplete="tel"
                placeholder="Enter your phone number"
                disabled={isPending}
                className={inputClasses}
              />
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="service"
                className={labelClasses}
              >
                Subject
              </label>

              <select
                id="service"
                name="service"
                defaultValue="General inquiry"
                disabled={isPending}
                className={`${inputClasses} cursor-pointer`}
              >
                <option value="General inquiry">
                  General inquiry
                </option>

                <option value="Cleaning services">
                  Cleaning services
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className={labelClasses}
              >
                Message *
              </label>

              <textarea
                id="message"
                name="message"
                required
                minLength={1}
                maxLength={5000}
                rows={5}
                placeholder="How can I help you?"
                disabled={isPending}
                className={`${inputClasses} resize-y`}
              />
            </div>

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
              className="inline-flex w-full items-center justify-center rounded-full bg-[#172b46] px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#263f5e] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a4824e] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Sending..." : "Send Message"}

              {!isPending && (
                <span
                  aria-hidden="true"
                  className="ml-3"
                >
                  →
                </span>
              )}
            </button>

            {/* Privacy Notice */}
            <p className="text-center text-xs leading-5 text-[#8992a0]">
              Your information will only be used to respond
              to your inquiry.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
