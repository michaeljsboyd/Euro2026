import { TripProvider } from "@/context/TripContext";
import { TripTimeline } from "@/components/trip-timeline";
import { getPlannerData } from "@/lib/supabase/queries";

export default async function OverviewPage() {
  const data = await getPlannerData();

  return (
    <TripProvider initialDays={data.days} initialEvents={data.events}>
      <TripTimeline />
    </TripProvider>
  );
}
