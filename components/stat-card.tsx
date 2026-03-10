import { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string;
  detail: string;
  icon?: ReactNode;
}

export function StatCard({ label, value, detail, icon }: StatCardProps) {
  return (
    <div className="rounded-[24px] border border-white/60 bg-[#fffdfa]/90 p-5 shadow-panel">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-olive">{label}</p>
        {icon ? <div className="text-olive">{icon}</div> : null}
      </div>
      <div className="space-y-2">
        <p className="font-display text-4xl leading-none text-ink">{value}</p>
        <p className="text-sm leading-6 text-ink/65">{detail}</p>
      </div>
    </div>
  );
}

