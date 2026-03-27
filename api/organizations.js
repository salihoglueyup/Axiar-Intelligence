import { withAuth, withRateLimit, withValidation, withMiddleware } from './_lib/middleware'
import { z } from 'zod'
import { OrganizationService } from './_services/organization.service'
import { ForbiddenError } from './_lib/errors'

// 1. Validation Schemas
const createOrganizationSchema = z.object({
  name: z.string().min(2).max(100),
  slug: z.string().min(3).max(50).regex(/^[a-z0-9-]+$/).optional(),
  description: z.string().max(500).optional(),
  industry: z.enum(['technology', 'healthcare', 'finance', 'education', 'retail', 'manufacturing', 'other']).optional(),
  size: z.enum(['1-10', '11-50', '51-200', '201-500', '500+']).optional(),
  plan: z.enum(['free', 'starter', 'pro', 'enterprise']).default('free')
})

// 2. Route Handlers
const getOrganizationsHandler = async (req, res) => {
  const organizations = await OrganizationService.getUserOrganizations(req.user.id)
  return res.status(200).json(organizations)
}

const createOrganizationHandler = async (req, res) => {
  const organization = await OrganizationService.createOrganization(
    req.user.id, 
    req.user.email, 
    req.validatedData
  )
  return res.status(201).json(organization)
}

const getSingleOrganizationHandler = async (req, res) => {
  const { id } = req.query
  const membership = await OrganizationService.getMembership(req.user.id, id)
  
  // Get org details
  const organizations = await OrganizationService.getUserOrganizations(req.user.id)
  const org = organizations.find(o => o.id === id)
  
  if (!org) throw new ForbiddenError('Access denied: Organization not found')
  return res.status(200).json(org)
}

// 3. Export with Middleware Chain
export default withMiddleware(getOrganizationsHandler, withAuth)

export const POST = withMiddleware(
  createOrganizationHandler,
  withAuth,
  withValidation(createOrganizationSchema),
  (handler) => withRateLimit(handler, { max: 5, windowMs: 60000 })
)

export const GET_SINGLE = withMiddleware(getSingleOrganizationHandler, withAuth)
