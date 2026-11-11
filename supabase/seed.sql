-- Rush Connect: placeholder data for development.
-- Run after 001_initial_schema.sql (SQL Editor -> New query -> paste -> Run).
-- Each block only inserts into an empty table, so running it twice is safe.
-- Contact details are placeholders until Evelyn confirms the real ones.

insert into public.business_info
  (id, name, tagline, owner_name, phone, email, hours, service_areas, instagram_url)
values (
  1,
  'Evelyn Rush Solutions',
  'Residential cleaning you can count on.',
  'Evelyn Rush',
  '(555) 555-0123',
  'hello@example.com',
  'Monday - Friday, 8:00 AM - 5:00 PM',
  array['Placeholder City', 'North Placeholder', 'Sample Heights'],
  'https://www.instagram.com/'
)
on conflict (id) do nothing;

insert into public.page_content (page, section, body, sort_order)
select * from (values
  ('home', 'intro',
   'We bring care, consistency, and attention to detail to every home, so you can spend your time on what matters most.', 1),
  ('about', 'story',
   'Evelyn Rush founded Evelyn Rush Solutions in 2023 after more than twenty years as an accountant in a CPA office. She wanted more hands-on work, so she started a cleaning business of her own and still runs it herself.', 1),
  ('about', 'values',
   'Reliability, attention to detail, respect for your home, and honest communication.', 2)
) as v(page, section, body, sort_order)
where not exists (select 1 from public.page_content);

insert into public.services (name, description, highlights, sort_order)
select * from (values
  ('Standard Clean',
   'Regular upkeep to keep your home fresh and comfortable, ideal for weekly or bi-weekly visits.',
   array['Dusting and wiping surfaces', 'Vacuuming and mopping floors', 'Kitchen and bathroom refresh'], 1),
  ('Deep Clean',
   'A top-to-bottom clean that reaches the spots routine cleaning misses. Great for a first visit or a seasonal reset.',
   array['Baseboards, doors, and trim', 'Inside the microwave and on top of cabinets', 'Detailed scrubbing of tile and fixtures'], 2),
  ('Move-In / Move-Out',
   'Get a place ready for its next chapter, whether you are handing back keys or settling in.',
   array['Inside cabinets, drawers, and closets', 'Appliance interiors on request', 'Empty-home, wall-to-wall attention'], 3),
  ('Organization',
   'Declutter and organize closets, pantries, and living spaces so everything has a place.',
   array['Closets, pantries, and cabinets', 'Sorting and simple labeling', 'Systems that are easy to maintain'], 4)
) as v(name, description, highlights, sort_order)
where not exists (select 1 from public.services);

-- Two published, one pending, one rejected: enough to test moderation (TC-03)
-- and that the public only sees published reviews (TC-07).
insert into public.reviews (name, rating, service, comment, status, owner_response)
select * from (values
  ('Jordan M.', 5, 'Deep Clean',
   'Evelyn was on time, friendly, and incredibly thorough. My kitchen has not looked this good since we moved in.',
   'published', 'Thank you, Jordan! See you next month.'),
  ('Priya S.', 5, 'Move-In / Move-Out',
   'She made our move-out so much less stressful, and we got our full deposit back.',
   'published', null),
  ('Dana K.', 5, 'Standard Clean',
   'Reliable every single week. I come home to a spotless house.',
   'pending', null),
  ('best deals 4 u', 1, 'Other',
   'Click here for cheap watches!!! www.example.com',
   'rejected', null)
) as v(name, rating, service, comment, status, owner_response)
where not exists (select 1 from public.reviews);

insert into public.inquiries (name, email, phone, service, message, status, notes)
select * from (values
  ('Alex Rivera', 'alex@example.com', '(555) 555-0142', 'Deep Clean',
   'We have a 3-bedroom house and would like a deep clean before the holidays. Are you available in mid-November?',
   'new', ''),
  ('Sam Chen', 'sam@example.com', null, 'Move-In / Move-Out',
   'Moving out of a 1-bedroom apartment at the end of the month. Looking for a quote.',
   'contacted', 'Sent quote by email; waiting to hear back.')
) as v(name, email, phone, service, message, status, notes)
where not exists (select 1 from public.inquiries);

insert into public.photos (title, service, sort_order)
select * from (values
  ('Kitchen deep clean', 'Deep Clean', 1),
  ('Bathroom refresh', 'Standard Clean', 2),
  ('Pantry organization', 'Organization', 3)
) as v(title, service, sort_order)
where not exists (select 1 from public.photos);
