"use client";

import { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { Plane } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { useTripContext } from "@/context/TripContext";

function formatTimelineDate(dateString: string) {
  return new Intl.DateTimeFormat("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "short"
  })
    .format(new Date(dateString))
    .replace(/,/g, "")
    .toUpperCase();
}

function stopCardNavigation(event: MouseEvent<HTMLElement>) {
  event.stopPropagation();
}

export function TripTimeline() {
  const router = useRouter();
  const {
    timelineDays,
    cityOptions,
    accommodationOptions,
    updateDay,
    updateKeyItem,
    toggleDayStatus,
    toggleTravelDay
  } = useTripContext();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Overview"
        title="Trip Timeline"
        description="A compact control board for the whole trip, with inline edits for city, stay, key item, travel, and status."
      />

      <div
        className="grid gap-4 sm:grid-cols-2"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}
      >
        {timelineDays.map((day) => {
          const isBooked = day.status === "booked";
          const tintClass = day.isTravelDay ? "bg-[#f6efe6]" : "bg-[#fffdfa]";

          return (
            <article
              key={day.id}
              onClick={() => router.push(`/itinerary?date=${day.date}`)}
              className={`relative min-h-[240px] rounded-[24px] border border-[#ece3d5] ${tintClass} p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(31,36,48,0.08)]`}
            >
              <button
                type="button"
                onClick={(event) => {
                  stopCardNavigation(event);
                  toggleTravelDay(day.id);
                }}
                className={`absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border transition ${
                  day.isTravelDay
                    ? "border-[#dcc6a9] bg-[#f3e6d3] text-[#8a6742]"
                    : "border-[#eadfce] bg-white/90 text-ink/45"
                }`}
                aria-label={day.isTravelDay ? "Disable travel day" : "Enable travel day"}
              >
                <Plane className="h-4 w-4" />
              </button>

              <div className="pr-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-olive/70">
                  {formatTimelineDate(day.date)}
                </p>
              </div>

              <div className="mt-4 space-y-3">
                <label className="block" onClick={stopCardNavigation}>
                  <span className="sr-only">City</span>
                  <select
                    value={day.city}
                    onChange={(event) =>
                      updateDay(day.id, { city: event.target.value })
                    }
                    className="w-full appearance-none border-none bg-transparent p-0 font-display text-2xl text-ink outline-none"
                  >
                    {cityOptions.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block" onClick={stopCardNavigation}>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive/70">
                    Stay
                  </span>
                  <input
                    list={`stay-options-${day.id}`}
                    value={day.accommodation}
                    onChange={(event) =>
                      updateDay(day.id, { accommodation: event.target.value })
                    }
                    className="mt-2 w-full border-none bg-transparent p-0 text-sm text-ink/76 outline-none"
                    placeholder="Add stay"
                  />
                  <datalist id={`stay-options-${day.id}`}>
                    {accommodationOptions.map((option) => (
                      <option key={option} value={option} />
                    ))}
                  </datalist>
                </label>

                <label className="block" onClick={stopCardNavigation}>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive/70">
                    Key Item
                  </span>
                  <input
                    value={day.keyItem}
                    onChange={(event) => updateKeyItem(day.id, event.target.value)}
                    className="mt-2 w-full border-none bg-transparent p-0 text-sm leading-6 text-ink/70 outline-none"
                    placeholder="Add key item"
                  />
                </label>
              </div>

              <div className="mt-5 flex items-center justify-between" onClick={stopCardNavigation}>
                <button
                  type="button"
                  onClick={() => toggleDayStatus(day.id)}
                  className="inline-flex h-4 w-4 items-center justify-center rounded-full"
                  aria-label={isBooked ? "Set tentative status" : "Set booked status"}
                >
                  <span
                    className={`h-3.5 w-3.5 rounded-full transition ${
                      isBooked ? "bg-emerald-600" : "bg-amber-500"
                    }`}
                  />
                </button>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/40">
                  {day.isTravelDay ? "Travel Day" : "Open Day"}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
