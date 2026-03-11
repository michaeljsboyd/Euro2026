import Link from "next/link";
import { CalendarDays, CircleDollarSign, MapPinned, Plane } from "lucide-react";

import { AccommodationSnapshot } from "@/components/accommodation-snapshot";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { cityStays } from "@/lib/city-stays";
import { formatCurrency, formatDateRange, slugifyCity } from "@/lib/format";
import { getPlannerData } from "@/lib/supabase/queries";

export default async function DashboardPage() {
  const data = await getPlannerData();
  const accommodations = [
    {
      city: "Paris",
      hotel: "San Regis",
      status: "booked" as const,
      website: "https://www.hotel-sanregis.fr/en/",
      phone: "+33144951616"
    },
    {
      city: "Cap Ferrat",
      hotel: "Royal Riviera",
      status: "booked" as const,
      website: "https://www.royal-riviera.com",
      phone: "+33493763100"
    },
    {
      city: "Ibiza",
      hotel: "Destino",
      status: "tentative" as const,
      website: "https://destino.fivehotelsandresorts.com/",
      phone: "+34971317411"
    },
    {
      city: "Sicily",
      hotel: "Grand Hotel Timeo",
      status: "tentative" as const,
      website: "https://www.belmond.com/hotels/europe/italy/taormina/belmond-grand-hotel-timeo/",
      phone: "+3909426270200"
    },
    {
      city: "Rome",
      hotel: "Hasler",
      status: "booked" as const,
      website: "https://www.hotelhasslerroma.com/",
      phone: "+39066993401"
    }
  ];

  const bookedEvents = data.events.filter((event) => event.status === "booked").length;
  const pendingCount = [...data.events, ...data.bookings, ...data.places].filter(
    (item) => item.status === "tbc"
  ).length;
  const estimatedBudget = data.budgetItems.reduce((sum, item) => sum + item.estimatedAmount, 0);
  const citySummary = cityStays;

  const nextActions = [...data.events, ...data.bookings]
    .filter((item) => item.status !== "booked")
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Trip Dashboard"
        title={data.trip.name}
        description={`${formatDateRange(data.trip.startDate, data.trip.endDate)} across Paris, Nice, Ibiza, Sicily, and Rome. Built as a premium private control panel with seeded data and Supabase-ready structure.`}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Link
          href="/map"
          className="rounded-[24px] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:opacity-95 hover:shadow-[0_20px_50px_rgba(31,36,48,0.08)]"
        >
          <StatCard
            label="Cities"
            value={String(citySummary.length)}
            detail="Five curated stops with a different rhythm at each stage."
            icon={<MapPinned className="h-5 w-5" />}
          />
        </Link>
        <StatCard
          label="Days"
          value={String(data.days.length)}
          detail="Full journey window including travel and reset days."
          icon={<CalendarDays className="h-5 w-5" />}
        />
        <StatCard
          label="Booked"
          value={String(bookedEvents)}
          detail={`${pendingCount} items still need decisions or reservations.`}
          icon={<Plane className="h-5 w-5" />}
        />
        <StatCard
          label="Budget"
          value={formatCurrency(estimatedBudget, data.trip.currency)}
          detail="Estimated top-line spend across travel, stays, dining, and activities."
          icon={<CircleDollarSign className="h-5 w-5" />}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <SectionCard
          title="Trip Summary by City"
          subtitle="Date windows and trip pacing for each stop."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {citySummary.map((summary) => (
              <Link
                key={`${summary.city}-${summary.start}`}
                href={`/city/${slugifyCity(summary.city)}`}
                className="group rounded-[24px] bg-[#f7f2ea] p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[#fbf7ef] hover:shadow-[0_22px_50px_rgba(31,36,48,0.09)]"
              >
                <article className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-3xl text-ink transition-colors duration-300 group-hover:text-[#171b24]">
                      {summary.city}
                    </h3>
                    <p className="mt-2 text-sm text-ink/65">
                      {formatDateRange(summary.start, summary.end)}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-ink/70 transition-all duration-300 group-hover:bg-[#fffdfa] group-hover:shadow-[0_8px_18px_rgba(31,36,48,0.06)]">
                    {summary.nights} {summary.nights === 1 ? "night" : "nights"}
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Pending Actions" subtitle="High-signal items still to lock in.">
          <div className="space-y-3">
            {nextActions.map((item) => (
              <div key={item.id} className="rounded-[22px] bg-[#f7f2ea] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-ink">{item.title}</p>
                    <p className="text-sm text-ink/60">{item.city}</p>
                  </div>
                  <StatusBadge status={item.status} />
                </div>
                <p className="mt-3 text-sm leading-6 text-ink/65">{item.notes}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <SectionCard title="Accommodation Snapshot" subtitle="A clean hotel overview across the key stays on the trip.">
          <AccommodationSnapshot accommodations={accommodations} />
        </SectionCard>

        <SectionCard title="Planner Notes" subtitle="The seeded v1 data is designed to be easy to replace with your real trip details.">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[24px] bg-[#f7f2ea] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-olive">Trip Notes</p>
              <p className="mt-3 text-sm leading-7 text-ink/70">{data.trip.notes}</p>
            </div>
            <div className="rounded-[24px] bg-[#f7f2ea] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-olive">Admin Flow</p>
              <p className="mt-3 text-sm leading-7 text-ink/70">
                Each page is structured like an internal control panel so you can swap seeded content for Supabase records without redesigning the interface.
              </p>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
