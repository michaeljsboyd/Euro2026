"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/itinerary", label: "Daily Flow" },
  { href: "/overview", label: "Overview" },
  { href: "/bookings", label: "Bookings" },
  { href: "/places", label: "Saved Places" },
  { href: "/budget", label: "Budget" }
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="sticky top-4 z-30 mb-8 rounded-[32px] border border-white/60 bg-[rgba(255,250,244,0.72)] p-3 shadow-panel backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 px-2 py-1 md:px-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-olive">
                Private Trip Planner
              </p>
              <h1 className="font-display text-3xl text-ink">Europe 2026</h1>
            </div>

            <button
              type="button"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/70 text-ink transition-all duration-300 hover:border-white hover:bg-white md:hidden"
            >
              <span
                className={clsx(
                  "transition-transform duration-300",
                  mobileMenuOpen ? "rotate-90" : "rotate-0"
                )}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </span>
            </button>

            <nav className="hidden md:block">
              <div className="flex flex-wrap items-center gap-2 rounded-full border border-white/60 bg-[rgba(247,242,234,0.78)] p-1.5">
                {links.map((link) => {
                  const active = pathname === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={clsx(
                        "group relative overflow-hidden rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 ease-out",
                        active
                          ? "bg-ink text-white shadow-[0_10px_30px_rgba(31,36,48,0.18)]"
                          : "text-ink/72 hover:-translate-y-px hover:bg-white hover:text-ink"
                      )}
                    >
                      <span
                        className={clsx(
                          "absolute inset-0 rounded-full bg-white/70 opacity-0 transition-opacity duration-300",
                          active ? "hidden" : "group-hover:opacity-100"
                        )}
                      />
                      <span className="relative z-10">{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>

          <div
            className={clsx(
              "overflow-hidden transition-all duration-300 ease-out md:hidden",
              mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <nav className="mt-3 border-t border-white/60 px-2 pt-4">
              <div className="grid gap-2">
                {links.map((link) => {
                  const active = pathname === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={clsx(
                        "rounded-[22px] px-4 py-3 text-sm font-medium transition-all duration-300 ease-out",
                        active
                          ? "bg-ink text-white shadow-[0_12px_32px_rgba(31,36,48,0.18)]"
                          : "bg-white/55 text-ink/72 hover:bg-white hover:text-ink"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>
        </header>
        <main className="flex-1 pb-8">{children}</main>
      </div>
    </div>
  );
}
