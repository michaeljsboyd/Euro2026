export type BookingStatus = 'Booked' | 'Tentative' | 'Need to Book';

export interface Trip {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  travelers: number;
  notes: string;
}

export interface Day {
  id: string;
  tripId: string;
  city: string;
  date: string;
  notes: string;
}

export interface Event {
  id: string;
  dayId: string;
  title: string;
  time: string;
  city: string;
  status: BookingStatus;
  location: string;
  notes: string;
}

export interface Document {
  id: string;
  city: string;
  title: string;
  type: 'Booking' | 'Transport' | 'Insurance' | 'Other';
  link: string;
  fileName: string;
  status: BookingStatus;
  notes: string;
}

export interface Place {
  id: string;
  city: string;
  name: string;
  type: 'Restaurant' | 'Beach Club' | 'Bar' | 'Activity';
  status: BookingStatus;
  notes: string;
}

export interface BudgetItem {
  id: string;
  category: string;
  city: string;
  planned: number;
  actual: number;
  notes: string;
}
