import { supabaseAdmin } from '../_lib/supabase-admin'
import { BadRequestError, ForbiddenError, NotFoundError } from '../_lib/errors'

export const SecurityService = {
  /**
   * Check if user is member of organization
   */
  async checkOrgMembership(userId, organizationId) {
    if (!organizationId) throw new BadRequestError('Organization ID is required')
    
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
   * Manage Security Policies
   */
  async getPolicies(organizationId) {
    const { data, error } = await supabaseAdmin
      .from('security_policies')
      .select('*')
      .eq('organization_id', organizationId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async createPolicy(userId, organizationId, policyData) {
    const { data, error } = await supabaseAdmin
      .from('security_policies')
      .insert({
        ...policyData,
        organization_id: organizationId,
        created_by: userId,
        status: 'active'
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  /**
   * Manage Security Threats
   */
  async getThreats(organizationId) {
    const { data, error } = await supabaseAdmin
      .from('security_threats')
      .select('*')
      .eq('organization_id', organizationId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async resolveThreat(userId, organizationId, threatId) {
    const { data, error } = await supabaseAdmin
      .from('security_threats')
      .update({
        status: 'resolved',
        is_resolved: true,
        resolved_at: new Date().toISOString(),
        resolved_by: userId
      })
      .eq('id', threatId)
      .eq('organization_id', organizationId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  /**
   * Generate Security Analytics
   */
  async generateAnalytics(organizationId, period = '30d') {
    // This would typically involve complex aggregations
    // For now, we'll implement a robust mock/structure
    const [threats, policies, alerts] = await Promise.all([
      supabaseAdmin.from('security_threats').select('*').eq('organization_id', organizationId),
      supabaseAdmin.from('security_policies').select('*').eq('organization_id', organizationId),
      supabaseAdmin.from('security_alerts').select('*').eq('organization_id', organizationId)
    ])

    const analytics = {
      organization_id: organizationId,
      generated_at: new Date().toISOString(),
      period,
      metrics: {
        threat_count: threats.data?.length || 0,
        policy_count: policies.data?.length || 0,
        alert_count: alerts.data?.length || 0,
        compliance_score: 85,
        risk_score: 45
      }
    }

    const { data, error } = await supabaseAdmin
      .from('security_analytics')
      .insert(analytics)
      .select()
      .single()

    if (error) throw error
    return data
  }
}
