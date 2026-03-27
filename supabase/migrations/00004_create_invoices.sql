-- Create invoices table
CREATE TABLE IF NOT EXISTS public.invoices (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  project_id uuid REFERENCES public.projects(id) ON DELETE SET NULL,
  invoice_no text NOT NULL UNIQUE,
  amount numeric NOT NULL CHECK (amount >= 0),
  currency text DEFAULT 'TRY' CHECK (currency IN ('TRY', 'USD', 'EUR')),
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'overdue')),
  issue_date date DEFAULT current_date NOT NULL,
  due_date date NOT NULL,
  paid_date date,
  pdf_url text,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Clients can view own invoices" ON public.invoices
  FOR SELECT USING (client_id = auth.uid());

CREATE POLICY "Admins can view all invoices" ON public.invoices
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage all invoices" ON public.invoices
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Function to generate invoice number
CREATE OR REPLACE FUNCTION public.generate_invoice_no()
RETURNS text AS $$
DECLARE
  year_part text;
  sequence_num integer;
BEGIN
  year_part := to_char(current_date, 'YYYY');
  
  -- Get next sequence number for this year
  SELECT COALESCE(MAX(CAST(SUBSTRING(invoice_no FROM '-[0-9]+$') AS integer)), 0) + 1
  INTO sequence_num
  FROM public.invoices
  WHERE invoice_no LIKE 'AXR-' || year_part || '-%';
  
  RETURN 'AXR-' || year_part || '-' || LPAD(sequence_num::text, 3, '0');
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate invoice number
CREATE OR REPLACE TRIGGER generate_invoice_no_trigger
  BEFORE INSERT ON public.invoices
  FOR EACH ROW WHEN (NEW.invoice_no IS NULL)
  EXECUTE FUNCTION public.generate_invoice_no();
