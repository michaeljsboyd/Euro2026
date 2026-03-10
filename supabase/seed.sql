delete from events;
delete from days;
delete from documents;
delete from places;
delete from budget_items;
delete from trips;

insert into trips (id, name, start_date, end_date, currency, notes)
values (
  '00000000-0000-0000-0000-000000000001',
  'Europe 2026',
  '2026-07-03',
  '2026-07-17',
  'EUR',
  'Family summer route with a mix of city days, beach time, and slower villa stretches.'
);

insert into days (id, trip_id, date, city, title, status, notes) values
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '2026-07-03', 'Paris', 'Arrival and Left Bank reset', 'Booked', 'Keep the first day light and walkable after the overnight flight.'),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', '2026-07-04', 'Paris', 'Museums and dinner by the river', 'Booked', 'Louvre should stay flexible around family energy levels.'),
  ('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', '2026-07-05', 'Paris', 'Market morning and train south', 'Tentative', 'Hold a final lunch near Saint-Germain before departure.'),
  ('10000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000001', '2026-07-06', 'Cap Ferrat', 'Villa check-in and beach afternoon', 'Booked', 'Schedule grocery stop on the transfer route.'),
  ('10000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000001', '2026-07-07', 'Cap Ferrat', 'Coastal day and sunset dinner', 'Need to Book', 'Book one waterfront dinner early if July availability tightens.'),
  ('10000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000001', '2026-07-08', 'Ibiza', 'Fly to Ibiza and pool day', 'Tentative', 'Prioritize a simple first-night dinner near the villa.'),
  ('10000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000001', '2026-07-09', 'Ibiza', 'Beach club day', 'Need to Book', 'Decide whether to commit to a high-spend cabana or keep it casual.'),
  ('10000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000001', '2026-07-10', 'Ibiza', 'Old town and dinner', 'Tentative', 'Good day to anchor one special sunset reservation.'),
  ('10000000-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000001', '2026-07-11', 'Sicily', 'Transfer to Sicily', 'Booked', 'Confirm driver details once final arrival time is locked.'),
  ('10000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000001', '2026-07-12', 'Sicily', 'Boat day', 'Need to Book', 'Compare half-day charter versus full-day boat option.'),
  ('10000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000001', '2026-07-13', 'Sicily', 'Slow villa day', 'Booked', 'Leave this day intentionally loose for the kids.'),
  ('10000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000001', '2026-07-14', 'Sicily', 'Taormina lunch and shopping', 'Tentative', 'Reserve lunch only if weather looks settled.'),
  ('10000000-0000-0000-0000-000000000013', '00000000-0000-0000-0000-000000000001', '2026-07-15', 'Rome', 'Arrive Rome', 'Booked', 'Keep first evening near the hotel.'),
  ('10000000-0000-0000-0000-000000000014', '00000000-0000-0000-0000-000000000001', '2026-07-16', 'Rome', 'Historic centre day', 'Need to Book', 'Need a decision on guided Colosseum entry versus self-guided.'),
  ('10000000-0000-0000-0000-000000000015', '00000000-0000-0000-0000-000000000001', '2026-07-17', 'Rome', 'Departure', 'Booked', 'Build in generous airport transfer time.');

insert into events (id, day_id, city, title, type, start_time, end_time, location, status, estimated_cost, notes) values
  ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Paris', 'Check in at Hotel Lutetia', 'Stay', '15:00', null, 'Hotel Lutetia', 'Booked', 980, 'Request connecting family rooms if available.'),
  ('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 'Paris', 'Dinner at Relais de l''Entrecote', 'Meal', '19:30', null, 'Saint-Germain', 'Tentative', 190, 'Casual first-night dinner option if everyone is tired.'),
  ('20000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000002', 'Paris', 'Louvre morning slot', 'Activity', '10:00', '13:00', 'Louvre Museum', 'Need to Book', 88, 'Book timed entry with family-friendly pace.'),
  ('20000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000002', 'Paris', 'Seine river dinner cruise', 'Meal', '20:00', '22:30', 'Port de la Conference', 'Booked', 420, 'Booked as the signature Paris night.'),
  ('20000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000003', 'Paris', 'Train to Nice', 'Travel', '14:20', '20:05', 'Gare de Lyon', 'Booked', 640, 'Need to pre-book porter support for luggage.'),
  ('20000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000004', 'Cap Ferrat', 'Private transfer to villa', 'Travel', '20:30', '21:15', 'Nice to Saint-Jean-Cap-Ferrat', 'Booked', 180, 'Driver will stop at Monoprix if requested in advance.'),
  ('20000000-0000-0000-0000-000000000007', '10000000-0000-0000-0000-000000000004', 'Cap Ferrat', 'Villa check in', 'Stay', '21:30', null, 'Cap Ferrat Villa', 'Booked', 2200, 'Confirm early supply package for breakfast essentials.'),
  ('20000000-0000-0000-0000-000000000008', '10000000-0000-0000-0000-000000000005', 'Cap Ferrat', 'Paloma Beach afternoon', 'Beach', '13:00', '17:00', 'Paloma Beach', 'Tentative', 260, 'Check whether loungers can be reserved ahead.'),
  ('20000000-0000-0000-0000-000000000009', '10000000-0000-0000-0000-000000000005', 'Cap Ferrat', 'Sunset dinner at La Table du Royal', 'Meal', '20:00', null, 'Beaulieu-sur-Mer', 'Need to Book', 340, 'High priority booking.'),
  ('20000000-0000-0000-0000-000000000010', '10000000-0000-0000-0000-000000000006', 'Ibiza', 'Flight Nice to Ibiza', 'Travel', '11:50', '13:25', 'NCE to IBZ', 'Tentative', 520, 'Still comparing direct and one-stop options.'),
  ('20000000-0000-0000-0000-000000000011', '10000000-0000-0000-0000-000000000007', 'Ibiza', 'Beach club cabana', 'Beach', '12:00', '18:00', 'Cala Jondal', 'Need to Book', 950, 'Budget-sensitive decision.'),
  ('20000000-0000-0000-0000-000000000012', '10000000-0000-0000-0000-000000000008', 'Ibiza', 'Dalt Vila walk', 'Activity', '18:00', '20:00', 'Ibiza Old Town', 'Booked', 0, 'Self-guided evening stroll.'),
  ('20000000-0000-0000-0000-000000000013', '10000000-0000-0000-0000-000000000009', 'Sicily', 'Arrive Taormina villa', 'Stay', '17:00', null, 'Taormina Coast', 'Booked', 2600, 'Need final gate instructions sent to driver.'),
  ('20000000-0000-0000-0000-000000000014', '10000000-0000-0000-0000-000000000010', 'Sicily', 'Private boat charter', 'Activity', '10:00', '17:00', 'Giardini Naxos Marina', 'Need to Book', 1400, 'Waiting on two operators for family boat options.'),
  ('20000000-0000-0000-0000-000000000015', '10000000-0000-0000-0000-000000000012', 'Sicily', 'Lunch at Belmond Grand Hotel Timeo', 'Meal', '13:00', '15:00', 'Taormina', 'Tentative', 280, 'Only worth locking if town day stays in plan.'),
  ('20000000-0000-0000-0000-000000000016', '10000000-0000-0000-0000-000000000013', 'Rome', 'Check in at Hotel de Russie', 'Stay', '15:00', null, 'Rome', 'Booked', 1150, 'Request airport transfer via hotel concierge.'),
  ('20000000-0000-0000-0000-000000000017', '10000000-0000-0000-0000-000000000014', 'Rome', 'Colosseum guided entry', 'Activity', '09:30', '12:00', 'Colosseum', 'Need to Book', 160, 'Morning slot best for heat and crowds.'),
  ('20000000-0000-0000-0000-000000000018', '10000000-0000-0000-0000-000000000014', 'Rome', 'Dinner in Trastevere', 'Meal', '20:00', null, 'Trastevere', 'Tentative', 240, 'Pick a lively but family-friendly spot.');

insert into documents (id, trip_id, city, title, type, status, link, file_path, amount_paid, notes) values
  ('30000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Paris', 'International flights', 'Flight', 'Booked', 'https://example.com/flights', 'trip-documents/flights/international-itinerary.pdf', 4200, 'Store e-ticket PDFs and seat selections together.'),
  ('30000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'Paris', 'Hotel Lutetia confirmation', 'Hotel', 'Booked', 'https://example.com/lutetia', 'trip-documents/hotels/lutetia-confirmation.pdf', 1960, 'Need breakfast inclusion re-confirmed.'),
  ('30000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 'Cap Ferrat', 'Cap Ferrat villa contract', 'Hotel', 'Booked', null, 'trip-documents/villas/cap-ferrat-villa.pdf', 4400, 'Add arrival inventory sheet once received.'),
  ('30000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000001', 'Ibiza', 'Ibiza flights shortlist', 'Flight', 'Tentative', 'https://example.com/ibiza-options', null, 0, 'Keep two direct flight options until Cap Ferrat dates fixed.'),
  ('30000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000001', 'Ibiza', 'Beach club reservation notes', 'Reservation', 'Need to Book', 'https://example.com/beach-club', null, 0, 'Need minimum spend, cancellation policy, and child access rules.'),
  ('30000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000001', 'Sicily', 'Boat charter quotes', 'Guide', 'Need to Book', 'https://example.com/boat-charter', 'trip-documents/activities/sicily-boat-quotes.pdf', 0, 'Collect weather backup plans in the same folder.'),
  ('30000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000001', 'Rome', 'Colosseum ticket reminder', 'Ticket', 'Need to Book', 'https://example.com/colosseum', null, 0, 'Book skip-the-line or guided option once dates are final.');

insert into places (id, trip_id, city, name, type, status, link, notes) values
  ('40000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Paris', 'Cafe de Flore', 'Restaurant', 'Tentative', 'https://example.com/flore', 'Good backup breakfast spot near the hotel.'),
  ('40000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'Paris', 'Jardin du Luxembourg', 'Activity', 'Booked', null, 'Easy reset space for the kids after museum time.'),
  ('40000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 'Cap Ferrat', 'Paloma Beach', 'Beach Club', 'Tentative', 'https://example.com/paloma', 'Need to check lounger reservations.'),
  ('40000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000001', 'Cap Ferrat', 'Club Dauphin', 'Beach Club', 'Need to Book', 'https://example.com/dauphin', 'Premium option if villa pool day shifts.'),
  ('40000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000001', 'Ibiza', 'Jondal', 'Restaurant', 'Need to Book', 'https://example.com/jondal', 'Strong lunch option on beach club day.'),
  ('40000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000001', 'Ibiza', 'Cala Gracioneta', 'Beach Club', 'Tentative', 'https://example.com/gracioneta', 'More relaxed family-friendly alternative.'),
  ('40000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000001', 'Ibiza', 'Pikes', 'Bar', 'Tentative', 'https://example.com/pikes', 'Adults-only option only if babysitting is arranged.'),
  ('40000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000001', 'Sicily', 'Naxos Boat Charter', 'Activity', 'Need to Book', 'https://example.com/naxos', 'Need shaded deck and lunch onboard.'),
  ('40000000-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000001', 'Sicily', 'Bam Bar', 'Restaurant', 'Booked', 'https://example.com/bambar', 'Granita stop during Taormina day.'),
  ('40000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000001', 'Rome', 'Roscioli', 'Restaurant', 'Need to Book', 'https://example.com/roscioli', 'High priority final dinner option.'),
  ('40000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000001', 'Rome', 'Aperitivo on a rooftop', 'Bar', 'Tentative', null, 'Choose rooftop once hotel location is locked.');

insert into budget_items (id, trip_id, city, category, title, status, estimated_amount, paid_amount, notes) values
  ('50000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', null, 'Flights', 'Long-haul flights', 'Booked', 4200, 4200, 'Paid in full.'),
  ('50000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'Paris', 'Hotels', 'Paris hotel', 'Booked', 1960, 1960, 'Includes two nights.'),
  ('50000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 'Cap Ferrat', 'Hotels', 'Cap Ferrat villa', 'Booked', 4400, 4400, 'Deposit and balance complete.'),
  ('50000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000001', 'Ibiza', 'Flights', 'Nice to Ibiza flights', 'Tentative', 520, 0, 'Awaiting final route decision.'),
  ('50000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000001', 'Ibiza', 'Activities', 'Beach club spend', 'Need to Book', 950, 0, 'Largest optional splurge line item.'),
  ('50000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000001', 'Sicily', 'Activities', 'Boat charter', 'Need to Book', 1400, 0, 'Compare two operators.'),
  ('50000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000001', 'Rome', 'Activities', 'Colosseum guided tickets', 'Need to Book', 160, 0, 'Book once final family count confirmed.'),
  ('50000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000001', null, 'Dining', 'Trip dining buffer', 'Tentative', 2200, 0, 'Flexible spend across all stops.'),
  ('50000000-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000001', null, 'Transport', 'Private transfers and local transport', 'Tentative', 900, 180, 'One Cap Ferrat transfer already paid.');

