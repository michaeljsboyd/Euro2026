import clsx from "clsx";

import { BookingStatus } from "@/lib/types";

const styles: Record<BookingStatus, string> = {
  booked: "bg-emerald-100 text-emerald-900 ring-emerald-200",
  tentative: "bg-amber-100 text-amber-900 ring-amber-200",
  tbc: "bg-stone-200 text-stone-800 ring-stone-300",
  cancelled: "bg-slate-200 text-slate-700 ring-slate-300"
};

const labels: Record<BookingStatus, string> = {
  booked: "Booked",
  tentative: "Tentative",
  tbc: "TBC",
  cancelled: "Cancelled"
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ring-1 ring-inset",
        styles[status]
      )}
    >
      {labels[status]}
    </span>
  );
}
