import { Suspense } from "react";
import BrandLogo from "@/components/brand-logo";
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
    <footer className="bg-[#1d1b22] text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <a href="#home" className="inline-flex items-center gap-3">
              <BrandLogo />
              <span className="font-display text-sm uppercase tracking-[0.18em]">
                Evelyn Rush Solutions
              </span>
            </a>

            <p className="mt-3 font-script text-2xl text-white/80">
              The Elements of Speed
            </p>

            <Suspense fallback={null}>
              <ContactDetails />
            </Suspense>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-[#a87bc7]">
              Explore
            </h2>

            <nav
              aria-label="Footer navigation"
              className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4"
            >
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/70 transition-colors hover:text-[#a87bc7]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © Evelyn Rush Solutions. All rights reserved.
          </p>

          <a
            href="/login"
            className="transition-colors hover:text-[#a87bc7]"
          >
            Admin Portal
          </a>
        </div>
      </div>
    </footer>
  );
}

// Phone, email, and Instagram come from business_info, so the owner can
// change them from the portal later instead of editing code.
async function ContactDetails() {
  const supabase = await createClient();
  const { data: info } = await supabase
    .from("business_info")
    .select("phone, email, instagram_url")
    .eq("id", 1)
    .maybeSingle();

  if (!info) return null;

  const instagramHandle = info.instagram_url
    .replace(/^https?:\/\/(www\.)?instagram\.com\//, "")
    .replace(/\/$/, "");

  return (
    <ul className="mt-6 space-y-2 text-sm text-white/70">
      {info.phone && (
        <li>
          <a href={`tel:${info.phone.replace(/[^\d+]/g, "")}`} className="hover:text-[#a87bc7]">
            {info.phone}
          </a>
        </li>
      )}
      {info.email && (
        <li>
          <a href={`mailto:${info.email}`} className="hover:text-[#a87bc7]">
            {info.email}
          </a>
        </li>
      )}
      {instagramHandle && (
        <li>
          <a href={info.instagram_url} target="_blank" rel="noopener noreferrer" className="hover:text-[#a87bc7]">
            Instagram: @{instagramHandle}
          </a>
        </li>
      )}
    </ul>
  );
}
