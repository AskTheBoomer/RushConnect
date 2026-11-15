
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
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <a href="#home" className="inline-block">
              <span className="block text-2xl font-bold tracking-tight">
                Evelyn Rush
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c5a46d]">
                Solutions
              </span>
            </a>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/70">
              Professional cleaning solutions designed to bring comfort,
              care, and attention to detail to your space.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-[#c5a46d]">
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
                  className="text-sm text-white/70 transition-colors hover:text-[#c5a46d]"
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
            className="transition-colors hover:text-[#c5a46d]"
          >
            Owner Portal
          </a>
        </div>
      </div>
    </footer>
  );
}
