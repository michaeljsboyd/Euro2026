import Link from 'next/link';
import { ReactNode } from 'react';

const links = [
  { href: '/', label: 'Dashboard' },
  { href: '/itinerary', label: 'Itinerary' },
  { href: '/bookings', label: 'Bookings & Docs' },
  { href: '/places', label: 'Saved Places' },
  { href: '/budget', label: 'Budget' }
];

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-6xl px-4 pb-10 pt-6 sm:px-6 lg:px-8">
      <header className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Private Family Trip Planner</p>
        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="text-2xl font-semibold sm:text-3xl">Europe 2026</h1>
          <nav className="flex flex-wrap gap-2 text-sm">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-xl border border-slate-200 px-3 py-1.5 hover:border-slate-300">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
