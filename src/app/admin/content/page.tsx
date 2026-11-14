import type { Metadata } from "next";
import { Suspense } from "react";
import { getOwner } from "@/lib/owner";
import { NotOwner } from "../not-owner";

export const metadata: Metadata = {
  title: "Content | Rush Connect",
  robots: { index: false },
};

type BusinessInfo = {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  hours: string;
  service_areas: string[];
};
type Service = { id: string; name: string; description: string; highlights: string[] };
type PageText = { page: string; section: string; body: string };

export default function ContentPage() {
  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold">Website content</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <ContentOverview />
      </Suspense>
    </>
  );
}

async function ContentOverview() {
  const owner = await getOwner();
  if (!owner) return <NotOwner />;
  const { supabase } = owner;

  // Everything the owner will be able to edit without code changes (FR-05).
  const [info, services, pageText] = await Promise.all([
    supabase.from("business_info").select("*").single(),
    supabase.from("services").select("*").order("sort_order"),
    supabase.from("page_content").select("*").order("page").order("sort_order"),
  ]);
  const business = info.data as BusinessInfo | null;

  return (
    <div className="flex flex-col gap-8">
      <section>
        <SectionHeader title="Business information" action="Edit info" />
        {business ? (
          <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 text-sm">
            <dt className="text-gray-600">Name</dt>
            <dd>{business.name}</dd>
            <dt className="text-gray-600">Tagline</dt>
            <dd>{business.tagline}</dd>
            <dt className="text-gray-600">Phone</dt>
            <dd>{business.phone}</dd>
            <dt className="text-gray-600">Email</dt>
            <dd>{business.email}</dd>
            <dt className="text-gray-600">Hours</dt>
            <dd>{business.hours}</dd>
            <dt className="text-gray-600">Service areas</dt>
            <dd>{business.service_areas.join(", ")}</dd>
          </dl>
        ) : (
          <p className="text-sm text-gray-600">No business information yet.</p>
        )}
      </section>

      <section>
        <SectionHeader title="Services" action="Add service" />
        <ul className="flex flex-col gap-3">
          {((services.data ?? []) as Service[]).map((service) => (
            <li key={service.id} className="rounded border border-gray-200 p-4">
              <p className="font-semibold">{service.name}</p>
              <p className="text-sm">{service.description}</p>
              <ul className="mt-1 list-disc pl-5 text-sm text-gray-600">
                {service.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionHeader title="Page text" action="Edit text" />
        <ul className="flex flex-col gap-3">
          {((pageText.data ?? []) as PageText[]).map((text) => (
            <li key={`${text.page}-${text.section}`} className="rounded border border-gray-200 p-4">
              <p className="text-sm font-semibold capitalize">
                {text.page} page · {text.section}
              </p>
              <p className="text-sm">{text.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function SectionHeader({ title, action }: { title: string; action: string }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-lg font-semibold">{title}</h2>
      <button disabled className="rounded border border-gray-300 px-3 py-1 text-sm opacity-50">
        {action}
      </button>
    </div>
  );
}
