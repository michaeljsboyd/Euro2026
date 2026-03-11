"use client";

import { useState } from "react";

import {
  AccommodationCard,
  AccommodationSnapshot,
  AccommodationStay
} from "@/components/accommodation-snapshot";
import { SectionCard } from "@/components/section-card";

interface AccommodationSnapshotPanelProps {
  initialAccommodations: AccommodationStay[];
}

export function AccommodationSnapshotPanel({
  initialAccommodations
}: AccommodationSnapshotPanelProps) {
  const [accommodations, setAccommodations] =
    useState<AccommodationStay[]>(initialAccommodations);
  const bookedStays = accommodations.filter((stay) => stay.status === "booked");

  const handleToggleStatus = (id: string) => {
    setAccommodations((current) =>
      current.map((stay) =>
        stay.id === id
          ? {
              ...stay,
              status: stay.status === "booked" ? "tentative" : "booked"
            }
          : stay
      )
    );
  };

  return (
    <div className="space-y-6">
      <SectionCard
        title="Accommodation Snapshot"
        subtitle="A clean hotel overview across the key stays on the trip."
      >
        <AccommodationSnapshot
          accommodations={accommodations}
          onToggleStatus={handleToggleStatus}
        />
      </SectionCard>

      <SectionCard
        title="Booked"
        subtitle="Confirmed stays pulled directly from the current accommodation status."
      >
        {bookedStays.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
            {bookedStays.map((stay) => (
              <AccommodationCard
                key={stay.id}
                accommodation={stay}
                href="/bookings"
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-ink/60">No confirmed stays yet.</p>
        )}
      </SectionCard>
    </div>
  );
}
