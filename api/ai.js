import { withAuth, withRateLimit, withValidation, withMiddleware } from './_lib/middleware'
import { z } from 'zod'
import { AiService } from './_services/ai.service'

// 1. Validation Schemas
const createModelSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  type: z.enum(['classification', 'regression', 'clustering', 'anomaly_detection', 'recommendation', 'nlp', 'computer_vision', 'time_series', 'custom']),
  category: z.enum(['business', 'technical', 'analytics', 'automation', 'security', 'customer_service', 'finance', 'healthcare', 'custom']),
  framework: z.enum(['tensorflow', 'pytorch', 'scikit_learn', 'xgboost', 'lightgbm', 'huggingface', 'openai', 'anthropic', 'custom']),
  version: z.string()
})

const predictionSchema = z.object({
  model_id: z.string().uuid(),
  input_data: z.record(z.any()),
  metadata: z.record(z.any()).optional()
})

// 2. Route Handlers
const getModelsHandler = async (req, res) => {
  const organizationId = req.headers['x-organization-id']
  
  await AiService.checkOrgMembership(req.user.id, organizationId)
  const models = await AiService.getModels(organizationId)
  
  return res.status(200).json(models)
}

const createModelHandler = async (req, res) => {
  const organizationId = req.headers['x-organization-id']
  
  await AiService.checkOrgMembership(req.user.id, organizationId)
  const model = await AiService.createModel(req.user.id, organizationId, req.validatedData)
  
  return res.status(201).json(model)
}

const predictHandler = async (req, res) => {
  const { model_id, input_data, metadata } = req.validatedData
  const organizationId = req.headers['x-organization-id']

  await AiService.checkOrgMembership(req.user.id, organizationId)
  const model = await AiService.getModelById(model_id, organizationId)

  // Prediction Logic
  const predictionResult = { 
    result: 'mock_prediction', 
    confidence: 0.99 
  }

  const result = await AiService.recordPrediction(model_id, req.user.id, {
    input_data,
    output_data: predictionResult,
    confidence: predictionResult.confidence,
    metadata: { ...metadata, model_version: model.version }
  })

  return res.status(200).json(result)
}

// 3. Export with Middleware Chain
export default withMiddleware(getModelsHandler, withAuth)

export const POST = withMiddleware(
  createModelHandler, 
  withAuth, 
  withValidation(createModelSchema),
  (handler) => withRateLimit(handler, { max: 10, windowMs: 60000 })
)

export const PREDICT = withMiddleware(
  predictHandler,
  withAuth,
  withValidation(predictionSchema),
  (handler) => withRateLimit(handler, { max: 50, windowMs: 60000 })
)
