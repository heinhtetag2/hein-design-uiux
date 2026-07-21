-- ─────────────────────────────────────────────────────────────────────────────
-- FIX "Edit my card" — run this ONCE in the Supabase SQL Editor, top to bottom.
-- Paste the whole file and click "Run". Order matters.
--
-- What it does:
--   0. Removes leftover connectivity-test rows.
--   1. Removes duplicate cards left over from editing before the fix
--      (keeps the newest card per pass no.).
--   2. Adds the unique index the app's upsert needs (onConflict: "no").
--   3. Lets the anon key UPDATE a card, so editing updates in place.
-- ─────────────────────────────────────────────────────────────────────────────

-- 0. Remove connectivity-test rows left over from setup.
delete from public.visitors where name in ('__conn_test__', '__upsert_probe__');

-- 1. Dedupe: keep the newest row per pass no., delete the rest.
delete from public.visitors a
  using public.visitors b
  where a.no = b.no
    and a.created_at < b.created_at;

-- 2. Unique index on `no` — also the conflict target for the upsert.
create unique index if not exists visitors_no_key
  on public.visitors (no);

-- 3. Allow anon/authenticated to UPDATE (needed for "Edit my card").
drop policy if exists "public update visitors" on public.visitors;
create policy "public update visitors"
  on public.visitors for update
  to anon, authenticated
  using (true)
  with check (true);
