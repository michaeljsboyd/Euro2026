import { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function SectionCard({
  title,
  subtitle,
  action,
  children,
  className = ""
}: SectionCardProps) {
  return (
    <section className={`rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-panel backdrop-blur ${className}`}>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl text-ink">{title}</h2>
          {subtitle ? <p className="mt-2 text-sm text-ink/60">{subtitle}</p> : null}
        </div>
        {action ? <div>{action}</div> : null}
      </div>
      {children}
    </section>
  );
}

