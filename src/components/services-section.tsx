
import { createClient } from "@/lib/supabase/server";

export default async function ServicesSection() {
  const supabase = await createClient();

  const { data: services, error } = await supabase
    .from("services")
    .select("name, description, highlights")
    .order("sort_order", { ascending: true });

  return (
    <section id="services" className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#a4824e]">
            What We Offer
          </p>

          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-[#172b46] sm:text-4xl lg:text-5xl">
            Cleaning solutions for
            <span className="block text-[#a4824e]">
              the spaces that matter.
            </span>
          </h2>

          <p className="mt-6 text-base leading-8 text-[#687386]">
            Explore the cleaning service options available through
            Evelyn Rush Solutions.
          </p>
        </div>

        <div className="mt-12 border border-[#e8e2d7] bg-[#faf8f3] px-5 py-4 text-center sm:px-8">
          <p className="text-sm leading-6 text-[#687386]">
            <span className="font-semibold text-[#172b46]">
              Prototype notice:
            </span>{" "}
            Service descriptions and details displayed here are sample
            content and must be confirmed by Evelyn Rush Solutions
            before the website goes live.
          </p>
        </div>

        {error ? (
          <div className="mt-12 rounded-2xl border border-[#e8e2d7] bg-[#faf8f3] px-6 py-12 text-center">
            <h3 className="text-lg font-semibold text-[#172b46]">
              Services are temporarily unavailable.
            </h3>
            <p className="mt-3 text-sm leading-7 text-[#687386]">
              Please check back later for available service information.
            </p>
          </div>
        ) : services && services.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <article
                key={`${service.name}-${index}`}
                className="group flex flex-col rounded-2xl border border-[#e8e2d7] bg-[#faf8f3] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#c5a46d] hover:shadow-lg"
              >
                <span className="text-3xl font-light text-[#c5a46d]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-7 text-xl font-semibold text-[#172b46]">
                  {service.name}
                </h3>

                <p className="mt-4 flex-1 text-sm leading-7 text-[#687386]">
                  {service.description}
                </p>

                {service.highlights &&
                  service.highlights.length > 0 && (
                    <ul className="mt-6 space-y-3 border-t border-[#e8e2d7] pt-5">
                      {service.highlights.map((highlight: string, highlightIndex: number) => (
                        <li
                          key={highlightIndex}
                          className="flex items-start gap-3 text-sm text-[#526074]"
                        >
                          <span className="mt-1 text-[#a4824e]">✓</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                <a
                  href="#contact"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#172b46] transition-colors group-hover:text-[#a4824e]"
                >
                  Make an inquiry
                  <span aria-hidden="true">→</span>
                </a>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-[#e8e2d7] bg-[#faf8f3] px-6 py-12 text-center">
            <h3 className="text-lg font-semibold text-[#172b46]">
              Service information is coming soon.
            </h3>
            <p className="mt-3 text-sm leading-7 text-[#687386]">
              Please contact us for more information about available
              cleaning services.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
