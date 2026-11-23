-- Rush Connect: rate limiting for the public forms (FR-02.6, NFR-06-4, TC-06).
-- Run in Supabase after 001: SQL Editor -> New query -> paste -> Run.
-- Safe to run more than once.
--
-- The server calls public.allow_submission() before saving an inquiry (and,
-- in Sprint 3, a review). It records one row per attempt and returns false
-- once a source has used up its limit, so the form can ask them to wait.
-- "source" is a SHA-256 hash of the visitor's IP address, never the raw IP
-- (NFR-09: collect only what is needed).

create table if not exists public.submission_log (
  id         bigint generated always as identity primary key,
  kind       text not null check (kind in ('inquiry', 'review')),
  source     text not null check (char_length(source) = 64),
  created_at timestamptz not null default now()
);

create index if not exists submission_log_lookup_idx
  on public.submission_log (kind, source, created_at desc);

-- Nobody reads or writes this table directly; only the function below does.
alter table public.submission_log enable row level security;
revoke all on public.submission_log from anon, authenticated;

-- true  = allowed (and the attempt is recorded)
-- false = over the limit: 3 submissions per 10 minutes per source and form
create or replace function public.allow_submission(p_kind text, p_source text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  recent integer;
begin
  if p_kind not in ('inquiry', 'review') or char_length(p_source) <> 64 then
    return false;
  end if;

  -- Old attempts are no longer needed; keep the table small.
  delete from public.submission_log where created_at < now() - interval '1 day';

  select count(*) into recent
  from public.submission_log
  where kind = p_kind
    and source = p_source
    and created_at > now() - interval '10 minutes';

  if recent >= 3 then
    return false;
  end if;

  insert into public.submission_log (kind, source) values (p_kind, p_source);
  return true;
end;
$$;

revoke all on function public.allow_submission(text, text) from public;
grant execute on function public.allow_submission(text, text) to anon, authenticated;
