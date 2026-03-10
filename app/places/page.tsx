import { ExternalLink, MapPin } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { PlaceType } from "@/lib/types";
import { getPlannerData } from "@/lib/supabase/queries";

const typeOrder: PlaceType[] = ["Restaurant", "Beach Club", "Bar", "Activity"];

export default async function PlacesPage() {
  const data = await getPlannerData();

  const groupedPlaces = data.places.reduce<Record<string, typeof data.places>>((accumulator, place) => {
    accumulator[place.city] = [...(accumulator[place.city] ?? []), place];
    return accumulator;
  }, {});

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Saved Places"
        title="Shortlist by City"
        description="Restaurants, beach clubs, bars, and activities are grouped into a clean shortlist so the family can make quick decisions while travelling."
      />

      <div className="space-y-6">
        {Object.entries(groupedPlaces).map(([city, places]) => (
          <SectionCard
            key={city}
            title={city}
            subtitle="Grouped by type to keep reservations and idea lists tidy."
          >
            <div className="grid gap-6 lg:grid-cols-2">
              {typeOrder.map((type) => {
                const matchingPlaces = places.filter((place) => place.type === type);

                if (!matchingPlaces.length) {
                  return null;
                }

                return (
                  <div key={type} className="rounded-[24px] bg-[#f7f2ea] p-5">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <h3 className="font-display text-2xl text-ink">{type}</h3>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-ink/70">
                        {matchingPlaces.length}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {matchingPlaces.map((place) => (
                        <article key={place.id} className="rounded-[20px] bg-white/80 p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h4 className="font-semibold text-ink">{place.name}</h4>
                              <p className="mt-2 flex items-center gap-2 text-sm text-ink/60">
                                <MapPin className="h-4 w-4 text-olive" />
                                {city}
                              </p>
                            </div>
                            <StatusBadge status={place.status} />
                          </div>
                          <p className="mt-3 text-sm leading-6 text-ink/68">{place.notes}</p>
                          {place.link ? (
                            <a
                              href={place.link}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ink underline decoration-olive/40 underline-offset-4"
                            >
                              Open reference
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          ) : null}
                        </article>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  );
}

