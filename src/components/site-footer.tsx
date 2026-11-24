
import { Suspense } from "react";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-[#172b46] text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-12">
        {/* Main Footer Content */}
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Brand Information */}
          <div>
            <a
              href="#home"
              aria-label="Evelyn Rush Solutions home"
              className="inline-block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a46d] focus-visible:ring-offset-4 focus-visible:ring-offset-[#172b46]"
            >
              <span className="block text-2xl font-bold tracking-tight">
                Evelyn Rush
              </span>

              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c5a46d]">
                Solutions
              </span>
            </a>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/70">
              Professional cleaning solutions designed to
              bring comfort, care, and attention to detail
              to your space.
            </p>

            {/* Dynamic Business Contact Information */}
            <Suspense fallback={null}>
              <ContactDetails />
            </Suspense>
          </div>

          {/* Footer Navigation */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#c5a46d]">
              Explore
            </h2>

            <nav
              aria-label="Footer navigation"
              className="mt-6 grid grid-cols-2 gap-x-8 gap-y-5 sm:max-w-md"
            >
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="w-fit rounded-sm text-sm text-white/70 transition-colors duration-200 hover:text-[#c5a46d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a46d] focus-visible:ring-offset-4 focus-visible:ring-offset-[#172b46]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Copyright and Owner Portal */}
        <div className="mt-12 flex flex-col gap-5 border-t border-white/15 pt-7 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 Evelyn Rush Solutions. All rights reserved.
          </p>

          <a
            href="/login"
            className="w-fit rounded-sm transition-colors duration-200 hover:text-[#c5a46d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a46d] focus-visible:ring-offset-4 focus-visible:ring-offset-[#172b46]"
          >
            Admin Portal
          </a>
        </div>
      </div>
    </footer>
  );
}

// Phone, email, and Instagram come from business_info,
// allowing the owner to update contact information through the portal.
async function ContactDetails() {
  await connection();

  const supabase = await createClient();

  const { data: info } = await supabase
    .from("business_info")
    .select("phone, email, instagram_url")
    .eq("id", 1)
    .maybeSingle();

  if (!info) return null;

  const instagramHandle = info.instagram_url
    ? info.instagram_url
        .replace(/^https?:\/\/(www\.)?instagram\.com\//i, "")
        .replace(/\/$/, "")
    : "";

  return (
    <ul className="mt-6 space-y-2 text-sm text-white/70">
      {info.phone && (
        <li>
          <a
            href={`tel:${info.phone.replace(/[^\d+]/g, "")}`}
            className="transition-colors hover:text-[#c5a46d]"
          >
            {info.phone}
          </a>
        </li>
      )}

      {info.email && (
        <li>
          <a
            href={`mailto:${info.email}`}
            className="transition-colors hover:text-[#c5a46d]"
          >
            {info.email}
          </a>
        </li>
      )}

      {instagramHandle && (
        <li>
          <a
            href={info.instagram_url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#c5a46d]"
          >
            Instagram: @{instagramHandle}
          </a>
        </li>
      )}
    </ul>
  );
}
