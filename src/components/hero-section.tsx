
export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#f4f0e7]"
    >
      <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:px-12 lg:py-28">
        <div className="relative z-10">
          <p className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#a4824e]">
            <span className="h-px w-9 bg-[#c5a46d]" />
            Residential Cleaning Solutions
          </p>

          <h1 className="max-w-xl text-4xl font-semibold leading-[1.15] tracking-tight text-[#172b46] sm:text-5xl lg:text-6xl">
            A cleaner space.
            <span className="mt-2 block text-[#a4824e]">
              A more comfortable life.
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-base leading-8 text-[#687386] sm:text-lg">
            Discover a thoughtful approach to home cleaning, with attention
            to detail and care for the spaces that matter most to you.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-[#172b46] px-7 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#263f5e]"
            >
              Request Information
              <span aria-hidden="true" className="ml-3">
                →
              </span>
            </a>

            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-full border border-[#172b46]/20 px-7 py-4 text-sm font-semibold text-[#172b46] transition-colors hover:border-[#c5a46d] hover:bg-white/60"
            >
              Explore Services
            </a>
          </div>

          <div className="mt-12 flex items-center gap-3">
            <span className="h-10 w-1 rounded-full bg-[#c5a46d]" />
            <p className="text-sm leading-6 text-[#687386]">
              Care, consistency, and attention to detail.
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute -right-5 -top-5 h-32 w-32 rounded-full bg-[#c5a46d]/20 blur-2xl" />

          <div className="relative overflow-hidden rounded-[2rem] bg-[#172b46] p-8 shadow-2xl sm:p-12">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />
            <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full border border-[#c5a46d]/30" />

            <div className="relative flex min-h-[340px] flex-col justify-between sm:min-h-[390px]">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c5a46d]">
                  Evelyn Rush Solutions
                </span>

                <h2 className="mt-8 max-w-xs text-3xl font-medium leading-tight text-white sm:text-4xl">
                  Thoughtful care for every space.
                </h2>
              </div>

              <div className="mt-12 border-t border-white/20 pt-6">
                <p className="text-sm leading-7 text-white/70">
                  Your home deserves attention, care, and a cleaning
                  experience centered on your needs.
                </p>

                <div className="mt-6 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#c5a46d]" />
                  <span className="text-xs font-medium uppercase tracking-widest text-[#c5a46d]">
                    Comfort begins with care
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-[#e8e2d7] bg-white px-6 py-4 shadow-lg sm:block">
            <p className="text-xs font-medium uppercase tracking-widest text-[#a4824e]">
              Our approach
            </p>
            <p className="mt-1 text-sm font-semibold text-[#172b46]">
              Care in every detail
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
