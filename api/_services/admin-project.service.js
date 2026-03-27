import { supabaseAdmin } from '../_lib/supabase-admin'
import { BadRequestError, NotFoundError } from '../_lib/errors'

export const AdminProjectService = {
  /**
   * Get all projects for admin dashboard
   */
  async getAllProjects() {
    const { data: projects, error } = await supabaseAdmin
      .from('projects')
      .select(`
        *,
        client:profiles(id, full_name, email, company),
        reports(count),
        invoices(count)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    return projects || []
  },

  /**
   * Create a new project and notify client
   */
  async createProject(adminId, projectData) {
    const { data: project, error: projectError } = await supabaseAdmin
      .from('projects')
      .insert(projectData)
      .select(`*, client:profiles(id, full_name, email, company)`)
      .single()

    if (projectError) throw projectError

    // Log & Notify (Parallel)
    await Promise.all([
      // Log Activity
      supabaseAdmin.from('activities').insert({
        user_id: adminId,
        project_id: project.id,
        action: 'project_created',
        description: `"${project.title}" projesi oluşturuldu`
      }),
      // Notify Client
      supabaseAdmin.from('notifications').insert({
        user_id: project.client_id,
        title: 'Yeni Proje',
        message: `"${project.title}" adında yeni bir proje oluşturuldu.`,
        type: 'info'
      })
    ]).catch(err => console.error('[AdminProjectService] Notification/Log Error:', err))

    return project
  },

  /**
   * Update an existing project
   */
  async updateProject(adminId, projectId, updateData) {
    const { data: project, error } = await supabaseAdmin
      .from('projects')
      .update(updateData)
      .eq('id', projectId)
      .select(`*, client:profiles(id, full_name, email, company)`)
      .single()

    if (error) throw error
    if (!project) throw new NotFoundError('Project not found')

    // Log Activity
    supabaseAdmin.from('activities').insert({
      user_id: adminId,
      project_id: project.id,
      action: 'project_updated',
      description: `"${project.title}" projesi güncellendi`
    }).catch(console.error)

    return project
  }
}
