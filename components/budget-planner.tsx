"use client";

import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { formatCurrency } from "@/lib/format";

interface BudgetPlannerProps {
  currency?: string;
}

type BudgetRow = {
  id: string;
  category: string;
  values: Record<string, number>;
};

const defaultColumns = ["Planned", "Spent"] as const;

function createRow(name: string, columns: readonly string[]): BudgetRow {
  const values: Record<string, number> = {};
  columns.forEach((column) => {
    values[column] = 0;
  });

  return {
    id: crypto.randomUUID(),
    category: name,
    values
  };
}

function parseAmount(value: string) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[24px] border border-[#e8dece] bg-white/80 p-6 shadow-[0_18px_40px_rgba(112,88,57,0.08)]">
      <p className="text-[11px] uppercase tracking-[0.26em] text-olive/70">{label}</p>
      <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-ink">{value}</p>
    </div>
  );
}

export function BudgetPlanner({ currency = "EUR" }: BudgetPlannerProps) {
  const [columns, setColumns] = useState<string[]>([...defaultColumns]);
  const [rows, setRows] = useState<BudgetRow[]>([
    createRow("Flights", defaultColumns),
    createRow("Accommodation", defaultColumns),
    createRow("Dining", defaultColumns),
    createRow("Shopping", defaultColumns),
    createRow("Beach Clubs", defaultColumns),
    createRow("Party Supplies", defaultColumns)
  ]);

  const totals = useMemo(() => {
    return columns.reduce<Record<string, number>>((accumulator, column) => {
      accumulator[column] = rows.reduce((sum, row) => sum + (row.values[column] ?? 0), 0);
      return accumulator;
    }, {});
  }, [columns, rows]);

  const totalPlanned = totals.Planned ?? 0;
  const totalSpent = totals.Spent ?? 0;
  const remaining = totalPlanned - totalSpent;
  const percentUsed = totalPlanned > 0 ? (totalSpent / totalPlanned) * 100 : 0;

  const addCategory = () => {
    setRows((current) => [...current, createRow("New Category", columns)]);
  };

  const removeCategory = (id: string) => {
    setRows((current) => current.filter((row) => row.id !== id));
  };

  const updateCategory = (rowId: string, name: string) => {
    setRows((current) =>
      current.map((row) => (row.id === rowId ? { ...row, category: name } : row))
    );
  };

  const updateCell = (rowId: string, column: string, value: string) => {
    setRows((current) =>
      current.map((row) =>
        row.id === rowId
          ? { ...row, values: { ...row.values, [column]: parseAmount(value) } }
          : row
      )
    );
  };

  const addColumn = () => {
    const name = window.prompt("New column name?");
    if (!name) {
      return;
    }

    const trimmedName = name.trim();
    if (!trimmedName || columns.includes(trimmedName)) {
      return;
    }

    setColumns((current) => [...current, trimmedName]);
    setRows((current) =>
      current.map((row) => ({
        ...row,
        values: { ...row.values, [trimmedName]: 0 }
      }))
    );
  };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Budget"
        title="Budget Planner"
        description="A live working budget with editable categories, flexible spend columns, and a compact trip summary."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Total Planned" value={formatCurrency(totalPlanned, currency)} />
        <SummaryCard label="Total Spent" value={formatCurrency(totalSpent, currency)} />
        <SummaryCard label="Remaining" value={formatCurrency(remaining, currency)} />
        <SummaryCard label="% Used" value={`${percentUsed.toFixed(0)}%`} />
      </div>

      <SectionCard
        title="Budget Table"
        subtitle="Edit categories inline, add working columns, and keep totals current."
        action={
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={addCategory}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/70 bg-white/75 px-4 py-2 text-sm font-medium text-ink/72 transition-all duration-300 hover:bg-white hover:text-ink"
            >
              <Plus className="h-4 w-4" />
              Add Category
            </button>
            <button
              type="button"
              onClick={addColumn}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/70 bg-white/75 px-4 py-2 text-sm font-medium text-ink/72 transition-all duration-300 hover:bg-white hover:text-ink"
            >
              <Plus className="h-4 w-4" />
              Add Column
            </button>
          </div>
        }
      >
        <div className="overflow-hidden rounded-[24px] border border-[#e8dece] bg-[#fffdfa]">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead className="bg-[#f7f2ea]">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.22em] text-olive">
                    Category
                  </th>
                  {columns.map((column) => (
                    <th
                      key={column}
                      className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.22em] text-olive"
                    >
                      {column}
                    </th>
                  ))}
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.22em] text-olive">
                    Remaining
                  </th>
                  <th className="w-[56px] px-5 py-4" />
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const planned = row.values.Planned ?? 0;
                  const spent = row.values.Spent ?? 0;
                  const rowRemaining = planned - spent;

                  return (
                    <tr key={row.id} className="border-t border-[#efe4d3]">
                      <td className="px-5 py-4">
                        <input
                          value={row.category}
                          onChange={(event) => updateCategory(row.id, event.target.value)}
                          className="w-full min-w-[180px] border-none bg-transparent p-0 text-sm font-semibold text-ink outline-none"
                        />
                      </td>
                      {columns.map((column) => (
                        <td key={column} className="px-5 py-4">
                          <input
                            type="number"
                            value={row.values[column] ?? 0}
                            onChange={(event) => updateCell(row.id, column, event.target.value)}
                            className="w-full min-w-[120px] rounded-[18px] border border-[#e7dccd] bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-gold"
                          />
                        </td>
                      ))}
                      <td
                        className={`px-5 py-4 text-sm font-semibold ${
                          rowRemaining >= 0 ? "text-emerald-800" : "text-rose-700"
                        }`}
                      >
                        {formatCurrency(rowRemaining, currency)}
                      </td>
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() => removeCategory(row.id)}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#ead8cf] bg-[#fff6f2] text-[#7c4a42] transition-all duration-300 hover:bg-[#fff1ea]"
                          aria-label={`Delete ${row.category}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
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
                  {columns.map((column) => (
                    <td key={column} className="px-5 py-4 text-sm font-semibold text-ink">
                      {formatCurrency(totals[column] ?? 0, currency)}
                    </td>
                  ))}
                  <td
                    className={`px-5 py-4 text-sm font-semibold ${
                      remaining >= 0 ? "text-emerald-800" : "text-rose-700"
                    }`}
                  >
                    {formatCurrency(remaining, currency)}
                  </td>
                  <td className="px-5 py-4" />
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
