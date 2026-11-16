import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getOwner } from "@/lib/owner";
import { daysAgo, formatDate, stars } from "./format";
import { NotOwner } from "./not-owner";

export const metadata: Metadata = {
  title: "Owner portal | Rush Connect",
  robots: { index: false },
};

export default function DashboardPage() {
  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold">Dashboard</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <Dashboard />
      </Suspense>
    </>
  );
}

async function Dashboard() {
  const owner = await getOwner();
  if (!owner) return <NotOwner />;
  const { supabase, email } = owner;

  // Counts plus the newest items that need a reply or a decision (FR-04.2).
  const [newInquiries, pendingReviews, published, services, info] = await Promise.all([
    supabase
      .from("inquiries")
      .select("id, name, service, created_at", { count: "exact" })
      .eq("status", "new")
      .order("created_at", { ascending: false })
      .limit(3),
    supabase
      .from("reviews")
      .select("id, name, rating, comment, created_at", { count: "exact" })
      .eq("status", "pending")
      .order("created_at", { ascending: false })
      .limit(3),
    supabase.from("reviews").select("rating").eq("status", "published"),
    supabase.from("services").select("*", { count: "exact", head: true }),
    supabase.from("business_info").select("phone, email, updated_at").maybeSingle(),
  ]);

  const ratings = (published.data ?? []).map((review) => review.rating as number);
  const average = ratings.length
    ? (ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(1)
    : null;

  const cards = [
    { label: "New inquiries", value: newInquiries.count ?? 0, href: "/admin/inquiries?status=new" },
    { label: "Reviews waiting for approval", value: pendingReviews.count ?? 0, href: "/admin/reviews" },
    {
      label: average ? `Published reviews · ${average} ★ average` : "Published reviews",
      value: ratings.length,
      href: "/admin/reviews",
    },
    { label: "Services listed", value: services.count ?? 0, href: "/admin/content" },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-4 text-sm text-gray-600">Logged in as {email}</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <Link key={card.label} href={card.href} className="rounded border border-gray-200 p-4 hover:bg-gray-50">
              <p className="text-3xl font-semibold">{card.value}</p>
              <p className="text-sm text-gray-600">{card.label}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <h2 className="mb-3 text-lg font-semibold">New inquiries to answer</h2>
          {newInquiries.data?.length ? (
            <ul className="flex flex-col gap-2">
              {newInquiries.data.map((inquiry) => (
                <li key={inquiry.id} className="rounded border border-gray-200 p-3 text-sm">
                  <p className="font-semibold">{inquiry.name}</p>
                  <p className="text-gray-600">
                    {inquiry.service} · received {daysAgo(inquiry.created_at)}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-600">You&apos;re all caught up.</p>
          )}
          <Link href="/admin/inquiries" className="mt-2 inline-block text-sm underline">
            All inquiries
          </Link>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold">Reviews waiting for approval</h2>
          {pendingReviews.data?.length ? (
            <ul className="flex flex-col gap-2">
              {pendingReviews.data.map((review) => (
                <li key={review.id} className="rounded border border-gray-200 p-3 text-sm">
                  <p className="font-semibold">
                    {stars(review.rating)} · {review.name}
                  </p>
                  <p className="line-clamp-2 text-gray-600">{review.comment}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-600">No reviews waiting.</p>
          )}
          <Link href="/admin/reviews" className="mt-2 inline-block text-sm underline">
            All reviews
          </Link>
        </section>
      </div>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Contact details on the website</h2>
        {info.data ? (
          <p className="text-sm">
            {info.data.phone || "No phone"} · {info.data.email || "No email"}
            <span className="block text-gray-600">Last updated {formatDate(info.data.updated_at)}</span>
          </p>
        ) : (
          <p className="text-sm text-gray-600">No business information yet.</p>
        )}
        <Link href="/admin/content" className="mt-2 inline-block text-sm underline">
          All website content
        </Link>
      </section>
    </div>
  );
}
