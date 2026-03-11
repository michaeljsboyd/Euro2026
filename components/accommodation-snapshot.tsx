"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { ExternalLink, Phone } from "lucide-react";

export type AccommodationStatus = "booked" | "tentative";

export interface AccommodationStay {
  id: string;
  city: string;
  hotel: string;
  status: AccommodationStatus;
  website: string;
  phone: string;
}

interface AccommodationSnapshotProps {
  accommodations: AccommodationStay[];
  onToggleStatus: (id: string) => void;
}

interface AccommodationCardProps {
  accommodation: AccommodationStay;
  onToggleStatus?: (id: string) => void;
  isAnimating?: boolean;
  href?: string;
}

const badgeStyles: Record<AccommodationStatus, string> = {
  booked: "bg-emerald-100 text-emerald-900 ring-emerald-200",
  tentative: "bg-amber-100 text-amber-900 ring-amber-200"
};

const badgeLabels: Record<AccommodationStatus, string> = {
  booked: "Booked",
  tentative: "Tentative"
};

export function AccommodationCard({
  accommodation,
  onToggleStatus,
  isAnimating = false,
  href
}: AccommodationCardProps) {
  const cardContent = (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-olive/80">
            {accommodation.city}
          </p>
          <p className="mt-2 font-semibold text-ink">{accommodation.hotel}</p>
          <p className="mt-1 text-sm text-ink/60">Luxury stay snapshot</p>
        </div>
        {onToggleStatus ? (
          <button
            type="button"
            onClick={() => onToggleStatus(accommodation.id)}
            className={clsx(
              "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ring-1 ring-inset transition-all duration-300 ease-out",
              badgeStyles[accommodation.status],
              isAnimating ? "scale-105" : "scale-100"
            )}
          >
            {badgeLabels[accommodation.status]}
          </button>
        ) : (
          <span
            className={clsx(
              "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ring-1 ring-inset transition-all duration-300 ease-out",
              badgeStyles[accommodation.status]
            )}
          >
            {badgeLabels[accommodation.status]}
          </span>
        )}
      </div>
      <div className="mt-4 flex flex-col gap-3 text-sm text-ink/68">
        <a
          href={accommodation.website}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 underline decoration-olive/35 underline-offset-4"
          onClick={(event) => event.stopPropagation()}
        >
          <ExternalLink className="h-4 w-4 text-olive" />
          Website
        </a>
        <a
          href={`tel:${accommodation.phone}`}
          className="inline-flex items-center gap-2"
          onClick={(event) => event.stopPropagation()}
        >
          <Phone className="h-4 w-4 text-olive" />
          {accommodation.phone}
        </a>
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block rounded-[22px] border border-[#ece3d5] bg-[#fffdfa] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(31,36,48,0.07)]"
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <article className="rounded-[22px] border border-[#ece3d5] bg-[#fffdfa] p-4">
      {cardContent}
    </article>
  );
}

export function AccommodationSnapshot({
  accommodations,
  onToggleStatus
}: AccommodationSnapshotProps) {
  const [animatingId, setAnimatingId] = useState<string | null>(null);

  const toggleStatus = (id: string) => {
    onToggleStatus(id);
    setAnimatingId(id);
    window.setTimeout(() => {
      setAnimatingId((current) => (current === id ? null : current));
    }, 240);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
      {accommodations.map((accommodation) => (
        <AccommodationCard
          key={accommodation.id}
          accommodation={accommodation}
          onToggleStatus={toggleStatus}
          isAnimating={animatingId === accommodation.id}
        />
      ))}
    </div>
  );
}
