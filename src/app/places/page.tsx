import { Shell } from '@/components/shell';
import { StatusBadge } from '@/components/status-badge';
import { places } from '@/lib/sampleData';

const grouped = places.reduce<Record<string, typeof places>>((acc, place) => {
  if (!acc[place.city]) acc[place.city] = [];
  acc[place.city].push(place);
  return acc;
}, {});

export default function PlacesPage() {
  return (
    <Shell>
      <section className="space-y-4">
        {Object.entries(grouped).map(([city, cityPlaces]) => (
          <article key={city} className="card">
            <h2 className="section-title">{city}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {cityPlaces?.map((place) => (
                <div key={place.id} className="rounded-xl border border-slate-100 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium">{place.name}</p>
                    <StatusBadge status={place.status} />
                  </div>
                  <p className="muted mt-1">{place.type}</p>
                  <p className="muted mt-1">{place.notes}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </Shell>
  );
}
