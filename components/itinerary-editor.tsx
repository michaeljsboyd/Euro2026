"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarPlus2, Trash2, X } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { TimelineDay } from "@/components/timeline-day";
import { Day, DaySection, Event, BookingStatus } from "@/lib/types";

interface ItineraryEditorProps {
  days: Day[];
  events: Event[];
  cityFilter: string | null;
  eyebrow?: string;
  title?: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
  emptyTitle?: string;
  emptyDescription?: string;
}

interface EditorDraft {
  id: string | null;
  dayId: string;
  city: string;
  section: DaySection;
  title: string;
  startTime: string;
  status: BookingStatus;
  notes: string;
}

const statuses: BookingStatus[] = ["booked", "tentative", "tbc"];

function emptyDraft(day: Day, section: DaySection): EditorDraft {
  return {
    id: null,
    dayId: day.id,
    city: day.city,
    section,
    title: "",
    startTime: "",
    status: "tentative",
    notes: ""
  };
}

function draftFromEvent(event: Event): EditorDraft {
  return {
    id: event.id,
    dayId: event.dayId,
    city: event.city,
    section: event.section,
    title: event.title,
    startTime: event.startTime ?? "",
    status: event.status,
    notes: event.notes
  };
}

export function ItineraryEditor({
  days,
  events,
  cityFilter,
  eyebrow = "Itinerary",
  title = "Daily Flow",
  description,
  actionHref,
  actionLabel,
  emptyTitle = "No itinerary found",
  emptyDescription = "There are no days matching this city filter in the seeded trip plan."
}: ItineraryEditorProps) {
  const [localEvents, setLocalEvents] = useState(events);
  const [draft, setDraft] = useState<EditorDraft | null>(null);

  useEffect(() => {
    setLocalEvents(events);
    setDraft(null);
  }, [events]);

  const openExistingEvent = (event: Event) => {
    setDraft(draftFromEvent(event));
  };

  const openNewEvent = (day: Day, section: DaySection) => {
    setDraft(emptyDraft(day, section));
  };

  const closeModal = () => {
    setDraft(null);
  };

  const saveDraft = () => {
    if (!draft) {
      return;
    }

    const title = draft.title.trim();

    if (!title) {
      return;
    }

    if (draft.id) {
      setLocalEvents((current) =>
        current.map((event) =>
          event.id === draft.id
            ? {
                ...event,
                title,
                startTime: draft.startTime || null,
                status: draft.status,
                notes: draft.notes,
                section: draft.section
              }
            : event
        )
      );
    } else {
      setLocalEvents((current) => [
        ...current,
        {
          id: `event-${Date.now()}`,
          dayId: draft.dayId,
          city: draft.city,
          title,
          section: draft.section,
          type: "Activity",
          startTime: draft.startTime || null,
          endTime: null,
          location: "",
          status: draft.status,
          estimatedCost: 0,
          notes: draft.notes
        }
      ]);
    }

    closeModal();
  };

  const deleteDraft = () => {
    if (!draft?.id) {
      closeModal();
      return;
    }

    setLocalEvents((current) => current.filter((event) => event.id !== draft.id));
    closeModal();
  };

  return (
    <>
      <div className="space-y-8">
        <PageHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          action={
            cityFilter && actionHref && actionLabel ? (
              <Link
                href={actionHref}
                className="rounded-full border border-white/70 bg-white/75 px-4 py-2 text-sm font-medium text-ink/72 transition-all duration-300 hover:bg-white hover:text-ink"
              >
                {actionLabel}
              </Link>
            ) : null
          }
        />

        <div className="space-y-5">
          {days.length ? (
            days.map((day) => (
              <TimelineDay
                key={day.id}
                day={day}
                events={localEvents.filter((event) => event.dayId === day.id)}
                onEventClick={openExistingEvent}
                onAddEvent={openNewEvent}
              />
            ))
          ) : (
            <div className="rounded-[26px] border border-white/60 bg-white/80 p-8 text-center shadow-panel">
              <p className="font-display text-3xl text-ink">{emptyTitle}</p>
              <p className="mt-3 text-sm leading-6 text-ink/65">
                {emptyDescription}
              </p>
            </div>
          )}
        </div>
      </div>

      {draft ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(31,36,48,0.3)] p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-[32px] border border-white/70 bg-[rgba(255,251,245,0.96)] p-6 shadow-[0_30px_100px_rgba(31,36,48,0.18)] md:p-8">
            <div className="flex items-start justify-between gap-4 border-b border-[#ece4d8] pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-olive">
                  {draft.id ? "Edit Event" : "Add Event"}
                </p>
                <h3 className="mt-3 font-display text-4xl text-ink">
                  {draft.city} • {draft.section}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/70 text-ink transition-all duration-300 hover:bg-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <label className="space-y-2 md:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">Title</span>
                <input
                  value={draft.title}
                  onChange={(event) => setDraft({ ...draft, title: event.target.value })}
                  className="w-full rounded-[20px] border border-[#e7dccd] bg-[#fffdfa] px-4 py-3 text-sm text-ink outline-none transition focus:border-gold"
                  placeholder="Add event title"
                />
              </label>

              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">Time</span>
                <input
                  type="time"
                  value={draft.startTime}
                  onChange={(event) => setDraft({ ...draft, startTime: event.target.value })}
                  className="w-full rounded-[20px] border border-[#e7dccd] bg-[#fffdfa] px-4 py-3 text-sm text-ink outline-none transition focus:border-gold"
                />
              </label>

              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">Status</span>
                <select
                  value={draft.status}
                  onChange={(event) =>
                    setDraft({ ...draft, status: event.target.value as BookingStatus })
                  }
                  className="w-full rounded-[20px] border border-[#e7dccd] bg-[#fffdfa] px-4 py-3 text-sm text-ink outline-none transition focus:border-gold"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2 md:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">Notes</span>
                <textarea
                  value={draft.notes}
                  onChange={(event) => setDraft({ ...draft, notes: event.target.value })}
                  rows={5}
                  className="w-full rounded-[24px] border border-[#e7dccd] bg-[#fffdfa] px-4 py-3 text-sm leading-7 text-ink outline-none transition focus:border-gold"
                  placeholder="Add notes"
                />
              </label>
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-[#ece4d8] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                {draft.id ? (
                  <button
                    type="button"
                    onClick={deleteDraft}
                    className="inline-flex items-center gap-2 rounded-full border border-[#ead8cf] bg-[#fff6f2] px-4 py-2.5 text-sm font-medium text-[#7c4a42] transition-all duration-300 hover:bg-[#fff1ea]"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Event
                  </button>
                ) : (
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#f7f2ea] px-4 py-2.5 text-sm text-ink/58">
                    <CalendarPlus2 className="h-4 w-4" />
                    New event for this section
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-full border border-white/70 bg-white/75 px-5 py-2.5 text-sm font-medium text-ink/72 transition-all duration-300 hover:bg-white hover:text-ink"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveDraft}
                  className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#171b24]"
                >
                  Save Event
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
