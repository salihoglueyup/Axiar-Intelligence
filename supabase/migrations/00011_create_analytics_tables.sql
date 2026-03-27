-- Create analytics_dashboards table
CREATE TABLE IF NOT EXISTS public.analytics_dashboards (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  widgets jsonb DEFAULT '[]' NOT NULL,
  layout jsonb DEFAULT '{"type": "grid", "columns": 12}' NOT NULL,
  settings jsonb DEFAULT '{"auto_refresh": false}' NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  created_by uuid REFERENCES public.profiles(id)
);

-- Create analytics_reports table
CREATE TABLE IF NOT EXISTS public.analytics_reports (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  type text NOT NULL,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'ready', 'running', 'failed')),
  configuration jsonb DEFAULT '{}' NOT NULL,
  last_run_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  created_by uuid REFERENCES public.profiles(id)
);

-- Create data_connections table
CREATE TABLE IF NOT EXISTS public.data_connections (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  type text NOT NULL,
  status text DEFAULT 'disconnected' CHECK (status IN ('connected', 'disconnected', 'error')),
  is_active boolean DEFAULT true,
  config jsonb DEFAULT '{}' NOT NULL,
  last_sync_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create analytics_insights table
CREATE TABLE IF NOT EXISTS public.analytics_insights (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  severity text DEFAULT 'low' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  is_acknowledged boolean DEFAULT false,
  impact_score integer DEFAULT 0,
  recommendation text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.analytics_dashboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_insights ENABLE ROW LEVEL SECURITY;

-- Policies (View)
CREATE POLICY "Users can view analytics in their organization" ON public.analytics_dashboards
  FOR SELECT USING (EXISTS (SELECT 1 FROM public.team_members WHERE organization_id = public.analytics_dashboards.organization_id AND user_id = auth.uid() AND status = 'active'));

CREATE POLICY "Users can view reports in their organization" ON public.analytics_reports
  FOR SELECT USING (EXISTS (SELECT 1 FROM public.team_members WHERE organization_id = public.analytics_reports.organization_id AND user_id = auth.uid() AND status = 'active'));

CREATE POLICY "Users can view connections in their organization" ON public.data_connections
  FOR SELECT USING (EXISTS (SELECT 1 FROM public.team_members WHERE organization_id = public.data_connections.organization_id AND user_id = auth.uid() AND status = 'active'));

CREATE POLICY "Users can view insights in their organization" ON public.analytics_insights
  FOR SELECT USING (EXISTS (SELECT 1 FROM public.team_members WHERE organization_id = public.analytics_insights.organization_id AND user_id = auth.uid() AND status = 'active'));

-- Policies (Manage - Admins)
CREATE POLICY "Admins can manage analytics" ON public.analytics_dashboards
  FOR ALL USING (EXISTS (SELECT 1 FROM public.team_members WHERE organization_id = public.analytics_dashboards.organization_id AND user_id = auth.uid() AND role IN ('owner', 'admin')));

CREATE POLICY "Admins can manage reports" ON public.analytics_reports
  FOR ALL USING (EXISTS (SELECT 1 FROM public.team_members WHERE organization_id = public.analytics_reports.organization_id AND user_id = auth.uid() AND role IN ('owner', 'admin')));

CREATE POLICY "Admins can manage connections" ON public.data_connections
  FOR ALL USING (EXISTS (SELECT 1 FROM public.team_members WHERE organization_id = public.data_connections.organization_id AND user_id = auth.uid() AND role IN ('owner', 'admin')));

-- Triggers for updated_at
CREATE TRIGGER set_analytics_dashboards_updated_at BEFORE UPDATE ON public.analytics_dashboards FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
CREATE TRIGGER set_analytics_reports_updated_at BEFORE UPDATE ON public.analytics_reports FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
CREATE TRIGGER set_data_connections_updated_at BEFORE UPDATE ON public.data_connections FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
CREATE TRIGGER set_analytics_insights_updated_at BEFORE UPDATE ON public.analytics_insights FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
