
import { createClient } from "@/lib/supabase/server";

export default async function ReviewsSection() {
  const supabase = await createClient();

  const { data: reviews, error } = await supabase
    .from("reviews")
    .select("name, rating, service, comment, owner_response")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  return (
    <section id="reviews" className="bg-[#f5f1f8] py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#7d52a3]">
            Customer Feedback
          </p>

          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-[#1d1b22] sm:text-4xl lg:text-5xl">
            Experiences that
            <span className="block text-[#7d52a3]">
              speak for themselves.
            </span>
          </h2>

          <p className="mt-6 text-base leading-8 text-[#5f5a66]">
            Customer feedback helps us understand what matters most
            and continually improve the cleaning experience.
          </p>
        </div>

        {error ? (
          <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-[#e9e4ee] bg-white px-6 py-12 text-center">
            <h3 className="text-lg font-semibold text-[#1d1b22]">
              Reviews are temporarily unavailable.
            </h3>
            <p className="mt-3 text-sm leading-7 text-[#5f5a66]">
              Please check back later for customer feedback.
            </p>
          </div>
        ) : reviews && reviews.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, index) => (
              <article
                key={`${review.name}-${index}`}
                className="flex flex-col rounded-2xl border border-[#e9e4ee] bg-white p-7 shadow-sm"
              >
                <div
                  className="flex gap-1 text-[#7d52a3]"
                  aria-label={`${review.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }, (_, starIndex) => (
                    <span key={starIndex} aria-hidden="true">
                      {starIndex < review.rating ? "★" : "☆"}
                    </span>
                  ))}
                </div>

                <blockquote className="mt-6 flex-1 text-sm leading-7 text-[#4a4552]">
                  “{review.comment}”
                </blockquote>

                <div className="mt-7 border-t border-[#e9e4ee] pt-5">
                  <p className="font-semibold text-[#1d1b22]">
                    {review.name}
                  </p>
                  {review.service && (
                    <p className="mt-1 text-xs text-[#7d52a3]">
                      {review.service}
                    </p>
                  )}
                </div>

                {review.owner_response && (
                  <div className="mt-5 rounded-xl bg-[#fcfbfd] p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#7d52a3]">
                      Business Response
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#5f5a66]">
                      {review.owner_response}
                    </p>
                  </div>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-[#e9e4ee] bg-white px-6 py-12 text-center">
            <div className="text-3xl text-[#a87bc7]" aria-hidden="true">
              ★★★★★
            </div>
            <h3 className="mt-5 text-xl font-semibold text-[#1d1b22]">
              Your feedback matters.
            </h3>
            <p className="mt-3 text-sm leading-7 text-[#5f5a66]">
              Verified customer reviews will appear here once they
              have been approved and published.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
