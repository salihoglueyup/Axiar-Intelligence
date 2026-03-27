import { supabaseAdmin } from '../_lib/supabase-admin'
import { BadRequestError, ForbiddenError, NotFoundError } from '../_lib/errors'

export const AnalyticsService = {
  /**
   * Check if user has access to an organization
   */
  async checkOrgMembership(userId, organizationId) {
    if (!organizationId) {
      throw new BadRequestError('Organization ID is required')
    }

    const { data: membership, error } = await supabaseAdmin
      .from('team_members')
      .select('role')
      .eq('organization_id', organizationId)
      .eq('user_id', userId)
      .eq('status', 'active')
      .single()

    if (error || !membership) {
      throw new ForbiddenError('Access denied: Organization membership required')
    }
    
    return membership
  },

  /**
   * Get analytics overview for an organization
   */
  async getOverview(organizationId) {
    const [dashboards, reports, connections, insights] = await Promise.all([
      supabaseAdmin
        .from('analytics_dashboards')
        .select('*')
        .eq('organization_id', organizationId),
      
      supabaseAdmin
        .from('analytics_reports')
        .select('*')
        .eq('organization_id', organizationId),
      
      supabaseAdmin
        .from('data_connections')
        .select('*')
        .eq('organization_id', organizationId),
      
      supabaseAdmin
        .from('analytics_insights')
        .select('*')
        .eq('organization_id', organizationId)
        .eq('is_acknowledged', false)
    ])

    return {
      dashboards: dashboards.data || [],
      reports: reports.data || [],
      connections: connections.data || [],
      insights: insights.data || [],
      summary: {
        total_dashboards: dashboards.data?.length || 0,
        total_reports: reports.data?.length || 0,
        active_connections: connections.data?.filter(c => c.is_active).length || 0,
        pending_insights: insights.data?.length || 0
      }
    }
  },

  /**
   * Create a new dashboard
   */
  async createDashboard(userId, organizationId, dashboardData) {
    const { data: dashboard, error } = await supabaseAdmin
      .from('analytics_dashboards')
      .insert({
        ...dashboardData,
        organization_id: organizationId,
        created_by: userId,
        widgets: dashboardData.widgets || [],
        layout: dashboardData.layout || {
          type: 'grid', columns: 12, row_height: 100, gap: 16, padding: 16
        },
        settings: dashboardData.settings || {
          auto_refresh: false, theme: 'dark', notifications_enabled: true
        }
      })
      .select()
      .single()

    if (error) throw error
    return dashboard
  },

  /**
   * Get all dashboards
   */
  async getDashboards(organizationId) {
    const { data, error } = await supabaseAdmin
      .from('analytics_dashboards')
      .select('*')
      .eq('organization_id', organizationId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }
}
