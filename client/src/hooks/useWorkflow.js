import { useEffect } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from 'react-toastify'
import api from '@/services/api'

// API functions — migrated from raw fetch() to Axios api instance
const workflowAPI = {
  getWorkflows: async () => api.get('/workflows'),
  getWorkflow: async (id) => api.get(`/workflows/${id}`),
  createWorkflow: async (data) => api.post('/workflows', data),
  updateWorkflow: async (id, data) => api.put(`/workflows/${id}`, data),
  deleteWorkflow: async (id) => api.delete(`/workflows/${id}`),
  executeWorkflow: async (id, data) => api.post(`/workflows/${id}/execute`, { data }),
  cancelExecution: async (id) => api.post(`/workflow-executions/${id}/cancel`),
  pauseExecution: async (id) => api.post(`/workflow-executions/${id}/pause`),
  resumeExecution: async (id) => api.post(`/workflow-executions/${id}/resume`),

  getExecutions: async () => api.get('/workflow-executions'),
  getExecution: async (id) => api.get(`/workflow-executions/${id}`),

  getTasks: async () => api.get('/workflow-tasks'),
  getTask: async (id) => api.get(`/workflow-tasks/${id}`),
  createTask: async (data) => api.post('/workflow-tasks', data),
  updateTask: async (id, data) => api.put(`/workflow-tasks/${id}`, data),
  completeTask: async (id, data) => api.post(`/workflow-tasks/${id}/complete`, { data }),
  rejectTask: async (id, reason) => api.post(`/workflow-tasks/${id}/reject`, { reason }),
  addComment: async (taskId, content) => api.post(`/workflow-tasks/${taskId}/comments`, { content }),
  addAttachment: async (taskId, file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post(`/workflow-tasks/${taskId}/attachments`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },

  getApprovals: async () => api.get('/workflow-approvals'),
  getApproval: async (id) => api.get(`/workflow-approvals/${id}`),
  approveRequest: async (id, decision) => api.post(`/workflow-approvals/${id}/approve`, decision),
  rejectRequest: async (id, decision) => api.post(`/workflow-approvals/${id}/reject`, decision),

  getTemplates: async () => api.get('/workflow-templates'),
  getTemplate: async (id) => api.get(`/workflow-templates/${id}`),
  createWorkflowFromTemplate: async (templateId, data) => api.post(`/workflow-templates/${templateId}/create`, data)
}

// Zustand store
const useWorkflowStore = create(
  persist(
    (set, get) => ({
      workflows: [],
      executions: [],
      tasks: [],
      approvals: [],
      templates: [],
      isLoading: false,
      error: null,

      setWorkflows: (workflows) => set({ workflows }),
      setExecutions: (executions) => set({ executions }),
      setTasks: (tasks) => set({ tasks }),
      setApprovals: (approvals) => set({ approvals }),
      setTemplates: (templates) => set({ templates }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      fetchWorkflows: async () => {
        try {
          set({ isLoading: true, error: null })
          const workflows = await workflowAPI.getWorkflows()
          set({ workflows, isLoading: false })
        } catch (error) {
          set({ error: error.message, isLoading: false })
          toast.error('Workflowlar yüklenemedi')
        }
      },

      fetchExecutions: async () => {
        try {
          set({ isLoading: true, error: null })
          const executions = await workflowAPI.getExecutions()
          set({ executions, isLoading: false })
        } catch (error) {
          set({ error: error.message, isLoading: false })
          toast.error('Çalıştırmalar yüklenemedi')
        }
      },

      fetchTasks: async () => {
        try {
          set({ isLoading: true, error: null })
          const tasks = await workflowAPI.getTasks()
          set({ tasks, isLoading: false })
        } catch (error) {
          set({ error: error.message, isLoading: false })
          toast.error('Görevler yüklenemedi')
        }
      },

      fetchApprovals: async () => {
        try {
          set({ isLoading: true, error: null })
          const approvals = await workflowAPI.getApprovals()
          set({ approvals, isLoading: false })
        } catch (error) {
          set({ error: error.message, isLoading: false })
          toast.error('Onaylar yüklenemedi')
        }
      },

      fetchTemplates: async () => {
        try {
          set({ isLoading: true, error: null })
          const templates = await workflowAPI.getTemplates()
          set({ templates, isLoading: false })
        } catch (error) {
          set({ error: error.message, isLoading: false })
          toast.error('Şablonlar yüklenemedi')
        }
      },

      createWorkflow: async (data) => {
        try {
          const workflow = await workflowAPI.createWorkflow(data)
          const { workflows } = get()
          set({ workflows: [...workflows, workflow] })
          toast.success('Workflow oluşturuldu')
          return workflow
        } catch (error) {
          set({ error: error.message })
          toast.error('Workflow oluşturulamadı')
          throw error
        }
      },

      updateWorkflow: async (id, data) => {
        try {
          const updatedWorkflow = await workflowAPI.updateWorkflow(id, data)
          const { workflows } = get()
          set({ workflows: workflows.map(w => w.id === id ? updatedWorkflow : w) })
          toast.success('Workflow güncellendi')
          return updatedWorkflow
        } catch (error) {
          set({ error: error.message })
          toast.error('Workflow güncellenemedi')
          throw error
        }
      },

      deleteWorkflow: async (id) => {
        try {
          await workflowAPI.deleteWorkflow(id)
          const { workflows } = get()
          set({ workflows: workflows.filter(w => w.id !== id) })
          toast.success('Workflow silindi')
        } catch (error) {
          set({ error: error.message })
          toast.error('Workflow silinemedi')
          throw error
        }
      },

      executeWorkflow: async (id, data) => {
        try {
          const execution = await workflowAPI.executeWorkflow(id, data)
          const { executions } = get()
          set({ executions: [execution, ...executions] })
          toast.success('Workflow çalıştırıldı')
          return execution
        } catch (error) {
          set({ error: error.message })
          toast.error('Workflow çalıştırılamadı')
          throw error
        }
      },

      cancelExecution: async (id) => {
        try {
          await workflowAPI.cancelExecution(id)
          const { executions } = get()
          set({ executions: executions.map(e => e.id === id ? { ...e, status: 'cancelled' } : e) })
          toast.success('Çalıştırma iptal edildi')
        } catch (error) {
          set({ error: error.message })
          toast.error('Çalıştırma iptal edilemedi')
          throw error
        }
      },

      pauseExecution: async (id) => {
        try {
          await workflowAPI.pauseExecution(id)
          const { executions } = get()
          set({ executions: executions.map(e => e.id === id ? { ...e, status: 'paused' } : e) })
          toast.success('Çalıştırma duraklatıldı')
        } catch (error) {
          set({ error: error.message })
          toast.error('Çalıştırma duraklatılamadı')
          throw error
        }
      },

      resumeExecution: async (id) => {
        try {
          await workflowAPI.resumeExecution(id)
          const { executions } = get()
          set({ executions: executions.map(e => e.id === id ? { ...e, status: 'running' } : e) })
          toast.success('Çalıştırma devam ettirildi')
        } catch (error) {
          set({ error: error.message })
          toast.error('Çalıştırma devam ettirilemedi')
          throw error
        }
      },

      completeTask: async (id, data) => {
        try {
          await workflowAPI.completeTask(id, data)
          const { tasks } = get()
          set({
            tasks: tasks.map(t =>
              t.id === id ? { ...t, status: 'completed', completed_at: new Date().toISOString() } : t
            )
          })
          toast.success('Görev tamamlandı')
        } catch (error) {
          set({ error: error.message })
          toast.error('Görev tamamlanamadı')
          throw error
        }
      },

      rejectTask: async (id, reason) => {
        try {
          await workflowAPI.rejectTask(id, reason)
          const { tasks } = get()
          set({ tasks: tasks.map(t => t.id === id ? { ...t, status: 'rejected' } : t) })
          toast.success('Görev reddedildi')
        } catch (error) {
          set({ error: error.message })
          toast.error('Görev reddedilemedi')
          throw error
        }
      },

      updateTask: async (id, data) => {
        try {
          const updatedTask = await workflowAPI.updateTask(id, data)
          const { tasks } = get()
          set({ tasks: tasks.map(t => t.id === id ? updatedTask : t) })
          toast.success('Görev güncellendi')
          return updatedTask
        } catch (error) {
          set({ error: error.message })
          toast.error('Görev güncellenemedi')
          throw error
        }
      },

      approveRequest: async (id, decision) => {
        try {
          await workflowAPI.approveRequest(id, decision)
          const { approvals } = get()
          set({
            approvals: approvals.map(a =>
              a.id === id ? { ...a, status: 'approved', decision, decided_at: new Date().toISOString() } : a
            )
          })
          toast.success('Onay talebi onaylandı')
        } catch (error) {
          set({ error: error.message })
          toast.error('Onay talebi onaylanamadı')
          throw error
        }
      },

      rejectRequest: async (id, decision) => {
        try {
          await workflowAPI.rejectRequest(id, decision)
          const { approvals } = get()
          set({
            approvals: approvals.map(a =>
              a.id === id ? { ...a, status: 'rejected', decision, decided_at: new Date().toISOString() } : a
            )
          })
          toast.success('Onay talebi reddedildi')
        } catch (error) {
          set({ error: error.message })
          toast.error('Onay talebi reddedilemedi')
          throw error
        }
      },

      addComment: async (taskId, content) => {
        try {
          await workflowAPI.addComment(taskId, content)
          const tasks = await workflowAPI.getTasks()
          set({ tasks })
          toast.success('Yorum eklendi')
        } catch (error) {
          set({ error: error.message })
          toast.error('Yorum eklenemedi')
          throw error
        }
      },

      addAttachment: async (taskId, file) => {
        try {
          await workflowAPI.addAttachment(taskId, file)
          const tasks = await workflowAPI.getTasks()
          set({ tasks })
          toast.success('Dosya eklendi')
        } catch (error) {
          set({ error: error.message })
          toast.error('Dosya eklenemedi')
          throw error
        }
      },

      createWorkflowFromTemplate: async (templateId, data) => {
        try {
          const workflow = await workflowAPI.createWorkflowFromTemplate(templateId, data)
          const { workflows } = get()
          set({ workflows: [...workflows, workflow] })
          toast.success('Şablondan workflow oluşturuldu')
          return workflow
        } catch (error) {
          set({ error: error.message })
          toast.error('Şablondan workflow oluşturulamadı')
          throw error
        }
      }
    }),
    {
      name: 'workflow-store',
      partialize: (state) => ({
        workflows: state.workflows,
        tasks: state.tasks,
        approvals: state.approvals
      })
    }
  )
)

// Main hook
export const useWorkflow = () => {
  const store = useWorkflowStore()

  useEffect(() => {
    store.fetchWorkflows()
    store.fetchExecutions()
    store.fetchTasks()
    store.fetchApprovals()
    store.fetchTemplates()
  }, [])

  return {
    workflows: store.workflows, executions: store.executions,
    tasks: store.tasks, approvals: store.approvals, templates: store.templates,
    isLoading: store.isLoading, error: store.error,
    fetchWorkflows: store.fetchWorkflows, fetchExecutions: store.fetchExecutions,
    fetchTasks: store.fetchTasks, fetchApprovals: store.fetchApprovals,
    fetchTemplates: store.fetchTemplates,
    createWorkflow: store.createWorkflow, updateWorkflow: store.updateWorkflow,
    deleteWorkflow: store.deleteWorkflow,
    executeWorkflow: store.executeWorkflow, cancelExecution: store.cancelExecution,
    pauseExecution: store.pauseExecution, resumeExecution: store.resumeExecution,
    completeTask: store.completeTask, rejectTask: store.rejectTask,
    updateTask: store.updateTask,
    approveRequest: store.approveRequest, rejectRequest: store.rejectRequest,
    addComment: store.addComment, addAttachment: store.addAttachment,
    createWorkflowFromTemplate: store.createWorkflowFromTemplate
  }
}

// Additional hooks
export const useWorkflows = () => {
  const store = useWorkflowStore()
  return {
    workflows: store.workflows, isLoading: store.isLoading, error: store.error,
    fetchWorkflows: store.fetchWorkflows, createWorkflow: store.createWorkflow,
    updateWorkflow: store.updateWorkflow, deleteWorkflow: store.deleteWorkflow,
    executeWorkflow: store.executeWorkflow
  }
}

export const useTasks = () => {
  const store = useWorkflowStore()
  return {
    tasks: store.tasks, isLoading: store.isLoading, error: store.error,
    fetchTasks: store.fetchTasks, updateTask: store.updateTask,
    completeTask: store.completeTask, rejectTask: store.rejectTask,
    addComment: store.addComment, addAttachment: store.addAttachment
  }
}

export const useApprovals = () => {
  const store = useWorkflowStore()
  return {
    approvals: store.approvals, isLoading: store.isLoading, error: store.error,
    fetchApprovals: store.fetchApprovals, approveRequest: store.approveRequest,
    rejectRequest: store.rejectRequest
  }
}

export const useWorkflowExecutions = () => {
  const store = useWorkflowStore()
  return {
    executions: store.executions, isLoading: store.isLoading, error: store.error,
    fetchExecutions: store.fetchExecutions, cancelExecution: store.cancelExecution,
    pauseExecution: store.pauseExecution, resumeExecution: store.resumeExecution
  }
}

export const useWorkflowTemplates = () => {
  const store = useWorkflowStore()
  return {
    templates: store.templates, isLoading: store.isLoading, error: store.error,
    fetchTemplates: store.fetchTemplates,
    createWorkflowFromTemplate: store.createWorkflowFromTemplate
  }
}

export default useWorkflow
