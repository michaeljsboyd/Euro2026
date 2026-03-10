import { Shell } from '@/components/shell';
import { budgetItems } from '@/lib/sampleData';

const planned = budgetItems.reduce((sum, item) => sum + item.planned, 0);
const actual = budgetItems.reduce((sum, item) => sum + item.actual, 0);

export default function BudgetPage() {
  return (
    <Shell>
      <section className="grid gap-4 sm:grid-cols-2">
        <div className="card">
          <p className="muted">Planned total</p>
          <p className="mt-1 text-2xl font-semibold">€{planned.toLocaleString()}</p>
        </div>
        <div className="card">
          <p className="muted">Actual total</p>
          <p className="mt-1 text-2xl font-semibold">€{actual.toLocaleString()}</p>
        </div>
      </section>

      <section className="card mt-6">
        <h2 className="section-title">Budget by category</h2>
        <div className="mt-4 space-y-3">
          {budgetItems.map((item) => (
            <div key={item.id} className="rounded-xl border border-slate-100 p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium">{item.category} · {item.city}</p>
                <p className="text-sm font-semibold text-slate-700">€{item.actual.toLocaleString()} / €{item.planned.toLocaleString()}</p>
              </div>
              <p className="muted mt-1">{item.notes}</p>
            </div>
          ))}
        </div>
      </section>
    </Shell>
  );
}
