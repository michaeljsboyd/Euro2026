import { BudgetItem, Day, Document, Event, Place, Trip } from '@/lib/types';

export const trip: Trip = {
  id: 'trip_europe_2026',
  name: 'Europe 2026',
  startDate: '2026-06-08',
  endDate: '2026-06-25',
  travelers: 5,
  notes: 'Family summer holiday with focus on food, beaches, and culture.'
};

export const days: Day[] = [
  { id: 'd1', tripId: trip.id, city: 'Paris', date: '2026-06-08', notes: 'Arrival and reset day.' },
  { id: 'd2', tripId: trip.id, city: 'Paris', date: '2026-06-09', notes: 'Museums and dinner cruise.' },
  { id: 'd3', tripId: trip.id, city: 'Cap Ferrat', date: '2026-06-12', notes: 'Pool and beach time.' },
  { id: 'd4', tripId: trip.id, city: 'Ibiza', date: '2026-06-15', notes: 'Beach club lunch.' },
  { id: 'd5', tripId: trip.id, city: 'Sicily', date: '2026-06-19', notes: 'Boat day and seafood.' },
  { id: 'd6', tripId: trip.id, city: 'Rome', date: '2026-06-23', notes: 'Historic center walking tour.' }
];

export const events: Event[] = [
  { id: 'e1', dayId: 'd1', title: 'Hotel check-in', time: '15:30', city: 'Paris', status: 'Booked', location: 'Le Meurice', notes: 'Request connected rooms.' },
  { id: 'e2', dayId: 'd2', title: 'Louvre timed entry', time: '10:00', city: 'Paris', status: 'Booked', location: 'Louvre Museum', notes: 'Use family entrance.' },
  { id: 'e3', dayId: 'd3', title: 'Villa Ephrussi visit', time: '11:30', city: 'Cap Ferrat', status: 'Tentative', location: 'Saint-Jean-Cap-Ferrat', notes: 'Reserve guided garden tour.' },
  { id: 'e4', dayId: 'd4', title: 'Beach club reservation', time: '13:00', city: 'Ibiza', status: 'Need to Book', location: 'Cala Jondal', notes: 'Prefer shaded table.' },
  { id: 'e5', dayId: 'd5', title: 'Taormina boat charter', time: '09:30', city: 'Sicily', status: 'Tentative', location: 'Giardini Naxos Marina', notes: 'Need weather backup plan.' },
  { id: 'e6', dayId: 'd6', title: 'Colosseum arena tour', time: '14:00', city: 'Rome', status: 'Booked', location: 'Colosseum', notes: 'Include underground access.' }
];

export const documents: Document[] = [
  { id: 'doc1', city: 'Paris', title: 'Air France tickets', type: 'Transport', link: 'https://example.com/air-france', fileName: 'af-booking.pdf', status: 'Booked', notes: 'Seat assignments complete.' },
  { id: 'doc2', city: 'Cap Ferrat', title: 'Villa stay confirmation', type: 'Booking', link: 'https://example.com/villa-cap-ferrat', fileName: 'villa-confirmation.pdf', status: 'Booked', notes: 'Deposit paid.' },
  { id: 'doc3', city: 'Ibiza', title: 'Travel insurance policy', type: 'Insurance', link: 'https://example.com/insurance', fileName: 'insurance-2026.pdf', status: 'Booked', notes: 'Covers watersports.' },
  { id: 'doc4', city: 'Rome', title: 'Private transfer quote', type: 'Other', link: 'https://example.com/rome-transfer', fileName: 'transfer-quote.docx', status: 'Need to Book', notes: 'Compare with hotel option.' }
];

export const places: Place[] = [
  { id: 'p1', city: 'Paris', name: 'Septime', type: 'Restaurant', status: 'Need to Book', notes: 'Set alert for table drop.' },
  { id: 'p2', city: 'Cap Ferrat', name: 'Paloma Beach', type: 'Beach Club', status: 'Tentative', notes: 'Ask for front-row sunbeds.' },
  { id: 'p3', city: 'Ibiza', name: 'El Chiringuito', type: 'Restaurant', status: 'Booked', notes: 'Lunch after beach.' },
  { id: 'p4', city: 'Sicily', name: 'Morgana Lounge Bar', type: 'Bar', status: 'Tentative', notes: 'Sunset cocktails.' },
  { id: 'p5', city: 'Rome', name: 'Borghese Gallery', type: 'Activity', status: 'Booked', notes: 'Entry slots sell out quickly.' }
];

export const budgetItems: BudgetItem[] = [
  { id: 'b1', category: 'Flights', city: 'Paris', planned: 3800, actual: 3650, notes: 'Booked with points offset.' },
  { id: 'b2', category: 'Accommodation', city: 'Cap Ferrat', planned: 5200, actual: 5200, notes: 'Luxury villa stay.' },
  { id: 'b3', category: 'Dining', city: 'Ibiza', planned: 1900, actual: 1200, notes: 'Track beach clubs separately.' },
  { id: 'b4', category: 'Activities', city: 'Sicily', planned: 1400, actual: 400, notes: 'Boat charter pending.' },
  { id: 'b5', category: 'Transport', city: 'Rome', planned: 900, actual: 250, notes: 'Airport transfer still open.' }
];
