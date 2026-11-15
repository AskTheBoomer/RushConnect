
export default function AboutSection() {
  return (
    <section id="about" className="bg-[#faf8f3] py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#a4824e]">
            About Evelyn Rush Solutions
          </p>

          <h2 className="max-w-xl text-3xl font-semibold leading-tight tracking-tight text-[#172b46] sm:text-4xl lg:text-5xl">
            More than cleaning.
            <span className="block text-[#a4824e]">
              A thoughtful approach to your space.
            </span>
          </h2>

          <p className="mt-7 max-w-xl text-base leading-8 text-[#687386]">
            A clean and comfortable environment can make everyday life
            feel easier. Evelyn Rush Solutions focuses on providing
            cleaning solutions with care, consistency, and attention
            to detail.
          </p>

          <p className="mt-5 max-w-xl text-base leading-8 text-[#687386]">
            Whether you are looking for help maintaining your home or
            preparing a space for a fresh start, the goal is to make
            your cleaning experience straightforward and welcoming.
          </p>

          <a
            href="#contact"
            className="mt-9 inline-flex items-center gap-3 border-b border-[#c5a46d] pb-2 text-sm font-semibold text-[#172b46] transition-colors hover:text-[#a4824e]"
          >
            Connect with us
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="relative">
          <div className="rounded-[2rem] bg-[#f4f0e7] p-7 sm:p-10">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex min-h-48 flex-col justify-between rounded-2xl bg-[#172b46] p-5 text-white sm:min-h-56 sm:p-7">
                <span className="text-3xl text-[#c5a46d]">01</span>
                <div>
                  <h3 className="font-semibold">Care</h3>
                  <p className="mt-2 text-sm leading-6 text-white/65">
                    A thoughtful approach to every space.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex min-h-48 flex-col justify-between rounded-2xl border border-[#e4d9c7] bg-white p-5 sm:min-h-56 sm:p-7">
                <span className="text-3xl text-[#c5a46d]">02</span>
                <div>
                  <h3 className="font-semibold text-[#172b46]">
                    Consistency
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#687386]">
                    Attention to the details that matter.
                  </p>
                </div>
              </div>

              <div className="flex min-h-48 flex-col justify-between rounded-2xl border border-[#e4d9c7] bg-white p-5 sm:min-h-56 sm:p-7">
                <span className="text-3xl text-[#c5a46d]">03</span>
                <div>
                  <h3 className="font-semibold text-[#172b46]">
                    Comfort
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#687386]">
                    Helping create welcoming environments.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex min-h-48 flex-col justify-between rounded-2xl bg-[#e9dfce] p-5 sm:min-h-56 sm:p-7">
                <span className="text-3xl text-[#a4824e]">04</span>
                <div>
                  <h3 className="font-semibold text-[#172b46]">
                    Attention
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#526074]">
                    Respect for the spaces we care for.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute -bottom-4 -right-3 -z-10 h-32 w-32 rounded-full bg-[#c5a46d]/20 blur-2xl" />
        </div>
      </div>
    </section>
  );
}
