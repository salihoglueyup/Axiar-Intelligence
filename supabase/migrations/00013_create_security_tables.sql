-- Create security_policies table
CREATE TABLE IF NOT EXISTS public.security_policies (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'testing')),
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  created_by uuid REFERENCES public.profiles(id)
);

-- Create security_threats table
CREATE TABLE IF NOT EXISTS public.security_threats (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  severity text DEFAULT 'low' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  status text DEFAULT 'active' CHECK (status IN ('active', 'investigating', 'resolved', 'ignored')),
  is_resolved boolean DEFAULT false,
  resolved_at timestamptz,
  resolved_by uuid REFERENCES public.profiles(id),
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create security_alerts table
CREATE TABLE IF NOT EXISTS public.security_alerts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  severity text DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  is_read boolean DEFAULT false,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Create security_analytics table
CREATE TABLE IF NOT EXISTS public.security_analytics (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  generated_at timestamptz DEFAULT now() NOT NULL,
  period text DEFAULT '30d',
  metrics jsonb DEFAULT '{"threat_count": 0, "policy_count": 0, "alert_count": 0, "compliance_score": 0, "risk_score": 0}' NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.security_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_threats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_analytics ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view security data in their organization" ON public.security_policies
  FOR SELECT USING (EXISTS (SELECT 1 FROM public.team_members WHERE organization_id = public.security_policies.organization_id AND user_id = auth.uid() AND status = 'active'));

CREATE POLICY "Users can view threats in their organization" ON public.security_threats
  FOR SELECT USING (EXISTS (SELECT 1 FROM public.team_members WHERE organization_id = public.security_threats.organization_id AND user_id = auth.uid() AND status = 'active'));

CREATE POLICY "Users can view alerts in their organization" ON public.security_alerts
  FOR SELECT USING (EXISTS (SELECT 1 FROM public.team_members WHERE organization_id = public.security_alerts.organization_id AND user_id = auth.uid() AND status = 'active'));

CREATE POLICY "Users can view security analytics in their organization" ON public.security_analytics
  FOR SELECT USING (EXISTS (SELECT 1 FROM public.team_members WHERE organization_id = public.security_analytics.organization_id AND user_id = auth.uid() AND status = 'active'));

-- Admins manage security
CREATE POLICY "Admins can manage security policies" ON public.security_policies
  FOR ALL USING (EXISTS (SELECT 1 FROM public.team_members WHERE organization_id = public.security_policies.organization_id AND user_id = auth.uid() AND role IN ('owner', 'admin')));

CREATE POLICY "Admins can manage threats" ON public.security_threats
  FOR ALL USING (EXISTS (SELECT 1 FROM public.team_members WHERE organization_id = public.security_threats.organization_id AND user_id = auth.uid() AND role IN ('owner', 'admin')));

-- Triggers for updated_at
CREATE TRIGGER set_security_policies_updated_at BEFORE UPDATE ON public.security_policies FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
CREATE TRIGGER set_security_threats_updated_at BEFORE UPDATE ON public.security_threats FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
