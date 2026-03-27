-- Create workflows table
CREATE TABLE IF NOT EXISTS public.workflows (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  is_active boolean DEFAULT true,
  version integer DEFAULT 1,
  execution_count integer DEFAULT 0,
  last_execution_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  created_by uuid REFERENCES public.profiles(id)
);

-- Create workflow_executions table
CREATE TABLE IF NOT EXISTS public.workflow_executions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  workflow_id uuid REFERENCES public.workflows(id) ON DELETE CASCADE NOT NULL,
  workflow_version integer NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed', 'cancelled')),
  started_by uuid REFERENCES public.profiles(id),
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  input_data jsonb DEFAULT '{}' NOT NULL,
  output_data jsonb DEFAULT '{}',
  context jsonb DEFAULT '{}',
  error jsonb
);

-- Create workflow_tasks table
CREATE TABLE IF NOT EXISTS public.workflow_tasks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  execution_id uuid REFERENCES public.workflow_executions(id) ON DELETE CASCADE,
  name text NOT NULL,
  type text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed')),
  input_data jsonb DEFAULT '{}',
  output_data jsonb DEFAULT '{}',
  started_at timestamptz,
  completed_at timestamptz,
  completed_by uuid REFERENCES public.profiles(id),
  metadata jsonb DEFAULT '{}'
);

-- Enable RLS
ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_tasks ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view workflows in their organization" ON public.workflows
  FOR SELECT USING (EXISTS (SELECT 1 FROM public.team_members WHERE organization_id = public.workflows.organization_id AND user_id = auth.uid() AND status = 'active'));

CREATE POLICY "Users can view executions in their organization" ON public.workflow_executions
  FOR SELECT USING (EXISTS (SELECT 1 FROM public.team_members tm JOIN public.workflows w ON w.organization_id = tm.organization_id WHERE w.id = public.workflow_executions.workflow_id AND tm.user_id = auth.uid() AND tm.status = 'active'));

CREATE POLICY "Users can view tasks in their organization" ON public.workflow_tasks
  FOR SELECT USING (EXISTS (SELECT 1 FROM public.team_members tm JOIN public.workflow_executions we ON we.started_by = tm.user_id WHERE we.id = public.workflow_tasks.execution_id AND tm.user_id = auth.uid() AND tm.status = 'active'));

-- Admins can manage workflows
CREATE POLICY "Admins can manage workflows" ON public.workflows
  FOR ALL USING (EXISTS (SELECT 1 FROM public.team_members WHERE organization_id = public.workflows.organization_id AND user_id = auth.uid() AND role IN ('owner', 'admin')));

-- Trigger for updated_at
CREATE TRIGGER set_workflows_updated_at BEFORE UPDATE ON public.workflows FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
