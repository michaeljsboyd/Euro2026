"use client";

import { useEffect, useState } from "react";

import { Event } from "@/lib/types";

const STORAGE_KEY = "europe-2026-events";

export function useSharedEvents(initialEvents: Event[]) {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);

      if (stored) {
        setEvents(JSON.parse(stored) as Event[]);
      } else {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialEvents));
      }
    } catch {
      setEvents(initialEvents);
    } finally {
      setReady(true);
    }
  }, [initialEvents]);

  useEffect(() => {
    if (!ready) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events, ready]);

  return {
    events,
    setEvents
  };
}

