create extension if not exists "pgcrypto";

do $$
begin
  if not exists (select 1 from pg_type where typname = 'booking_status') then
    create type booking_status as enum ('booked', 'tentative', 'tbc');
  end if;

  if not exists (select 1 from pg_type where typname = 'day_section') then
    create type day_section as enum ('Morning', 'Afternoon', 'Evening');
  end if;

  if not exists (select 1 from pg_type where typname = 'event_type') then
    create type event_type as enum ('Travel', 'Stay', 'Meal', 'Activity', 'Nightlife', 'Beach');
  end if;

  if not exists (select 1 from pg_type where typname = 'booking_type') then
    create type booking_type as enum ('hotel', 'restaurant', 'flight', 'activity');
  end if;

  if not exists (select 1 from pg_type where typname = 'place_type') then
    create type place_type as enum ('Restaurant', 'Beach Club', 'Bar', 'Activity');
  end if;

  if not exists (select 1 from pg_type where typname = 'budget_category') then
    create type budget_category as enum ('Flights', 'Hotels', 'Dining', 'Transport', 'Activities', 'Nightlife', 'Misc');
  end if;
end $$;

create table if not exists trips (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  start_date date not null,
  end_date date not null,
  cities text[] not null default '{}',
  currency text not null default 'EUR',
  notes text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists days (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references trips(id) on delete cascade,
  date date not null,
  city text not null,
  title text not null,
  accommodation text not null default '',
  status booking_status not null default 'tentative',
  notes text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  day_id uuid not null references days(id) on delete cascade,
  city text not null,
  title text not null,
  section day_section not null default 'Afternoon',
  type event_type not null,
  start_time time,
  end_time time,
  location text not null default '',
  status booking_status not null default 'tentative',
  estimated_cost numeric(10, 2) not null default 0,
  notes text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references trips(id) on delete cascade,
  type booking_type not null,
  city text not null,
  title text not null,
  date date not null,
  confirmation_number text not null default '',
  status booking_status not null default 'tentative',
  notes text not null default '',
  file_url text,
  created_at timestamptz not null default now()
);

create table if not exists places (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references trips(id) on delete cascade,
  city text not null,
  name text not null,
  type place_type not null,
  status booking_status not null default 'tentative',
  link text,
  notes text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists budget_items (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references trips(id) on delete cascade,
  city text,
  category budget_category not null,
  title text not null,
  status booking_status not null default 'tentative',
  estimated_amount numeric(10, 2) not null default 0,
  paid_amount numeric(10, 2) not null default 0,
  notes text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists idx_days_trip_date on days(trip_id, date);
create index if not exists idx_events_day_time on events(day_id, start_time);
create index if not exists idx_bookings_trip_city on bookings(trip_id, city);
create index if not exists idx_places_trip_city_type on places(trip_id, city, type);
create index if not exists idx_budget_trip_category on budget_items(trip_id, category);

insert into storage.buckets (id, name, public)
values ('trip-documents', 'trip-documents', false)
on conflict (id) do nothing;
