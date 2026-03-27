-- Seed data for development

-- Create admin user
INSERT INTO auth.users (
  id,
  email,
  email_confirmed_at,
  phone,
  phone_confirmed_at,
  raw_user_meta_data,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'admin@axiar.io',
  now(),
  null,
  null,
  '{"full_name": "Admin User", "role": "admin"}',
  now(),
  now()
) ON CONFLICT (email) DO NOTHING;

-- Create test client user
INSERT INTO auth.users (
  id,
  email,
  email_confirmed_at,
  phone,
  phone_confirmed_at,
  raw_user_meta_data,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'client@axiar.io',
  now(),
  null,
  null,
  '{"full_name": "Test Client", "role": "client"}',
  now(),
  now()
) ON CONFLICT (email) DO NOTHING;

-- Insert sample projects (will be associated with admin user for testing)
INSERT INTO public.projects (client_id, title, description, status, progress, start_date, due_date)
SELECT 
  p.id,
  'CyberGuard AI Implementation',
  'Advanced AI-powered cybersecurity solution for enterprise clients.',
  'in_progress',
  75,
  current_date - interval '30 days',
  current_date + interval '15 days'
FROM public.profiles p
WHERE p.email = 'admin@axiar.io'
LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO public.projects (client_id, title, description, status, progress, start_date, due_date)
SELECT 
  p.id,
  'Metazon Capital OS',
  'Comprehensive capital management system with real-time analytics.',
  'review',
  90,
  current_date - interval '60 days',
  current_date + interval '5 days'
FROM public.profiles p
WHERE p.email = 'admin@axiar.io'
LIMIT 1
ON CONFLICT DO NOTHING;

-- Insert sample invoices
INSERT INTO public.invoices (client_id, project_id, amount, currency, status, due_date)
SELECT 
  p.id,
  pr.id,
  50000.00,
  'TRY',
  'sent',
  current_date + interval '10 days'
FROM public.profiles p
JOIN public.projects pr ON pr.client_id = p.id
WHERE p.email = 'admin@axiar.io' AND pr.title = 'CyberGuard AI Implementation'
LIMIT 1
ON CONFLICT (invoice_no) DO NOTHING;
