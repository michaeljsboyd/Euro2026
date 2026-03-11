import { PageHeader } from "@/components/page-header";
import { TripMap } from "@/components/trip-map";

export default function MapPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Map"
        title="Trip Map"
        description="A minimal visual snapshot of the trip stays across Europe, with each hotel pinned in a clean full-width map view."
      />
      <TripMap />
    </div>
  );
}
