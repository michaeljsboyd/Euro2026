import { OverviewGrid } from "@/components/overview-grid";
import { PageHeader } from "@/components/page-header";
import { getPlannerData } from "@/lib/supabase/queries";

export default async function OverviewPage() {
  const data = await getPlannerData();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Overview"
        title="Trip Grid"
        description="A compact schedule matrix across the full trip, with days in sequence, city shifts softly marked, and travel days called out without adding dashboard clutter."
      />
      <OverviewGrid days={data.days} events={data.events} />
    </div>
  );
}

