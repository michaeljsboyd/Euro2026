import { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}

export function PageHeader({ eyebrow, title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-6 border-b border-white/60 pb-8 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-olive">{eyebrow}</p>
        <h1 className="font-display text-4xl text-ink md:text-6xl">{title}</h1>
        <p className="max-w-2xl text-sm leading-7 text-ink/70 md:text-base">{description}</p>
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}

