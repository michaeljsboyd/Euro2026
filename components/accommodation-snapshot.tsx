"use client";

import { useState } from "react";
import clsx from "clsx";
import { ExternalLink, Phone } from "lucide-react";

type AccommodationStatus = "booked" | "tentative";

interface Accommodation {
  city: string;
  hotel: string;
  status: AccommodationStatus;
  website: string;
  phone: string;
}

interface AccommodationSnapshotProps {
  accommodations: Accommodation[];
}

const badgeStyles: Record<AccommodationStatus, string> = {
  booked: "bg-emerald-100 text-emerald-900 ring-emerald-200",
  tentative: "bg-amber-100 text-amber-900 ring-amber-200"
};

const badgeLabels: Record<AccommodationStatus, string> = {
  booked: "Booked",
  tentative: "Tentative"
};

export function AccommodationSnapshot({ accommodations }: AccommodationSnapshotProps) {
  const [items, setItems] = useState(accommodations);
  const [animatingCity, setAnimatingCity] = useState<string | null>(null);

  const toggleStatus = (city: string) => {
    setItems((current) =>
      current.map((item) =>
        item.city === city
          ? {
              ...item,
              status: item.status === "booked" ? "tentative" : "booked"
            }
          : item
      )
    );
    setAnimatingCity(city);
    window.setTimeout(() => {
      setAnimatingCity((current) => (current === city ? null : current));
    }, 240);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
      {items.map((accommodation) => (
        <article
          key={accommodation.city}
          className="rounded-[22px] border border-[#ece3d5] bg-[#fffdfa] p-4"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-olive/80">
                {accommodation.city}
              </p>
              <p className="mt-2 font-semibold text-ink">{accommodation.hotel}</p>
              <p className="mt-1 text-sm text-ink/60">Luxury stay snapshot</p>
            </div>
            <button
              type="button"
              onClick={() => toggleStatus(accommodation.city)}
              className={clsx(
                "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ring-1 ring-inset transition-all duration-300 ease-out",
                badgeStyles[accommodation.status],
                animatingCity === accommodation.city ? "scale-105" : "scale-100"
              )}
            >
              {badgeLabels[accommodation.status]}
            </button>
          </div>
          <div className="mt-4 flex flex-col gap-3 text-sm text-ink/68">
            <a
              href={accommodation.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 underline decoration-olive/35 underline-offset-4"
            >
              <ExternalLink className="h-4 w-4 text-olive" />
              Website
            </a>
            <a href={`tel:${accommodation.phone}`} className="inline-flex items-center gap-2">
              <Phone className="h-4 w-4 text-olive" />
              {accommodation.phone}
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}

