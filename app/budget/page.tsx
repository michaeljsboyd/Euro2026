import { BudgetPlanner } from "@/components/budget-planner";
import { getPlannerData } from "@/lib/supabase/queries";

export default async function BudgetPage() {
  const data = await getPlannerData();

  return <BudgetPlanner currency={data.trip.currency} />;
}
