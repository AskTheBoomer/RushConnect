
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
            Owner Portal
          </a>
        </div>
      </div>
    </footer>
  );
}
