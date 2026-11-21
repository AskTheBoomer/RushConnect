
export default function AboutSection() {
  const values = [
    {
      number: "01",
      title: "Care",
      description: "A thoughtful approach to every space.",
      style: "navy",
    },
    {
      number: "02",
      title: "Consistency",
      description: "Attention to the details that matter.",
      style: "white",
    },
    {
      number: "03",
      title: "Comfort",
      description: "Helping create welcoming environments.",
      style: "white",
    },
    {
      number: "04",
      title: "Attention",
      description: "Respect for the spaces entrusted to Evelyn's care.",
      style: "gold",
    },
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-[#fcfbfd] py-24 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
        {/* About content */}
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#7d52a3]">
            About Evelyn Rush Solutions
          </p>

          <h2
            id="about-heading"
            className="max-w-xl text-3xl font-semibold leading-tight tracking-tight text-[#1d1b22] sm:text-4xl lg:text-5xl"
          >
            More than cleaning.{" "}
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
            className="mt-9 inline-flex items-center gap-3 border-b border-[#a87bc7] pb-2 text-sm font-semibold text-[#1d1b22] transition-colors hover:text-[#7d52a3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7d52a3]"
          >
            Connect with Evelyn
            <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* Brand values */}
        <div className="relative">
          <div className="rounded-[2rem] bg-[#f5f1f8] p-5 sm:p-10">
            <div className="grid grid-cols-2 gap-4">
              {values.map((value) => (
                <article
                  key={value.number}
                  className={`flex min-h-48 flex-col justify-between rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1 sm:min-h-56 sm:p-7 ${
                    value.style === "navy"
                      ? "bg-[#1d1b22] text-white"
                      : value.style === "gold"
                        ? "bg-[#f7dede] text-[#1d1b22]"
                        : "border border-[#e9e4ee] bg-white text-[#1d1b22]"
                  }`}
                >
                  <span
                    className={`text-3xl ${
                      value.style === "gold"
                        ? "text-[#7d52a3]"
                        : "text-[#a87bc7]"
                    }`}
                  >
                    {value.number}
                  </span>

                  <div>
                    <h3 className="font-semibold">
                      {value.title}
                    </h3>

                    <p
                      className={`mt-2 text-sm leading-6 ${
                        value.style === "navy"
                          ? "text-white/70"
                          : "text-[#5f5a66]"
                      }`}
                    >
                      {value.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-4 -right-3 -z-10 h-32 w-32 rounded-full bg-[#a87bc7]/20 blur-2xl"
          />
        </div>
      </div>
    </section>
  );
}
