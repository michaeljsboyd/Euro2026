# Europe 2026

A private family trip planner built with **Next.js + Tailwind CSS + Supabase**.

## Features (v1)
- Dashboard with trip summary by city and date
- Itinerary page with day-by-day events
- Bookings/Documents page with links, notes, and file metadata
- Saved Places page grouped by city and type (restaurant, beach club, bar, activity)
- Budget tracker with planned vs actual spend
- Status tags: **Booked**, **Tentative**, **Need to Book**
- Notes field across every entity

## Stack
- Next.js 14 (App Router, TypeScript)
- Tailwind CSS 3
- Supabase (Postgres + Storage-ready schema)

## Quick start
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create env file:
   ```bash
   cp .env.example .env.local
   ```
3. Fill in your Supabase credentials in `.env.local`.
4. Start development server:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:3000`.

## Supabase setup
Run SQL in Supabase SQL editor:

1. `supabase/schema.sql` (creates tables/types/indexes)
2. `supabase/seed.sql` (seeds sample data for Paris, Cap Ferrat, Ibiza, Sicily, Rome)

## Data entities
- `trips`
- `days`
- `events`
- `documents`
- `places`
- `budget_items`

## App routes
- `/` — Dashboard
- `/itinerary` — Day/event planning
- `/bookings` — Bookings & documents
- `/places` — Saved places by city/type
- `/budget` — Budget tracker

## Notes
- Current UI uses seeded sample data in `src/lib/sampleData.ts` for quick local preview.
- Supabase client is configured in `src/lib/supabase.ts`; connect page-level data fetching when ready.
- For file uploads, use a Supabase Storage bucket and store metadata in `documents.file_name` + `documents.link`.
