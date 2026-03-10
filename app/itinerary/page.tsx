import { ItineraryEditor } from "@/components/itinerary-editor";
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
  const visibleEvents = data.events.filter((event) =>
    visibleDays.some((day) => day.id === event.dayId)
  );

  return (
    <ItineraryEditor
      days={visibleDays}
      events={visibleEvents}
      cityFilter={cityFilter}
      description={description}
    />
  );
}
