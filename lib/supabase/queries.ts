import { sampleData } from "@/lib/sample-data";
import { createPlannerClient } from "@/lib/supabase/client";
import { BudgetItem, Day, Document, Event, Place, PlannerData, Trip } from "@/lib/types";

function mapTrip(row: Record<string, unknown>): Trip {
  return {
    id: String(row.id),
    name: String(row.name),
    startDate: String(row.start_date),
    endDate: String(row.end_date),
    currency: String(row.currency),
    notes: String(row.notes ?? "")
  };
}

function mapDay(row: Record<string, unknown>): Day {
  return {
    id: String(row.id),
    tripId: String(row.trip_id),
    date: String(row.date),
    city: String(row.city),
    title: String(row.title),
    status: row.status as Day["status"],
    notes: String(row.notes ?? "")
  };
}

function mapEvent(row: Record<string, unknown>): Event {
  return {
    id: String(row.id),
    dayId: String(row.day_id),
    city: String(row.city),
    title: String(row.title),
    type: row.type as Event["type"],
    startTime: row.start_time ? String(row.start_time) : null,
    endTime: row.end_time ? String(row.end_time) : null,
    location: String(row.location),
    status: row.status as Event["status"],
    estimatedCost: Number(row.estimated_cost ?? 0),
    notes: String(row.notes ?? "")
  };
}

function mapDocument(row: Record<string, unknown>): Document {
  return {
    id: String(row.id),
    tripId: String(row.trip_id),
    city: String(row.city),
    title: String(row.title),
    type: row.type as Document["type"],
    status: row.status as Document["status"],
    link: row.link ? String(row.link) : null,
    filePath: row.file_path ? String(row.file_path) : null,
    amountPaid: Number(row.amount_paid ?? 0),
    notes: String(row.notes ?? "")
  };
}

function mapPlace(row: Record<string, unknown>): Place {
  return {
    id: String(row.id),
    tripId: String(row.trip_id),
    city: String(row.city),
    name: String(row.name),
    type: row.type as Place["type"],
    status: row.status as Place["status"],
    link: row.link ? String(row.link) : null,
    notes: String(row.notes ?? "")
  };
}

function mapBudgetItem(row: Record<string, unknown>): BudgetItem {
  return {
    id: String(row.id),
    tripId: String(row.trip_id),
    city: row.city ? String(row.city) : null,
    category: row.category as BudgetItem["category"],
    title: String(row.title),
    status: row.status as BudgetItem["status"],
    estimatedAmount: Number(row.estimated_amount ?? 0),
    paidAmount: Number(row.paid_amount ?? 0),
    notes: String(row.notes ?? "")
  };
}

export async function getPlannerData(): Promise<PlannerData> {
  const supabase = createPlannerClient();

  if (!supabase) {
    return sampleData;
  }

  try {
    const [
      { data: trips, error: tripsError },
      { data: days, error: daysError },
      { data: events, error: eventsError },
      { data: documents, error: documentsError },
      { data: places, error: placesError },
      { data: budgetItems, error: budgetItemsError }
    ] = await Promise.all([
      supabase.from("trips").select("*").limit(1).order("start_date", { ascending: true }),
      supabase.from("days").select("*").order("date", { ascending: true }),
      supabase.from("events").select("*").order("start_time", { ascending: true }),
      supabase.from("documents").select("*").order("city", { ascending: true }),
      supabase.from("places").select("*").order("city", { ascending: true }),
      supabase.from("budget_items").select("*").order("category", { ascending: true })
    ]);

    if (
      tripsError ||
      daysError ||
      eventsError ||
      documentsError ||
      placesError ||
      budgetItemsError ||
      !trips?.length
    ) {
      return sampleData;
    }

    return {
      trip: mapTrip(trips[0]),
      days: (days ?? []).map((row) => mapDay(row as Record<string, unknown>)),
      events: (events ?? []).map((row) => mapEvent(row as Record<string, unknown>)),
      documents: (documents ?? []).map((row) => mapDocument(row as Record<string, unknown>)),
      places: (places ?? []).map((row) => mapPlace(row as Record<string, unknown>)),
      budgetItems: (budgetItems ?? []).map((row) => mapBudgetItem(row as Record<string, unknown>))
    };
  } catch {
    return sampleData;
  }
}
