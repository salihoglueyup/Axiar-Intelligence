import { useEffect, useCallback } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from 'react-toastify'
import api from '@/services/api'

// API functions
const analyticsAPI = {
  getDashboards: async () => api.get('/analytics/dashboards'),
  getDashboard: async (id) => api.get(`/analytics/dashboards/${id}`),
  createDashboard: async (data) => api.post('/analytics/dashboards', data),
  updateDashboard: async (id, data) => api.put(`/analytics/dashboards/${id}`, data),
  deleteDashboard: async (id) => api.delete(`/analytics/dashboards/${id}`),

  getReports: async () => api.get('/analytics/reports'),
  getReport: async (id) => api.get(`/analytics/reports/${id}`),
  createReport: async (data) => api.post('/analytics/reports', data),
  updateReport: async (id, data) => api.put(`/analytics/reports/${id}`, data),
  deleteReport: async (id) => api.delete(`/analytics/reports/${id}`),
  executeReport: async (id, parameters) => api.post(`/analytics/reports/${id}/execute`, { parameters }),

  getConnections: async () => api.get('/analytics/connections'),
  getConnection: async (id) => api.get(`/analytics/connections/${id}`),
  createConnection: async (data) => api.post('/analytics/connections', data),
  testConnection: async (id) => api.post(`/analytics/connections/${id}/test`),
  deleteConnection: async (id) => api.delete(`/analytics/connections/${id}`),

  getQueries: async () => api.get('/analytics/queries'),
  getQuery: async (id) => api.get(`/analytics/queries/${id}`),
  createQuery: async (data) => api.post('/analytics/queries', data),
  executeQuery: async (id, parameters) => api.post(`/analytics/queries/${id}/execute`, { parameters }),
  deleteQuery: async (id) => api.delete(`/analytics/queries/${id}`),

  getInsights: async () => api.get('/analytics/insights'),
  acknowledgeInsight: async (id) => api.post(`/analytics/insights/${id}/acknowledge`),

  getWidgetData: async (widgetId, filters) => api.post(`/analytics/widgets/${widgetId}/data`, { filters })
}

// Zustand store
const useAnalyticsStore = create(
  persist(
    (set, get) => ({
      dashboards: [],
      reports: [],
      connections: [],
      queries: [],
      insights: [],
      isLoading: false,
      error: null,

      setDashboards: (dashboards) => set({ dashboards }),
      setReports: (reports) => set({ reports }),
      setConnections: (connections) => set({ connections }),
      setQueries: (queries) => set({ queries }),
      setInsights: (insights) => set({ insights }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      fetchDashboards: async () => {
        try {
          set({ isLoading: true, error: null })
          const dashboards = await analyticsAPI.getDashboards()
          set({ dashboards, isLoading: false })
        } catch (error) {
          set({ error: error.message, isLoading: false })
          toast.error('Dashboardlar yüklenemedi')
        }
      },

      fetchReports: async () => {
        try {
          set({ isLoading: true, error: null })
          const reports = await analyticsAPI.getReports()
          set({ reports, isLoading: false })
        } catch (error) {
          set({ error: error.message, isLoading: false })
          toast.error('Raporlar yüklenemedi')
        }
      },

      fetchConnections: async () => {
        try {
          set({ isLoading: true, error: null })
          const connections = await analyticsAPI.getConnections()
          set({ connections, isLoading: false })
        } catch (error) {
          set({ error: error.message, isLoading: false })
          toast.error('Veri bağlantıları yüklenemedi')
        }
      },

      fetchQueries: async () => {
        try {
          set({ isLoading: true, error: null })
          const queries = await analyticsAPI.getQueries()
          set({ queries, isLoading: false })
        } catch (error) {
          set({ error: error.message, isLoading: false })
          toast.error('Sorgular yüklenemedi')
        }
      },

      fetchInsights: async () => {
        try {
          set({ isLoading: true, error: null })
          const insights = await analyticsAPI.getInsights()
          set({ insights, isLoading: false })
        } catch (error) {
          set({ error: error.message, isLoading: false })
          toast.error('Insightlar yüklenemedi')
        }
      },

      createDashboard: async (data) => {
        try {
          const dashboard = await analyticsAPI.createDashboard(data)
          const { dashboards } = get()
          set({ dashboards: [...dashboards, dashboard] })
          toast.success('Dashboard oluşturuldu')
          return dashboard
        } catch (error) {
          set({ error: error.message })
          toast.error('Dashboard oluşturulamadı')
          throw error
        }
      },

      updateDashboard: async (id, data) => {
        try {
          const updatedDashboard = await analyticsAPI.updateDashboard(id, data)
          const { dashboards } = get()
          set({ dashboards: dashboards.map(d => d.id === id ? updatedDashboard : d) })
          toast.success('Dashboard güncellendi')
          return updatedDashboard
        } catch (error) {
          set({ error: error.message })
          toast.error('Dashboard güncellenemedi')
          throw error
        }
      },

      deleteDashboard: async (id) => {
        try {
          await analyticsAPI.deleteDashboard(id)
          const { dashboards } = get()
          set({ dashboards: dashboards.filter(d => d.id !== id) })
          toast.success('Dashboard silindi')
        } catch (error) {
          set({ error: error.message })
          toast.error('Dashboard silinemedi')
          throw error
        }
      },

      createReport: async (data) => {
        try {
          const report = await analyticsAPI.createReport(data)
          const { reports } = get()
          set({ reports: [...reports, report] })
          toast.success('Rapor oluşturuldu')
          return report
        } catch (error) {
          set({ error: error.message })
          toast.error('Rapor oluşturulamadı')
          throw error
        }
      },

      updateReport: async (id, data) => {
        try {
          const updatedReport = await analyticsAPI.updateReport(id, data)
          const { reports } = get()
          set({ reports: reports.map(r => r.id === id ? updatedReport : r) })
          toast.success('Rapor güncellendi')
          return updatedReport
        } catch (error) {
          set({ error: error.message })
          toast.error('Rapor güncellenemedi')
          throw error
        }
      },

      deleteReport: async (id) => {
        try {
          await analyticsAPI.deleteReport(id)
          const { reports } = get()
          set({ reports: reports.filter(r => r.id !== id) })
          toast.success('Rapor silindi')
        } catch (error) {
          set({ error: error.message })
          toast.error('Rapor silinemedi')
          throw error
        }
      },

      executeReport: async (id, parameters) => {
        try {
          return await analyticsAPI.executeReport(id, parameters)
        } catch (error) {
          set({ error: error.message })
          toast.error('Rapor çalıştırılamadı')
          throw error
        }
      },

      createConnection: async (data) => {
        try {
          const connection = await analyticsAPI.createConnection(data)
          const { connections } = get()
          set({ connections: [...connections, connection] })
          toast.success('Veri bağlantısı oluşturuldu')
          return connection
        } catch (error) {
          set({ error: error.message })
          toast.error('Veri bağlantısı oluşturulamadı')
          throw error
        }
      },

      testConnection: async (id) => {
        try {
          const result = await analyticsAPI.testConnection(id)
          if (result.success) {
            toast.success('Bağlantı testi başarılı')
          } else {
            toast.error(`Bağlantı testi başarısız: ${result.message}`)
          }
          return result
        } catch (error) {
          set({ error: error.message })
          toast.error('Bağlantı testi yapılamadı')
          throw error
        }
      },

      deleteConnection: async (id) => {
        try {
          await analyticsAPI.deleteConnection(id)
          const { connections } = get()
          set({ connections: connections.filter(c => c.id !== id) })
          toast.success('Veri bağlantısı silindi')
        } catch (error) {
          set({ error: error.message })
          toast.error('Veri bağlantısı silinemedi')
          throw error
        }
      },

      createQuery: async (data) => {
        try {
          const query = await analyticsAPI.createQuery(data)
          const { queries } = get()
          set({ queries: [...queries, query] })
          toast.success('Sorgu oluşturuldu')
          return query
        } catch (error) {
          set({ error: error.message })
          toast.error('Sorgu oluşturulamadı')
          throw error
        }
      },

      executeQuery: async (id, parameters) => {
        try {
          return await analyticsAPI.executeQuery(id, parameters)
        } catch (error) {
          set({ error: error.message })
          toast.error('Sorgu çalıştırılamadı')
          throw error
        }
      },

      deleteQuery: async (id) => {
        try {
          await analyticsAPI.deleteQuery(id)
          const { queries } = get()
          set({ queries: queries.filter(q => q.id !== id) })
          toast.success('Sorgu silindi')
        } catch (error) {
          set({ error: error.message })
          toast.error('Sorgu silinemedi')
          throw error
        }
      },

      acknowledgeInsight: async (id) => {
        try {
          await analyticsAPI.acknowledgeInsight(id)
          const { insights } = get()
          set({
            insights: insights.map(i =>
              i.id === id
                ? { ...i, is_acknowledged: true, acknowledged_at: new Date().toISOString() }
                : i
            )
          })
          toast.success('Insight onaylandı')
        } catch (error) {
          set({ error: error.message })
          toast.error('Insight onaylanamadı')
          throw error
        }
      },

      getWidgetData: async (widgetId, filters) => {
        try {
          return await analyticsAPI.getWidgetData(widgetId, filters)
        } catch (error) {
          set({ error: error.message })
          toast.error('Widget verisi alınamadı')
          throw error
        }
      }
    }),
    {
      name: 'analytics-store',
      partialize: (state) => ({
        dashboards: state.dashboards,
        reports: state.reports,
        connections: state.connections,
        queries: state.queries
      })
    }
  )
)

// GA Tracking helpers
const trackGA = (eventName, parameters = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, parameters)
  }
}

// Main hook
export const useAnalytics = () => {
  const store = useAnalyticsStore()

  useEffect(() => {
    store.fetchDashboards()
    store.fetchReports()
    store.fetchConnections()
    store.fetchQueries()
    store.fetchInsights()
  }, [])

  return {
    dashboards: store.dashboards,
    reports: store.reports,
    connections: store.connections,
    queries: store.queries,
    insights: store.insights,
    isLoading: store.isLoading,
    error: store.error,
    fetchDashboards: store.fetchDashboards,
    fetchReports: store.fetchReports,
    fetchConnections: store.fetchConnections,
    fetchQueries: store.fetchQueries,
    fetchInsights: store.fetchInsights,
    createDashboard: store.createDashboard,
    updateDashboard: store.updateDashboard,
    deleteDashboard: store.deleteDashboard,
    createReport: store.createReport,
    updateReport: store.updateReport,
    deleteReport: store.deleteReport,
    executeReport: store.executeReport,
    createConnection: store.createConnection,
    testConnection: store.testConnection,
    deleteConnection: store.deleteConnection,
    createQuery: store.createQuery,
    executeQuery: store.executeQuery,
    deleteQuery: store.deleteQuery,
    acknowledgeInsight: store.acknowledgeInsight,
    getWidgetData: store.getWidgetData,
    // GA Tracking
    trackEvent: useCallback((name, params) => trackGA(name, params), []),
    trackPageView: useCallback((url, title) => trackGA('config', { page_title: title, page_location: url }), []),
    trackError: useCallback((type, message, context) => trackGA('error', { error_type: type, error_message: message, context }), [])
  }
}

// Additional hooks
export const useDashboards = () => {
  const store = useAnalyticsStore()
  return {
    dashboards: store.dashboards, isLoading: store.isLoading, error: store.error,
    fetchDashboards: store.fetchDashboards, createDashboard: store.createDashboard,
    updateDashboard: store.updateDashboard, deleteDashboard: store.deleteDashboard
  }
}

export const useReports = () => {
  const store = useAnalyticsStore()
  return {
    reports: store.reports, isLoading: store.isLoading, error: store.error,
    fetchReports: store.fetchReports, createReport: store.createReport,
    updateReport: store.updateReport, deleteReport: store.deleteReport,
    executeReport: store.executeReport
  }
}

export const useConnections = () => {
  const store = useAnalyticsStore()
  return {
    connections: store.connections, isLoading: store.isLoading, error: store.error,
    fetchConnections: store.fetchConnections, createConnection: store.createConnection,
    testConnection: store.testConnection, deleteConnection: store.deleteConnection
  }
}

export const useQueries = () => {
  const store = useAnalyticsStore()
  return {
    queries: store.queries, isLoading: store.isLoading, error: store.error,
    fetchQueries: store.fetchQueries, createQuery: store.createQuery,
    executeQuery: store.executeQuery, deleteQuery: store.deleteQuery
  }
}

export const useInsights = () => {
  const store = useAnalyticsStore()
  return {
    insights: store.insights, isLoading: store.isLoading, error: store.error,
    fetchInsights: store.fetchInsights, acknowledgeInsight: store.acknowledgeInsight
  }
}

export default useAnalytics
