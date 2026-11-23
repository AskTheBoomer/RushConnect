-- Rush Connect: apply Evelyn's prototype feedback (Sprint 1 Client Prototype
-- Feedback and Review, Nov 19 2026).
--   * Replace the services with the four she provided (Appendix A), word for word.
--   * Remove the phone number from the website. The footer hides the phone
--     line when it is empty, so no code change is needed for that.
-- Run once in the Supabase SQL Editor (Team Alpha -> RushConnect). Safe to rerun.
-- Changes the live site as soon as it runs.

begin;

update public.business_info
set phone      = '',
    updated_at = now()
where id = 1;

delete from public.services;

insert into public.services (name, description, highlights, sort_order) values
  ('Packing & Unpacking',
   'Assistance with packing and unpacking household items for moves, including organizing belongings, carefully wrapping and packing fragile items, labeling boxes, and unpacking items at the new location. Help with sorting, arranging, and organizing belongings to make the moving process more efficient and manageable.',
   '{}', 1),
  ('Laundry and Ironing',
   'In-home laundry services include sorting, stain treatment, washing, drying, folding, ironing, and putting clothing away. Additional assistance with seasonal clothing organization, sorting items for donation, and donation drop-offs. Laundry products are not provided due to individual client preferences. Minimum 2-hour service.',
   '{}', 2),
  ('Cleaning',
   'Residential cleaning services include light and deep cleaning, move-in and move-out cleaning, and short-term rental (Airbnb) turnover services. I am equipped with cleaning supplies and tools, including a power scrubber, a vacuum, and an upholstery/carpet cleaner, to provide thorough, detailed cleaning throughout the home.',
   '{}', 3),
  ('Organization',
   'Not sure where/how to begin? I am efficient & motivating with high organizational skills. I have performed clean-outs and removal of household, garage, and storage items. I would be able to assist with deciding what to do with items.',
   '{}', 4);

-- Sample reviews and photos are shown publicly, so point them at current service
-- names. Inquiries are left alone: each one keeps the service the customer chose.
update public.reviews set service = 'Cleaning'
where service in ('Residential and Small Business Cleaning', 'Rug and Upholstery Cleaning');

update public.photos set service = 'Cleaning'
where service in ('Residential and Small Business Cleaning', 'Rug and Upholstery Cleaning');
update public.photos set service = 'Organization'
where service = 'Household Packing and Organization';

commit;
