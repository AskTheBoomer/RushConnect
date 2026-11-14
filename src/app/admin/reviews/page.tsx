import type { Metadata } from "next";
import { Suspense } from "react";
import { getOwner } from "@/lib/owner";
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
  if (!owner) return <NotOwner />;

  // All reviews, including pending and rejected ones the public can't see (FR-03.2).
  const { data } = await owner.supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });
  const reviews = (data ?? []) as Review[];

  return (
    <div className="flex flex-col gap-8">
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
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)} · {review.name} · {review.service}
                    </p>
                    <p className="mt-1">{review.comment}</p>
                    {review.owner_response && (
                      <p className="mt-2 text-sm text-gray-600">Your response: {review.owner_response}</p>
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
