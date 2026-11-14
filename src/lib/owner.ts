import { redirect } from "next/navigation";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Shared check for every owner portal page.
// - Not logged in: send to /login (second check after src/proxy.ts).
// - Logged in but not in the admins table: returns null, so the page shows no data.
// - Owner: returns a Supabase client that row level security lets read everything.
export async function getOwner() {
  // Depends on who is logged in, so render per request (not prerendered).
  await connection();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (!isAdmin) {
    return null;
  }

  return { supabase, email: user.email ?? "" };
}
