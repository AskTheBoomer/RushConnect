import { redirect } from "next/navigation";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Shared check for every owner portal page.
// - Not logged in: send to /login (second check after src/proxy.ts).
// - Logged in: returns a Supabase client plus `isAdmin`, which the page awaits
//   together with its own queries so the admin check doesn't add a separate wait.
//   Row level security already returns nothing to non-owners, and the page shows
//   <NotOwner /> when isAdmin is false.
export async function getOwner() {
  // Depends on who is logged in, so render per request (not prerendered).
  await connection();

  const supabase = await createClient();

  // Verified locally against the project's public signing key; no Auth server call.
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) {
    redirect("/login");
  }

  const isAdmin = supabase.rpc("is_admin").then(({ data: result }) => result === true);

  return { supabase, isAdmin, email: (data.claims.email as string | undefined) ?? "" };
}
