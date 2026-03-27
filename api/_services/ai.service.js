import { supabaseAdmin } from '../_lib/supabase-admin'
import { BadRequestError, ForbiddenError, NotFoundError } from '../_lib/errors'

/**
 * AI Service - Handles all AI-related business logic and database operations
 */
export const AiService = {
  /**
   * Check if user has access to an organization
   */
  async checkOrgMembership(userId, organizationId) {
    if (!organizationId) {
      throw new BadRequestError('Organization ID is required')
    }

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
   * Get all models for an organization
   */
  async getModels(organizationId) {
    const { data: models, error } = await supabaseAdmin
      .from('ai_models')
      .select('*')
      .eq('organization_id', organizationId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return models || []
  },

  /**
   * Create a new AI model
   */
  async createModel(userId, organizationId, modelData) {
    const { data: model, error } = await supabaseAdmin
      .from('ai_models')
      .insert({
        ...modelData,
        organization_id: organizationId,
        created_by: userId,
        status: 'draft',
        usage_count: 0
      })
      .select()
      .single()

    if (error) throw error
    return model
  },

  /**
   * Get a specific model by ID
   */
  async getModelById(modelId, organizationId) {
    const { data: model, error } = await supabaseAdmin
      .from('ai_models')
      .select('*')
      .eq('id', modelId)
      .eq('organization_id', organizationId)
      .single()

    if (error || !model) {
      throw new NotFoundError('Model not found')
    }
    return model
  },

  /**
   * Record a prediction result
   */
  async recordPrediction(modelId, userId, predictionData) {
    const { data: savedPrediction, error } = await supabaseAdmin
      .from('ai_predictions')
      .insert({
        model_id: modelId,
        user_id: userId,
        ...predictionData
      })
      .select()
      .single()

    if (error) throw error

    // Increment usage count asynchronously
    supabaseAdmin.rpc('increment_model_usage', { model_id: modelId }).catch(console.error)

    return savedPrediction
  }
}
