import clsx from "clsx";
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

export function StatusBadge({ status }: { status: BookingStatus }) {
  const Icon = icons[status];

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] ring-1 ring-inset",
        styles[status]
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {labels[status]}
    </span>
  );
}
