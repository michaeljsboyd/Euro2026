import { ExternalLink, FileText, FolderKanban, Link as LinkIcon } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { formatCurrency } from "@/lib/format";
import { getPlannerData } from "@/lib/supabase/queries";

export default async function BookingsPage() {
  const data = await getPlannerData();

  const groupedDocuments = data.documents.reduce<Record<string, typeof data.documents>>((accumulator, document) => {
    accumulator[document.city] = [...(accumulator[document.city] ?? []), document];
    return accumulator;
  }, {});

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Bookings & Documents"
        title="Travel Records"
        description="A clean admin-style repository for confirmations, document links, storage paths, payment context, and notes."
      />

      <SectionCard
        title="Document Library"
        subtitle="Grouped by city so confirmations, ideas, and uploaded files stay easy to scan."
      >
        <div className="space-y-8">
          {Object.entries(groupedDocuments).map(([city, documents]) => (
            <div key={city} className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display text-3xl text-ink">{city}</h3>
                <span className="rounded-full bg-[#f7f2ea] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-ink/70">
                  {documents.length} records
                </span>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                {documents.map((document) => (
                  <article key={document.id} className="rounded-[24px] border border-white/70 bg-[#fffdfa] p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 text-sm text-olive">
                          <FileText className="h-4 w-4" />
                          {document.type}
                        </div>
                        <h4 className="text-lg font-semibold text-ink">{document.title}</h4>
                      </div>
                      <StatusBadge status={document.status} />
                    </div>
                    <div className="mt-5 space-y-3 text-sm text-ink/70">
                      <p className="inline-flex items-center gap-2">
                        <FolderKanban className="h-4 w-4 text-olive" />
                        {document.filePath ?? "No file uploaded yet"}
                      </p>
                      <p className="inline-flex items-center gap-2">
                        <LinkIcon className="h-4 w-4 text-olive" />
                        {document.link ? (
                          <a
                            className="inline-flex items-center gap-1 text-ink underline decoration-olive/40 underline-offset-4"
                            href={document.link}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Open link
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        ) : (
                          "No external link saved"
                        )}
                      </p>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                        Paid: {formatCurrency(document.amountPaid, data.trip.currency)}
                      </p>
                      <p className="leading-6">{document.notes}</p>
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

