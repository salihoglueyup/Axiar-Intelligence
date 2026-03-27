import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useAuth } from '@/context/AuthContext'
import api from '@/services/api'

// API functions
const organizationAPI = {
  getOrganizations: async () => api.get('/organizations'),
  getOrganization: async (id) => api.get(`/organizations/${id}`),
  createOrganization: async (data) => api.post('/organizations', data),
  updateOrganization: async (id, data) => api.put(`/organizations/${id}`, data),
  deleteOrganization: async (id) => api.delete(`/organizations/${id}`),
  getTeamMembers: async (orgId) => api.get(`/organizations/${orgId}/members`),
  inviteMember: async (orgId, email, role) => api.post(`/organizations/${orgId}/invite`, { email, role }),
  updateMemberRole: async (orgId, userId, role) => api.put(`/organizations/${orgId}/members/${userId}`, { role }),
  removeMember: async (orgId, userId) => api.delete(`/organizations/${orgId}/members/${userId}`),
  getInvitations: async (orgId) => api.get(`/organizations/${orgId}/invitations`),
  acceptInvitation: async (token) => api.post('/organizations/accept-invitation', { token }),
  revokeInvitation: async (orgId, invitationId) => api.delete(`/organizations/${orgId}/invitations/${invitationId}`),
  getAnalytics: async (orgId, period) => api.get(`/organizations/${orgId}/analytics`, { params: { period } }),
  getUsage: async (orgId) => api.get(`/organizations/${orgId}/usage`)
}

// Role permissions helper
const getRolePermissions = (role) => {
  const rolePermissions = {
    owner: [{ resource: '*', actions: ['*'] }],
    admin: [
      { resource: 'organizations', actions: ['read', 'update'] },
      { resource: 'team', actions: ['*'] },
      { resource: 'projects', actions: ['*'] },
      { resource: 'billing', actions: ['read'] }
    ],
    manager: [
      { resource: 'projects', actions: ['*'] },
      { resource: 'team', actions: ['read', 'invite', 'update_role'] },
      { resource: 'reports', actions: ['*'] }
    ],
    developer: [
      { resource: 'projects', actions: ['read', 'update'] },
      { resource: 'reports', actions: ['read', 'create'] }
    ],
    analyst: [
      { resource: 'projects', actions: ['read'] },
      { resource: 'reports', actions: ['*'] },
      { resource: 'analytics', actions: ['read'] }
    ],
    viewer: [
      { resource: 'projects', actions: ['read'] },
      { resource: 'reports', actions: ['read'] }
    ]
  }
  return rolePermissions[role] || []
}

const hasPermission = (permissions, resource, action) => {
  return permissions.some(permission => {
    if (permission.resource === '*' && permission.actions.includes('*')) return true
    if (permission.resource === resource) {
      return permission.actions.includes('*') || permission.actions.includes(action)
    }
    return false
  })
}

// Zustand store
const useOrganizationStore = create(
  persist(
    (set, get) => ({
      organizations: [],
      currentOrganization: null,
      currentRole: null,
      permissions: [],
      teamMembers: [],
      invitations: [],
      analytics: null,
      usage: null,
      isLoading: false,
      error: null,

      setOrganizations: (organizations) => set({ organizations }),
      setCurrentOrganization: (currentOrganization) => set({ currentOrganization }),
      setCurrentRole: (currentRole) => set({ currentRole }),
      setPermissions: (permissions) => set({ permissions }),
      setTeamMembers: (teamMembers) => set({ teamMembers }),
      setInvitations: (invitations) => set({ invitations }),
      setAnalytics: (analytics) => set({ analytics }),
      setUsage: (usage) => set({ usage }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      fetchOrganizations: async () => {
        try {
          set({ isLoading: true, error: null })
          const organizations = await organizationAPI.getOrganizations()
          set({ organizations, isLoading: false })
        } catch (error) {
          set({ error: error.message, isLoading: false })
          toast.error('Organizasyonlar yüklenemedi')
        }
      },

      switchOrganization: async (orgId, userId) => {
        try {
          set({ isLoading: true, error: null })
          const organization = await organizationAPI.getOrganization(orgId)
          const members = await organizationAPI.getTeamMembers(orgId)
          const invitations = await organizationAPI.getInvitations(orgId)
          const currentUser = members.find(m => m.user_id === userId)
          const role = currentUser?.role || 'viewer'
          const permissions = getRolePermissions(role)
          set({
            currentOrganization: organization, currentRole: role,
            permissions, teamMembers: members, invitations, isLoading: false
          })
          toast.success(`"${organization.name}" organizasyonuna geçildi`)
        } catch (error) {
          set({ error: error.message, isLoading: false })
          toast.error('Organizasyon değiştirilemedi')
        }
      },

      updateOrganization: async (data) => {
        try {
          const { currentOrganization } = get()
          if (!currentOrganization) return
          const updated = await organizationAPI.updateOrganization(currentOrganization.id, data)
          set({ currentOrganization: updated })
          toast.success('Organizasyon güncellendi')
        } catch (error) {
          set({ error: error.message })
          toast.error('Organizasyon güncellenemedi')
        }
      },

      inviteMember: async (email, role) => {
        try {
          const { currentOrganization } = get()
          if (!currentOrganization) return
          const invitation = await organizationAPI.inviteMember(currentOrganization.id, email, role)
          const { invitations } = get()
          set({ invitations: [...invitations, invitation] })
          toast.success('Üye davet edildi')
        } catch (error) {
          set({ error: error.message })
          toast.error('Üye davet edilemedi')
        }
      },

      updateMemberRole: async (userId, role) => {
        try {
          const { currentOrganization } = get()
          if (!currentOrganization) return
          const updatedMember = await organizationAPI.updateMemberRole(currentOrganization.id, userId, role)
          const { teamMembers } = get()
          set({ teamMembers: teamMembers.map(m => m.user_id === userId ? updatedMember : m) })
          toast.success('Üye rolü güncellendi')
        } catch (error) {
          set({ error: error.message })
          toast.error('Üye rolü güncellenemedi')
        }
      },

      removeMember: async (userId) => {
        try {
          const { currentOrganization } = get()
          if (!currentOrganization) return
          await organizationAPI.removeMember(currentOrganization.id, userId)
          const { teamMembers } = get()
          set({ teamMembers: teamMembers.filter(m => m.user_id !== userId) })
          toast.success('Üye kaldırıldı')
        } catch (error) {
          set({ error: error.message })
          toast.error('Üye kaldırılamadı')
        }
      },

      fetchTeamMembers: async () => {
        try {
          const { currentOrganization } = get()
          if (!currentOrganization) return
          const members = await organizationAPI.getTeamMembers(currentOrganization.id)
          set({ teamMembers: members })
        } catch (error) {
          set({ error: error.message })
        }
      },

      fetchInvitations: async () => {
        try {
          const { currentOrganization } = get()
          if (!currentOrganization) return
          const invitations = await organizationAPI.getInvitations(currentOrganization.id)
          set({ invitations })
        } catch (error) {
          set({ error: error.message })
        }
      },

      fetchAnalytics: async (period = 'monthly') => {
        try {
          const { currentOrganization } = get()
          if (!currentOrganization) return
          const analytics = await organizationAPI.getAnalytics(currentOrganization.id, period)
          set({ analytics })
        } catch (error) {
          set({ error: error.message })
        }
      },

      fetchUsage: async () => {
        try {
          const { currentOrganization } = get()
          if (!currentOrganization) return
          const usage = await organizationAPI.getUsage(currentOrganization.id)
          set({ usage })
        } catch (error) {
          set({ error: error.message })
        }
      }
    }),
    {
      name: 'organization-store',
      partialize: (state) => ({
        currentOrganization: state.currentOrganization,
        currentRole: state.currentRole,
        permissions: state.permissions
      })
    }
  )
)

// Main hook
export const useOrganization = () => {
  const navigate = useNavigate()
  const store = useOrganizationStore()
  const { user } = useAuth()

  const switchOrganization = useCallback(async (orgId) => {
    if (!user?.id) {
      toast.error('Oturum bilgisi bulunamadı')
      return
    }
    await store.switchOrganization(orgId, user.id)
    navigate('/portal/dashboard')
  }, [navigate, store, user?.id])

  const updateOrganization = useCallback(async (data) => {
    await store.updateOrganization(data)
  }, [store])

  const inviteMember = useCallback(async (email, role) => {
    await store.inviteMember(email, role)
  }, [store])

  const removeMember = useCallback(async (userId) => {
    await store.removeMember(userId)
  }, [store])

  const updateMemberRole = useCallback(async (userId, role) => {
    await store.updateMemberRole(userId, role)
  }, [store])

  useEffect(() => {
    store.fetchOrganizations()
  }, [store])

  useEffect(() => {
    if (store.currentOrganization) {
      store.fetchTeamMembers()
      store.fetchInvitations()
      store.fetchUsage()
    }
  }, [store.currentOrganization, store])

  return {
    organization: store.currentOrganization,
    userRole: store.currentRole,
    permissions: store.permissions,
    isLoading: store.isLoading,
    error: store.error,
    switchOrganization,
    updateOrganization,
    inviteMember,
    removeMember,
    updateMemberRole
  }
}

// Additional hooks
export const useOrganizationList = () => {
  const store = useOrganizationStore()
  return {
    organizations: store.organizations, isLoading: store.isLoading,
    error: store.error, fetchOrganizations: store.fetchOrganizations
  }
}

export const useTeamMembers = () => {
  const store = useOrganizationStore()
  return {
    teamMembers: store.teamMembers, isLoading: store.isLoading, error: store.error,
    fetchTeamMembers: store.fetchTeamMembers, inviteMember: store.inviteMember,
    updateMemberRole: store.updateMemberRole, removeMember: store.removeMember
  }
}

export const useInvitations = () => {
  const store = useOrganizationStore()
  return {
    invitations: store.invitations, isLoading: store.isLoading,
    error: store.error, fetchInvitations: store.fetchInvitations
  }
}

export const useOrganizationAnalytics = () => {
  const store = useOrganizationStore()
  return {
    analytics: store.analytics, isLoading: store.isLoading,
    error: store.error, fetchAnalytics: store.fetchAnalytics
  }
}

export const useOrganizationUsage = () => {
  const store = useOrganizationStore()
  return {
    usage: store.usage, isLoading: store.isLoading,
    error: store.error, fetchUsage: store.fetchUsage
  }
}

export const usePermissions = () => {
  const store = useOrganizationStore()
  const can = useCallback((resource, action) => {
    return hasPermission(store.permissions, resource, action)
  }, [store.permissions])

  return {
    permissions: store.permissions, can,
    isOwner: store.currentRole === 'owner', isAdmin: store.currentRole === 'admin',
    isManager: store.currentRole === 'manager', isDeveloper: store.currentRole === 'developer',
    isAnalyst: store.currentRole === 'analyst', isViewer: store.currentRole === 'viewer'
  }
}

export default useOrganization
