import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { TimelineDay } from "@/components/timeline-day";
import { unslugifyCity } from "@/lib/format";
import { getPlannerData } from "@/lib/supabase/queries";

interface ItineraryPageProps {
  searchParams?: Promise<{
    city?: string;
  }>;
}

export default async function ItineraryPage({ searchParams }: ItineraryPageProps) {
  const data = await getPlannerData();
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const cityFilter = resolvedSearchParams?.city ? unslugifyCity(resolvedSearchParams.city) : null;
  const visibleDays = cityFilter
    ? data.days.filter((day) => day.city.toLowerCase() === cityFilter.toLowerCase())
    : data.days;
  const description = cityFilter
    ? `Focused itinerary view for ${cityFilter}, with daily events, timing, notes, and booking status kept in one place.`
    : "A day-by-day view of the trip, with events, timing, budget cues, notes, and booking status kept in one place.";

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Itinerary"
        title="Daily Flow"
        description={description}
        action={
          cityFilter ? (
            <Link
              href="/itinerary"
              className="rounded-full border border-white/70 bg-white/75 px-4 py-2 text-sm font-medium text-ink/72 transition-all duration-300 hover:bg-white hover:text-ink"
            >
              View full itinerary
            </Link>
          ) : null
        }
      />

      <div className="space-y-5">
        {visibleDays.length ? (
          visibleDays.map((day) => (
            <TimelineDay
              key={day.id}
              day={day}
              events={data.events.filter((event) => event.dayId === day.id)}
            />
          ))
        ) : (
          <div className="rounded-[26px] border border-white/60 bg-white/80 p-8 text-center shadow-panel">
            <p className="font-display text-3xl text-ink">No itinerary found</p>
            <p className="mt-3 text-sm leading-6 text-ink/65">
              There are no days matching this city filter in the seeded trip plan.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
