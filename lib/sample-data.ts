import { PlannerData } from "@/lib/types";

const tripId = "trip-europe-2026";

export const sampleData: PlannerData = {
  trip: {
    id: tripId,
    name: "Europe 2026",
    startDate: "2026-06-08",
    endDate: "2026-06-25",
    cities: ["Paris", "Nice", "Ibiza", "Sicily", "Rome", "Rome / Travel"],
    currency: "EUR",
    notes: "Real itinerary seed in progress. Additional days can be added in the same morning, afternoon, evening structure."
  },
  days: [
    {
      id: "day-2026-06-08",
      tripId,
      date: "2026-06-08",
      city: "Paris",
      title: "Arrival day",
      accommodation: "San Regis (Booked)",
      status: "booked",
      notes: ""
    },
    {
      id: "day-2026-06-09",
      tripId,
      date: "2026-06-09",
      city: "Paris",
      title: "Paris day",
      accommodation: "San Regis (Booked)",
      status: "tentative",
      notes: ""
    },
    {
      id: "day-2026-06-10",
      tripId,
      date: "2026-06-10",
      city: "Paris",
      title: "Paris day",
      accommodation: "San Regis (Booked)",
      status: "tentative",
      notes: ""
    },
    {
      id: "day-2026-06-11",
      tripId,
      date: "2026-06-11",
      city: "Nice",
      title: "Transfer south",
      accommodation: "Royal Riviera",
      status: "booked",
      notes: ""
    },
    {
      id: "day-2026-06-12",
      tripId,
      date: "2026-06-12",
      city: "Nice",
      title: "Nice day",
      accommodation: "Royal Riviera",
      status: "tentative",
      notes: ""
    },
    {
      id: "day-2026-06-13",
      tripId,
      date: "2026-06-13",
      city: "Nice",
      title: "Nice day",
      accommodation: "Royal Riviera",
      status: "tentative",
      notes: ""
    },
    {
      id: "day-2026-06-14",
      tripId,
      date: "2026-06-14",
      city: "Nice",
      title: "Nice day",
      accommodation: "Royal Riviera",
      status: "tentative",
      notes: ""
    },
    {
      id: "day-2026-06-15",
      tripId,
      date: "2026-06-15",
      city: "Ibiza",
      title: "Ibiza day",
      accommodation: "",
      status: "tentative",
      notes: ""
    },
    {
      id: "day-2026-06-16",
      tripId,
      date: "2026-06-16",
      city: "Ibiza",
      title: "Ibiza day",
      accommodation: "",
      status: "tentative",
      notes: ""
    },
    {
      id: "day-2026-06-17",
      tripId,
      date: "2026-06-17",
      city: "Sicily",
      title: "Sicily day",
      accommodation: "",
      status: "tentative",
      notes: ""
    },
    {
      id: "day-2026-06-18",
      tripId,
      date: "2026-06-18",
      city: "Sicily",
      title: "Sicily day",
      accommodation: "",
      status: "tentative",
      notes: ""
    },
    {
      id: "day-2026-06-19",
      tripId,
      date: "2026-06-19",
      city: "Sicily",
      title: "Sicily day",
      accommodation: "",
      status: "tentative",
      notes: ""
    },
    {
      id: "day-2026-06-20",
      tripId,
      date: "2026-06-20",
      city: "Sicily",
      title: "Sicily day",
      accommodation: "",
      status: "tentative",
      notes: ""
    },
    {
      id: "day-2026-06-21",
      tripId,
      date: "2026-06-21",
      city: "Sicily",
      title: "Sicily day",
      accommodation: "",
      status: "tentative",
      notes: ""
    },
    {
      id: "day-2026-06-22",
      tripId,
      date: "2026-06-22",
      city: "Rome",
      title: "Rome day",
      accommodation: "",
      status: "tentative",
      notes: ""
    },
    {
      id: "day-2026-06-23",
      tripId,
      date: "2026-06-23",
      city: "Rome",
      title: "Rome day",
      accommodation: "",
      status: "tentative",
      notes: ""
    },
    {
      id: "day-2026-06-24",
      tripId,
      date: "2026-06-24",
      city: "Rome / Travel",
      title: "Rome / Travel day",
      accommodation: "",
      status: "tentative",
      notes: ""
    },
    {
      id: "day-2026-06-25",
      tripId,
      date: "2026-06-25",
      city: "Rome / Travel",
      title: "Rome / Travel day",
      accommodation: "",
      status: "tentative",
      notes: ""
    }
  ],
  events: [
    {
      id: "event-2026-06-08-morning-1",
      dayId: "day-2026-06-08",
      city: "Paris",
      title: "Arrive 7:25am / Check-in San Regis",
      section: "Morning",
      type: "Travel",
      startTime: "07:25",
      endTime: null,
      location: "",
      status: "booked",
      estimatedCost: 0,
      notes: ""
    },
    {
      id: "event-2026-06-08-afternoon-1",
      dayId: "day-2026-06-08",
      city: "Paris",
      title: "Walking Tour",
      section: "Afternoon",
      type: "Activity",
      startTime: null,
      endTime: null,
      location: "",
      status: "booked",
      estimatedCost: 0,
      notes: ""
    },
    {
      id: "event-2026-06-08-evening-1",
      dayId: "day-2026-06-08",
      city: "Paris",
      title: "Saint Germain / Samilla / Prescription Cocktail Club",
      section: "Evening",
      type: "Meal",
      startTime: null,
      endTime: null,
      location: "",
      status: "tentative",
      estimatedCost: 0,
      notes: ""
    },
    {
      id: "event-2026-06-11-morning-1",
      dayId: "day-2026-06-11",
      city: "Nice",
      title: "9:00am Paris → Nice (Booked)",
      section: "Morning",
      type: "Travel",
      startTime: "09:00",
      endTime: null,
      location: "",
      status: "booked",
      estimatedCost: 0,
      notes: ""
    },
    {
      id: "event-2026-06-11-morning-2",
      dayId: "day-2026-06-11",
      city: "Nice",
      title: "Arrive Nice 10:25am",
      section: "Morning",
      type: "Travel",
      startTime: "10:25",
      endTime: null,
      location: "",
      status: "booked",
      estimatedCost: 0,
      notes: ""
    },
    {
      id: "event-2026-06-11-morning-3",
      dayId: "day-2026-06-11",
      city: "Nice",
      title: "Pick up car",
      section: "Morning",
      type: "Travel",
      startTime: null,
      endTime: null,
      location: "",
      status: "booked",
      estimatedCost: 0,
      notes: ""
    },
    {
      id: "event-2026-06-11-afternoon-1",
      dayId: "day-2026-06-11",
      city: "Nice",
      title: "Check-in Royal Riviera",
      section: "Afternoon",
      type: "Stay",
      startTime: null,
      endTime: null,
      location: "",
      status: "booked",
      estimatedCost: 0,
      notes: ""
    },
    {
      id: "event-2026-06-11-evening-1",
      dayId: "day-2026-06-11",
      city: "Nice",
      title: "African Queen (Booked)",
      section: "Evening",
      type: "Meal",
      startTime: null,
      endTime: null,
      location: "",
      status: "booked",
      estimatedCost: 0,
      notes: ""
    }
  ],
  bookings: [
    {
      id: "booking-paris-hotel",
      tripId,
      type: "hotel",
      title: "San Regis",
      city: "Paris",
      date: "2026-06-08",
      confirmationNumber: "SR-2026-PAR",
      status: "booked",
      notes: "",
      fileUrl: null
    },
    {
      id: "booking-paris-nice-flight",
      tripId,
      type: "flight",
      title: "Paris to Nice",
      city: "Nice",
      date: "2026-06-11",
      confirmationNumber: "AF-0900-NCE",
      status: "booked",
      notes: "",
      fileUrl: null
    },
    {
      id: "booking-nice-hotel",
      tripId,
      type: "hotel",
      title: "Royal Riviera",
      city: "Nice",
      date: "2026-06-11",
      confirmationNumber: "RR-2026-NCE",
      status: "booked",
      notes: "",
      fileUrl: null
    },
    {
      id: "booking-african-queen",
      tripId,
      type: "restaurant",
      title: "African Queen",
      city: "Nice",
      date: "2026-06-11",
      confirmationNumber: "AQ-DINNER",
      status: "booked",
      notes: "",
      fileUrl: null
    }
  ],
  places: [],
  budgetItems: []
};
