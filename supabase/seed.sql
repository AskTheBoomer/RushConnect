-- Rush Connect: placeholder data for development.
-- Run after 001_initial_schema.sql (SQL Editor -> New query -> paste -> Run).
-- Each block only inserts into an empty table, so running it twice is safe.
-- Business details and services come from Evelyn's business card; descriptions,
-- hours, and service areas are still placeholders until she confirms them.

insert into public.business_info
  (id, name, tagline, owner_name, phone, email, hours, service_areas, instagram_url)
values (
  1,
  'Evelyn Rush Solutions',
  'The Elements of Speed',
  'Evelyn Rush',
  '(612) 581-0794',
  'EvelynRushSolutions@gmail.com',
  'Monday - Friday, 8:00 AM - 5:00 PM',
  array['Placeholder City', 'North Placeholder', 'Sample Heights'],
  'https://www.instagram.com/EvelynRushSolutions'
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
  ('Residential and Small Business Cleaning',
   'Regular or one-time cleaning for homes and small businesses, so every space has the refined look you have been longing for.',
   array['Homes and apartments', 'Small offices and storefronts', 'Weekly, bi-weekly, or one-time visits'], 1),
  ('Rug and Upholstery Cleaning',
   'Careful cleaning for rugs, sofas, and chairs to lift dirt and refresh the fabrics you live with every day.',
   array['Area rugs', 'Sofas and chairs', 'Spot and stain treatment'], 2),
  ('Household Packing and Organization',
   'Help packing for a move or getting organized at home, so everything has a place.',
   array['Packing for a move', 'Closets, pantries, and cabinets', 'Simple systems that are easy to keep up'], 3)
) as v(name, description, highlights, sort_order)
where not exists (select 1 from public.services);

-- Two published, one pending, one rejected: enough to test moderation (TC-03)
-- and that the public only sees published reviews (TC-07).
insert into public.reviews (name, rating, service, comment, status, owner_response)
select * from (values
  ('Jordan M.', 5, 'Residential and Small Business Cleaning',
   'Evelyn was on time, friendly, and incredibly thorough. My kitchen has not looked this good since we moved in.',
   'published', 'Thank you, Jordan! See you next month.'),
  ('Priya S.', 5, 'Residential and Small Business Cleaning',
   'She made our move-out so much less stressful, and we got our full deposit back.',
   'published', null),
  ('Dana K.', 5, 'Residential and Small Business Cleaning',
   'Reliable every single week. I come home to a spotless house.',
   'pending', null),
  ('best deals 4 u', 1, 'Other',
   'Click here for cheap watches!!! www.example.com',
   'rejected', null)
) as v(name, rating, service, comment, status, owner_response)
where not exists (select 1 from public.reviews);

insert into public.inquiries (name, email, phone, service, message, status, notes)
select * from (values
  ('Alex Rivera', 'alex@example.com', '(555) 555-0142', 'Residential and Small Business Cleaning',
   'We have a 3-bedroom house and would like a deep clean before the holidays. Are you available in mid-November?',
   'new', ''),
  ('Sam Chen', 'sam@example.com', null, 'Household Packing and Organization',
   'Moving out of a 1-bedroom apartment at the end of the month. Looking for a quote.',
   'contacted', 'Sent quote by email; waiting to hear back.')
) as v(name, email, phone, service, message, status, notes)
where not exists (select 1 from public.inquiries);

insert into public.photos (title, service, sort_order)
select * from (values
  ('Kitchen deep clean', 'Residential and Small Business Cleaning', 1),
  ('Bathroom refresh', 'Residential and Small Business Cleaning', 2),
  ('Pantry organization', 'Household Packing and Organization', 3)
) as v(title, service, sort_order)
where not exists (select 1 from public.photos);
