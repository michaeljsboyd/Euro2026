insert into trips (id, name, start_date, end_date, travelers, notes)
values ('11111111-1111-1111-1111-111111111111', 'Europe 2026', '2026-06-08', '2026-06-25', 5, 'Family summer holiday with focus on food, beaches, and culture.')
on conflict (id) do nothing;

insert into days (id, trip_id, city, date, notes) values
  ('20000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'Paris', '2026-06-08', 'Arrival and reset day.'),
  ('20000000-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'Paris', '2026-06-09', 'Museums and dinner cruise.'),
  ('20000000-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', 'Cap Ferrat', '2026-06-12', 'Pool and beach time.'),
  ('20000000-0000-0000-0000-000000000004', '11111111-1111-1111-1111-111111111111', 'Ibiza', '2026-06-15', 'Beach club lunch.'),
  ('20000000-0000-0000-0000-000000000005', '11111111-1111-1111-1111-111111111111', 'Sicily', '2026-06-19', 'Boat day and seafood.'),
  ('20000000-0000-0000-0000-000000000006', '11111111-1111-1111-1111-111111111111', 'Rome', '2026-06-23', 'Historic center walking tour.')
on conflict (id) do nothing;

insert into events (id, day_id, title, time, city, status, location, notes) values
  ('30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'Hotel check-in', '15:30', 'Paris', 'Booked', 'Le Meurice', 'Request connected rooms.'),
  ('30000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000002', 'Louvre timed entry', '10:00', 'Paris', 'Booked', 'Louvre Museum', 'Use family entrance.'),
  ('30000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000003', 'Villa Ephrussi visit', '11:30', 'Cap Ferrat', 'Tentative', 'Saint-Jean-Cap-Ferrat', 'Reserve guided garden tour.'),
  ('30000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000004', 'Beach club reservation', '13:00', 'Ibiza', 'Need to Book', 'Cala Jondal', 'Prefer shaded table.'),
  ('30000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000005', 'Taormina boat charter', '09:30', 'Sicily', 'Tentative', 'Giardini Naxos Marina', 'Need weather backup plan.'),
  ('30000000-0000-0000-0000-000000000006', '20000000-0000-0000-0000-000000000006', 'Colosseum arena tour', '14:00', 'Rome', 'Booked', 'Colosseum', 'Include underground access.')
on conflict (id) do nothing;

insert into documents (id, trip_id, city, title, type, link, file_name, status, notes) values
  ('40000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'Paris', 'Air France tickets', 'Transport', 'https://example.com/air-france', 'af-booking.pdf', 'Booked', 'Seat assignments complete.'),
  ('40000000-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'Cap Ferrat', 'Villa stay confirmation', 'Booking', 'https://example.com/villa-cap-ferrat', 'villa-confirmation.pdf', 'Booked', 'Deposit paid.'),
  ('40000000-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', 'Ibiza', 'Travel insurance policy', 'Insurance', 'https://example.com/insurance', 'insurance-2026.pdf', 'Booked', 'Covers watersports.'),
  ('40000000-0000-0000-0000-000000000004', '11111111-1111-1111-1111-111111111111', 'Rome', 'Private transfer quote', 'Other', 'https://example.com/rome-transfer', 'transfer-quote.docx', 'Need to Book', 'Compare with hotel option.')
on conflict (id) do nothing;

insert into places (id, trip_id, city, name, type, status, notes) values
  ('50000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'Paris', 'Septime', 'Restaurant', 'Need to Book', 'Set alert for table drop.'),
  ('50000000-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'Cap Ferrat', 'Paloma Beach', 'Beach Club', 'Tentative', 'Ask for front-row sunbeds.'),
  ('50000000-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', 'Ibiza', 'El Chiringuito', 'Restaurant', 'Booked', 'Lunch after beach.'),
  ('50000000-0000-0000-0000-000000000004', '11111111-1111-1111-1111-111111111111', 'Sicily', 'Morgana Lounge Bar', 'Bar', 'Tentative', 'Sunset cocktails.'),
  ('50000000-0000-0000-0000-000000000005', '11111111-1111-1111-1111-111111111111', 'Rome', 'Borghese Gallery', 'Activity', 'Booked', 'Entry slots sell out quickly.')
on conflict (id) do nothing;

insert into budget_items (id, trip_id, city, category, planned, actual, notes) values
  ('60000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'Paris', 'Flights', 3800, 3650, 'Booked with points offset.'),
  ('60000000-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'Cap Ferrat', 'Accommodation', 5200, 5200, 'Luxury villa stay.'),
  ('60000000-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', 'Ibiza', 'Dining', 1900, 1200, 'Track beach clubs separately.'),
  ('60000000-0000-0000-0000-000000000004', '11111111-1111-1111-1111-111111111111', 'Sicily', 'Activities', 1400, 400, 'Boat charter pending.'),
  ('60000000-0000-0000-0000-000000000005', '11111111-1111-1111-1111-111111111111', 'Rome', 'Transport', 900, 250, 'Airport transfer still open.')
on conflict (id) do nothing;
