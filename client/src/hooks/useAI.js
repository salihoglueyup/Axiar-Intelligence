import { useEffect } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from 'react-toastify'
import api from '@/services/api'

// API functions
const aiAPI = {
  // Models
  getModels: async () => api.get('/ai/models'),
  getModel: async (id) => api.get(`/ai/models/${id}`),
  createModel: async (data) => api.post('/ai/models', data),
  updateModel: async (id, data) => api.put(`/ai/models/${id}`, data),
  deleteModel: async (id) => api.delete(`/ai/models/${id}`),

  // Training
  trainModel: async (id, config) => api.post(`/ai/models/${id}/train`, { config }),
  getTrainingJobs: async () => api.get('/ai/training-jobs'),
  getTrainingJob: async (id) => api.get(`/ai/training-jobs/${id}`),
  cancelTrainingJob: async (id) => api.post(`/ai/training-jobs/${id}/cancel`),

  // Deployment
  deployModel: async (id, config) => api.post(`/ai/models/${id}/deploy`, { config }),
  undeployModel: async (id) => api.post(`/ai/models/${id}/undeploy`),

  // Predictions
  predict: async (modelId, data) => api.post(`/ai/models/${modelId}/predict`, { data }),
  batchPredict: async (modelId, data) => api.post(`/ai/models/${modelId}/predict/batch`, { data }),
  getPredictions: async (modelId, filters) => {
    const params = { model_id: modelId, ...filters }
    return api.get('/ai/predictions', { params })
  },

  // Metrics
  getModelMetrics: async (id) => api.get(`/ai/models/${id}/metrics`),
  getPredictionHistory: async (modelId, filters) => {
    const params = { model_id: modelId, ...filters }
    return api.get('/ai/predictions/history', { params })
  }
}

// Zustand store
const useAIStore = create(
  persist(
    (set, get) => ({
      models: [],
      predictions: [],
      trainingJobs: [],
      isLoading: false,
      error: null,

      setModels: (models) => set({ models }),
      setPredictions: (predictions) => set({ predictions }),
      setTrainingJobs: (trainingJobs) => set({ trainingJobs }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      fetchModels: async () => {
        try {
          set({ isLoading: true, error: null })
          const models = await aiAPI.getModels()
          set({ models, isLoading: false })
        } catch (error) {
          set({ error: error.message, isLoading: false })
          toast.error('Modeller yüklenemedi')
        }
      },

      fetchPredictions: async () => {
        try {
          set({ isLoading: true, error: null })
          const predictions = await aiAPI.getPredictions()
          set({ predictions, isLoading: false })
        } catch (error) {
          set({ error: error.message, isLoading: false })
          toast.error('Tahminler yüklenemedi')
        }
      },

      fetchTrainingJobs: async () => {
        try {
          set({ isLoading: true, error: null })
          const trainingJobs = await aiAPI.getTrainingJobs()
          set({ trainingJobs, isLoading: false })
        } catch (error) {
          set({ error: error.message, isLoading: false })
          toast.error('Eğitim işleri yüklenemedi')
        }
      },

      createModel: async (data) => {
        try {
          const model = await aiAPI.createModel(data)
          const { models } = get()
          set({ models: [...models, model] })
          toast.success('Model oluşturuldu')
          return model
        } catch (error) {
          set({ error: error.message })
          toast.error('Model oluşturulamadı')
          throw error
        }
      },

      updateModel: async (id, data) => {
        try {
          const updatedModel = await aiAPI.updateModel(id, data)
          const { models } = get()
          set({
            models: models.map(m => m.id === id ? updatedModel : m)
          })
          toast.success('Model güncellendi')
          return updatedModel
        } catch (error) {
          set({ error: error.message })
          toast.error('Model güncellenemedi')
          throw error
        }
      },

      deleteModel: async (id) => {
        try {
          await aiAPI.deleteModel(id)
          const { models } = get()
          set({
            models: models.filter(m => m.id !== id)
          })
          toast.success('Model silindi')
        } catch (error) {
          set({ error: error.message })
          toast.error('Model silinemedi')
          throw error
        }
      },

      trainModel: async (id, config) => {
        try {
          const trainingJob = await aiAPI.trainModel(id, config)
          const { trainingJobs } = get()
          set({ trainingJobs: [trainingJob, ...trainingJobs] })
          toast.success('Model eğitimi başlatıldı')
          return trainingJob
        } catch (error) {
          set({ error: error.message })
          toast.error('Model eğitimi başlatılamadı')
          throw error
        }
      },

      deployModel: async (id, config) => {
        try {
          const updatedModel = await aiAPI.deployModel(id, config)
          const { models } = get()
          set({
            models: models.map(m => m.id === id ? updatedModel : m)
          })
          toast.success('Model dağıtıldı')
          return updatedModel
        } catch (error) {
          set({ error: error.message })
          toast.error('Model dağıtılamadı')
          throw error
        }
      },

      undeployModel: async (id) => {
        try {
          await aiAPI.undeployModel(id)
          const { models } = get()
          set({
            models: models.map(m => m.id === id ? { ...m, status: 'trained' } : m)
          })
          toast.success('Model dağıtımı kaldırıldı')
        } catch (error) {
          set({ error: error.message })
          toast.error('Model dağıtımı kaldırılamadı')
          throw error
        }
      },

      predict: async (modelId, data) => {
        try {
          const prediction = await aiAPI.predict(modelId, data)
          const { predictions } = get()
          set({ predictions: [prediction, ...predictions] })
          return prediction
        } catch (error) {
          set({ error: error.message })
          toast.error('Tahmin yapılamadı')
          throw error
        }
      },

      batchPredict: async (modelId, data) => {
        try {
          const predictions = await aiAPI.batchPredict(modelId, data)
          const { predictions: existingPredictions } = get()
          set({ predictions: [...predictions, ...existingPredictions] })
          return predictions
        } catch (error) {
          set({ error: error.message })
          toast.error('Toplu tahmin yapılamadı')
          throw error
        }
      },

      getTrainingJob: async (id) => {
        try {
          const trainingJob = await aiAPI.getTrainingJob(id)
          const { trainingJobs } = get()
          set({
            trainingJobs: trainingJobs.map(t => t.id === id ? trainingJob : t)
          })
          return trainingJob
        } catch (error) {
          set({ error: error.message })
          toast.error('Eğitim işi alınamadı')
          throw error
        }
      },

      cancelTrainingJob: async (id) => {
        try {
          await aiAPI.cancelTrainingJob(id)
          const { trainingJobs } = get()
          set({
            trainingJobs: trainingJobs.map(t =>
              t.id === id ? { ...t, status: 'cancelled' } : t
            )
          })
          toast.success('Eğitim işi iptal edildi')
        } catch (error) {
          set({ error: error.message })
          toast.error('Eğitim işi iptal edilemedi')
          throw error
        }
      },

      getModelMetrics: async (id) => {
        try {
          const metrics = await aiAPI.getModelMetrics(id)
          const { models } = get()
          set({
            models: models.map(m => m.id === id ? { ...m, metrics } : m)
          })
          return metrics
        } catch (error) {
          set({ error: error.message })
          toast.error('Model metrikleri alınamadı')
          throw error
        }
      },

      getPredictionHistory: async (modelId, filters) => {
        try {
          const predictions = await aiAPI.getPredictionHistory(modelId, filters)
          set({ predictions })
          return predictions
        } catch (error) {
          set({ error: error.message })
          toast.error('Tahmin geçmişi alınamadı')
          throw error
        }
      }
    }),
    {
      name: 'ai-store',
      partialize: (state) => ({
        models: state.models,
        predictions: state.predictions.slice(0, 100),
        trainingJobs: state.trainingJobs
      })
    }
  )
)

// Main hook
export const useAI = () => {
  const store = useAIStore()

  useEffect(() => {
    store.fetchModels()
    store.fetchPredictions()
    store.fetchTrainingJobs()
  }, [])

  return {
    models: store.models,
    predictions: store.predictions,
    trainingJobs: store.trainingJobs,
    isLoading: store.isLoading,
    error: store.error,
    fetchModels: store.fetchModels,
    fetchPredictions: store.fetchPredictions,
    fetchTrainingJobs: store.fetchTrainingJobs,
    createModel: store.createModel,
    updateModel: store.updateModel,
    deleteModel: store.deleteModel,
    trainModel: store.trainModel,
    deployModel: store.deployModel,
    undeployModel: store.undeployModel,
    predict: store.predict,
    batchPredict: store.batchPredict,
    getTrainingJob: store.getTrainingJob,
    cancelTrainingJob: store.cancelTrainingJob,
    getModelMetrics: store.getModelMetrics,
    getPredictionHistory: store.getPredictionHistory
  }
}

// Additional hooks
export const useModels = () => {
  const store = useAIStore()
  return {
    models: store.models, isLoading: store.isLoading, error: store.error,
    fetchModels: store.fetchModels, createModel: store.createModel,
    updateModel: store.updateModel, deleteModel: store.deleteModel,
    trainModel: store.trainModel, deployModel: store.deployModel,
    undeployModel: store.undeployModel, getModelMetrics: store.getModelMetrics
  }
}

export const usePredictions = () => {
  const store = useAIStore()
  return {
    predictions: store.predictions, isLoading: store.isLoading, error: store.error,
    fetchPredictions: store.fetchPredictions, predict: store.predict,
    batchPredict: store.batchPredict, getPredictionHistory: store.getPredictionHistory
  }
}

export const useTrainingJobs = () => {
  const store = useAIStore()
  return {
    trainingJobs: store.trainingJobs, isLoading: store.isLoading, error: store.error,
    fetchTrainingJobs: store.fetchTrainingJobs,
    getTrainingJob: store.getTrainingJob, cancelTrainingJob: store.cancelTrainingJob
  }
}

// Model status helpers
export const getModelStatusColor = (status) => {
  const colors = {
    draft: 'text-gray-400', training: 'text-blue-400', trained: 'text-green-400',
    testing: 'text-yellow-400', deployed: 'text-cyan-400', failed: 'text-red-400',
    archived: 'text-gray-500'
  }
  return colors[status] || 'text-gray-400'
}

export const getModelStatusLabel = (status) => {
  const labels = {
    draft: 'Taslak', training: 'Eğitiliyor', trained: 'Eğitildi',
    testing: 'Test Ediliyor', deployed: 'Dağıtıldı', failed: 'Başarısız',
    archived: 'Arşivlendi'
  }
  return labels[status] || status
}

export const getModelTypeIcon = (type) => {
  const icons = {
    classification: '🎯', regression: '📈', clustering: '🔗',
    anomaly_detection: '⚠️', recommendation: '💡', nlp: '📝',
    computer_vision: '👁️', time_series: '⏰'
  }
  return icons[type] || '🤖'
}

export const getFrameworkLabel = (framework) => {
  const labels = {
    tensorflow: 'TensorFlow', pytorch: 'PyTorch', scikit_learn: 'Scikit-Learn',
    xgboost: 'XGBoost', lightgbm: 'LightGBM', huggingface: 'Hugging Face',
    openai: 'OpenAI', anthropic: 'Anthropic'
  }
  return labels[framework] || framework
}

export default useAI
