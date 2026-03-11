import { formatDate, formatTime } from "@/lib/format";
import { Day, DaySection, Event } from "@/lib/types";
import { StatusBadge } from "@/components/status-badge";

const sections: DaySection[] = ["Morning", "Afternoon", "Evening"];

interface OverviewGridProps {
  days: Day[];
  events: Event[];
}

function cityTone(index: number) {
  return index % 2 === 0 ? "bg-[rgba(247,242,234,0.72)]" : "bg-[rgba(255,251,245,0.82)]";
}

export function OverviewGrid({ days, events }: OverviewGridProps) {
  const cityStarts = new Set<string>();
  let previousCity = "";

  for (const day of days) {
    if (day.city !== previousCity) {
      cityStarts.add(day.id);
      previousCity = day.city;
    }
  }

  const cityIndices = new Map<string, number>();
  let cityCounter = -1;

  for (const day of days) {
    if (!cityIndices.has(day.city)) {
      cityCounter += 1;
      cityIndices.set(day.city, cityCounter);
    }
  }

  return (
    <div className="overflow-hidden rounded-[32px] border border-white/60 bg-white/76 shadow-panel backdrop-blur">
      <div className="overflow-x-auto">
        <div className="min-w-[1120px]">
          <div
            className="grid border-b border-[#e8dece]"
            style={{ gridTemplateColumns: `160px repeat(${days.length}, minmax(180px, 1fr))` }}
          >
            <div className="sticky left-0 top-0 z-20 border-r border-[#e8dece] bg-[rgba(255,251,245,0.96)] px-5 py-5 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-olive">Trip Grid</p>
            </div>
            {days.map((day) => {
              const tone = cityTone(cityIndices.get(day.city) ?? 0);
              const isTravelDay = day.dayType === "travel";

              return (
                <div
                  key={day.id}
                  className={`sticky top-0 z-10 border-r border-[#e8dece] px-4 py-5 backdrop-blur ${tone} ${
                    isTravelDay ? "shadow-[inset_0_-2px_0_rgba(191,155,99,0.45)]" : ""
                  }`}
                >
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-olive/80">
                      {day.city}
                    </p>
                    <p className="font-display text-2xl leading-none text-ink">
                      {formatDate(day.date)}
                    </p>
                    {day.accommodation ? (
                      <p className="text-xs uppercase tracking-[0.18em] text-ink/48">
                        {day.accommodation}
                      </p>
                    ) : null}
                    {isTravelDay ? (
                      <span className="inline-flex rounded-full bg-[#f1e2d2] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7a5a36]">
                        Travel Day
                      </span>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>

          {sections.map((section) => (
            <div
              key={section}
              className="grid"
              style={{ gridTemplateColumns: `160px repeat(${days.length}, minmax(180px, 1fr))` }}
            >
              <div className="sticky left-0 z-10 border-r border-b border-[#e8dece] bg-[rgba(255,251,245,0.96)] px-5 py-5 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-olive">{section}</p>
              </div>

              {days.map((day) => {
                const dayEvents = events
                  .filter((event) => event.dayId === day.id && event.section === section)
                  .sort((left, right) => {
                    if (!left.startTime && !right.startTime) {
                      return left.title.localeCompare(right.title);
                    }

                    if (!left.startTime) {
                      return 1;
                    }

                    if (!right.startTime) {
                      return -1;
                    }

                    return left.startTime.localeCompare(right.startTime);
                  });
                const tone = cityTone(cityIndices.get(day.city) ?? 0);

                return (
                  <div
                    key={`${day.id}-${section}`}
                    className={`min-h-[168px] border-r border-b border-[#e8dece] px-4 py-4 ${tone} ${
                      cityStarts.has(day.id) ? "shadow-[inset_1px_0_0_rgba(191,155,99,0.26)]" : ""
                    }`}
                  >
                    <div className="space-y-3">
                      {dayEvents.length ? (
                        dayEvents.map((event) => (
                          <article
                            key={event.id}
                            className="rounded-[20px] border border-white/70 bg-[rgba(255,253,250,0.92)] p-3"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-sm font-semibold leading-6 text-ink">{event.title}</p>
                              <StatusBadge status={event.status} />
                            </div>
                            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-olive/80">
                              {formatTime(event.startTime)}
                            </p>
                            {event.notes ? (
                              <p className="mt-2 text-xs leading-6 text-ink/60">{event.notes}</p>
                            ) : null}
                          </article>
                        ))
                      ) : (
                        <div className="rounded-[20px] border border-dashed border-[#ddd2c0] bg-[rgba(255,253,250,0.56)] p-3">
                          <p className="text-xs uppercase tracking-[0.18em] text-ink/34">Open</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

