# Europe 2026

Private Next.js + Tailwind + Supabase trip planner for a family Europe holiday.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase (Postgres + optional Storage bucket for uploaded trip documents)

## Included in v1

- Dashboard with trip summary by city and date
- Itinerary page with daily events
- Bookings / documents page with links, file-path references, payment info, and notes
- Saved places page grouped by city and type
- Simple budget tracker
- Seeded sample data for Paris, Cap Ferrat, Ibiza, Sicily, and Rome
- Status tags across the app: `Booked`, `Tentative`, `Need to Book`

## Project structure

- `app/`: Next.js routes and page layouts
- `components/`: shared UI pieces
- `lib/`: types, formatting, sample data, Supabase query layer
- `supabase/schema.sql`: database schema
- `supabase/seed.sql`: sample seed data

## Local setup

1. Install Node.js 20+.
2. Install dependencies:

```bash
npm install
```

3. Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

4. Start the app:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000).

## Supabase setup

1. Create a new Supabase project.
2. In the SQL editor, run `supabase/schema.sql`.
3. Run `supabase/seed.sql`.
4. Add the environment variables to `.env.local`.

## Data flow

- If Supabase environment variables are present, the app reads from Supabase.
- If they are missing, the app falls back to the local sample dataset in `lib/sample-data.ts`.

This makes it easy to start designing immediately, then switch to live data later.

## Notes about uploads

- The schema creates a private storage bucket named `trip-documents`.
- The v1 UI stores and displays `file_path` references.
- Actual file upload forms and auth policies can be added next once you decide how you want family/admin access handled.

## Suggested next steps

- Add Supabase Auth so the planner is actually private in production
- Add CRUD forms for editing trips, days, events, documents, places, and budget items
- Add direct file upload and preview support for travel PDFs and confirmations
- Add filters by city, status, and date

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
