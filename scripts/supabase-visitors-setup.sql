-- Visitor Gallery — Supabase setup
-- Paste this whole file into your Supabase project's SQL Editor and click "Run".
-- It creates the `visitors` table and the row-level-security policies that let
-- anonymous visitors (the site's anon key) add and read cards.

create table if not exists public.visitors (
  id         bigint generated always as identity primary key,
  name       text        not null,
  color      text        not null,
  no         text        not null,
  issued_at  text        not null,
  role       text,
  created_at timestamptz not null default now()
);

-- Newest-first reads are the common query — index for it.
create index if not exists visitors_created_at_idx
  on public.visitors (created_at desc);

-- Turn on row-level security, then explicitly allow the two things the site needs.
alter table public.visitors enable row level security;

-- Anyone (anon key) can READ the gallery.
drop policy if exists "public read visitors" on public.visitors;
create policy "public read visitors"
  on public.visitors for select
  to anon, authenticated
  using (true);

-- Anyone (anon key) can ADD their own card.
drop policy if exists "public insert visitors" on public.visitors;
create policy "public insert visitors"
  on public.visitors for insert
  to anon, authenticated
  with check (true);
