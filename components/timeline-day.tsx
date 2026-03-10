import { Clock3 } from "lucide-react";

import { formatDate, formatTime } from "@/lib/format";
import { Day, Event } from "@/lib/types";
import { StatusBadge } from "@/components/status-badge";

interface TimelineDayProps {
  day: Day;
  events: Event[];
}

type DaySection = "Morning" | "Afternoon" | "Evening";

const sections: DaySection[] = ["Morning", "Afternoon", "Evening"];

function getDaySection(time: string | null): DaySection {
  if (!time) {
    return "Afternoon";
  }

  const [hours] = time.split(":").map(Number);

  if (hours < 12) {
    return "Morning";
  }

  if (hours < 18) {
    return "Afternoon";
  }

  return "Evening";
}

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

export function TimelineDay({ day, events }: TimelineDayProps) {
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
    groupedEvents[getDaySection(event.startTime)].push(event);
  }

  return (
    <section className="rounded-[32px] border border-white/60 bg-white/78 p-6 shadow-panel backdrop-blur md:p-8">
      <div className="space-y-5 border-b border-[#ece4d8] pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-olive">{formatDate(day.date)}</p>
        <div>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h3 className="font-display text-4xl text-ink md:text-5xl">{day.city}</h3>
              <p className="mt-3 text-base text-ink/74">{day.title}</p>
            </div>
            <StatusBadge status={day.status} />
          </div>
        </div>
        <p className="max-w-3xl text-sm leading-7 text-ink/62">{day.notes}</p>
      </div>

      <div className="grid gap-8 pt-8 lg:grid-cols-3">
        {sections.map((section) => (
          <div key={section} className="space-y-5">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-olive/80">{section}</p>
              <div className="h-px bg-gradient-to-r from-[#dccfb8] to-transparent" />
            </div>

            <div className="space-y-4">
              {groupedEvents[section].length ? (
                groupedEvents[section].map((event) => (
                  <article
                    key={event.id}
                    className="rounded-[24px] border border-[#efe6da] bg-[#fffdfa] p-5 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(31,36,48,0.06)]"
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
                    <p className="mt-4 text-sm leading-7 text-ink/68">{event.notes}</p>
                  </article>
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
    </section>
  );
}
