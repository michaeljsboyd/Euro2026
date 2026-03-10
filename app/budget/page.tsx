import { PageHeader } from "@/components/page-header";
import { BudgetBar } from "@/components/budget-bar";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { formatCurrency } from "@/lib/format";
import { getPlannerData } from "@/lib/supabase/queries";

export default async function BudgetPage() {
  const data = await getPlannerData();

  const estimatedTotal = data.budgetItems.reduce((sum, item) => sum + item.estimatedAmount, 0);
  const paidTotal = data.budgetItems.reduce((sum, item) => sum + item.paidAmount, 0);

  const categorySummary = data.budgetItems.reduce<
    Record<string, { estimated: number; paid: number; count: number }>
  >((accumulator, item) => {
    const current = accumulator[item.category] ?? { estimated: 0, paid: 0, count: 0 };
    accumulator[item.category] = {
      estimated: current.estimated + item.estimatedAmount,
      paid: current.paid + item.paidAmount,
      count: current.count + 1
    };
    return accumulator;
  }, {});

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Budget Tracker"
        title="Planned vs Paid"
        description="A simple trip budget dashboard with category rollups, line items, status tags, and notes so spend decisions stay visible."
      />

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <SectionCard title="Budget Snapshot" subtitle="Top-line view across the full holiday.">
          <div className="space-y-5">
            <div className="rounded-[24px] bg-[#f7f2ea] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-olive">Estimated Total</p>
              <p className="mt-3 font-display text-5xl text-ink">
                {formatCurrency(estimatedTotal, data.trip.currency)}
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[24px] bg-[#fffdfa] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-olive">Paid So Far</p>
                <p className="mt-3 text-2xl font-semibold text-ink">
                  {formatCurrency(paidTotal, data.trip.currency)}
                </p>
              </div>
              <div className="rounded-[24px] bg-[#fffdfa] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-olive">Remaining</p>
                <p className="mt-3 text-2xl font-semibold text-ink">
                  {formatCurrency(estimatedTotal - paidTotal, data.trip.currency)}
                </p>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Category Summary" subtitle="How the plan stacks up across the major spend buckets.">
          <div className="grid gap-4 md:grid-cols-2">
            {Object.entries(categorySummary).map(([category, summary]) => (
              <article key={category} className="rounded-[24px] border border-[#ede4d6] bg-[#fffdfa] p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-2xl text-ink">{category}</h3>
                  <span className="rounded-full bg-sand px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-ink/70">
                    {summary.count} items
                  </span>
                </div>
                <div className="mt-5 space-y-3">
                  <BudgetBar paidAmount={summary.paid} estimatedAmount={summary.estimated} />
                  <div className="flex items-center justify-between gap-4 text-sm text-ink/65">
                    <span>{formatCurrency(summary.paid, data.trip.currency)} paid</span>
                    <span>{formatCurrency(summary.estimated, data.trip.currency)} planned</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Budget Line Items" subtitle="Editable-style rows with city context, payment state, and notes.">
        <div className="space-y-4">
          {data.budgetItems.map((item) => (
            <article key={item.id} className="rounded-[24px] border border-[#ede4d6] bg-[#fffdfa] p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                    <StatusBadge status={item.status} />
                    <span className="rounded-full bg-sand px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-ink/70">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-sm text-ink/60">{item.city ?? "Whole trip"}</p>
                  <p className="text-sm leading-6 text-ink/68">{item.notes}</p>
                </div>
                <div className="grid min-w-[240px] gap-3 sm:grid-cols-2">
                  <div className="rounded-[18px] bg-[#f7f2ea] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-olive">Estimated</p>
                    <p className="mt-2 text-lg font-semibold text-ink">
                      {formatCurrency(item.estimatedAmount, data.trip.currency)}
                    </p>
                  </div>
                  <div className="rounded-[18px] bg-[#f7f2ea] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-olive">Paid</p>
                    <p className="mt-2 text-lg font-semibold text-ink">
                      {formatCurrency(item.paidAmount, data.trip.currency)}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
