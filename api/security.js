import { withAuth, withRateLimit, withValidation, withMiddleware } from './_lib/middleware'
import { z } from 'zod'
import { SecurityService } from './_services/security.service'

// 1. Validation Schemas
const policySchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  type: z.enum(['access_control', 'data_protection', 'network_security', 'application_security', 'identity_management', 'threat_detection', 'incident_response', 'compliance', 'custom']),
  priority: z.enum(['low', 'medium', 'high', 'critical'])
})

const threatSchema = z.object({
  title: z.string().min(1).max(200),
  type: z.enum(['malware', 'phishing', 'sql_injection', 'xss', 'ddos', 'brute_force', 'data_breach', 'insider_threat', 'social_engineering', 'zero_day', 'ransomware', 'botnet', 'apt', 'custom']),
  severity: z.enum(['info', 'low', 'medium', 'high', 'critical'])
})

// 2. Route Handlers
const getPoliciesHandler = async (req, res) => {
  const organizationId = req.headers['x-organization-id']
  await SecurityService.checkOrgMembership(req.user.id, organizationId)
  
  const policies = await SecurityService.getPolicies(organizationId)
  return res.status(200).json(policies)
}

const createPolicyHandler = async (req, res) => {
  const organizationId = req.headers['x-organization-id']
  await SecurityService.checkOrgMembership(req.user.id, organizationId)
  
  const policy = await SecurityService.createPolicy(req.user.id, organizationId, req.validatedData)
  return res.status(201).json(policy)
}

const getThreatsHandler = async (req, res) => {
  const organizationId = req.headers['x-organization-id']
  await SecurityService.checkOrgMembership(req.user.id, organizationId)
  
  const threats = await SecurityService.getThreats(organizationId)
  return res.status(200).json(threats)
}

const resolveThreatHandler = async (req, res) => {
  const { id } = req.query
  const organizationId = req.headers['x-organization-id']
  
  await SecurityService.checkOrgMembership(req.user.id, organizationId)
  const resolvedThreat = await SecurityService.resolveThreat(req.user.id, organizationId, id)
  
  return res.status(200).json(resolvedThreat)
}

const generateAnalyticsHandler = async (req, res) => {
  const organizationId = req.headers['x-organization-id']
  const { period } = await req.json()
  
  await SecurityService.checkOrgMembership(req.user.id, organizationId)
  const analytics = await SecurityService.generateAnalytics(organizationId, period)
  
  return res.status(200).json(analytics)
}

// 3. Export with Middleware Chain
export default withMiddleware(getPoliciesHandler, withAuth)

export const POST_POLICY = withMiddleware(
  createPolicyHandler,
  withAuth,
  withValidation(policySchema),
  (handler) => withRateLimit(handler, { max: 10, windowMs: 60000 })
)

export const THREATS = withMiddleware(getThreatsHandler, withAuth)

export const RESOLVE_THREAT = withMiddleware(resolveThreatHandler, withAuth)

export const ANALYTICS = withMiddleware(
  generateAnalyticsHandler,
  withAuth,
  (handler) => withRateLimit(handler, { max: 5, windowMs: 60000 })
)
