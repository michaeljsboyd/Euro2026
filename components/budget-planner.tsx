"use client";

import { useMemo, useState } from "react";

import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { formatCurrency } from "@/lib/format";

interface BudgetPlannerProps {
  currency?: string;
}

interface BudgetRow {
  category: string;
  budgeted: number;
  actual: number;
}

const defaultRows: BudgetRow[] = [
  { category: "Flights", budgeted: 0, actual: 0 },
  { category: "Accommodation", budgeted: 0, actual: 0 },
  { category: "Dining", budgeted: 0, actual: 0 },
  { category: "Shopping", budgeted: 0, actual: 0 },
  { category: "Beach Clubs", budgeted: 0, actual: 0 },
  { category: "Party Supplies", budgeted: 0, actual: 0 }
];

function parseAmount(value: string) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
}

export function BudgetPlanner({ currency = "EUR" }: BudgetPlannerProps) {
  const [rows, setRows] = useState(defaultRows);

  const totals = useMemo(() => {
    const budgeted = rows.reduce((sum, row) => sum + row.budgeted, 0);
    const actual = rows.reduce((sum, row) => sum + row.actual, 0);

    return {
      budgeted,
      actual,
      difference: budgeted - actual
    };
  }, [rows]);

  const updateRow = (index: number, field: "budgeted" | "actual", value: string) => {
    setRows((current) =>
      current.map((row, rowIndex) =>
        rowIndex === index ? { ...row, [field]: parseAmount(value) } : row
      )
    );
  };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Budget"
        title="Budget Planner"
        description="A minimal working budget with editable category totals, live difference tracking, and clear trip-wide totals."
      />

      <SectionCard title="Budget Table" subtitle="Update budgeted and actual spend inline. Differences recalculate automatically.">
        <div className="overflow-hidden rounded-[24px] border border-[#e8dece] bg-[#fffdfa]">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-[#f7f2ea]">
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.22em] text-olive">
                    Category
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.22em] text-olive">
                    Budgeted Amount
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.22em] text-olive">
                    Actual Spend
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.22em] text-olive">
                    Difference
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => {
                  const difference = row.budgeted - row.actual;

                  return (
                    <tr key={row.category} className="border-t border-[#efe4d3]">
                      <td className="px-5 py-4 text-sm font-semibold text-ink">{row.category}</td>
                      <td className="px-5 py-4">
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={row.budgeted}
                          onChange={(event) => updateRow(index, "budgeted", event.target.value)}
                          className="w-full min-w-[140px] rounded-[18px] border border-[#e7dccd] bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-gold"
                        />
                      </td>
                      <td className="px-5 py-4">
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={row.actual}
                          onChange={(event) => updateRow(index, "actual", event.target.value)}
                          className="w-full min-w-[140px] rounded-[18px] border border-[#e7dccd] bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-gold"
                        />
                      </td>
                      <td className="px-5 py-4">
                        <p className={`text-sm font-semibold ${difference >= 0 ? "text-emerald-800" : "text-rose-700"}`}>
                          {formatCurrency(difference, currency)}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t border-[#e8dece] bg-[#f7f2ea]">
                  <td className="px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-ink">
                    Totals
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-ink">
                    {formatCurrency(totals.budgeted, currency)}
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-ink">
                    {formatCurrency(totals.actual, currency)}
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-ink">
                    {formatCurrency(totals.difference, currency)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

