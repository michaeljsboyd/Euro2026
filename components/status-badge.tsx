import clsx from "clsx";

import { BookingStatus } from "@/lib/types";

const styles: Record<BookingStatus, string> = {
  Booked: "bg-emerald-100 text-emerald-900 ring-emerald-200",
  Tentative: "bg-amber-100 text-amber-900 ring-amber-200",
  "Need to Book": "bg-rose-100 text-rose-900 ring-rose-200"
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ring-1 ring-inset",
        styles[status]
      )}
    >
      {status}
    </span>
  );
}

