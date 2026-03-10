export type BookingStatus = "booked" | "tentative" | "tbc";
export type DaySection = "Morning" | "Afternoon" | "Evening";
export type PlaceType = "Restaurant" | "Beach Club" | "Bar" | "Activity";
export type DocumentType = "Flight" | "Hotel" | "Transfer" | "Reservation" | "Guide" | "Ticket";
export type EventType = "Travel" | "Stay" | "Meal" | "Activity" | "Nightlife" | "Beach";
export type BudgetCategory =
  | "Flights"
  | "Hotels"
  | "Dining"
  | "Transport"
  | "Activities"
  | "Nightlife"
  | "Misc";

export interface Trip {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  cities: string[];
  currency: string;
  notes: string;
}

export interface Day {
  id: string;
  tripId: string;
  date: string;
  city: string;
  title: string;
  accommodation: string;
  status: BookingStatus;
  notes: string;
}

export interface Event {
  id: string;
  dayId: string;
  city: string;
  title: string;
  section: DaySection;
  type: EventType;
  startTime: string | null;
  endTime: string | null;
  location: string;
  status: BookingStatus;
  estimatedCost: number;
  notes: string;
}

export interface Document {
  id: string;
  tripId: string;
  city: string;
  title: string;
  type: DocumentType;
  status: BookingStatus;
  link: string | null;
  filePath: string | null;
  amountPaid: number;
  notes: string;
}

export interface Place {
  id: string;
  tripId: string;
  city: string;
  name: string;
  type: PlaceType;
  status: BookingStatus;
  link: string | null;
  notes: string;
}

export interface BudgetItem {
  id: string;
  tripId: string;
  city: string | null;
  category: BudgetCategory;
  title: string;
  status: BookingStatus;
  estimatedAmount: number;
  paidAmount: number;
  notes: string;
}

export interface PlannerData {
  trip: Trip;
  days: Day[];
  events: Event[];
  documents: Document[];
  places: Place[];
  budgetItems: BudgetItem[];
}
