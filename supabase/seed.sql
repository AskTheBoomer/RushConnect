-- Rush Connect: placeholder data for development.
-- Run after 001_initial_schema.sql (SQL Editor -> New query -> paste -> Run).
-- Each block only inserts into an empty table, so running it twice is safe.
-- Business details come from Evelyn's business card and services from her
-- prototype feedback (Nov 19 2026). Hours and service areas are still placeholders.

insert into public.business_info
  (id, name, tagline, owner_name, phone, email, hours, service_areas, instagram_url)
values (
  1,
  'Evelyn Rush Solutions',
  'The Elements of Speed',
  'Evelyn Rush',
  '',
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
  ('Packing & Unpacking',
   'Assistance with packing and unpacking household items for moves, including organizing belongings, carefully wrapping and packing fragile items, labeling boxes, and unpacking items at the new location. Help with sorting, arranging, and organizing belongings to make the moving process more efficient and manageable.',
   '{}'::text[], 1),
  ('Laundry and Ironing',
   'In-home laundry services include sorting, stain treatment, washing, drying, folding, ironing, and putting clothing away. Additional assistance with seasonal clothing organization, sorting items for donation, and donation drop-offs. Laundry products are not provided due to individual client preferences. Minimum 2-hour service.',
   '{}'::text[], 2),
  ('Cleaning',
   'Residential cleaning services include light and deep cleaning, move-in and move-out cleaning, and short-term rental (Airbnb) turnover services. I am equipped with cleaning supplies and tools, including a power scrubber, a vacuum, and an upholstery/carpet cleaner, to provide thorough, detailed cleaning throughout the home.',
   '{}'::text[], 3),
  ('Organization',
   'Not sure where/how to begin? I am efficient & motivating with high organizational skills. I have performed clean-outs and removal of household, garage, and storage items. I would be able to assist with deciding what to do with items.',
   '{}'::text[], 4)
) as v(name, description, highlights, sort_order)
where not exists (select 1 from public.services);

-- Two published, one pending, one rejected: enough to test moderation (TC-03)
-- and that the public only sees published reviews (TC-07).
insert into public.reviews (name, rating, service, comment, status, owner_response)
select * from (values
  ('Jordan M.', 5, 'Cleaning',
   'Evelyn was on time, friendly, and incredibly thorough. My kitchen has not looked this good since we moved in.',
   'published', 'Thank you, Jordan! See you next month.'),
  ('Priya S.', 5, 'Cleaning',
   'She made our move-out so much less stressful, and we got our full deposit back.',
   'published', null),
  ('Dana K.', 5, 'Cleaning',
   'Reliable every single week. I come home to a spotless house.',
   'pending', null),
  ('best deals 4 u', 1, 'Other',
   'Click here for cheap watches!!! www.example.com',
   'rejected', null)
) as v(name, rating, service, comment, status, owner_response)
where not exists (select 1 from public.reviews);

insert into public.inquiries (name, email, phone, service, message, status, notes)
select * from (values
  ('Alex Rivera', 'alex@example.com', '(555) 555-0142', 'Cleaning',
   'We have a 3-bedroom house and would like a deep clean before the holidays. Are you available in mid-November?',
   'new', ''),
  ('Sam Chen', 'sam@example.com', null, 'Organization',
   'Moving out of a 1-bedroom apartment at the end of the month. Looking for a quote.',
   'contacted', 'Sent quote by email; waiting to hear back.')
) as v(name, email, phone, service, message, status, notes)
where not exists (select 1 from public.inquiries);

insert into public.photos (title, service, sort_order)
select * from (values
  ('Kitchen deep clean', 'Cleaning', 1),
  ('Bathroom refresh', 'Cleaning', 2),
  ('Pantry organization', 'Organization', 3)
) as v(title, service, sort_order)
where not exists (select 1 from public.photos);
