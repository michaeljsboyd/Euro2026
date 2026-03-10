create extension if not exists "pgcrypto";

create table if not exists trips (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  start_date date not null,
  end_date date not null,
  travelers int not null,
  notes text default '',
  created_at timestamptz not null default now()
);

create table if not exists days (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references trips(id) on delete cascade,
  city text not null,
  date date not null,
  notes text default ''
);

create type booking_status as enum ('Booked', 'Tentative', 'Need to Book');

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  day_id uuid not null references days(id) on delete cascade,
  title text not null,
  time text not null,
  city text not null,
  status booking_status not null default 'Need to Book',
  location text not null,
  notes text default ''
);

create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references trips(id) on delete cascade,
  city text not null,
  title text not null,
  type text not null,
  link text,
  file_name text,
  status booking_status not null default 'Need to Book',
  notes text default ''
);

create table if not exists places (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references trips(id) on delete cascade,
  city text not null,
  name text not null,
  type text not null,
  status booking_status not null default 'Need to Book',
  notes text default ''
);

create table if not exists budget_items (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references trips(id) on delete cascade,
  city text not null,
  category text not null,
  planned numeric(10,2) not null default 0,
  actual numeric(10,2) not null default 0,
  notes text default ''
);

create index if not exists idx_days_trip on days(trip_id);
create index if not exists idx_events_day on events(day_id);
create index if not exists idx_documents_trip on documents(trip_id);
create index if not exists idx_places_trip on places(trip_id);
create index if not exists idx_budget_trip on budget_items(trip_id);
