import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { logout } from "../login/actions";

export const metadata: Metadata = {
  title: "Owner portal | Rush Connect",
  robots: { index: false },
};

// Placeholder portal for Sprint 1. It proves the login gate works:
// logged-out visitors never reach this page, and only the owner sees data.
// The real dashboard is built in Sprint 3.
export default function AdminPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col gap-6 px-4 py-16">
      <h1 className="text-2xl font-semibold">Owner portal</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <OwnerStatus />
      </Suspense>
    </main>
  );
}

async function OwnerStatus() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Second check on the server, in case the proxy was skipped.
  if (!user) {
    redirect("/login");
  }

  const { data: isAdmin } = await supabase.rpc("is_admin");

  if (!isAdmin) {
    return (
      <section className="flex flex-col gap-4">
        <p>
          You are logged in as {user.email}, but this account is not the owner account, so it
          can&apos;t see portal data.
        </p>
        <LogoutButton />
      </section>
    );
  }

  // The access rules only let the owner read inquiries and pending reviews,
  // so these counts also confirm the owner's access works (FR-04.2).
  const [inquiries, reviews] = await Promise.all([
    supabase.from("inquiries").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("reviews").select("*", { count: "exact", head: true }).eq("status", "pending"),
  ]);

  return (
    <section className="flex flex-col gap-4">
      <p>Logged in as {user.email}.</p>
      <ul className="list-disc pl-5">
        <li>New inquiries: {inquiries.count ?? 0}</li>
        <li>Reviews waiting for approval: {reviews.count ?? 0}</li>
      </ul>
      <LogoutButton />
    </section>
  );
}

function LogoutButton() {
  return (
    <form action={logout}>
      <button type="submit" className="rounded border border-gray-300 px-4 py-2">
        Log out
      </button>
    </form>
  );
}
