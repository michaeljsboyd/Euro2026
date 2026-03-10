import { Shell } from '@/components/shell';
import { StatusBadge } from '@/components/status-badge';
import { days, events, trip } from '@/lib/sampleData';

const groupedDays = days.reduce<Record<string, number>>((acc, day) => {
  acc[day.city] = (acc[day.city] ?? 0) + 1;
  return acc;
}, {});

export default function DashboardPage() {
  return (
    <Shell>
      <section className="grid gap-4 md:grid-cols-4">
        <div className="card">
          <p className="muted">Trip window</p>
          <p className="mt-1 text-lg font-semibold">{trip.startDate} → {trip.endDate}</p>
        </div>
        <div className="card">
          <p className="muted">Travelers</p>
          <p className="mt-1 text-lg font-semibold">{trip.travelers}</p>
        </div>
        <div className="card">
          <p className="muted">Cities</p>
          <p className="mt-1 text-lg font-semibold">{Object.keys(groupedDays).length}</p>
        </div>
        <div className="card">
          <p className="muted">Events</p>
          <p className="mt-1 text-lg font-semibold">{events.length}</p>
        </div>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="card">
          <h2 className="section-title">City summary</h2>
          <ul className="mt-4 space-y-3">
            {Object.entries(groupedDays).map(([city, count]) => (
              <li key={city} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                <span className="font-medium">{city}</span>
                <span className="text-sm text-slate-500">{count} planned day{count > 1 ? 's' : ''}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2 className="section-title">Upcoming events</h2>
          <ul className="mt-4 space-y-3">
            {events.slice(0, 4).map((event) => (
              <li key={event.id} className="rounded-xl border border-slate-100 p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium">{event.title}</p>
                  <StatusBadge status={event.status} />
                </div>
                <p className="muted mt-1">{event.city} • {event.time}</p>
                <p className="muted mt-1">{event.notes}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="card mt-6">
        <h2 className="section-title">Trip notes</h2>
        <p className="muted mt-3">{trip.notes}</p>
      </section>
    </Shell>
  );
}
