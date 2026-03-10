import { ExternalLink, FileText, Hash, CalendarDays } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { formatDate } from "@/lib/format";
import { getPlannerData } from "@/lib/supabase/queries";

export default async function BookingsPage() {
  const data = await getPlannerData();

  const groupedBookings = data.bookings.reduce<Record<string, typeof data.bookings>>((accumulator, booking) => {
    accumulator[booking.city] = [...(accumulator[booking.city] ?? []), booking];
    return accumulator;
  }, {});

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Bookings"
        title="Travel Records"
        description="A clean record of hotels, restaurants, flights, and activities with confirmations, dates, notes, and optional files."
      />

      <SectionCard
        title="Booking Library"
        subtitle="Grouped by city so the live trip record stays calm and easy to scan."
      >
        <div className="space-y-8">
          {Object.entries(groupedBookings).map(([city, bookings]) => (
            <div key={city} className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display text-3xl text-ink">{city}</h3>
                <span className="rounded-full bg-[#f7f2ea] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-ink/70">
                  {bookings.length} records
                </span>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                {bookings.map((booking) => (
                  <article key={booking.id} className="rounded-[24px] border border-white/70 bg-[#fffdfa] p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 text-sm text-olive">
                          <FileText className="h-4 w-4" />
                          {booking.type}
                        </div>
                        <h4 className="text-lg font-semibold text-ink">{booking.title}</h4>
                      </div>
                      <StatusBadge status={booking.status} />
                    </div>
                    <div className="mt-5 space-y-3 text-sm text-ink/70">
                      <p className="inline-flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-olive" />
                        {formatDate(booking.date)}
                      </p>
                      <p className="inline-flex items-center gap-2">
                        <Hash className="h-4 w-4 text-olive" />
                        {booking.confirmationNumber || "No confirmation number yet"}
                      </p>
                      <p className="inline-flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 text-olive" />
                        {booking.fileUrl ? (
                          <a
                            className="inline-flex items-center gap-1 text-ink underline decoration-olive/40 underline-offset-4"
                            href={booking.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Open file
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        ) : (
                          "No file attached"
                        )}
                      </p>
                      {booking.notes ? <p className="leading-6">{booking.notes}</p> : null}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
