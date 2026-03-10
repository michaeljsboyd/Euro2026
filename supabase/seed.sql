delete from events;
delete from days;
delete from bookings;
delete from places;
delete from budget_items;
delete from trips;

insert into trips (id, name, start_date, end_date, cities, currency, notes)
values (
  '00000000-0000-0000-0000-000000000001',
  'Europe 2026',
  '2026-06-08',
  '2026-06-25',
  array['Paris', 'Nice', 'Ibiza', 'Sicily', 'Rome', 'Rome / Travel'],
  'EUR',
  'Real itinerary seed in progress. Additional days can be added in the same morning, afternoon, evening structure.'
);

insert into days (id, trip_id, date, city, title, accommodation, status, notes) values
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '2026-06-08', 'Paris', 'Arrival day', 'San Regis (Booked)', 'booked', ''),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', '2026-06-11', 'Nice', 'Transfer south', 'Royal Riviera', 'booked', '');

insert into events (id, day_id, city, title, section, type, start_time, end_time, location, status, estimated_cost, notes) values
  ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Paris', 'Arrive 7:25am / Check-in San Regis', 'Morning', 'Travel', '07:25', null, '', 'booked', 0, ''),
  ('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 'Paris', 'Walking Tour', 'Afternoon', 'Activity', null, null, '', 'booked', 0, ''),
  ('20000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000001', 'Paris', 'Saint Germain / Samilla / Prescription Cocktail Club', 'Evening', 'Meal', null, null, '', 'tentative', 0, ''),
  ('20000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000002', 'Nice', '9:00am Paris → Nice (Booked)', 'Morning', 'Travel', '09:00', null, '', 'booked', 0, ''),
  ('20000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000002', 'Nice', 'Arrive Nice 10:25am', 'Morning', 'Travel', '10:25', null, '', 'booked', 0, ''),
  ('20000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000002', 'Nice', 'Pick up car', 'Morning', 'Travel', null, null, '', 'booked', 0, ''),
  ('20000000-0000-0000-0000-000000000007', '10000000-0000-0000-0000-000000000002', 'Nice', 'Check-in Royal Riviera', 'Afternoon', 'Stay', null, null, '', 'booked', 0, ''),
  ('20000000-0000-0000-0000-000000000008', '10000000-0000-0000-0000-000000000002', 'Nice', 'African Queen (Booked)', 'Evening', 'Meal', null, null, '', 'booked', 0, '');

insert into bookings (id, trip_id, type, title, city, date, confirmation_number, status, notes, file_url) values
  ('30000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'hotel', 'San Regis', 'Paris', '2026-06-08', 'SR-2026-PAR', 'booked', '', null),
  ('30000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'flight', 'Paris to Nice', 'Nice', '2026-06-11', 'AF-0900-NCE', 'booked', '', null),
  ('30000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 'hotel', 'Royal Riviera', 'Nice', '2026-06-11', 'RR-2026-NCE', 'booked', '', null),
  ('30000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000001', 'restaurant', 'African Queen', 'Nice', '2026-06-11', 'AQ-DINNER', 'booked', '', null);
