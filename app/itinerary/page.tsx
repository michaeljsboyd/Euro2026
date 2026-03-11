import { ItineraryEditor } from "../../components/itinerary-editor";
import { TripProvider } from "@/context/TripContext";
import { unslugifyCity } from "@/lib/format";
import { getPlannerData } from "@/lib/supabase/queries";

interface ItineraryPageProps {
  searchParams?: Promise<{
    city?: string;
    date?: string;
  }>;
}

export default async function ItineraryPage({ searchParams }: ItineraryPageProps) {
  const data = await getPlannerData();
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const cityFilter = resolvedSearchParams?.city ? unslugifyCity(resolvedSearchParams.city) : null;
  const dateFilter = resolvedSearchParams?.date ?? null;
  const description = dateFilter
    ? `Focused itinerary view for ${dateFilter}, with the day's events, timing, notes, and status kept in one place.`
    : cityFilter
    ? `Focused itinerary view for ${cityFilter}, with daily events, timing, notes, and booking status kept in one place.`
    : "A day-by-day view of the trip, with events, timing, budget cues, notes, and booking status kept in one place.";

  return (
    <TripProvider initialDays={data.days} initialEvents={data.events}>
      <ItineraryEditor
        cityFilter={cityFilter}
        dateFilter={dateFilter}
        eyebrow="Itinerary"
        title="Itinerary"
        description={description}
        actionHref="/itinerary"
        actionLabel="View full itinerary"
      />
    </TripProvider>
  );
}
