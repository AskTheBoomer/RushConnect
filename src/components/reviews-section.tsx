
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";

export default async function ReviewsSection() {
  await connection();

  const supabase = await createClient();

  const { data: reviews, error } = await supabase
    .from("reviews")
    .select("name, rating, service, comment, owner_response")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="bg-[#f4f0e7] py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#a4824e]">
            Customer Feedback
          </p>

          <h2
            id="reviews-heading"
            className="text-3xl font-semibold leading-tight tracking-tight text-[#172b46] sm:text-4xl lg:text-5xl"
          >
            Experiences that{" "}
            <span className="block text-[#a4824e]">
              speak for themselves.
            </span>
          </h2>

          <p className="mt-6 text-base leading-8 text-[#687386]">
            Customer feedback helps us understand what matters most
            and continually improve the quality of our services.
          </p>
        </div>

        {/* Database error state */}
        {error ? (
          <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-[#e8e2d7] bg-white px-6 py-12 text-center">
            <h3 className="text-lg font-semibold text-[#172b46]">
              Reviews are temporarily unavailable.
            </h3>

            <p className="mt-3 text-sm leading-7 text-[#687386]">
              Please check back later for customer feedback.
            </p>
          </div>
        ) : reviews && reviews.length > 0 ? (
          /* Published customer reviews */
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, index) => {
              const rating = Math.min(
                5,
                Math.max(0, Math.round(Number(review.rating) || 0))
              );

              return (
                <article
                  key={`${review.name}-${index}`}
                  className="flex flex-col rounded-2xl border border-[#e8e2d7] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  {/* Star rating */}
                  <div
                    role="img"
                    aria-label={`${rating} out of 5 stars`}
                    className="flex gap-1 text-[#a4824e]"
                  >
                    {Array.from({ length: 5 }, (_, starIndex) => (
                      <span key={starIndex} aria-hidden="true">
                        {starIndex < rating ? "★" : "☆"}
                      </span>
                    ))}
                  </div>

                  {/* Customer comment */}
                  <blockquote className="mt-6 flex-1 text-sm leading-7 text-[#526074]">
                    “{review.comment}”
                  </blockquote>

                  {/* Customer information */}
                  <div className="mt-7 border-t border-[#e8e2d7] pt-5">
                    <p className="font-semibold text-[#172b46]">
                      {review.name}
                    </p>

                    {review.service && (
                      <p className="mt-1 text-xs text-[#a4824e]">
                        {review.service}
                      </p>
                    )}
                  </div>

                  {/* Owner response */}
                  {review.owner_response && (
                    <div className="mt-5 rounded-xl bg-[#faf8f3] p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#a4824e]">
                        Business Response
                      </p>

                      <p className="mt-2 text-sm leading-6 text-[#687386]">
                        {review.owner_response}
                      </p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        ) : (
          /* Empty reviews state */
          <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-[#e8e2d7] bg-white px-6 py-12 text-center">
            <div
              className="text-3xl text-[#c5a46d]"
              aria-hidden="true"
            >
              ★★★★★
            </div>

            <h3 className="mt-5 text-xl font-semibold text-[#172b46]">
              Your feedback matters.
            </h3>

            <p className="mt-3 text-sm leading-7 text-[#687386]">
              Verified customer reviews will appear here once they
              have been approved and published.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
