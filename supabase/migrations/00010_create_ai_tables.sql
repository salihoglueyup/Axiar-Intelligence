-- Create ai_models table
CREATE TABLE IF NOT EXISTS public.ai_models (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  type text NOT NULL,
  category text NOT NULL,
  framework text NOT NULL,
  version text NOT NULL,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'training', 'active', 'inactive')),
  usage_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  created_by uuid REFERENCES public.profiles(id)
);

-- Create ai_predictions table
CREATE TABLE IF NOT EXISTS public.ai_predictions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  model_id uuid REFERENCES public.ai_models(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  input_data jsonb DEFAULT '{}' NOT NULL,
  output_data jsonb DEFAULT '{}' NOT NULL,
  confidence float DEFAULT 0,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.ai_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_predictions ENABLE ROW LEVEL SECURITY;

-- AI Models Policies
CREATE POLICY "Users can view models in their organization" ON public.ai_models
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE organization_id = public.ai_models.organization_id
      AND user_id = auth.uid()
      AND status = 'active'
    )
  );

CREATE POLICY "Admins can manage models" ON public.ai_models
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE organization_id = public.ai_models.organization_id
      AND user_id = auth.uid()
      AND role IN ('owner', 'admin')
    )
  );

-- AI Predictions Policies
CREATE POLICY "Users can view predictions in their organization" ON public.ai_predictions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.team_members tm
      JOIN public.ai_models am ON am.organization_id = tm.organization_id
      WHERE am.id = public.ai_predictions.model_id
      AND tm.user_id = auth.uid()
      AND tm.status = 'active'
    )
  );

CREATE POLICY "Users can create predictions" ON public.ai_predictions
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.team_members tm
      JOIN public.ai_models am ON am.organization_id = tm.organization_id
      WHERE am.id = model_id
      AND tm.user_id = auth.uid()
      AND tm.status = 'active'
    )
  );

-- Function to increment model usage
CREATE OR REPLACE FUNCTION public.increment_model_usage(model_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.ai_models
  SET usage_count = usage_count + 1
  WHERE id = model_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for updated_at
CREATE TRIGGER set_ai_models_updated_at
  BEFORE UPDATE ON public.ai_models
  FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
