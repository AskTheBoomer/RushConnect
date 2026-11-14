import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getOwner } from "@/lib/owner";
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

  // Counts the owner needs at a glance (FR-04.2).
  const [newInquiries, pendingReviews, publishedReviews, services] = await Promise.all([
    supabase.from("inquiries").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("reviews").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("reviews").select("*", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("services").select("*", { count: "exact", head: true }),
  ]);

  const cards = [
    { label: "New inquiries", value: newInquiries.count ?? 0, href: "/admin/inquiries" },
    { label: "Reviews waiting for approval", value: pendingReviews.count ?? 0, href: "/admin/reviews" },
    { label: "Published reviews", value: publishedReviews.count ?? 0, href: "/admin/reviews" },
    { label: "Services listed", value: services.count ?? 0, href: "/admin/content" },
  ];

  return (
    <>
      <p className="mb-6 text-sm text-gray-600">Logged in as {email}</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="rounded border border-gray-200 p-4 hover:bg-gray-50">
            <p className="text-3xl font-semibold">{card.value}</p>
            <p className="text-sm text-gray-600">{card.label}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
