import { useEffect } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from 'react-toastify'
import api from '@/services/api'

// API functions — migrated from raw fetch() to Axios api instance
const securityAPI = {
  getPolicies: async () => api.get('/security/policies'),
  getPolicy: async (id) => api.get(`/security/policies/${id}`),
  createPolicy: async (data) => api.post('/security/policies', data),
  updatePolicy: async (id, data) => api.put(`/security/policies/${id}`, data),
  deletePolicy: async (id) => api.delete(`/security/policies/${id}`),

  getThreats: async () => api.get('/security/threats'),
  getThreat: async (id) => api.get(`/security/threats/${id}`),
  createThreat: async (data) => api.post('/security/threats', data),
  updateThreat: async (id, data) => api.put(`/security/threats/${id}`, data),
  resolveThreat: async (id) => api.post(`/security/threats/${id}/resolve`),

  getAnalytics: async (period) => {
    const params = period ? { period } : {}
    return api.get('/security/analytics', { params })
  },
  generateAnalytics: async (period) => api.post('/security/analytics/generate', { period }),

  getComplianceStatus: async () => api.get('/security/compliance'),
  getRiskAssessment: async () => api.get('/security/risk-assessment'),

  getAlerts: async () => api.get('/security/alerts'),
  acknowledgeAlert: async (id) => api.post(`/security/alerts/${id}/acknowledge`),
  resolveAlert: async (id) => api.post(`/security/alerts/${id}/resolve`),

  getRecommendations: async () => api.get('/security/recommendations'),
  implementRecommendation: async (id) => api.post(`/security/recommendations/${id}/implement`)
}

// Zustand store
const useSecurityStore = create(
  persist(
    (set, get) => ({
      policies: [],
      threats: [],
      analytics: [],
      alerts: [],
      recommendations: [],
      complianceStatus: null,
      riskAssessment: null,
      isLoading: false,
      error: null,

      setPolicies: (policies) => set({ policies }),
      setThreats: (threats) => set({ threats }),
      setAnalytics: (analytics) => set({ analytics }),
      setAlerts: (alerts) => set({ alerts }),
      setRecommendations: (recommendations) => set({ recommendations }),
      setComplianceStatus: (complianceStatus) => set({ complianceStatus }),
      setRiskAssessment: (riskAssessment) => set({ riskAssessment }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      fetchPolicies: async () => {
        try {
          set({ isLoading: true, error: null })
          const policies = await securityAPI.getPolicies()
          set({ policies, isLoading: false })
        } catch (error) {
          set({ error: error.message, isLoading: false })
          toast.error('Güvenlik politikaları yüklenemedi')
        }
      },

      fetchThreats: async () => {
        try {
          set({ isLoading: true, error: null })
          const threats = await securityAPI.getThreats()
          set({ threats, isLoading: false })
        } catch (error) {
          set({ error: error.message, isLoading: false })
          toast.error('Güvenlik tehditleri yüklenemedi')
        }
      },

      fetchAnalytics: async () => {
        try {
          set({ isLoading: true, error: null })
          const analytics = await securityAPI.getAnalytics()
          set({ analytics, isLoading: false })
        } catch (error) {
          set({ error: error.message, isLoading: false })
          toast.error('Güvenlik analitikleri yüklenemedi')
        }
      },

      fetchAlerts: async () => {
        try {
          set({ isLoading: true, error: null })
          const alerts = await securityAPI.getAlerts()
          set({ alerts, isLoading: false })
        } catch (error) {
          set({ error: error.message, isLoading: false })
          toast.error('Güvenlik uyarıları yüklenemedi')
        }
      },

      fetchRecommendations: async () => {
        try {
          set({ isLoading: true, error: null })
          const recommendations = await securityAPI.getRecommendations()
          set({ recommendations, isLoading: false })
        } catch (error) {
          set({ error: error.message, isLoading: false })
          toast.error('Güvenlik önerileri yüklenemedi')
        }
      },

      fetchComplianceStatus: async () => {
        try {
          set({ isLoading: true, error: null })
          const complianceStatus = await securityAPI.getComplianceStatus()
          set({ complianceStatus, isLoading: false })
        } catch (error) {
          set({ error: error.message, isLoading: false })
          toast.error('Uyumluluk durumu yüklenemedi')
        }
      },

      fetchRiskAssessment: async () => {
        try {
          set({ isLoading: true, error: null })
          const riskAssessment = await securityAPI.getRiskAssessment()
          set({ riskAssessment, isLoading: false })
        } catch (error) {
          set({ error: error.message, isLoading: false })
          toast.error('Risk değerlendirmesi yüklenemedi')
        }
      },

      createPolicy: async (data) => {
        try {
          const policy = await securityAPI.createPolicy(data)
          const { policies } = get()
          set({ policies: [...policies, policy] })
          toast.success('Güvenlik politikası oluşturuldu')
          return policy
        } catch (error) {
          set({ error: error.message })
          toast.error('Güvenlik politikası oluşturulamadı')
          throw error
        }
      },

      updatePolicy: async (id, data) => {
        try {
          const updatedPolicy = await securityAPI.updatePolicy(id, data)
          const { policies } = get()
          set({ policies: policies.map(p => p.id === id ? updatedPolicy : p) })
          toast.success('Güvenlik politikası güncellendi')
          return updatedPolicy
        } catch (error) {
          set({ error: error.message })
          toast.error('Güvenlik politikası güncellenemedi')
          throw error
        }
      },

      deletePolicy: async (id) => {
        try {
          await securityAPI.deletePolicy(id)
          const { policies } = get()
          set({ policies: policies.filter(p => p.id !== id) })
          toast.success('Güvenlik politikası silindi')
        } catch (error) {
          set({ error: error.message })
          toast.error('Güvenlik politikası silinemedi')
          throw error
        }
      },

      createThreat: async (data) => {
        try {
          const threat = await securityAPI.createThreat(data)
          const { threats } = get()
          set({ threats: [...threats, threat] })
          toast.success('Güvenlik tehdidi oluşturuldu')
          return threat
        } catch (error) {
          set({ error: error.message })
          toast.error('Güvenlik tehdidi oluşturulamadı')
          throw error
        }
      },

      updateThreat: async (id, data) => {
        try {
          const updatedThreat = await securityAPI.updateThreat(id, data)
          const { threats } = get()
          set({ threats: threats.map(t => t.id === id ? updatedThreat : t) })
          toast.success('Güvenlik tehdidi güncellendi')
          return updatedThreat
        } catch (error) {
          set({ error: error.message })
          toast.error('Güvenlik tehdidi güncellenemedi')
          throw error
        }
      },

      resolveThreat: async (id) => {
        try {
          await securityAPI.resolveThreat(id)
          const { threats } = get()
          set({
            threats: threats.map(t =>
              t.id === id
                ? { ...t, status: 'resolved', is_resolved: true, resolved_at: new Date().toISOString() }
                : t
            )
          })
          toast.success('Güvenlik tehdidi çözüldü')
        } catch (error) {
          set({ error: error.message })
          toast.error('Güvenlik tehdidi çözülemedi')
          throw error
        }
      },

      generateAnalytics: async (period) => {
        try {
          const analytics = await securityAPI.generateAnalytics(period)
          const { analytics: existingAnalytics } = get()
          set({ analytics: [analytics, ...existingAnalytics] })
          toast.success('Güvenlik analitikleri oluşturuldu')
          return analytics
        } catch (error) {
          set({ error: error.message })
          toast.error('Güvenlik analitikleri oluşturulamadı')
          throw error
        }
      },

      acknowledgeAlert: async (id) => {
        try {
          await securityAPI.acknowledgeAlert(id)
          const { alerts } = get()
          set({
            alerts: alerts.map(a =>
              a.id === id ? { ...a, status: 'investigating' } : a
            )
          })
          toast.success('Güvenlik uyarısı kabul edildi')
        } catch (error) {
          set({ error: error.message })
          toast.error('Güvenlik uyarısı kabul edilemedi')
          throw error
        }
      },

      resolveAlert: async (id) => {
        try {
          await securityAPI.resolveAlert(id)
          const { alerts } = get()
          set({
            alerts: alerts.map(a =>
              a.id === id
                ? { ...a, status: 'resolved', resolved_at: new Date().toISOString() }
                : a
            )
          })
          toast.success('Güvenlik uyarısı çözüldü')
        } catch (error) {
          set({ error: error.message })
          toast.error('Güvenlik uyarısı çözülemedi')
          throw error
        }
      },

      implementRecommendation: async (id) => {
        try {
          await securityAPI.implementRecommendation(id)
          const { recommendations } = get()
          set({
            recommendations: recommendations.map(r =>
              r.id === id ? { ...r, status: 'completed' } : r
            )
          })
          toast.success('Güvenlik önerisi uygulandı')
        } catch (error) {
          set({ error: error.message })
          toast.error('Güvenlik önerisi uygulanamadı')
          throw error
        }
      }
    }),
    {
      name: 'security-store',
      partialize: (state) => ({
        policies: state.policies,
        threats: state.threats,
        alerts: state.alerts,
        recommendations: state.recommendations
      })
    }
  )
)

// Main hook
export const useSecurity = () => {
  const store = useSecurityStore()

  useEffect(() => {
    store.fetchPolicies()
    store.fetchThreats()
    store.fetchAnalytics()
    store.fetchAlerts()
    store.fetchRecommendations()
    store.fetchComplianceStatus()
    store.fetchRiskAssessment()
  }, [])

  return {
    policies: store.policies, threats: store.threats, analytics: store.analytics,
    alerts: store.alerts, recommendations: store.recommendations,
    complianceStatus: store.complianceStatus, riskAssessment: store.riskAssessment,
    isLoading: store.isLoading, error: store.error,
    fetchPolicies: store.fetchPolicies, fetchThreats: store.fetchThreats,
    fetchAnalytics: store.fetchAnalytics, fetchAlerts: store.fetchAlerts,
    fetchRecommendations: store.fetchRecommendations,
    fetchComplianceStatus: store.fetchComplianceStatus,
    fetchRiskAssessment: store.fetchRiskAssessment,
    createPolicy: store.createPolicy, updatePolicy: store.updatePolicy,
    deletePolicy: store.deletePolicy,
    createThreat: store.createThreat, updateThreat: store.updateThreat,
    resolveThreat: store.resolveThreat,
    generateAnalytics: store.generateAnalytics,
    acknowledgeAlert: store.acknowledgeAlert, resolveAlert: store.resolveAlert,
    implementRecommendation: store.implementRecommendation
  }
}

// Additional hooks
export const useSecurityPolicies = () => {
  const store = useSecurityStore()
  return {
    policies: store.policies, isLoading: store.isLoading, error: store.error,
    fetchPolicies: store.fetchPolicies, createPolicy: store.createPolicy,
    updatePolicy: store.updatePolicy, deletePolicy: store.deletePolicy
  }
}

export const useSecurityThreats = () => {
  const store = useSecurityStore()
  return {
    threats: store.threats, isLoading: store.isLoading, error: store.error,
    fetchThreats: store.fetchThreats, createThreat: store.createThreat,
    updateThreat: store.updateThreat, resolveThreat: store.resolveThreat
  }
}

export const useSecurityAnalytics = () => {
  const store = useSecurityStore()
  return {
    analytics: store.analytics, isLoading: store.isLoading, error: store.error,
    fetchAnalytics: store.fetchAnalytics, generateAnalytics: store.generateAnalytics
  }
}

export const useSecurityAlerts = () => {
  const store = useSecurityStore()
  return {
    alerts: store.alerts, isLoading: store.isLoading, error: store.error,
    fetchAlerts: store.fetchAlerts, acknowledgeAlert: store.acknowledgeAlert,
    resolveAlert: store.resolveAlert
  }
}

export const useSecurityCompliance = () => {
  const store = useSecurityStore()
  return {
    complianceStatus: store.complianceStatus, riskAssessment: store.riskAssessment,
    isLoading: store.isLoading, error: store.error,
    fetchComplianceStatus: store.fetchComplianceStatus,
    fetchRiskAssessment: store.fetchRiskAssessment
  }
}

// Helper functions
export const getPolicyStatusColor = (status) => {
  const colors = {
    active: 'text-green-400', inactive: 'text-gray-400', testing: 'text-yellow-400',
    deprecated: 'text-orange-400', violated: 'text-red-400', under_review: 'text-blue-400'
  }
  return colors[status] || 'text-gray-400'
}

export const getPolicyStatusLabel = (status) => {
  const labels = {
    active: 'Aktif', inactive: 'Pasif', testing: 'Test Ediyor',
    deprecated: 'Kullanımdan Kaldırıldı', violated: 'İhlal Edildi', under_review: 'İnceleniyor'
  }
  return labels[status] || status
}

export const getThreatSeverityColor = (severity) => {
  const colors = {
    info: 'text-blue-400', low: 'text-green-400', medium: 'text-yellow-400',
    high: 'text-orange-400', critical: 'text-red-400'
  }
  return colors[severity] || 'text-gray-400'
}

export const getThreatSeverityLabel = (severity) => {
  const labels = { info: 'Bilgi', low: 'Düşük', medium: 'Orta', high: 'Yüksek', critical: 'Kritik' }
  return labels[severity] || severity
}

export const getThreatStatusColor = (status) => {
  const colors = {
    detected: 'text-yellow-400', investigating: 'text-blue-400', contained: 'text-orange-400',
    resolved: 'text-green-400', false_positive: 'text-gray-400', ignored: 'text-gray-500'
  }
  return colors[status] || 'text-gray-400'
}

export const getThreatStatusLabel = (status) => {
  const labels = {
    detected: 'Tespit Edildi', investigating: 'İnceleniyor', contained: 'Kontrol Altında',
    resolved: 'Çözüldü', false_positive: 'Yanlış Pozitif', ignored: 'Göz Ardı Edildi'
  }
  return labels[status] || status
}

export const getAlertSeverityColor = (severity) => {
  const colors = {
    info: 'text-blue-400', low: 'text-green-400', medium: 'text-yellow-400',
    high: 'text-orange-400', critical: 'text-red-400'
  }
  return colors[severity] || 'text-gray-400'
}

export const getAlertSeverityLabel = (severity) => {
  const labels = { info: 'Bilgi', low: 'Düşük', medium: 'Orta', high: 'Yüksek', critical: 'Kritik' }
  return labels[severity] || severity
}

export default useSecurity
