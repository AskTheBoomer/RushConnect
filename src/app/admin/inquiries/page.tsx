import type { Metadata } from "next";
import { Suspense } from "react";
import { getOwner } from "@/lib/owner";
import { NotOwner } from "../not-owner";

export const metadata: Metadata = {
  title: "Inquiries | Rush Connect",
  robots: { index: false },
};

type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string;
  message: string;
  status: "new" | "contacted" | "closed";
  notes: string;
  created_at: string;
};

export default function InquiriesPage() {
  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold">Inquiries</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <InquiryList />
      </Suspense>
    </>
  );
}

async function InquiryList() {
  const owner = await getOwner();
  if (!owner) return <NotOwner />;

  // Newest first (FR-04.3). Only the owner can read this table.
  const { data } = await owner.supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });
  const inquiries = (data ?? []) as Inquiry[];

  if (inquiries.length === 0) return <p>No inquiries yet.</p>;

  return (
    <ul className="flex flex-col gap-4">
      {inquiries.map((inquiry) => (
        <li key={inquiry.id} className="rounded border border-gray-200 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-semibold">
              {inquiry.name} · {inquiry.service}
            </p>
            <StatusBadge status={inquiry.status} />
          </div>
          <p className="text-sm text-gray-600">
            {inquiry.email}
            {inquiry.phone ? ` · ${inquiry.phone}` : ""} ·{" "}
            {new Date(inquiry.created_at).toLocaleDateString("en-US")}
          </p>
          <p className="mt-2">{inquiry.message}</p>
          {inquiry.notes && <p className="mt-2 text-sm text-gray-600">Notes: {inquiry.notes}</p>}
          <div className="mt-3 flex gap-2">
            <button disabled className="rounded border border-gray-300 px-3 py-1 text-sm opacity-50">
              Mark contacted
            </button>
            <button disabled className="rounded border border-gray-300 px-3 py-1 text-sm opacity-50">
              Add note
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

function StatusBadge({ status }: { status: Inquiry["status"] }) {
  const styles = {
    new: "bg-blue-100 text-blue-900",
    contacted: "bg-amber-100 text-amber-900",
    closed: "bg-gray-100 text-gray-700",
  };
  return <span className={`rounded px-2 py-0.5 text-xs capitalize ${styles[status]}`}>{status}</span>;
}
