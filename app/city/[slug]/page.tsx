import { notFound } from "next/navigation";

import { ItineraryEditor } from "@/components/itinerary-editor";
import { TripProvider } from "@/context/TripContext";
import { cityStays } from "@/lib/city-stays";
import { formatDateRange, slugifyCity } from "@/lib/format";
import { getPlannerData } from "@/lib/supabase/queries";

interface CityPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CityPage({ params }: CityPageProps) {
  const { slug } = await params;
  const cityStay = cityStays.find((stay) => slugifyCity(stay.city) === slug);

  if (!cityStay) {
    notFound();
  }

  const data = await getPlannerData();
  const cityDays = data.days.filter((day) => day.city === cityStay.city);
  const accommodations = [...new Set(cityDays.map((day) => day.accommodation).filter(Boolean))];
  const accommodationText = accommodations.length ? accommodations.join(" • ") : "Accommodation not added yet";

  return (
    <TripProvider initialDays={data.days} initialEvents={data.events}>
      <ItineraryEditor
        cityFilter={cityStay.city}
        eyebrow="City Stay"
        title={cityStay.city}
        description={`${formatDateRange(cityStay.start, cityStay.end)} • ${cityStay.nights} ${cityStay.nights === 1 ? "night" : "nights"} • ${accommodationText}`}
        actionHref="/itinerary"
        actionLabel="View full itinerary"
        emptyTitle="No city itinerary found"
        emptyDescription="There are no itinerary days stored for this city yet."
      />
    </TripProvider>
  );
}
