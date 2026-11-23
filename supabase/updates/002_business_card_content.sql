-- Rush Connect: swap the sample business details and services for the ones on
-- Evelyn's business card (client feedback, Nov 14 2026).
-- Run once in the Supabase SQL Editor (Team Alpha -> RushConnect). Safe to rerun.
-- Service descriptions are still sample text until Evelyn confirms the wording.

begin;

update public.business_info
set tagline       = 'The Elements of Speed',
    phone         = '(612) 581-0794',
    email         = 'EvelynRushSolutions@gmail.com',
    instagram_url = 'https://www.instagram.com/EvelynRushSolutions',
    updated_at    = now()
where id = 1;

delete from public.services;

insert into public.services (name, description, highlights, sort_order) values
  ('Residential and Small Business Cleaning',
   'Regular or one-time cleaning for homes and small businesses, so every space has the refined look you have been longing for.',
   array['Homes and apartments', 'Small offices and storefronts', 'Weekly, bi-weekly, or one-time visits'], 1),
  ('Rug and Upholstery Cleaning',
   'Careful cleaning for rugs, sofas, and chairs to lift dirt and refresh the fabrics you live with every day.',
   array['Area rugs', 'Sofas and chairs', 'Spot and stain treatment'], 2),
  ('Household Packing and Organization',
   'Help packing for a move or getting organized at home, so everything has a place.',
   array['Packing for a move', 'Closets, pantries, and cabinets', 'Simple systems that are easy to keep up'], 3);

-- Keep the sample reviews and inquiries pointing at real service names.
update public.reviews set service = 'Residential and Small Business Cleaning'
where service in ('Standard Clean', 'Deep Clean', 'Move-In / Move-Out');

update public.inquiries set service = 'Residential and Small Business Cleaning'
where service = 'Deep Clean';
update public.inquiries set service = 'Household Packing and Organization'
where service = 'Move-In / Move-Out';

update public.photos set service = 'Residential and Small Business Cleaning'
where service in ('Deep Clean', 'Standard Clean');
update public.photos set service = 'Household Packing and Organization'
where service = 'Organization';

commit;
