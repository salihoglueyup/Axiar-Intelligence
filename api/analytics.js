import { withAuth, withRateLimit, withValidation, withMiddleware } from './_lib/middleware'
import { z } from 'zod'
import { AnalyticsService } from './_services/analytics.service'

// 1. Validation Schemas
const createDashboardSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  category: z.enum(['business', 'technical', 'financial', 'custom']),
  is_public: z.boolean().default(false),
  widgets: z.array(z.any()).optional(),
  layout: z.any().optional(),
  settings: z.any().optional()
})

const createReportSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  type: z.enum(['summary', 'detailed', 'trend', 'comparison', 'forecast', 'custom']),
  format: z.enum(['pdf', 'excel', 'csv', 'json'])
})

// 2. Route Handlers
const getOverviewHandler = async (req, res) => {
  const organizationId = req.headers['x-organization-id']
  await AnalyticsService.checkOrgMembership(req.user.id, organizationId)
  
  const overview = await AnalyticsService.getOverview(organizationId)
  return res.status(200).json(overview)
}

const getDashboardsHandler = async (req, res) => {
  const organizationId = req.headers['x-organization-id']
  await AnalyticsService.checkOrgMembership(req.user.id, organizationId)
  
  const dashboards = await AnalyticsService.getDashboards(organizationId)
  return res.status(200).json(dashboards)
}

const createDashboardHandler = async (req, res) => {
  const organizationId = req.headers['x-organization-id']
  await AnalyticsService.checkOrgMembership(req.user.id, organizationId)
  
  const dashboard = await AnalyticsService.createDashboard(req.user.id, organizationId, req.validatedData)
  return res.status(201).json(dashboard)
}

// 3. Export with Middleware Chain
export default withMiddleware(getOverviewHandler, withAuth)

export const DASHBOARDS = withMiddleware(getDashboardsHandler, withAuth)

export const POST_DASHBOARD = withMiddleware(
  createDashboardHandler,
  withAuth,
  withValidation(createDashboardSchema),
  (handler) => withRateLimit(handler, { max: 10, windowMs: 60000 })
)

// Example: Handling Reports (Simplified for this update)
export const POST_REPORT = withMiddleware(
  async (req, res) => {
    // Logic for report creation...
    return res.status(201).json({ message: 'Report created' })
  },
  withAuth,
  withValidation(createReportSchema)
)
