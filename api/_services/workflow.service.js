import { supabaseAdmin } from '../_lib/supabase-admin'
import { BadRequestError, ForbiddenError, NotFoundError } from '../_lib/errors'

export const WorkflowService = {
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
   * Get all workflows for an organization
   */
  async getWorkflows(organizationId) {
    const { data, error } = await supabaseAdmin
      .from('workflows')
      .select('*')
      .eq('organization_id', organizationId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  /**
   * Create a new workflow
   */
  async createWorkflow(userId, organizationId, workflowData) {
    const { data, error } = await supabaseAdmin
      .from('workflows')
      .insert({
        ...workflowData,
        organization_id: organizationId,
        created_by: userId,
        version: 1,
        execution_count: 0
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  /**
   * Get a workflow by ID
   */
  async getWorkflowById(workflowId, organizationId) {
    const { data, error } = await supabaseAdmin
      .from('workflows')
      .select('*')
      .eq('id', workflowId)
      .eq('organization_id', organizationId)
      .single()

    if (error || !data) throw new NotFoundError('Workflow not found')
    return data
  },

  /**
   * Start workflow execution
   */
  async executeWorkflow(userId, organizationId, workflowId, inputData = {}) {
    const workflow = await this.getWorkflowById(workflowId, organizationId)
    
    if (!workflow.is_active) throw new BadRequestError('Workflow is not active')

    const { data: execution, error } = await supabaseAdmin
      .from('workflow_executions')
      .insert({
        workflow_id: workflowId,
        workflow_version: workflow.version,
        status: 'running',
        started_by: userId,
        started_at: new Date().toISOString(),
        input_data: inputData,
        context: { user_id: userId, organization_id: organizationId }
      })
      .select()
      .single()

    if (error) throw error

    // Increment execution count
    supabaseAdmin
      .from('workflows')
      .update({ execution_count: workflow.execution_count + 1, last_execution_at: new Date().toISOString() })
      .eq('id', workflowId)
      .catch(console.error)

    return execution
  },

  /**
   * Manage Workflow Tasks
   */
  async createTask(userId, organizationId, taskData) {
    const { data, error } = await supabaseAdmin
      .from('workflow_tasks')
      .insert({ ...taskData, status: 'pending' })
      .select()
      .single()

    if (error) throw error
    return data
  },

  async completeTask(userId, taskId, outputData = {}) {
    const { data, error } = await supabaseAdmin
      .from('workflow_tasks')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
        completed_by: userId,
        output_data: outputData
      })
      .eq('id', taskId)
      .select()
      .single()

    if (error) throw error
    return data
  }
}
