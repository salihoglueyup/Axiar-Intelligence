import { supabaseAdmin } from '../_lib/supabase-admin'
import { BadRequestError, ForbiddenError, NotFoundError } from '../_lib/errors'

export const OrganizationService = {
  /**
   * Generate a URL-friendly slug from a name
   */
  generateSlug(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-')
  },

  /**
   * Check if a slug is available
   */
  async isSlugAvailable(slug, excludeId = null) {
    let query = supabaseAdmin
      .from('organizations')
      .select('id')
      .eq('slug', slug)

    if (excludeId) query = query.neq('id', excludeId)

    const { data, error } = await query
    if (error) throw error
    return data.length === 0
  },

  /**
   * Get user's role and permissions in an organization
   */
  async getMembership(userId, organizationId) {
    const { data: membership, error } = await supabaseAdmin
      .from('team_members')
      .select('role, status')
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
   * Create a new organization and add creator as owner
   */
  async createOrganization(userId, userEmail, orgData) {
    const slug = orgData.slug || this.generateSlug(orgData.name)
    const isAvailable = await this.isSlugAvailable(slug)
    
    if (!isAvailable) {
      throw new BadRequestError('Organization slug already exists')
    }

    // Insert Organization
    const { data: organization, error: orgError } = await supabaseAdmin
      .from('organizations')
      .insert({
        ...orgData,
        slug,
        owner_id: userId,
        created_by: userId,
        updated_by: userId,
        settings: { timezone: 'Europe/Istanbul', language: 'tr' },
        billing: { billing_email: userEmail },
        usage: { projects_count: 0, users_count: 1 }
      })
      .select()
      .single()

    if (orgError) throw orgError

    // Add owner as team member
    const { error: memberError } = await supabaseAdmin
      .from('team_members')
      .insert({
        organization_id: organization.id,
        user_id: userId,
        role: 'owner',
        status: 'active',
        invited_by: userId,
        joined_at: new Date().toISOString()
      })

    if (memberError) throw memberError

    return organization
  },

  /**
   * Get all organizations for a user
   */
  async getUserOrganizations(userId) {
    const { data: organizations, error } = await supabaseAdmin
      .from('organizations')
      .select(`
        *,
        team_members!inner(role, status)
      `)
      .eq('team_members.user_id', userId)
      .eq('team_members.status', 'active')

    if (error) throw error
    return organizations.map(org => ({
      ...org,
      user_role: org.team_members[0]?.role
    }))
  }
}
