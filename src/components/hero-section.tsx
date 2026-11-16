import BrandLogo from "@/components/brand-logo";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#f5f1f8]"
    >
      <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:px-12 lg:py-28">
        <div className="relative z-10">
          <p className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#7d52a3]">
            <span className="h-px w-9 bg-[#a87bc7]" />
            Residential and Small Business Cleaning
          </p>

          <h1 className="max-w-xl text-4xl font-semibold leading-[1.15] tracking-tight text-[#1d1b22] sm:text-5xl lg:text-6xl">
            A cleaner space.
            <span className="mt-2 block text-[#7d52a3]">
              A more comfortable life.
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-base leading-8 text-[#5f5a66] sm:text-lg">
            Evelyn Rush Solutions is here to give your home or business the
            refined look you have been longing for.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-[#1d1b22] px-7 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#3d3846]"
            >
              Request Information
              <span aria-hidden="true" className="ml-3">
                →
              </span>
            </a>

            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-full border border-[#1d1b22]/20 px-7 py-4 text-sm font-semibold text-[#1d1b22] transition-colors hover:border-[#a87bc7] hover:bg-white/60"
            >
              Explore Services
            </a>
          </div>

          <div className="mt-12 flex items-center gap-3">
            <span className="h-10 w-1 rounded-full bg-[#a87bc7]" />
            <p className="text-sm leading-6 text-[#5f5a66]">
              Care, consistency, and attention to detail.
            </p>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-lg flex-col items-center rounded-[2rem] border border-[#e9e4ee] bg-white px-4 py-14 text-center shadow-xl sm:px-6 sm:py-16">
          <BrandLogo size="lg" />
          <p className="mt-8 font-script text-3xl text-[#1d1b22] sm:text-5xl lg:text-4xl xl:text-5xl">
            The Elements of Speed
          </p>
          <p className="mt-6 font-display text-sm uppercase tracking-[0.22em] text-[#5f5a66]">
            Evelyn Rush Solutions
          </p>
        </div>
      </div>
    </section>
  );
}
