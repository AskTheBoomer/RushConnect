
"use client";

import { useEffect, useState } from "react";
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

  // Close the mobile menu when Escape is pressed.
  useEffect(() => {
    if (!menuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenu();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const linkClasses =
    "text-sm font-medium text-[#526074] transition-colors duration-200 hover:text-[#b18d55] rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a4824e] focus-visible:ring-offset-4";

  const buttonClasses =
    "inline-flex items-center justify-center rounded-full bg-[#172b46] px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#263f5e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a4824e] focus-visible:ring-offset-2";

  return (
    <header className="sticky top-0 z-50 border-b border-[#e9e4ee] bg-[#fcfbfd]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">

        {/* Brand */}
        <a
          href="#home"
          onClick={closeMenu}
          className="flex items-center gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a4824e] focus-visible:ring-offset-4"
          aria-label="Evelyn Rush Solutions home"
        >
          <BrandLogo />
          <span className="hidden font-display text-sm uppercase tracking-[0.18em] text-[#1d1b22] sm:block">
            Evelyn Rush Solutions
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6 md:flex lg:gap-8"
        >
          {navigationLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={linkClasses}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Contact Button */}
        <a
          href="#contact"
          className={`hidden md:inline-flex ${buttonClasses}`}
        >
          Get in Touch
        </a>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={
            menuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-[#e8e2d7] text-[#172b46] transition-colors hover:bg-[#f0ece3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a4824e] focus-visible:ring-offset-2 md:hidden"
        >
          <span
            aria-hidden="true"
            className={`h-0.5 w-5 bg-current transition-transform duration-200 ${
              menuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />

          <span
            aria-hidden="true"
            className={`h-0.5 w-5 bg-current transition-opacity duration-200 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />

          <span
            aria-hidden="true"
            className={`h-0.5 w-5 bg-current transition-transform duration-200 ${
              menuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-[#e8e2d7] bg-[#faf8f3] px-5 py-5 md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-4">
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-sm py-2 text-sm font-medium text-[#172b46] transition-colors hover:text-[#b18d55] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a4824e]"
              >
                {link.label}
              </a>
            ))}

            <a
              href="#contact"
              onClick={closeMenu}
              className={`mt-2 w-full ${buttonClasses}`}
            >
              Get in Touch
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
