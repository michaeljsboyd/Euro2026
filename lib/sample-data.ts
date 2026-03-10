import { PlannerData } from "@/lib/types";

export const sampleData: PlannerData = {
  trip: {
    id: "trip-europe-2026",
    name: "Europe 2026",
    startDate: "2026-07-03",
    endDate: "2026-07-17",
    currency: "EUR",
    notes: "Family summer route with a mix of city days, beach time, and slower villa stretches."
  },
  days: [
    {
      id: "day-1",
      tripId: "trip-europe-2026",
      date: "2026-07-03",
      city: "Paris",
      title: "Arrival and Left Bank reset",
      status: "Booked",
      notes: "Keep the first day light and walkable after the overnight flight."
    },
    {
      id: "day-2",
      tripId: "trip-europe-2026",
      date: "2026-07-04",
      city: "Paris",
      title: "Museums and dinner by the river",
      status: "Booked",
      notes: "Louvre should stay flexible around family energy levels."
    },
    {
      id: "day-3",
      tripId: "trip-europe-2026",
      date: "2026-07-05",
      city: "Paris",
      title: "Market morning and train south",
      status: "Tentative",
      notes: "Hold a final lunch near Saint-Germain before departure."
    },
    {
      id: "day-4",
      tripId: "trip-europe-2026",
      date: "2026-07-06",
      city: "Cap Ferrat",
      title: "Villa check-in and beach afternoon",
      status: "Booked",
      notes: "Schedule grocery stop on the transfer route."
    },
    {
      id: "day-5",
      tripId: "trip-europe-2026",
      date: "2026-07-07",
      city: "Cap Ferrat",
      title: "Coastal day and sunset dinner",
      status: "Need to Book",
      notes: "Book one waterfront dinner early if July availability tightens."
    },
    {
      id: "day-6",
      tripId: "trip-europe-2026",
      date: "2026-07-08",
      city: "Ibiza",
      title: "Fly to Ibiza and pool day",
      status: "Tentative",
      notes: "Prioritize a simple first-night dinner near the villa."
    },
    {
      id: "day-7",
      tripId: "trip-europe-2026",
      date: "2026-07-09",
      city: "Ibiza",
      title: "Beach club day",
      status: "Need to Book",
      notes: "Decide whether to commit to a high-spend cabana or keep it casual."
    },
    {
      id: "day-8",
      tripId: "trip-europe-2026",
      date: "2026-07-10",
      city: "Ibiza",
      title: "Old town and dinner",
      status: "Tentative",
      notes: "Good day to anchor one special sunset reservation."
    },
    {
      id: "day-9",
      tripId: "trip-europe-2026",
      date: "2026-07-11",
      city: "Sicily",
      title: "Transfer to Sicily",
      status: "Booked",
      notes: "Confirm driver details once final arrival time is locked."
    },
    {
      id: "day-10",
      tripId: "trip-europe-2026",
      date: "2026-07-12",
      city: "Sicily",
      title: "Boat day",
      status: "Need to Book",
      notes: "Compare half-day charter versus full-day boat option."
    },
    {
      id: "day-11",
      tripId: "trip-europe-2026",
      date: "2026-07-13",
      city: "Sicily",
      title: "Slow villa day",
      status: "Booked",
      notes: "Leave this day intentionally loose for the kids."
    },
    {
      id: "day-12",
      tripId: "trip-europe-2026",
      date: "2026-07-14",
      city: "Sicily",
      title: "Taormina lunch and shopping",
      status: "Tentative",
      notes: "Reserve lunch only if weather looks settled."
    },
    {
      id: "day-13",
      tripId: "trip-europe-2026",
      date: "2026-07-15",
      city: "Rome",
      title: "Arrive Rome",
      status: "Booked",
      notes: "Keep first evening near the hotel."
    },
    {
      id: "day-14",
      tripId: "trip-europe-2026",
      date: "2026-07-16",
      city: "Rome",
      title: "Historic centre day",
      status: "Need to Book",
      notes: "Need a decision on guided Colosseum entry versus self-guided."
    },
    {
      id: "day-15",
      tripId: "trip-europe-2026",
      date: "2026-07-17",
      city: "Rome",
      title: "Departure",
      status: "Booked",
      notes: "Build in generous airport transfer time."
    }
  ],
  events: [
    {
      id: "event-1",
      dayId: "day-1",
      city: "Paris",
      title: "Check in at Hotel Lutetia",
      type: "Stay",
      startTime: "15:00",
      endTime: null,
      location: "Hotel Lutetia",
      status: "Booked",
      estimatedCost: 980,
      notes: "Request connecting family rooms if available."
    },
    {
      id: "event-2",
      dayId: "day-1",
      city: "Paris",
      title: "Dinner at Relais de l'Entrecote",
      type: "Meal",
      startTime: "19:30",
      endTime: null,
      location: "Saint-Germain",
      status: "Tentative",
      estimatedCost: 190,
      notes: "Casual first-night dinner option if everyone is tired."
    },
    {
      id: "event-3",
      dayId: "day-2",
      city: "Paris",
      title: "Louvre morning slot",
      type: "Activity",
      startTime: "10:00",
      endTime: "13:00",
      location: "Louvre Museum",
      status: "Need to Book",
      estimatedCost: 88,
      notes: "Book timed entry with family-friendly pace."
    },
    {
      id: "event-4",
      dayId: "day-2",
      city: "Paris",
      title: "Seine river dinner cruise",
      type: "Meal",
      startTime: "20:00",
      endTime: "22:30",
      location: "Port de la Conference",
      status: "Booked",
      estimatedCost: 420,
      notes: "Booked as the signature Paris night."
    },
    {
      id: "event-5",
      dayId: "day-3",
      city: "Paris",
      title: "Train to Nice",
      type: "Travel",
      startTime: "14:20",
      endTime: "20:05",
      location: "Gare de Lyon",
      status: "Booked",
      estimatedCost: 640,
      notes: "Need to pre-book porter support for luggage."
    },
    {
      id: "event-6",
      dayId: "day-4",
      city: "Cap Ferrat",
      title: "Private transfer to villa",
      type: "Travel",
      startTime: "20:30",
      endTime: "21:15",
      location: "Nice to Saint-Jean-Cap-Ferrat",
      status: "Booked",
      estimatedCost: 180,
      notes: "Driver will stop at Monoprix if requested in advance."
    },
    {
      id: "event-7",
      dayId: "day-4",
      city: "Cap Ferrat",
      title: "Villa check in",
      type: "Stay",
      startTime: "21:30",
      endTime: null,
      location: "Cap Ferrat Villa",
      status: "Booked",
      estimatedCost: 2200,
      notes: "Confirm early supply package for breakfast essentials."
    },
    {
      id: "event-8",
      dayId: "day-5",
      city: "Cap Ferrat",
      title: "Paloma Beach afternoon",
      type: "Beach",
      startTime: "13:00",
      endTime: "17:00",
      location: "Paloma Beach",
      status: "Tentative",
      estimatedCost: 260,
      notes: "Check whether loungers can be reserved ahead."
    },
    {
      id: "event-9",
      dayId: "day-5",
      city: "Cap Ferrat",
      title: "Sunset dinner at La Table du Royal",
      type: "Meal",
      startTime: "20:00",
      endTime: null,
      location: "Beaulieu-sur-Mer",
      status: "Need to Book",
      estimatedCost: 340,
      notes: "High priority booking."
    },
    {
      id: "event-10",
      dayId: "day-6",
      city: "Ibiza",
      title: "Flight Nice to Ibiza",
      type: "Travel",
      startTime: "11:50",
      endTime: "13:25",
      location: "NCE to IBZ",
      status: "Tentative",
      estimatedCost: 520,
      notes: "Still comparing direct and one-stop options."
    },
    {
      id: "event-11",
      dayId: "day-7",
      city: "Ibiza",
      title: "Beach club cabana",
      type: "Beach",
      startTime: "12:00",
      endTime: "18:00",
      location: "Cala Jondal",
      status: "Need to Book",
      estimatedCost: 950,
      notes: "Budget-sensitive decision."
    },
    {
      id: "event-12",
      dayId: "day-8",
      city: "Ibiza",
      title: "Dalt Vila walk",
      type: "Activity",
      startTime: "18:00",
      endTime: "20:00",
      location: "Ibiza Old Town",
      status: "Booked",
      estimatedCost: 0,
      notes: "Self-guided evening stroll."
    },
    {
      id: "event-13",
      dayId: "day-9",
      city: "Sicily",
      title: "Arrive Taormina villa",
      type: "Stay",
      startTime: "17:00",
      endTime: null,
      location: "Taormina Coast",
      status: "Booked",
      estimatedCost: 2600,
      notes: "Need final gate instructions sent to driver."
    },
    {
      id: "event-14",
      dayId: "day-10",
      city: "Sicily",
      title: "Private boat charter",
      type: "Activity",
      startTime: "10:00",
      endTime: "17:00",
      location: "Giardini Naxos Marina",
      status: "Need to Book",
      estimatedCost: 1400,
      notes: "Waiting on two operators for family boat options."
    },
    {
      id: "event-15",
      dayId: "day-12",
      city: "Sicily",
      title: "Lunch at Belmond Grand Hotel Timeo",
      type: "Meal",
      startTime: "13:00",
      endTime: "15:00",
      location: "Taormina",
      status: "Tentative",
      estimatedCost: 280,
      notes: "Only worth locking if town day stays in plan."
    },
    {
      id: "event-16",
      dayId: "day-13",
      city: "Rome",
      title: "Check in at Hotel de Russie",
      type: "Stay",
      startTime: "15:00",
      endTime: null,
      location: "Rome",
      status: "Booked",
      estimatedCost: 1150,
      notes: "Request airport transfer via hotel concierge."
    },
    {
      id: "event-17",
      dayId: "day-14",
      city: "Rome",
      title: "Colosseum guided entry",
      type: "Activity",
      startTime: "09:30",
      endTime: "12:00",
      location: "Colosseum",
      status: "Need to Book",
      estimatedCost: 160,
      notes: "Morning slot best for heat and crowds."
    },
    {
      id: "event-18",
      dayId: "day-14",
      city: "Rome",
      title: "Dinner in Trastevere",
      type: "Meal",
      startTime: "20:00",
      endTime: null,
      location: "Trastevere",
      status: "Tentative",
      estimatedCost: 240,
      notes: "Pick a lively but family-friendly spot."
    }
  ],
  documents: [
    {
      id: "doc-1",
      tripId: "trip-europe-2026",
      city: "Paris",
      title: "International flights",
      type: "Flight",
      status: "Booked",
      link: "https://example.com/flights",
      filePath: "trip-documents/flights/international-itinerary.pdf",
      amountPaid: 4200,
      notes: "Store e-ticket PDFs and seat selections together."
    },
    {
      id: "doc-2",
      tripId: "trip-europe-2026",
      city: "Paris",
      title: "Hotel Lutetia confirmation",
      type: "Hotel",
      status: "Booked",
      link: "https://example.com/lutetia",
      filePath: "trip-documents/hotels/lutetia-confirmation.pdf",
      amountPaid: 1960,
      notes: "Need breakfast inclusion re-confirmed."
    },
    {
      id: "doc-3",
      tripId: "trip-europe-2026",
      city: "Cap Ferrat",
      title: "Cap Ferrat villa contract",
      type: "Hotel",
      status: "Booked",
      link: null,
      filePath: "trip-documents/villas/cap-ferrat-villa.pdf",
      amountPaid: 4400,
      notes: "Add arrival inventory sheet once received."
    },
    {
      id: "doc-4",
      tripId: "trip-europe-2026",
      city: "Ibiza",
      title: "Ibiza flights shortlist",
      type: "Flight",
      status: "Tentative",
      link: "https://example.com/ibiza-options",
      filePath: null,
      amountPaid: 0,
      notes: "Keep two direct flight options until Cap Ferrat dates fixed."
    },
    {
      id: "doc-5",
      tripId: "trip-europe-2026",
      city: "Ibiza",
      title: "Beach club reservation notes",
      type: "Reservation",
      status: "Need to Book",
      link: "https://example.com/beach-club",
      filePath: null,
      amountPaid: 0,
      notes: "Need minimum spend, cancellation policy, and child access rules."
    },
    {
      id: "doc-6",
      tripId: "trip-europe-2026",
      city: "Sicily",
      title: "Boat charter quotes",
      type: "Guide",
      status: "Need to Book",
      link: "https://example.com/boat-charter",
      filePath: "trip-documents/activities/sicily-boat-quotes.pdf",
      amountPaid: 0,
      notes: "Collect weather backup plans in the same folder."
    },
    {
      id: "doc-7",
      tripId: "trip-europe-2026",
      city: "Rome",
      title: "Colosseum ticket reminder",
      type: "Ticket",
      status: "Need to Book",
      link: "https://example.com/colosseum",
      filePath: null,
      amountPaid: 0,
      notes: "Book skip-the-line or guided option once dates are final."
    }
  ],
  places: [
    {
      id: "place-1",
      tripId: "trip-europe-2026",
      city: "Paris",
      name: "Cafe de Flore",
      type: "Restaurant",
      status: "Tentative",
      link: "https://example.com/flore",
      notes: "Good backup breakfast spot near the hotel."
    },
    {
      id: "place-2",
      tripId: "trip-europe-2026",
      city: "Paris",
      name: "Jardin du Luxembourg",
      type: "Activity",
      status: "Booked",
      link: null,
      notes: "Easy reset space for the kids after museum time."
    },
    {
      id: "place-3",
      tripId: "trip-europe-2026",
      city: "Cap Ferrat",
      name: "Paloma Beach",
      type: "Beach Club",
      status: "Tentative",
      link: "https://example.com/paloma",
      notes: "Need to check lounger reservations."
    },
    {
      id: "place-4",
      tripId: "trip-europe-2026",
      city: "Cap Ferrat",
      name: "Club Dauphin",
      type: "Beach Club",
      status: "Need to Book",
      link: "https://example.com/dauphin",
      notes: "Premium option if villa pool day shifts."
    },
    {
      id: "place-5",
      tripId: "trip-europe-2026",
      city: "Ibiza",
      name: "Jondal",
      type: "Restaurant",
      status: "Need to Book",
      link: "https://example.com/jondal",
      notes: "Strong lunch option on beach club day."
    },
    {
      id: "place-6",
      tripId: "trip-europe-2026",
      city: "Ibiza",
      name: "Cala Gracioneta",
      type: "Beach Club",
      status: "Tentative",
      link: "https://example.com/gracioneta",
      notes: "More relaxed family-friendly alternative."
    },
    {
      id: "place-7",
      tripId: "trip-europe-2026",
      city: "Ibiza",
      name: "Pikes",
      type: "Bar",
      status: "Tentative",
      link: "https://example.com/pikes",
      notes: "Adults-only option only if babysitting is arranged."
    },
    {
      id: "place-8",
      tripId: "trip-europe-2026",
      city: "Sicily",
      name: "Naxos Boat Charter",
      type: "Activity",
      status: "Need to Book",
      link: "https://example.com/naxos",
      notes: "Need shaded deck and lunch onboard."
    },
    {
      id: "place-9",
      tripId: "trip-europe-2026",
      city: "Sicily",
      name: "Bam Bar",
      type: "Restaurant",
      status: "Booked",
      link: "https://example.com/bambar",
      notes: "Granita stop during Taormina day."
    },
    {
      id: "place-10",
      tripId: "trip-europe-2026",
      city: "Rome",
      name: "Roscioli",
      type: "Restaurant",
      status: "Need to Book",
      link: "https://example.com/roscioli",
      notes: "High priority final dinner option."
    },
    {
      id: "place-11",
      tripId: "trip-europe-2026",
      city: "Rome",
      name: "Aperitivo on a rooftop",
      type: "Bar",
      status: "Tentative",
      link: null,
      notes: "Choose rooftop once hotel location is locked."
    }
  ],
  budgetItems: [
    {
      id: "budget-1",
      tripId: "trip-europe-2026",
      city: null,
      category: "Flights",
      title: "Long-haul flights",
      status: "Booked",
      estimatedAmount: 4200,
      paidAmount: 4200,
      notes: "Paid in full."
    },
    {
      id: "budget-2",
      tripId: "trip-europe-2026",
      city: "Paris",
      category: "Hotels",
      title: "Paris hotel",
      status: "Booked",
      estimatedAmount: 1960,
      paidAmount: 1960,
      notes: "Includes two nights."
    },
    {
      id: "budget-3",
      tripId: "trip-europe-2026",
      city: "Cap Ferrat",
      category: "Hotels",
      title: "Cap Ferrat villa",
      status: "Booked",
      estimatedAmount: 4400,
      paidAmount: 4400,
      notes: "Deposit and balance complete."
    },
    {
      id: "budget-4",
      tripId: "trip-europe-2026",
      city: "Ibiza",
      category: "Flights",
      title: "Nice to Ibiza flights",
      status: "Tentative",
      estimatedAmount: 520,
      paidAmount: 0,
      notes: "Awaiting final route decision."
    },
    {
      id: "budget-5",
      tripId: "trip-europe-2026",
      city: "Ibiza",
      category: "Activities",
      title: "Beach club spend",
      status: "Need to Book",
      estimatedAmount: 950,
      paidAmount: 0,
      notes: "Largest optional splurge line item."
    },
    {
      id: "budget-6",
      tripId: "trip-europe-2026",
      city: "Sicily",
      category: "Activities",
      title: "Boat charter",
      status: "Need to Book",
      estimatedAmount: 1400,
      paidAmount: 0,
      notes: "Compare two operators."
    },
    {
      id: "budget-7",
      tripId: "trip-europe-2026",
      city: "Rome",
      category: "Activities",
      title: "Colosseum guided tickets",
      status: "Need to Book",
      estimatedAmount: 160,
      paidAmount: 0,
      notes: "Book once final family count confirmed."
    },
    {
      id: "budget-8",
      tripId: "trip-europe-2026",
      city: null,
      category: "Dining",
      title: "Trip dining buffer",
      status: "Tentative",
      estimatedAmount: 2200,
      paidAmount: 0,
      notes: "Flexible spend across all stops."
    },
    {
      id: "budget-9",
      tripId: "trip-europe-2026",
      city: null,
      category: "Transport",
      title: "Private transfers and local transport",
      status: "Tentative",
      estimatedAmount: 900,
      paidAmount: 180,
      notes: "One Cap Ferrat transfer already paid."
    }
  ]
};

