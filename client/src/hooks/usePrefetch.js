import { useEffect, useCallback } from 'react'
import { useApiCache } from './useCache'
import api from '@/services/api'

export const usePrefetch = () => {
  const { cacheResponse, getCachedResponse } = useApiCache()

  const prefetchData = useCallback(async (url, options = {}) => {
    const { params = {}, priority = 'low', ttl = 300000 } = options

    // Check if already cached
    if (getCachedResponse(url, params)) {
      return
    }

    // Use different prefetch strategies based on priority
    const doFetch = async () => {
      try {
        const data = await api.get(url, {
          params,
          headers: { 'X-Prefetch': 'true', 'Priority': priority }
        })
        cacheResponse(url, params, data, ttl)
      } catch {
        // Silently fail for prefetch
      }
    }

    if (priority === 'high') {
      // High priority: immediate fetch
      await doFetch()
    } else {
      // Low/medium priority: use requestIdleCallback
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => doFetch())
      } else {
        setTimeout(() => doFetch(), 100)
      }
    }
  }, [cacheResponse, getCachedResponse])

  const prefetchImage = useCallback((src, options = {}) => {
    const { priority = 'low', ttl = 3600000 } = options

    // Check if already cached
    if (getCachedResponse(src)) {
      return
    }

    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = src
    link.as = 'image'
    
    if (priority === 'high') {
      link.setAttribute('importance', 'high')
    } else {
      link.setAttribute('importance', 'low')
    }

    document.head.appendChild(link)

    // Cleanup after TTL
    setTimeout(() => {
      if (link.parentNode) {
        link.parentNode.removeChild(link)
      }
    }, ttl)
  }, [getCachedResponse])

  const prefetchRoute = useCallback((route, options = {}) => {
    const { priority = 'medium' } = options

    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = route
    
    if (priority === 'high') {
      link.setAttribute('importance', 'high')
    }

    document.head.appendChild(link)

    return () => {
      if (link.parentNode) {
        link.parentNode.removeChild(link)
      }
    }
  }, [])

  // Intelligent prefetching based on user behavior
  const prefetchOnHover = useCallback((element, prefetchFn, delay = 200) => {
    let timeoutId

    const handleMouseEnter = () => {
      timeoutId = setTimeout(() => {
        prefetchFn()
      }, delay)
    }

    const handleMouseLeave = () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [])

  return {
    prefetchData,
    prefetchImage,
    prefetchRoute,
    prefetchOnHover
  }
}

// Hook for prefetching critical resources
export const useCriticalPrefetch = (resources = []) => {
  useEffect(() => {
    resources.forEach(resource => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = resource.url
      link.as = resource.type
      
      if (resource.type === 'script') {
        link.setAttribute('crossorigin', 'anonymous')
      }
      
      if (resource.priority) {
        link.setAttribute('importance', resource.priority)
      }

      document.head.appendChild(link)
    })
  }, [resources])
}
