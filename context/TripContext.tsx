"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

import { BookingStatus, Day, Event } from "@/lib/types";

const DAYS_STORAGE_KEY = "europe-2026-shared-days";
const EVENTS_STORAGE_KEY = "europe-2026-shared-events";

interface TimelineDay extends Day {
  keyItem: string;
  isTravelDay: boolean;
}

interface TripContextValue {
  days: Day[];
  events: Event[];
  timelineDays: TimelineDay[];
  accommodationOptions: string[];
  cityOptions: string[];
  setEvents: Dispatch<SetStateAction<Event[]>>;
  updateDay: (dayId: string, updates: Partial<Day>) => void;
  toggleDayStatus: (dayId: string) => void;
  toggleTravelDay: (dayId: string) => void;
  updateKeyItem: (dayId: string, title: string) => void;
}

interface TripProviderProps {
  initialDays: Day[];
  initialEvents: Event[];
  children: ReactNode;
}

const TripContext = createContext<TripContextValue | null>(null);

function sortEvents(events: Event[]) {
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

function cloneDays(days: Day[]) {
  return days.map((day) => ({ ...day }));
}

function cloneEvents(events: Event[]) {
  return events.map((event) => ({ ...event }));
}

export function TripProvider({
  initialDays,
  initialEvents,
  children
}: TripProviderProps) {
  const [days, setDays] = useState<Day[]>(() => cloneDays(initialDays));
  const [events, setEvents] = useState<Event[]>(() => cloneEvents(initialEvents));
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const storedDays = window.localStorage.getItem(DAYS_STORAGE_KEY);
      const storedEvents = window.localStorage.getItem(EVENTS_STORAGE_KEY);

      if (storedDays) {
        setDays(JSON.parse(storedDays) as Day[]);
      } else {
        window.localStorage.setItem(DAYS_STORAGE_KEY, JSON.stringify(initialDays));
      }

      if (storedEvents) {
        setEvents(JSON.parse(storedEvents) as Event[]);
      } else {
        window.localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(initialEvents));
      }
    } catch {
      setDays(cloneDays(initialDays));
      setEvents(cloneEvents(initialEvents));
    } finally {
      setReady(true);
    }
  }, [initialDays, initialEvents]);

  useEffect(() => {
    if (!ready) {
      return;
    }

    window.localStorage.setItem(DAYS_STORAGE_KEY, JSON.stringify(days));
  }, [days, ready]);

  useEffect(() => {
    if (!ready) {
      return;
    }

    window.localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
  }, [events, ready]);

  const updateDay = (dayId: string, updates: Partial<Day>) => {
    setDays((current) =>
      current.map((day) => (day.id === dayId ? { ...day, ...updates } : day))
    );
  };

  const toggleDayStatus = (dayId: string) => {
    setDays((current) =>
      current.map((day) =>
        day.id === dayId
          ? {
              ...day,
              status: day.status === "booked" ? "tentative" : "booked"
            }
          : day
      )
    );
  };

  const toggleTravelDay = (dayId: string) => {
    setDays((current) =>
      current.map((day) =>
        day.id === dayId
          ? {
              ...day,
              dayType: day.dayType === "travel" ? "standard" : "travel"
            }
          : day
      )
    );
  };

  const updateKeyItem = (dayId: string, title: string) => {
    const trimmedTitle = title.trim();
    const day = days.find((currentDay) => currentDay.id === dayId);

    if (!day) {
      return;
    }

    const orderedEvents = sortEvents(events.filter((event) => event.dayId === dayId));
    const firstEvent = orderedEvents[0];

    if (firstEvent) {
      setEvents((current) =>
        current.map((event) =>
          event.id === firstEvent.id ? { ...event, title: trimmedTitle } : event
        )
      );
      return;
    }

    setEvents((current) => [
      ...current,
      {
        id: `event-${dayId}-key-item`,
        dayId,
        city: day.city,
        title: trimmedTitle,
        section: "Morning",
        type: "Activity",
        startTime: null,
        endTime: null,
        location: "",
        status: day.status as BookingStatus,
        estimatedCost: 0,
        notes: ""
      }
    ]);
  };

  const timelineDays = useMemo<TimelineDay[]>(
    () =>
      days.map((day) => {
        const firstEvent = sortEvents(events.filter((event) => event.dayId === day.id))[0];

        return {
          ...day,
          keyItem: firstEvent?.title ?? "",
          isTravelDay: day.dayType === "travel"
        };
      }),
    [days, events]
  );

  const accommodationOptions = useMemo(
    () =>
      Array.from(new Set(days.map((day) => day.accommodation).filter(Boolean))).sort(
        (left, right) => left.localeCompare(right)
      ),
    [days]
  );

  const cityOptions = useMemo(
    () => Array.from(new Set(days.map((day) => day.city))).sort((left, right) => left.localeCompare(right)),
    [days]
  );

  const value = useMemo<TripContextValue>(
    () => ({
      days,
      events,
      timelineDays,
      accommodationOptions,
      cityOptions,
      setEvents,
      updateDay,
      toggleDayStatus,
      toggleTravelDay,
      updateKeyItem
    }),
    [days, events, timelineDays, accommodationOptions, cityOptions]
  );

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}

export function useTripContext() {
  const context = useContext(TripContext);

  if (!context) {
    throw new Error("useTripContext must be used within a TripProvider");
  }

  return context;
}
