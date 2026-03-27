import { withAuth, withAdmin, withValidation, withMiddleware } from '../_lib/middleware'
import { z } from 'zod'
import { AdminProjectService } from '../_services/admin-project.service'

// 1. Validation Schema
const projectSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  client_id: z.string().uuid(),
  status: z.enum(['active', 'completed', 'on_hold', 'cancelled']).default('active'),
  budget: z.number().optional()
})

// 2. Route Handlers
const getAllProjectsHandler = async (req, res) => {
  const projects = await AdminProjectService.getAllProjects()
  return res.status(200).json(projects)
}

const createProjectHandler = async (req, res) => {
  const project = await AdminProjectService.createProject(req.user.id, req.validatedData)
  return res.status(201).json(project)
}

const updateProjectHandler = async (req, res) => {
  const { id } = req.query
  const project = await AdminProjectService.updateProject(req.user.id, id, req.validatedData)
  return res.status(200).json(project)
}

// 3. Export with Middleware Chain
export default withMiddleware(getAllProjectsHandler, withAuth, withAdmin)

export const POST = withMiddleware(
  createProjectHandler,
  withAuth,
  withAdmin,
  withValidation(projectSchema)
)

export const PUT = withMiddleware(
  updateProjectHandler,
  withAuth,
  withAdmin,
  withValidation(projectSchema.partial())
)
