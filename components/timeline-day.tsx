import { Clock3, Plus } from "lucide-react";

import { formatDate, formatTime } from "@/lib/format";
import { Day, DaySection, Event } from "@/lib/types";
import { StatusBadge } from "@/components/status-badge";

interface TimelineDayProps {
  day: Day;
  events: Event[];
  onEventClick: (event: Event) => void;
  onAddEvent: (day: Day, section: DaySection) => void;
}

const sections: DaySection[] = ["Morning", "Afternoon", "Evening"];
const cityImages: Record<string, string> = {
  Paris: "/images/paris.jpeg",
  Nice: "/images/nice.jpg",
  Ibiza: "/images/ibiza.jpg",
  Sicily: "/images/sicily.jpg",
  Rome: "/images/rome.jpg"
};

function sortEventsByTime(events: Event[]) {
  return [...events].sort((left, right) => {
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
}

export function TimelineDay({ day, events, onEventClick, onAddEvent }: TimelineDayProps) {
  const groupedEvents = sections.reduce<Record<DaySection, Event[]>>(
    (accumulator, section) => ({
      ...accumulator,
      [section]: []
    }),
    {
      Morning: [],
      Afternoon: [],
      Evening: []
    }
  );

  for (const event of sortEventsByTime(events)) {
    groupedEvents[event.section].push(event);
  }

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-white/60 bg-[#f7f3ea] shadow-panel">
      <div
        className="absolute inset-x-0 top-0 h-[160px] bg-cover bg-center scale-[1.05]"
        style={{
          backgroundImage: `url(${cityImages[day.city] || "/images/paris.jpeg"})`
        }}
      />
      <div className="absolute inset-x-0 top-0 h-[160px] bg-gradient-to-b from-black/35 via-black/10 to-[#f7f3ea]" />

      <div className="relative z-10 p-7 pt-[120px]">
        <div className="space-y-5 border-b border-[#ece4d8] pb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-olive">{formatDate(day.date)}</p>
          <div>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="relative -mt-6">
                <h3 className="font-display text-4xl text-ink md:text-5xl">{day.city}</h3>
                <p className="mt-3 text-base text-ink/74">{day.title}</p>
                {day.accommodation ? (
                  <p className="mt-3 text-sm uppercase tracking-[0.22em] text-olive/80">
                    {day.accommodation}
                  </p>
                ) : null}
              </div>
              <StatusBadge status={day.status} />
            </div>
          </div>
          {day.notes ? <p className="max-w-3xl text-sm leading-7 text-ink/62">{day.notes}</p> : null}
        </div>

        <div className="grid gap-8 pt-8 lg:grid-cols-3">
          {sections.map((section) => (
            <div key={section} className="space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-olive/80">{section}</p>
                  <button
                    type="button"
                    onClick={() => onAddEvent(day, section)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-ink/65 transition-all duration-300 hover:border-white hover:bg-white hover:text-ink"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Event
                  </button>
                </div>
                <div className="h-px bg-gradient-to-r from-[#dccfb8] to-transparent" />
              </div>

              <div className="space-y-4">
                {groupedEvents[section].length ? (
                  groupedEvents[section].map((event) => (
                    <button
                      key={event.id}
                      type="button"
                      onClick={() => onEventClick(event)}
                      className="block w-full rounded-[24px] border border-[#efe6da] bg-[#fffdfa] p-5 text-left transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(31,36,48,0.06)]"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <h4 className="max-w-[16rem] text-lg font-semibold leading-7 text-ink">
                          {event.title}
                        </h4>
                        <StatusBadge status={event.status} />
                      </div>
                      <p className="mt-4 inline-flex items-center gap-2 text-sm text-ink/58">
                        <Clock3 className="h-4 w-4 text-olive" />
                        {formatTime(event.startTime)}
                        {event.endTime ? ` - ${formatTime(event.endTime)}` : ""}
                      </p>
                      {event.notes ? (
                        <p className="mt-4 text-sm leading-7 text-ink/68">{event.notes}</p>
                      ) : null}
                    </button>
                  ))
                ) : (
                  <div className="rounded-[24px] border border-dashed border-[#ddd2c0] bg-[rgba(255,253,250,0.7)] p-5">
                    <p className="text-sm leading-7 text-ink/48">
                      Nothing scheduled here yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
