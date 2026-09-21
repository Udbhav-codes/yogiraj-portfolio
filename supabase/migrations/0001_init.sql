-- Run this once in your own Supabase project's SQL Editor after you create it.
-- Nothing here is applied automatically — this file just documents the schema
-- the admin dashboard (/studio/dashboard) reads and writes.

create extension if not exists pgcrypto;

-- ── profile: singleton row (id is always 1) ─────────────────────────────────
create table if not exists profile (
  id int primary key default 1,
  name text not null,
  title text not null,
  location text not null,
  email text not null,
  phone text not null,
  address text not null,
  tagline text not null,
  sub_tagline text not null,
  bio text not null,
  expertise text[] not null default '{}',
  tools text[] not null default '{}',
  constraint profile_single_row check (id = 1)
);

-- ── gallery_images ───────────────────────────────────────────────────────────
create table if not exists gallery_images (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  image_url text not null,
  camera text,
  lens text,
  location text,
  year text,
  width int not null default 4,
  height int not null default 5,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ── films ────────────────────────────────────────────────────────────────────
create table if not exists films (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  year text,
  duration text,
  award text,
  client text,
  description text,
  thumb_url text not null,
  video_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ── projects ─────────────────────────────────────────────────────────────────
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  client text,
  category text,
  year text,
  cover_url text not null,
  challenge text,
  process text,
  result text,
  gallery_urls text[] not null default '{}',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ── services ─────────────────────────────────────────────────────────────────
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  deliverables text,
  timeline text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ── equipment_groups (BTS "The Kit") ────────────────────────────────────────
create table if not exists equipment_groups (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  items text[] not null default '{}',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ── row level security: public can read, only signed-in users can write ────
alter table profile enable row level security;
alter table gallery_images enable row level security;
alter table films enable row level security;
alter table projects enable row level security;
alter table services enable row level security;
alter table equipment_groups enable row level security;

create policy "public read profile" on profile for select using (true);
create policy "public read gallery" on gallery_images for select using (true);
create policy "public read films" on films for select using (true);
create policy "public read projects" on projects for select using (true);
create policy "public read services" on services for select using (true);
create policy "public read equipment" on equipment_groups for select using (true);

create policy "admin write profile" on profile for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write gallery" on gallery_images for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write films" on films for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write projects" on projects for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write services" on services for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write equipment" on equipment_groups for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ── storage: public "media" bucket for uploaded images ──────────────────────
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "public read media" on storage.objects for select
  using (bucket_id = 'media');
create policy "admin upload media" on storage.objects for insert
  with check (bucket_id = 'media' and auth.role() = 'authenticated');
create policy "admin update media" on storage.objects for update
  using (bucket_id = 'media' and auth.role() = 'authenticated');
create policy "admin delete media" on storage.objects for delete
  using (bucket_id = 'media' and auth.role() = 'authenticated');

-- ── seed profile row with the site's current copy (safe to edit afterward) ─
insert into profile (id, name, title, location, email, phone, address, tagline, sub_tagline, bio, expertise, tools)
values (
  1,
  'Yogiraj Somavanshi',
  'Cinematographer / Photographer / Editor',
  'Pune, India',
  'yogiraj24.somavanshi@gmail.com',
  '+91 96071 15677',
  '39/B UMEY, Anurekha Society, Karve Nagar, Pune-411052',
  'Capturing Stories Beyond Frames.',
  'Photography is frozen emotion. Cinema is moving memory. Every frame tells a story.',
  'A passionate cinematographer and video editor with a deep love for storytelling and visual artistry. Five years in the industry — 2.5 of them professional — blending technical command of camera and lighting with strong visual storytelling. Worked across films, documentaries and commercial projects; available for freelance and full-time work.',
  array['Cinematography', 'Direction', 'Photography', 'Video Editing', 'Graphic Designing'],
  array['Adobe Premiere Pro', 'Photoshop', 'After Effects']
)
on conflict (id) do nothing;
