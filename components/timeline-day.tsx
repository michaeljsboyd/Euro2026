import { useState } from "react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Clock3, GripVertical, Plus } from "lucide-react";

import { formatDate, formatTime } from "@/lib/format";
import { Day, DaySection, Event } from "@/lib/types";
import { StatusBadge } from "@/components/status-badge";

interface TimelineDayProps {
  day: Day;
  events: Event[];
  onEventClick: (event: Event) => void;
  onAddEvent: (day: Day, section: DaySection) => void;
  onQuickAddEvent: (day: Day, section: DaySection, title: string, startTime: string) => void;
  onReorderEvents: (dayId: string, section: DaySection, orderedEventIds: string[]) => void;
}

const sections: DaySection[] = ["Morning", "Afternoon", "Evening"];
const cityImages: Record<string, string> = {
  Paris: "/images/paris.jpg",
  Nice: "/images/nice.jpg",
  Ibiza: "/images/ibiza.jpg",
  Sicily: "/images/sicily.jpg",
  Rome: "/images/rome.jpg"
};
const emptySectionCopy: Record<DaySection, string> = {
  Morning: "Open morning — add something special.",
  Afternoon: "Free afternoon — beach club? museum?",
  Evening: "Evening open — dinner reservation?"
};

interface SortableEventCardProps {
  event: Event;
  onEventClick: (event: Event) => void;
}

function SortableEventCard({ event, onEventClick }: SortableEventCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: event.id });

  return (
    <div
      ref={setNodeRef}
      onClick={() => onEventClick(event)}
      onKeyDown={(eventKey) => {
        if (eventKey.key === "Enter" || eventKey.key === " ") {
          eventKey.preventDefault();
          onEventClick(event);
        }
      }}
      role="button"
      tabIndex={0}
      className="block w-full rounded-[24px] border border-[#efe6da] bg-[#fffdfa] p-5 text-left transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(31,36,48,0.06)]"
      style={{
        transform: CSS.Transform.toString(transform),
        transition
      }}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={(eventClick) => eventClick.stopPropagation()}
            className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#eadfce] bg-white text-ink/45 transition hover:text-ink"
            aria-label={`Drag ${event.title}`}
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-4 w-4" />
          </button>
          <h4 className="max-w-[14rem] text-lg font-semibold leading-7 text-ink">
            {event.title}
          </h4>
        </div>
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
    </div>
  );
}

export function TimelineDay({
  day,
  events,
  onEventClick,
  onAddEvent,
  onQuickAddEvent,
  onReorderEvents
}: TimelineDayProps) {
  const [quickAddSection, setQuickAddSection] = useState<DaySection | null>(null);
  const [quickAddTitle, setQuickAddTitle] = useState("");
  const [quickAddTime, setQuickAddTime] = useState("");
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));
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

  for (const event of events) {
    groupedEvents[event.section].push(event);
  }
  const imageUrl = cityImages[day.city];

  const resetQuickAdd = () => {
    setQuickAddSection(null);
    setQuickAddTitle("");
    setQuickAddTime("");
  };

  const handleDragEnd = (section: DaySection, event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const sectionEvents = groupedEvents[section];
    const oldIndex = sectionEvents.findIndex((item) => item.id === active.id);
    const newIndex = sectionEvents.findIndex((item) => item.id === over.id);

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    const reordered = arrayMove(sectionEvents, oldIndex, newIndex);
    onReorderEvents(
      day.id,
      section,
      reordered.map((item) => item.id)
    );
  };

  return (
    <div className="overflow-hidden rounded-[32px] border border-white/60 shadow-panel transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(31,36,48,0.08)]">
      {imageUrl ? (
        <div
          className="h-40 rounded-t-[32px] bg-cover bg-center"
          style={{
            backgroundImage: `url(${imageUrl})`
          }}
        />
      ) : null}

      <div className="rounded-b-[32px] bg-[rgba(255,251,245,0.95)] px-8 py-10">
        <div className="space-y-4 border-b border-[rgba(140,112,74,0.2)] pb-7">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-olive">{formatDate(day.date)}</p>
          <div>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h3 className="font-display text-4xl tracking-[-0.03em] text-ink md:text-5xl">{day.city}</h3>
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

        <div className="grid gap-6 pt-7 lg:grid-cols-3">
          {sections.map((section) => (
            <div key={section} className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-olive/80">{section}</p>
                  {quickAddSection === section ? (
                    <button
                      type="button"
                      onClick={resetQuickAdd}
                      className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-ink/65 transition-all duration-300 hover:border-white hover:bg-white hover:text-ink"
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setQuickAddSection(section);
                        setQuickAddTitle("");
                        setQuickAddTime("");
                      }}
                      className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-ink/65 transition-all duration-300 hover:border-white hover:bg-white hover:text-ink"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add Event
                    </button>
                  )}
                </div>
                <div className="h-px bg-gradient-to-r from-[#dccfb8] to-transparent" />
              </div>

              <div className="space-y-4">
                {quickAddSection === section ? (
                  <div className="rounded-[24px] border border-[#efe6da] bg-[#fffdfa] p-4">
                    <div className="grid gap-3">
                      <input
                        value={quickAddTitle}
                        onChange={(event) => setQuickAddTitle(event.target.value)}
                        placeholder="Event title"
                        className="w-full rounded-[16px] border border-[#e7dccd] bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-gold"
                      />
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <input
                          type="time"
                          value={quickAddTime}
                          onChange={(event) => setQuickAddTime(event.target.value)}
                          className="w-full rounded-[16px] border border-[#e7dccd] bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-gold sm:max-w-[170px]"
                        />
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const title = quickAddTitle.trim();
                              if (!title) {
                                return;
                              }

                              onQuickAddEvent(day, section, title, quickAddTime);
                              resetQuickAdd();
                            }}
                            className="inline-flex items-center justify-center rounded-full border border-[#dccfb8] bg-[#f3ecdf] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition-all duration-300 hover:bg-[#ede3d1]"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => onAddEvent(day, section)}
                            className="inline-flex items-center justify-center rounded-full border border-white/70 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink/70 transition-all duration-300 hover:text-ink"
                          >
                            Advanced
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
                {groupedEvents[section].length ? (
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={(event) => handleDragEnd(section, event)}
                  >
                    <SortableContext
                      items={groupedEvents[section].map((event) => event.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-4">
                        {groupedEvents[section].map((event) => (
                          <SortableEventCard
                            key={event.id}
                            event={event}
                            onEventClick={onEventClick}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                ) : (
                  <p className="text-sm italic text-ink/40">{emptySectionCopy[section]}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
