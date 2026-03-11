"use client";

import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { formatCurrency } from "@/lib/format";

interface BudgetPlannerProps {
  currency?: string;
}

interface BudgetColumn {
  id: string;
  label: string;
  derived?: boolean;
}

interface BudgetRow {
  id: string;
  category: string;
  values: Record<string, number>;
}

const defaultColumns: BudgetColumn[] = [
  { id: "planned", label: "Planned" },
  { id: "spent", label: "Spent" },
  { id: "remaining", label: "Remaining", derived: true }
];

const defaultRows: BudgetRow[] = [
  { id: "row-flights", category: "Flights", values: { planned: 0, spent: 0 } },
  { id: "row-accommodation", category: "Accommodation", values: { planned: 0, spent: 0 } },
  { id: "row-dining", category: "Dining", values: { planned: 0, spent: 0 } },
  { id: "row-shopping", category: "Shopping", values: { planned: 0, spent: 0 } },
  { id: "row-beach-clubs", category: "Beach Clubs", values: { planned: 0, spent: 0 } },
  { id: "row-party-supplies", category: "Party Supplies", values: { planned: 0, spent: 0 } }
];

function parseAmount(value: string) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
}

function getDerivedValue(row: BudgetRow, columnId: string) {
  if (columnId === "remaining") {
    return (row.values.planned ?? 0) - (row.values.spent ?? 0);
  }

  return row.values[columnId] ?? 0;
}

export function BudgetPlanner({ currency = "EUR" }: BudgetPlannerProps) {
  const [columns, setColumns] = useState(defaultColumns);
  const [rows, setRows] = useState(defaultRows);

  const totals = useMemo(() => {
    return columns.reduce<Record<string, number>>((accumulator, column) => {
      accumulator[column.id] = rows.reduce(
        (sum, row) => sum + getDerivedValue(row, column.id),
        0
      );
      return accumulator;
    }, {});
  }, [columns, rows]);

  const addCategory = () => {
    setRows((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        category: "New Category",
        values: columns.reduce<Record<string, number>>((accumulator, column) => {
          if (!column.derived) {
            accumulator[column.id] = 0;
          }
          return accumulator;
        }, {})
      }
    ]);
  };

  const deleteCategory = (rowId: string) => {
    setRows((current) => current.filter((row) => row.id !== rowId));
  };

  const updateCategoryName = (rowId: string, value: string) => {
    setRows((current) =>
      current.map((row) => (row.id === rowId ? { ...row, category: value } : row))
    );
  };

  const updateValue = (rowId: string, columnId: string, value: string) => {
    setRows((current) =>
      current.map((row) =>
        row.id === rowId
          ? {
              ...row,
              values: {
                ...row.values,
                [columnId]: parseAmount(value)
              }
            }
          : row
      )
    );
  };

  const addColumn = () => {
    const nextIndex = columns.filter((column) => !column.derived).length + 1;
    const id = `column-${Date.now()}`;

    setColumns((current) => [
      ...current.filter((column) => !column.derived),
      { id, label: `Column ${nextIndex}` },
      ...current.filter((column) => column.derived)
    ]);

    setRows((current) =>
      current.map((row) => ({
        ...row,
        values: {
          ...row.values,
          [id]: 0
        }
      }))
    );
  };

  const updateColumnName = (columnId: string, value: string) => {
    setColumns((current) =>
      current.map((column) =>
        column.id === columnId && !column.derived ? { ...column, label: value } : column
      )
    );
  };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Budget"
        title="Budget Planner"
        description="A compact working budget sheet with editable categories, flexible spend columns, and live totals."
      />

      <SectionCard
        title="Budget Table"
        subtitle="Add categories, add numeric columns, and keep the running totals clean."
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
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-[#f7f2ea]">
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.22em] text-olive">
                    Category
                  </th>
                  {columns.map((column) => (
                    <th
                      key={column.id}
                      className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.22em] text-olive"
                    >
                      {column.derived ? (
                        column.label
                      ) : (
                        <input
                          value={column.label}
                          onChange={(event) => updateColumnName(column.id, event.target.value)}
                          className="w-full min-w-[120px] border-none bg-transparent p-0 text-xs font-semibold uppercase tracking-[0.22em] text-olive outline-none"
                        />
                      )}
                    </th>
                  ))}
                  <th className="w-[56px] px-5 py-4" />
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-t border-[#efe4d3]">
                    <td className="px-5 py-4">
                      <input
                        value={row.category}
                        onChange={(event) => updateCategoryName(row.id, event.target.value)}
                        className="w-full min-w-[180px] border-none bg-transparent p-0 text-sm font-semibold text-ink outline-none"
                      />
                    </td>
                    {columns.map((column) => (
                      <td key={column.id} className="px-5 py-4">
                        {column.derived ? (
                          <p
                            className={`text-sm font-semibold ${
                              getDerivedValue(row, column.id) >= 0
                                ? "text-emerald-800"
                                : "text-rose-700"
                            }`}
                          >
                            {formatCurrency(getDerivedValue(row, column.id), currency)}
                          </p>
                        ) : (
                          <input
                            type="number"
                            min="0"
                            step="1"
                            value={row.values[column.id] ?? 0}
                            onChange={(event) =>
                              updateValue(row.id, column.id, event.target.value)
                            }
                            className="w-full min-w-[120px] rounded-[18px] border border-[#e7dccd] bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-gold"
                          />
                        )}
                      </td>
                    ))}
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => deleteCategory(row.id)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#ead8cf] bg-[#fff6f2] text-[#7c4a42] transition-all duration-300 hover:bg-[#fff1ea]"
                        aria-label={`Delete ${row.category}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-[#e8dece] bg-[#f7f2ea]">
                  <td className="px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-ink">
                    Totals
                  </td>
                  {columns.map((column) => (
                    <td key={column.id} className="px-5 py-4 text-sm font-semibold text-ink">
                      {formatCurrency(totals[column.id] ?? 0, currency)}
                    </td>
                  ))}
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
