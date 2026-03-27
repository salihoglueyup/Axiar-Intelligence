import { withAuth, withRateLimit, withValidation, withMiddleware } from './_lib/middleware'
import { z } from 'zod'
import { WorkflowService } from './_services/workflow.service'

// 1. Validation Schemas
const createWorkflowSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  category: z.enum(['approval', 'notification', 'data_processing', 'integration', 'automation', 'custom']),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
  trigger: z.object({
    type: z.enum(['manual', 'schedule', 'event', 'webhook', 'form_submission', 'data_change', 'email_received', 'api_call', 'custom']),
    config: z.record(z.any())
  }),
  is_active: z.boolean().default(true)
})

const createTaskSchema = z.object({
  workflow_execution_id: z.string().uuid(),
  step_id: z.string(),
  title: z.string().min(1).max(200),
  priority: z.enum(['low', 'medium', 'high', 'critical'])
})

// 2. Route Handlers
const getWorkflowsHandler = async (req, res) => {
  const organizationId = req.headers['x-organization-id']
  await WorkflowService.checkOrgMembership(req.user.id, organizationId)
  
  const workflows = await WorkflowService.getWorkflows(organizationId)
  return res.status(200).json(workflows)
}

const createWorkflowHandler = async (req, res) => {
  const organizationId = req.headers['x-organization-id']
  await WorkflowService.checkOrgMembership(req.user.id, organizationId)
  
  const workflow = await WorkflowService.createWorkflow(req.user.id, organizationId, req.validatedData)
  return res.status(201).json(workflow)
}

const executeWorkflowHandler = async (req, res) => {
  const { id } = req.query
  const organizationId = req.headers['x-organization-id']
  const body = await req.json()

  await WorkflowService.checkOrgMembership(req.user.id, organizationId)
  const execution = await WorkflowService.executeWorkflow(req.user.id, organizationId, id, body.data)
  
  return res.status(200).json(execution)
}

// 3. Export with Middleware Chain
export default withMiddleware(getWorkflowsHandler, withAuth)

export const POST = withMiddleware(
  createWorkflowHandler,
  withAuth,
  withValidation(createWorkflowSchema),
  (handler) => withRateLimit(handler, { max: 10, windowMs: 60000 })
)

export const EXECUTE = withMiddleware(
  executeWorkflowHandler,
  withAuth,
  (handler) => withRateLimit(handler, { max: 50, windowMs: 60000 })
)

// Example: Task Creation (Simplified for this update)
export const POST_TASK = withMiddleware(
  async (req, res) => {
    const organizationId = req.headers['x-organization-id']
    await WorkflowService.checkOrgMembership(req.user.id, organizationId)
    const task = await WorkflowService.createTask(req.user.id, organizationId, req.validatedData)
    return res.status(201).json(task)
  },
  withAuth,
  withValidation(createTaskSchema)
)
