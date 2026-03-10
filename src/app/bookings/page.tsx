import { Shell } from '@/components/shell';
import { StatusBadge } from '@/components/status-badge';
import { documents } from '@/lib/sampleData';

export default function BookingsPage() {
  return (
    <Shell>
      <section className="card">
        <h2 className="section-title">Bookings & Documents</h2>
        <p className="muted mt-2">Store booking references, upload files to Supabase storage, and keep planning notes in one place.</p>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="pb-3">Document</th>
                <th className="pb-3">City</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {documents.map((doc) => (
                <tr key={doc.id}>
                  <td className="py-3">
                    <a className="font-medium text-accent-600 hover:underline" href={doc.link} target="_blank">
                      {doc.title}
                    </a>
                    <p className="muted">{doc.fileName}</p>
                  </td>
                  <td className="py-3">{doc.city}</td>
                  <td className="py-3">{doc.type}</td>
                  <td className="py-3"><StatusBadge status={doc.status} /></td>
                  <td className="py-3 text-slate-600">{doc.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Shell>
  );
}
