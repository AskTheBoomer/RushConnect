-- Rush Connect: initial database schema and access rules
-- Run in Supabase: SQL Editor -> New query -> paste -> Run.
-- Safe to run more than once.
--
-- Access rules (NFR-06-2, TC-07):
--   * Visitors (the "anon" role) can read services, business info, page
--     content, photos, and PUBLISHED reviews only.
--   * Visitors can submit an inquiry or a review, but can never read
--     inquiries or pending/rejected reviews.
--   * Only the owner (a user listed in public.admins) can change anything.
--     Being logged in is not enough on its own.

-- =====================================================================
-- admins: who counts as the owner
-- =====================================================================
create table if not exists public.admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

-- true when the logged-in user is in public.admins
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- =====================================================================
-- business_info: one row with contact details (FR-01.4, FR-05.2)
-- =====================================================================
create table if not exists public.business_info (
  id            smallint primary key default 1 check (id = 1),
  name          text not null,
  tagline       text not null default '',
  owner_name    text not null default '',
  phone         text not null default '',
  email         text not null default '',
  hours         text not null default '',
  service_areas text[] not null default '{}',
  instagram_url text not null default '',
  updated_at    timestamptz not null default now()
);

-- =====================================================================
-- page_content: editable Homepage and About Us text (FR-05.4)
-- =====================================================================
create table if not exists public.page_content (
  page       text not null check (page in ('home', 'about')),
  section    text not null check (char_length(section) between 1 and 50),
  body       text not null default '' check (char_length(body) <= 5000),
  sort_order integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (page, section)
);

-- =====================================================================
-- services: cleaning services (FR-01.3, FR-05.1)
-- =====================================================================
create table if not exists public.services (
  id          uuid primary key default gen_random_uuid(),
  name        text not null check (char_length(name) between 1 and 100),
  description text not null check (char_length(description) between 1 and 1000),
  highlights  text[] not null default '{}',
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- =====================================================================
-- inquiries: contact form submissions (FR-02.3, FR-04.3)
-- =====================================================================
create table if not exists public.inquiries (
  id         uuid primary key default gen_random_uuid(),
  name       text not null check (char_length(name) between 1 and 100),
  email      text not null check (char_length(email) between 3 and 254 and email like '%_@_%._%'),
  phone      text check (char_length(phone) <= 30),
  service    text not null default 'Not specified' check (char_length(service) <= 100),
  message    text not null check (char_length(message) between 1 and 5000),
  status     text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  notes      text not null default '' check (char_length(notes) <= 5000),
  created_at timestamptz not null default now()
);
create index if not exists inquiries_created_idx on public.inquiries (created_at desc);

-- =====================================================================
-- reviews: customer reviews with moderation (FR-03.1 - FR-03.5)
-- =====================================================================
create table if not exists public.reviews (
  id             uuid primary key default gen_random_uuid(),
  name           text not null check (char_length(name) between 1 and 100),
  rating         smallint not null check (rating between 1 and 5),
  service        text not null default 'Not specified' check (char_length(service) <= 100),
  comment        text not null check (char_length(comment) between 10 and 2000),
  status         text not null default 'pending' check (status in ('pending', 'published', 'rejected')),
  owner_response text check (char_length(owner_response) <= 2000),
  created_at     timestamptz not null default now()
);
create index if not exists reviews_status_created_idx on public.reviews (status, created_at desc);

-- =====================================================================
-- photos: before-and-after gallery (FR-01.5, FR-05.3)
-- before_path / after_path point to files in the "photos" storage bucket.
-- =====================================================================
create table if not exists public.photos (
  id          uuid primary key default gen_random_uuid(),
  title       text not null check (char_length(title) between 1 and 100),
  service     text not null default '',
  before_path text,
  after_path  text,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

-- =====================================================================
-- Permissions. Grants say which tables a role may touch at all;
-- the row level security (RLS) policies below decide which rows.
-- =====================================================================
grant usage on schema public to anon, authenticated;
grant select on public.business_info, public.page_content, public.services,
                public.reviews, public.photos to anon, authenticated;
grant insert on public.inquiries, public.reviews to anon, authenticated;
grant select, insert, update, delete on all tables in schema public to authenticated;
grant execute on function public.is_admin() to anon, authenticated;

alter table public.admins        enable row level security;
alter table public.business_info enable row level security;
alter table public.page_content  enable row level security;
alter table public.services      enable row level security;
alter table public.inquiries     enable row level security;
alter table public.reviews       enable row level security;
alter table public.photos        enable row level security;

-- admins: a logged-in user can only see their own row.
-- New admins are added from the SQL Editor, never from the website.
drop policy if exists "read own admin row" on public.admins;
create policy "read own admin row" on public.admins
  for select to authenticated using (user_id = auth.uid());

-- Public content: everyone reads, only the owner changes.
drop policy if exists "public read business info" on public.business_info;
create policy "public read business info" on public.business_info
  for select to anon, authenticated using (true);
drop policy if exists "owner edits business info" on public.business_info;
create policy "owner edits business info" on public.business_info
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public read page content" on public.page_content;
create policy "public read page content" on public.page_content
  for select to anon, authenticated using (true);
drop policy if exists "owner manages page content" on public.page_content;
create policy "owner manages page content" on public.page_content
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public read services" on public.services;
create policy "public read services" on public.services
  for select to anon, authenticated using (true);
drop policy if exists "owner manages services" on public.services;
create policy "owner manages services" on public.services
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public read photos" on public.photos;
create policy "public read photos" on public.photos
  for select to anon, authenticated using (true);
drop policy if exists "owner manages photos" on public.photos;
create policy "owner manages photos" on public.photos
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Inquiries: anyone can submit a new one; only the owner can read or manage.
drop policy if exists "public submits inquiry" on public.inquiries;
create policy "public submits inquiry" on public.inquiries
  for insert to anon, authenticated with check (status = 'new' and notes = '');
drop policy if exists "owner reads inquiries" on public.inquiries;
create policy "owner reads inquiries" on public.inquiries
  for select to authenticated using (public.is_admin());
drop policy if exists "owner updates inquiries" on public.inquiries;
create policy "owner updates inquiries" on public.inquiries
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "owner deletes inquiries" on public.inquiries;
create policy "owner deletes inquiries" on public.inquiries
  for delete to authenticated using (public.is_admin());

-- Reviews: the public sees published reviews only and can submit a pending
-- one with no owner response. The owner sees and manages all of them.
drop policy if exists "public reads published reviews" on public.reviews;
create policy "public reads published reviews" on public.reviews
  for select to anon, authenticated using (status = 'published' or public.is_admin());
drop policy if exists "public submits pending review" on public.reviews;
create policy "public submits pending review" on public.reviews
  for insert to anon, authenticated with check (status = 'pending' and owner_response is null);
drop policy if exists "owner updates reviews" on public.reviews;
create policy "owner updates reviews" on public.reviews
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "owner deletes reviews" on public.reviews;
create policy "owner deletes reviews" on public.reviews
  for delete to authenticated using (public.is_admin());

-- =====================================================================
-- Storage: public "photos" bucket; only the owner uploads or deletes.
-- =====================================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('photos', 'photos', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

drop policy if exists "owner uploads photos" on storage.objects;
create policy "owner uploads photos" on storage.objects
  for insert to authenticated with check (bucket_id = 'photos' and public.is_admin());
drop policy if exists "owner updates photos" on storage.objects;
create policy "owner updates photos" on storage.objects
  for update to authenticated using (bucket_id = 'photos' and public.is_admin());
drop policy if exists "owner deletes photos" on storage.objects;
create policy "owner deletes photos" on storage.objects
  for delete to authenticated using (bucket_id = 'photos' and public.is_admin());
