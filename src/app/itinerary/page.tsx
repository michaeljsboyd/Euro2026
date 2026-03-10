import { Shell } from '@/components/shell';
import { StatusBadge } from '@/components/status-badge';
import { days, events } from '@/lib/sampleData';

export default function ItineraryPage() {
  return (
    <Shell>
      <section className="space-y-4">
        {days.map((day) => {
          const dayEvents = events.filter((event) => event.dayId === day.id);
          return (
            <article key={day.id} className="card">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-500">{day.date}</p>
                  <h2 className="text-xl font-semibold">{day.city}</h2>
                </div>
                <p className="muted">{day.notes}</p>
              </div>

              <div className="mt-4 space-y-3">
                {dayEvents.map((event) => (
                  <div key={event.id} className="rounded-xl border border-slate-100 p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-medium">{event.time} · {event.title}</p>
                      <StatusBadge status={event.status} />
                    </div>
                    <p className="muted mt-1">{event.location}</p>
                    <p className="muted mt-1">{event.notes}</p>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </section>
    </Shell>
  );
}
