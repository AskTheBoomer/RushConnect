
"use client";

import { useState } from "react";
import BrandLogo from "@/components/brand-logo";

const navigationLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#e9e4ee] bg-[#fcfbfd]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <a
          href="#home"
          onClick={closeMenu}
          className="flex items-center gap-3"
          aria-label="Evelyn Rush Solutions home"
        >
          <BrandLogo />
          <span className="hidden font-display text-sm uppercase tracking-[0.18em] text-[#1d1b22] sm:block">
            Evelyn Rush Solutions
          </span>
        </a>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 md:flex"
        >
          {navigationLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#4a4552] transition-colors hover:text-[#7d52a3]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden rounded-full bg-[#1d1b22] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3d3846] md:inline-flex"
        >
          Get in Touch
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-[#e9e4ee] text-[#1d1b22] md:hidden"
        >
          <span
            className={`h-0.5 w-5 bg-current transition-transform ${
              menuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-5 bg-current transition-opacity ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-5 bg-current transition-transform ${
              menuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-[#e9e4ee] bg-[#fcfbfd] px-5 py-5 md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-4">
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="py-2 text-sm font-medium text-[#1d1b22] transition-colors hover:text-[#7d52a3]"
              >
                {link.label}
              </a>
            ))}

            <a
              href="#contact"
              onClick={closeMenu}
              className="mt-2 rounded-full bg-[#1d1b22] px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#3d3846]"
            >
              Get in Touch
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
