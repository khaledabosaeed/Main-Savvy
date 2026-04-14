-- Run in Supabase SQL editor or via supabase db push
create table if not exists public.translations (
  locale text primary key check (locale in ('en', 'ar')),
  content jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.translations enable row level security;

-- Public read for marketing site (anon)
create policy "Allow public read translations"
  on public.translations
  for select
  to anon, authenticated
  using (true);

-- Authenticated users can update (admin signs in with Supabase Auth)
create policy "Allow authenticated update translations"
  on public.translations
  for update
  to authenticated
  using (true)
  with check (true);

create policy "Allow authenticated insert translations"
  on public.translations
  for insert
  to authenticated
  with check (true);

comment on table public.translations is 'Full locale JSON per language; seeded from public/locales/*.json';
