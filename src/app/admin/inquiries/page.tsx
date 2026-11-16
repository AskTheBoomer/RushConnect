import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getOwner } from "@/lib/owner";
import { daysAgo, formatDate } from "../format";
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

const filters = ["all", "new", "contacted", "closed"] as const;
type Filter = (typeof filters)[number];

export default function InquiriesPage({ searchParams }: PageProps<"/admin/inquiries">) {
  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold">Inquiries</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <InquiryList searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function InquiryList({ searchParams }: { searchParams: PageProps<"/admin/inquiries">["searchParams"] }) {
  const owner = await getOwner();
  if (!owner) return <NotOwner />;

  const requested = (await searchParams).status;
  const filter: Filter = filters.includes(requested as Filter) ? (requested as Filter) : "all";

  // Newest first (FR-04.3). Only the owner can read this table.
  const { data } = await owner.supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });
  const all = (data ?? []) as Inquiry[];
  const inquiries = filter === "all" ? all : all.filter((inquiry) => inquiry.status === filter);

  const countFor = (f: Filter) => (f === "all" ? all.length : all.filter((i) => i.status === f).length);

  return (
    <>
      <nav aria-label="Filter inquiries" className="mb-6 flex flex-wrap gap-2 text-sm">
        {filters.map((f) => (
          <Link
            key={f}
            href={f === "all" ? "/admin/inquiries" : `/admin/inquiries?status=${f}`}
            aria-current={f === filter ? "page" : undefined}
            className={`rounded border px-3 py-1 capitalize ${
              f === filter ? "border-gray-900 bg-gray-900 text-white" : "border-gray-300 hover:bg-gray-50"
            }`}
          >
            {f} ({countFor(f)})
          </Link>
        ))}
      </nav>

      {inquiries.length === 0 ? (
        <p>{filter === "all" ? "No inquiries yet." : `No ${filter} inquiries.`}</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {inquiries.map((inquiry) => (
            <li key={inquiry.id} className="rounded border border-gray-200 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold">{inquiry.name}</p>
                <StatusBadge status={inquiry.status} />
              </div>
              <p className="text-sm text-gray-600">
                Received {formatDate(inquiry.created_at)} ({daysAgo(inquiry.created_at)})
              </p>

              <dl className="mt-3 grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 text-sm">
                <dt className="text-gray-600">Interested in</dt>
                <dd>{inquiry.service}</dd>
                <dt className="text-gray-600">Email</dt>
                <dd>
                  <a href={`mailto:${inquiry.email}`} className="underline">
                    {inquiry.email}
                  </a>
                </dd>
                <dt className="text-gray-600">Phone</dt>
                <dd>
                  {inquiry.phone ? (
                    <a href={`tel:${inquiry.phone.replace(/[^\d+]/g, "")}`} className="underline">
                      {inquiry.phone}
                    </a>
                  ) : (
                    <span className="text-gray-600">Not given</span>
                  )}
                </dd>
              </dl>

              <p className="mt-3 whitespace-pre-line rounded bg-gray-50 p-3 text-sm">{inquiry.message}</p>
              {inquiry.notes && (
                <p className="mt-2 text-sm">
                  <span className="font-semibold">Your notes:</span> {inquiry.notes}
                </p>
              )}

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
      )}
    </>
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
