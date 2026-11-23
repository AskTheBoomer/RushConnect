
const services = [
  {
    number: "01",
    name: "Packing & Unpacking",
    description:
      "Assistance with packing and unpacking household items for moves. Services include organizing belongings, carefully wrapping fragile items, labeling boxes, unpacking at the new location, and arranging items to make the moving process more efficient and manageable.",
  },
  {
    number: "02",
    name: "Laundry and Ironing",
    description:
      "In-home laundry services include sorting, stain treatment, washing, drying, folding, ironing, and putting clothing away. Additional assistance is available with seasonal clothing organization, sorting items for donation, and donation drop-offs. Laundry products are not provided due to individual client preferences. Minimum 2-hour service.",
  },
  {
    number: "03",
    name: "Cleaning",
    description:
      "Residential cleaning services include light and deep cleaning, move-in and move-out cleaning, and short-term rental (Airbnb) turnover services. Cleaning equipment and supplies include a power scrubber, vacuum, and upholstery/carpet cleaner to help provide thorough, detailed cleaning throughout the home.",
  },
  {
    number: "04",
    name: "Organization",
    description:
      "Not sure where or how to begin? With an efficient and motivating approach, assistance is available with home, garage, and storage clean-outs. Get help sorting belongings and deciding what to keep, donate, or remove, making it easier to create organized and comfortable spaces.",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-white py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#a4824e]">
            What Is Offered
          </p>

          <h2
            id="services-heading"
            className="text-3xl font-semibold leading-tight tracking-tight text-[#172b46] sm:text-4xl lg:text-5xl"
          >
            Cleaning solutions for{" "}
            <span className="block text-[#a4824e]">
              the spaces that matter.
            </span>
          </h2>

          <p className="mt-6 text-base leading-8 text-[#687386]">
            Explore personalized home services designed to make
            everyday living, cleaning, and organization easier.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.number}
              className="group flex flex-col rounded-2xl border border-[#e8e2d7] bg-[#faf8f3] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#a4824e]/40 hover:shadow-lg"
            >
              <span className="text-sm font-semibold tracking-wider text-[#a4824e]">
                {service.number}
              </span>

              <h3 className="mt-6 text-xl font-semibold leading-snug text-[#172b46]">
                {service.name}
              </h3>

              <p className="mt-4 flex-1 text-sm leading-7 text-[#687386]">
                {service.description}
              </p>

              <a
                href="#contact"
                className="mt-7 inline-flex items-center text-sm font-semibold text-[#172b46] transition-colors group-hover:text-[#a4824e]"
              >
                Make an inquiry
                <span
                  className="ml-2 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
