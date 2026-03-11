import { OverviewSummary } from "@/components/overview-summary";
import { getPlannerData } from "@/lib/supabase/queries";

export default async function OverviewPage() {
  const data = await getPlannerData();

  return <OverviewSummary days={data.days} initialEvents={data.events} />;
}
