import { PlannerData } from "@/lib/types";

const tripId = "trip-europe-2026";

export const sampleData: PlannerData = {
  trip: {
    id: tripId,
    name: "Europe 2026",
    startDate: "2026-07-03",
    endDate: "2026-07-25",
    cities: ["Paris", "Nice", "Ibiza", "Sicily", "Rome"],
    currency: "EUR",
    notes: "Real itinerary seed in progress. Additional days can be added in the same morning, afternoon, evening structure."
  },
  days: [
    {
      id: "day-2026-07-03",
      tripId,
      date: "2026-07-03",
      city: "Paris",
      title: "Arrival day",
      accommodation: "San Regis (Booked)",
      status: "booked",
      notes: ""
    },
    {
      id: "day-2026-07-06",
      tripId,
      date: "2026-07-06",
      city: "Nice",
      title: "Transfer south",
      accommodation: "Royal Riviera",
      status: "booked",
      notes: ""
    }
  ],
  events: [
    {
      id: "event-2026-07-03-morning-1",
      dayId: "day-2026-07-03",
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
      id: "event-2026-07-03-afternoon-1",
      dayId: "day-2026-07-03",
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
      id: "event-2026-07-03-evening-1",
      dayId: "day-2026-07-03",
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
      id: "event-2026-07-06-morning-1",
      dayId: "day-2026-07-06",
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
      id: "event-2026-07-06-morning-2",
      dayId: "day-2026-07-06",
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
      id: "event-2026-07-06-morning-3",
      dayId: "day-2026-07-06",
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
      id: "event-2026-07-06-afternoon-1",
      dayId: "day-2026-07-06",
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
      id: "event-2026-07-06-evening-1",
      dayId: "day-2026-07-06",
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
  documents: [],
  places: [],
  budgetItems: []
};
