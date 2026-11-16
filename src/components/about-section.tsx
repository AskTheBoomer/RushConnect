
export default function AboutSection() {
  return (
    <section id="about" className="bg-[#fcfbfd] py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#7d52a3]">
            About Evelyn Rush Solutions
          </p>

          <h2 className="max-w-xl text-3xl font-semibold leading-tight tracking-tight text-[#1d1b22] sm:text-4xl lg:text-5xl">
            More than cleaning.
            <span className="block text-[#7d52a3]">
              A thoughtful approach to your space.
            </span>
          </h2>

          <p className="mt-7 max-w-xl text-base leading-8 text-[#5f5a66]">
            A clean and comfortable environment can make everyday life
            feel easier. Evelyn Rush Solutions focuses on providing
            cleaning solutions with care, consistency, and attention
            to detail.
          </p>

          <p className="mt-5 max-w-xl text-base leading-8 text-[#5f5a66]">
            Whether you are looking for help maintaining your home or
            preparing a space for a fresh start, the goal is to make
            your cleaning experience straightforward and welcoming.
          </p>

          <a
            href="#contact"
            className="mt-9 inline-flex items-center gap-3 border-b border-[#a87bc7] pb-2 text-sm font-semibold text-[#1d1b22] transition-colors hover:text-[#7d52a3]"
          >
            Connect with us
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="relative">
          <div className="rounded-[2rem] bg-[#f5f1f8] p-7 sm:p-10">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex min-h-48 flex-col justify-between rounded-2xl bg-[#1d1b22] p-5 text-white sm:min-h-56 sm:p-7">
                <span className="text-3xl text-[#a87bc7]">01</span>
                <div>
                  <h3 className="font-semibold">Care</h3>
                  <p className="mt-2 text-sm leading-6 text-white/65">
                    A thoughtful approach to every space.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex min-h-48 flex-col justify-between rounded-2xl border border-[#e9e4ee] bg-white p-5 sm:min-h-56 sm:p-7">
                <span className="text-3xl text-[#a87bc7]">02</span>
                <div>
                  <h3 className="font-semibold text-[#1d1b22]">
                    Consistency
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#5f5a66]">
                    Attention to the details that matter.
                  </p>
                </div>
              </div>

              <div className="flex min-h-48 flex-col justify-between rounded-2xl border border-[#e9e4ee] bg-white p-5 sm:min-h-56 sm:p-7">
                <span className="text-3xl text-[#a87bc7]">03</span>
                <div>
                  <h3 className="font-semibold text-[#1d1b22]">
                    Comfort
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#5f5a66]">
                    Helping create welcoming environments.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex min-h-48 flex-col justify-between rounded-2xl bg-[#f7dede] p-5 sm:min-h-56 sm:p-7">
                <span className="text-3xl text-[#7d52a3]">04</span>
                <div>
                  <h3 className="font-semibold text-[#1d1b22]">
                    Attention
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#4a4552]">
                    Respect for the spaces we care for.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute -bottom-4 -right-3 -z-10 h-32 w-32 rounded-full bg-[#a87bc7]/20 blur-2xl" />
        </div>
      </div>
    </section>
  );
}
