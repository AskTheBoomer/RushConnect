// Checks the database access rules as an anonymous visitor (TC-07, NFR-06-2).
// Uses only the public key from .env.local, the same key the website uses.
//
//   npm run check:access
//
// Every line should say PASS. Run it again whenever the access rules change.

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error("Missing Supabase values. Copy .env.example to .env.local and fill it in.");
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });
let failures = 0;

function report(ok, label, detail) {
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? ` (${detail})` : ""}`);
}

// Rows a visitor can see. A permission error counts as 0 rows, since the
// visitor is blocked from the table entirely.
async function count(table, filter) {
  let query = supabase.from(table).select("*", { count: "exact", head: true });
  if (filter) query = filter(query);
  const { count: n, error, status } = await query;
  if (error && (status === 401 || status === 403)) return 0;
  if (error) throw new Error(`${table}: ${error.message || `HTTP ${status}`}`);
  if (n === null) {
    throw new Error(
      `${table}: no response (HTTP ${status}). Check that NEXT_PUBLIC_SUPABASE_URL ` +
        "is just https://<project>.supabase.co with nothing after it.",
    );
  }
  return n;
}

try {
  // Public content should be readable.
  for (const table of ["services", "business_info", "page_content", "photos"]) {
    const n = await count(table);
    report(n > 0, `visitor can read ${table}`, `${n} rows`);
  }

  // Only published reviews should be visible.
  const published = await count("reviews", (q) => q.eq("status", "published"));
  const hidden = await count("reviews", (q) => q.neq("status", "published"));
  report(published > 0, "visitor can read published reviews", `${published} rows`);
  report(hidden === 0, "visitor cannot read pending or rejected reviews", `${hidden} rows`);

  // Inquiries must never be readable by the public.
  const inquiries = await count("inquiries");
  report(inquiries === 0, "visitor cannot read inquiries", `${inquiries} rows`);

  // The admin list must not be readable either.
  const admins = await count("admins");
  report(admins === 0, "visitor cannot read admins", `${admins} rows`);

  // Visitors must not be able to change content.
  const { data: changed } = await supabase
    .from("services")
    .update({ name: "Hacked" })
    .neq("name", "")
    .select();
  report((changed ?? []).length === 0, "visitor cannot edit services");

  // A visitor cannot sneak in a review that is already published.
  const { error: reviewError } = await supabase.from("reviews").insert({
    name: "Access check",
    rating: 5,
    comment: "This should be rejected by the access rules.",
    status: "published",
  });
  report(Boolean(reviewError), "visitor cannot submit a pre-published review");
} catch (err) {
  console.error(`Error: ${err.message}`);
  process.exit(1);
}

console.log(failures === 0 ? "\nAll access checks passed." : `\n${failures} check(s) failed.`);
process.exit(failures === 0 ? 0 : 1);
