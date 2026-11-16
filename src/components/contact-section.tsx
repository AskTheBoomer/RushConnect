
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

  return (
    <section id="contact" className="bg-white py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
        <div className="flex flex-col justify-center">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#7d52a3]">
            Get in Touch
          </p>

          <h2 className="max-w-lg text-3xl font-semibold leading-tight tracking-tight text-[#1d1b22] sm:text-4xl lg:text-5xl">
            Let&apos;s start a
            <span className="block text-[#7d52a3]">
              conversation.
            </span>
          </h2>

          <p className="mt-7 max-w-lg text-base leading-8 text-[#5f5a66]">
            Have a question or want to learn more about our cleaning
            services? Send us a message. We would be happy to hear
            from you.
          </p>

          <div className="mt-10 border-l-2 border-[#a87bc7] pl-6">
            <h3 className="font-semibold text-[#1d1b22]">
              How can we help?
            </h3>
            <p className="mt-2 max-w-md text-sm leading-7 text-[#5f5a66]">
              Share a few details about your inquiry, and our team
              can follow up with you.
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#e9e4ee] bg-[#fcfbfd] p-6 sm:p-9">
          <h3 className="text-xl font-semibold text-[#1d1b22]">
            Send us a message
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#5f5a66]">
            Fields marked with * are required.
          </p>

          <form action={formAction} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-[#1d1b22]"
              >
                Full name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                maxLength={100}
                autoComplete="name"
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-[#e9e4ee] bg-white px-4 py-3.5 text-sm text-[#1d1b22] placeholder:text-[#9a95a0] focus:border-[#a87bc7] focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#1d1b22]"
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
                className="w-full rounded-xl border border-[#e9e4ee] bg-white px-4 py-3.5 text-sm text-[#1d1b22] placeholder:text-[#9a95a0] focus:border-[#a87bc7] focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-[#1d1b22]"
              >
                Phone number
                <span className="ml-1 font-normal text-[#9a95a0]">
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
                className="w-full rounded-xl border border-[#e9e4ee] bg-white px-4 py-3.5 text-sm text-[#1d1b22] placeholder:text-[#9a95a0] focus:border-[#a87bc7] focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="service"
                className="mb-2 block text-sm font-medium text-[#1d1b22]"
              >
                Subject
              </label>
              <select
                id="service"
                name="service"
                defaultValue="General inquiry"
                className="w-full rounded-xl border border-[#e9e4ee] bg-white px-4 py-3.5 text-sm text-[#1d1b22] focus:border-[#a87bc7] focus:outline-none"
              >
                <option value="General inquiry">General inquiry</option>
                <option value="Residential and Small Business Cleaning">
                  Residential and small business cleaning
                </option>
                <option value="Rug and Upholstery Cleaning">
                  Rug and upholstery cleaning
                </option>
                <option value="Household Packing and Organization">
                  Household packing and organization
                </option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-[#1d1b22]"
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
                placeholder="How can we help you?"
                className="w-full resize-y rounded-xl border border-[#e9e4ee] bg-white px-4 py-3.5 text-sm text-[#1d1b22] placeholder:text-[#9a95a0] focus:border-[#a87bc7] focus:outline-none"
              />
            </div>

            {state.message && (
              <div
                role="status"
                aria-live="polite"
                className={`rounded-xl px-4 py-3 text-sm leading-6 ${
                  state.success
                    ? "border border-green-200 bg-green-50 text-green-800"
                    : "border border-red-200 bg-red-50 text-red-800"
                }`}
              >
                {state.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#1d1b22] px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#3d3846] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Sending..." : "Send Message"}
              {!isPending && (
                <span aria-hidden="true" className="ml-3">
                  →
                </span>
              )}
            </button>

            <p className="text-center text-xs leading-5 text-[#858090]">
              Your information will be used to respond to your inquiry.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
