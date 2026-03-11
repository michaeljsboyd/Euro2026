"use client";

import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { formatDate } from "@/lib/format";
import { Day, Event } from "@/lib/types";
import { useSharedEvents } from "@/lib/use-shared-events";

interface OverviewSummaryProps {
  days: Day[];
  initialEvents: Event[];
}

function getFirstEvent(events: Event[]) {
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
  })[0];
}

export function OverviewSummary({ days, initialEvents }: OverviewSummaryProps) {
  const { events } = useSharedEvents(initialEvents);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Overview"
        title="Trip Summary"
        description="A compact day-by-day summary of the trip with stays, key items, travel cues, and status in a cleaner planning table."
      />

      <div className="hidden overflow-hidden rounded-[30px] border border-white/60 bg-white/82 shadow-panel backdrop-blur lg:block">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-[#ebe1d2] bg-[rgba(247,242,234,0.8)]">
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.22em] text-olive">Date</th>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.22em] text-olive">City</th>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.22em] text-olive">Stay</th>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.22em] text-olive">Key Item</th>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.22em] text-olive">Travel</th>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.22em] text-olive">Status</th>
            </tr>
          </thead>
          <tbody>
            {days.map((day) => {
              const dayEvents = events.filter((event) => event.dayId === day.id);
              const firstEvent = getFirstEvent(dayEvents);
              const travelEvent = dayEvents.find((event) => event.type === "Travel");

              return (
                <tr key={day.id} className="border-b border-[#f0e7da] last:border-b-0">
                  <td className="px-5 py-4 text-sm text-ink">{formatDate(day.date)}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-ink">{day.city}</td>
                  <td className="px-5 py-4 text-sm text-ink/72">
                    {day.accommodation || "Not added"}
                  </td>
                  <td className="px-5 py-4 text-sm text-ink/72">
                    {firstEvent?.title || "Open"}
                  </td>
                  <td className="px-5 py-4 text-sm text-ink/64">
                    {day.dayType === "travel" ? travelEvent?.title || "Travel day" : "—"}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={day.status} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="space-y-4 lg:hidden">
        {days.map((day) => {
          const dayEvents = events.filter((event) => event.dayId === day.id);
          const firstEvent = getFirstEvent(dayEvents);
          const travelEvent = dayEvents.find((event) => event.type === "Travel");

          return (
            <article
              key={day.id}
              className="rounded-[26px] border border-white/60 bg-white/82 p-5 shadow-panel backdrop-blur"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-olive">
                    {formatDate(day.date)}
                  </p>
                  <h2 className="mt-2 font-display text-3xl text-ink">{day.city}</h2>
                </div>
                <StatusBadge status={day.status} />
              </div>
              <div className="mt-5 grid gap-3 text-sm text-ink/72">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-olive/80">Stay</p>
                  <p className="mt-1">{day.accommodation || "Not added"}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-olive/80">Key Item</p>
                  <p className="mt-1">{firstEvent?.title || "Open"}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-olive/80">Travel</p>
                  <p className="mt-1">{day.dayType === "travel" ? travelEvent?.title || "Travel day" : "—"}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

