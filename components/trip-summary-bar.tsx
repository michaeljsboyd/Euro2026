"use client";

import { formatCurrency } from "@/lib/format";

interface TripSummaryBarProps {
  totalDays: number;
  totalEvents: number;
  bookedPercent: number;
  totalEstimatedSpend: number;
  currency?: string;
}

interface StatBlockProps {
  label: string;
  value: string;
}

function StatBlock({ label, value }: StatBlockProps) {
  return (
    <div className="space-y-2 text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-olive/70">
        {label}
      </p>
      <p className="text-2xl font-semibold tracking-[-0.03em] text-ink">{value}</p>
    </div>
  );
}

export function TripSummaryBar({
  totalDays,
  totalEvents,
  bookedPercent,
  totalEstimatedSpend,
  currency = "EUR"
}: TripSummaryBarProps) {
  return (
    <section className="rounded-[28px] border border-white/60 bg-white/80 px-6 py-5 shadow-[0_18px_40px_rgba(31,36,48,0.05)] backdrop-blur-sm">
      <div className="grid gap-5 md:grid-cols-4">
        <StatBlock label="Trip Days" value={String(totalDays)} />
        <StatBlock label="Events" value={String(totalEvents)} />
        <StatBlock label="% Booked" value={`${Math.round(bookedPercent)}%`} />
        <StatBlock
          label="Estimated Spend"
          value={formatCurrency(totalEstimatedSpend, currency)}
        />
      </div>
    </section>
  );
}
