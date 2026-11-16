import type { Metadata } from "next";
import { Suspense } from "react";
import { getOwner } from "@/lib/owner";
import { formatDate, stars } from "../format";
import { NotOwner } from "../not-owner";

export const metadata: Metadata = {
  title: "Reviews | Rush Connect",
  robots: { index: false },
};

type Review = {
  id: string;
  name: string;
  rating: number;
  service: string;
  comment: string;
  status: "pending" | "published" | "rejected";
  owner_response: string | null;
  created_at: string;
};

const groups = [
  { status: "pending", title: "Waiting for approval", actions: ["Publish", "Reject"] },
  { status: "published", title: "Published", actions: ["Respond", "Unpublish"] },
  { status: "rejected", title: "Rejected", actions: ["Publish", "Delete"] },
] as const;

export default function ReviewsPage() {
  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold">Reviews</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <ReviewQueue />
      </Suspense>
    </>
  );
}

async function ReviewQueue() {
  const owner = await getOwner();

  // All reviews, including pending and rejected ones the public can't see (FR-03.2).
  const { data } = await owner.supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });
  // Started in getOwner, so it ran at the same time as the queries above.
  if (!(await owner.isAdmin)) return <NotOwner />;
  const reviews = (data ?? []) as Review[];

  const published = reviews.filter((review) => review.status === "published");
  const average = published.length
    ? (published.reduce((sum, review) => sum + review.rating, 0) / published.length).toFixed(1)
    : null;

  return (
    <div className="flex flex-col gap-8">
      <p className="text-sm text-gray-600">
        {average
          ? `Customers see ${published.length} published review${published.length === 1 ? "" : "s"}, averaging ${average} out of 5 stars.`
          : "No reviews are published yet."}
      </p>
      {groups.map((group) => {
        const items = reviews.filter((review) => review.status === group.status);
        return (
          <section key={group.status}>
            <h2 className="mb-3 text-lg font-semibold">
              {group.title} ({items.length})
            </h2>
            {items.length === 0 ? (
              <p className="text-sm text-gray-600">None.</p>
            ) : (
              <ul className="flex flex-col gap-3">
                {items.map((review) => (
                  <li key={review.id} className="rounded border border-gray-200 p-4">
                    <p className="font-semibold">
                      {stars(review.rating)} · {review.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {review.service} · submitted {formatDate(review.created_at)}
                    </p>
                    <p className="mt-2">{review.comment}</p>
                    {review.owner_response && (
                      <p className="mt-2 rounded bg-gray-50 p-3 text-sm">
                        <span className="font-semibold">Your response:</span> {review.owner_response}
                      </p>
                    )}
                    <div className="mt-3 flex gap-2">
                      {group.actions.map((action) => (
                        <button
                          key={action}
                          disabled
                          className="rounded border border-gray-300 px-3 py-1 text-sm opacity-50"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}
