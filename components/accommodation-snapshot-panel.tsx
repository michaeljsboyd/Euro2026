"use client";

import { useState } from "react";

import { AccommodationSnapshot, AccommodationStay } from "@/components/accommodation-snapshot";

interface AccommodationSnapshotPanelProps {
  initialAccommodations: AccommodationStay[];
}

export function AccommodationSnapshotPanel({
  initialAccommodations
}: AccommodationSnapshotPanelProps) {
  const [accommodations, setAccommodations] =
    useState<AccommodationStay[]>(initialAccommodations);

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
    <AccommodationSnapshot
      accommodations={accommodations}
      onToggleStatus={handleToggleStatus}
    />
  );
}
