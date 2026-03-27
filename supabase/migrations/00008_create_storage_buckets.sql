-- Enable storage extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('avatars', 'avatars', true),
  ('reports', 'reports', false),
  ('invoices', 'invoices', false)
ON CONFLICT (id) DO NOTHING;

-- Avatar bucket policies
CREATE POLICY "Users can upload own avatar" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'avatars' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view own avatar" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'avatars' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update own avatar" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'avatars' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Reports bucket policies
CREATE POLICY "Admins can upload reports" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'reports' AND
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Clients can view own project reports" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'reports' AND
    EXISTS (
      SELECT 1 FROM public.projects p
      JOIN public.reports r ON r.project_id = p.id
      WHERE r.file_url = storage.objecturl(name) AND p.client_id = auth.uid()
    )
  );

-- Invoices bucket policies
CREATE POLICY "Admins can upload invoices" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'invoices' AND
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Clients can view own invoices" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'invoices' AND
    EXISTS (
      SELECT 1 FROM public.invoices
      WHERE pdf_url = storage.objecturl(name) AND client_id = auth.uid()
    )
  );

-- Public avatar bucket
CREATE POLICY "Avatar bucket is public" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'avatars'
  );
