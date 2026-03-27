import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Global API Cache Store using Zustand
 * Allows caching GET requests across the whole app
 */
export const useCacheStore = create(
  persist(
    (set, get) => ({
      cache: {}, // format: { key: { value, expiresAt } }

      setCache: (key, value, ttl = 300000) => {
        const expiresAt = Date.now() + ttl
        set((state) => ({
          cache: {
            ...state.cache,
            [key]: { value, expiresAt }
          }
        }))
      },

      getCache: (key) => {
        const item = get().cache[key]
        if (!item) return null
        
        // Check expiry
        if (Date.now() > item.expiresAt) {
          get().removeCache(key)
          return null
        }
        
        return item.value
      },

      removeCache: (key) => {
        set((state) => {
          const newCache = { ...state.cache }
          delete newCache[key]
          return { cache: newCache }
        })
      },

      clearCache: () => set({ cache: {} }),

      // Invalidate by pattern (e.g., all '/api/models' keys)
      invalidateByPattern: (pattern) => {
        set((state) => {
          const newCache = { ...state.cache }
          Object.keys(newCache).forEach(key => {
            if (key.includes(pattern)) {
              delete newCache[key]
            }
          })
          return { cache: newCache }
        })
      }
    }),
    {
      name: 'api-cache-storage',
      getStorage: () => localStorage // Persist cache even after browser close
    }
  )
)
