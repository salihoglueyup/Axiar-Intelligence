import axios from 'axios'
import { supabase } from './supabase'
import { toast } from 'react-toastify'
import { useCacheStore } from '../stores/cacheStore'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request Interceptor: Auth & Cache Check
api.interceptors.request.use(
  async (config) => {
    // 1. Get Supabase Session
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`
    }

    // 2. Organization ID
    const orgStore = localStorage.getItem('organization-store')
    if (orgStore) {
      try {
        const parsedStore = JSON.parse(orgStore)
        const orgId = parsedStore.state?.currentOrganization?.id
        if (orgId) config.headers['x-organization-id'] = orgId
      } catch (e) {}
    }

    // 3. Cache Logic (GET only)
    if (config.method === 'get' && config.cache !== false) {
      const cacheKey = `${config.url}${JSON.stringify(config.params || {})}`
      const cachedData = useCacheStore.getState().getCache(cacheKey)
      
      if (cachedData) {
        // Return a custom "fake" error/response to be caught in the next step
        config.adapter = () => Promise.resolve({
          data: cachedData,
          status: 200,
          statusText: 'OK',
          headers: config.headers,
          config,
          request: {}
        })
      }
    }

    return config
  },
  (error) => Promise.reject(error)
)

// Response Interceptor: Caching & Invalidation & Global Errors
api.interceptors.response.use(
  (response) => {
    const { config, data } = response
    
    // 1. Save to Cache (GET only)
    if (config.method === 'get' && config.cache !== false) {
      const cacheKey = `${config.url}${JSON.stringify(config.params || {})}`
      useCacheStore.getState().setCache(cacheKey, data)
    }

    // 2. Invalidate Cache on Mutating Requests
    if (['post', 'put', 'delete', 'patch'].includes(config.method)) {
      // If we create/edit/delete something in /api/models, clear all /api/models cache
      const urlPattern = config.url.split('/')[0] // simplistic pattern
      useCacheStore.getState().invalidateByPattern(urlPattern)
      
      if (data?.success && data?.message) toast.success(data.message)
    }

    return data
  },
  (error) => {
    // Error formatting logic (from previous step)
    const status = error.response?.status
    const data = error.response?.data
    let message = data?.error || 'Bir hata oluştu.'

    if (status === 429) toast.info('Çok hızlı gidiyorsun! Biraz yavaşla.')
    else if (status >= 500) toast.error('Sunucu hatası!')
    else if (status !== 404) toast.error(message)

    return Promise.reject(error)
  }
)

export default api
