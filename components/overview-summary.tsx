"use client";

import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { formatDate } from "@/lib/format";
import { Day, Event } from "@/lib/types";
import { useSharedEvents } from "@/lib/use-shared-events";

interface OverviewSummaryProps {
  days: Day[];
  initialEvents: Event[];
}

interface TodoItem {
  id: string;
  label: string;
  completed: boolean;
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

function TodoListCard() {
  const [items, setItems] = useState<TodoItem[]>([
    { id: crypto.randomUUID(), label: "Confirm remaining Rome plans", completed: false },
    { id: crypto.randomUUID(), label: "Add final dining references", completed: false },
    { id: crypto.randomUUID(), label: "Review internal flight timings", completed: true }
  ]);
  const [draft, setDraft] = useState("");

  const orderedItems = useMemo(
    () =>
      [...items].sort((left, right) => Number(left.completed) - Number(right.completed)),
    [items]
  );

  const addItem = () => {
    const value = draft.trim();
    if (!value) {
      return;
    }

    setItems((current) => [
      ...current,
      { id: crypto.randomUUID(), label: value, completed: false }
    ]);
    setDraft("");
  };

  const toggleItem = (id: string) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteItem = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  return (
    <SectionCard
      title="To-Do List"
      subtitle="A quiet running list for anything still to lock in."
    >
      <div className="space-y-4">
        <div className="flex gap-3">
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                addItem();
              }
            }}
            placeholder="Add a new item"
            className="flex-1 rounded-[18px] border border-[#e7dccd] bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-gold"
          />
          <button
            type="button"
            onClick={addItem}
            className="inline-flex h-[50px] items-center justify-center gap-2 rounded-full border border-white/70 bg-white/75 px-4 text-sm font-medium text-ink/72 transition-all duration-300 hover:bg-white hover:text-ink"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>

        <div className="space-y-2">
          {orderedItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-[20px] border border-[#ece1d4] bg-[#fffcf8] px-4 py-3"
            >
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
                  item.completed
                    ? "border-olive bg-olive/90"
                    : "border-[#cdbca6] bg-white hover:border-olive/70"
                }`}
                aria-label={item.completed ? "Mark as incomplete" : "Mark as complete"}
              >
                <span
                  className={`h-2 w-2 rounded-full bg-white transition ${
                    item.completed ? "opacity-100" : "opacity-0"
                  }`}
                />
              </button>

              <p
                className={`flex-1 text-sm transition ${
                  item.completed ? "text-ink/40 line-through" : "text-ink/78"
                }`}
              >
                {item.label}
              </p>

              <button
                type="button"
                onClick={() => deleteItem(item.id)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#8c6158] transition hover:bg-[#f6ede5]"
                aria-label={`Delete ${item.label}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
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

      <TodoListCard />
    </div>
  );
}
