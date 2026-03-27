-- Create organizations table
CREATE TABLE IF NOT EXISTS public.organizations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  logo_url text,
  website text,
  owner_id uuid REFERENCES public.profiles(id) NOT NULL,
  settings jsonb DEFAULT '{"timezone": "Europe/Istanbul", "language": "tr"}' NOT NULL,
  billing jsonb DEFAULT '{}' NOT NULL,
  usage jsonb DEFAULT '{"projects_count": 0, "users_count": 1}' NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  created_by uuid REFERENCES public.profiles(id),
  updated_by uuid REFERENCES public.profiles(id)
);

-- Create team_members table
CREATE TABLE IF NOT EXISTS public.team_members (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role text DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member', 'viewer')),
  status text DEFAULT 'active' CHECK (status IN ('active', 'pending', 'inactive')),
  invited_by uuid REFERENCES public.profiles(id),
  joined_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(organization_id, user_id)
);

-- Enable RLS
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Organizations Policies
CREATE POLICY "Users can view organizations they belong to" ON public.organizations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE organization_id = public.organizations.id
      AND user_id = auth.uid()
      AND status = 'active'
    )
  );

CREATE POLICY "Owners can update their organizations" ON public.organizations
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE organization_id = public.organizations.id
      AND user_id = auth.uid()
      AND role = 'owner'
    )
  );

-- Team Members Policies
CREATE POLICY "Members can view fellow team members" ON public.team_members
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.team_members AS fellow
      WHERE fellow.organization_id = public.team_members.organization_id
      AND fellow.user_id = auth.uid()
      AND fellow.status = 'active'
    )
  );

CREATE POLICY "Admins can manage team members" ON public.team_members
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.team_members AS admin_member
      WHERE admin_member.organization_id = public.team_members.organization_id
      AND admin_member.user_id = auth.uid()
      AND admin_member.role IN ('owner', 'admin')
    )
  );

-- Triggers for updated_at
CREATE TRIGGER set_organizations_updated_at
  BEFORE UPDATE ON public.organizations
  FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();

CREATE TRIGGER set_team_members_updated_at
  BEFORE UPDATE ON public.team_members
  FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
