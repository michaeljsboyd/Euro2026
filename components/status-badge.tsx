import clsx from "clsx";
import { MouseEvent } from "react";
import { Check, CircleHelp, Clock3, X } from "lucide-react";

import { BookingStatus } from "@/lib/types";

const styles: Record<BookingStatus, string> = {
  booked: "bg-emerald-200 text-emerald-950 ring-emerald-300",
  tentative: "bg-amber-200 text-amber-950 ring-amber-300",
  tbc: "bg-slate-200 text-slate-800 ring-slate-300",
  cancelled: "bg-slate-200 text-slate-700 ring-slate-300"
};

const labels: Record<BookingStatus, string> = {
  booked: "Booked",
  tentative: "Tentative",
  tbc: "TBC",
  cancelled: "Cancelled"
};

const icons: Record<BookingStatus, typeof Check> = {
  booked: Check,
  tentative: Clock3,
  tbc: CircleHelp,
  cancelled: X
};

interface StatusBadgeProps {
  status: BookingStatus;
  onClick?: () => void;
}

export function StatusBadge({ status, onClick }: StatusBadgeProps) {
  const Icon = icons[status];

  return (
    <span
      onClick={(event: MouseEvent<HTMLSpanElement>) => {
        event.stopPropagation();
        onClick?.();
      }}
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] ring-1 ring-inset transition-all duration-200 ease-out",
        onClick ? "cursor-pointer hover:scale-105 hover:shadow-[0_10px_20px_rgba(31,36,48,0.08)]" : "",
        styles[status]
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {labels[status]}
    </span>
  );
}
