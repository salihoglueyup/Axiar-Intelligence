import { useState, useCallback, useEffect } from 'react'

export const useCache = (cacheName = 'default', maxSize = 100) => {
  const [cache, setCache] = useState(new Map())

  const get = useCallback((key) => {
    const item = cache.get(key)
    if (item && item.expiresAt && Date.now() > item.expiresAt) {
      cache.delete(key)
      setCache(new Map(cache))
      return null
    }
    return item?.value
  }, [cache])

  const set = useCallback((key, value, ttl = 300000) => { // 5 minutes default TTL
    const newCache = new Map(cache)
    newCache.set(key, {
      value,
      expiresAt: ttl > 0 ? Date.now() + ttl : null
    })
    
    // LRU eviction if cache is full
    if (newCache.size > maxSize) {
      const firstKey = newCache.keys().next().value
      newCache.delete(firstKey)
    }
    
    setCache(newCache)
  }, [cache, maxSize])

  const remove = useCallback((key) => {
    const newCache = new Map(cache)
    newCache.delete(key)
    setCache(newCache)
  }, [cache])

  const clear = useCallback(() => {
    setCache(new Map())
  }, [])

  const has = useCallback((key) => {
    const item = cache.get(key)
    if (item && item.expiresAt && Date.now() > item.expiresAt) {
      cache.delete(key)
      setCache(new Map(cache))
      return false
    }
    return cache.has(key)
  }, [cache])

  const size = useCallback(() => {
    return cache.size
  }, [cache])

  // Persist cache to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const serializedCache = JSON.stringify(Array.from(cache.entries()))
        localStorage.setItem(`cache_${cacheName}`, serializedCache)
      } catch (error) {
        console.warn('Failed to persist cache:', error)
      }
    }
  }, [cache, cacheName])

  // Restore cache from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const serializedCache = localStorage.getItem(`cache_${cacheName}`)
        if (serializedCache) {
          const entries = JSON.parse(serializedCache)
          setCache(new Map(entries))
        }
      } catch (error) {
        console.warn('Failed to restore cache:', error)
      }
    }
  }, [cacheName])

  return {
    get,
    set,
    remove,
    clear,
    has,
    size
  }
}

// API response cache hook
export const useApiCache = () => {
  const cache = useCache('api', 50)

  const getCachedResponse = useCallback((url, params = {}) => {
    const key = `${url}?${JSON.stringify(params)}`
    return cache.get(key)
  }, [cache])

  const cacheResponse = useCallback((url, params = {}, response, ttl = 300000) => {
    const key = `${url}?${JSON.stringify(params)}`
    cache.set(key, response, ttl)
  }, [cache])

  const invalidateCache = useCallback((urlPattern) => {
    // Invalidate all cache entries that match the pattern
    const keys = Array.from(cache.cache.keys())
    keys.forEach(key => {
      if (key.includes(urlPattern)) {
        cache.remove(key)
      }
    })
  }, [cache])

  return {
    getCachedResponse,
    cacheResponse,
    invalidateCache,
    clearCache: cache.clear,
    cacheSize: cache.size
  }
}

// Image cache hook
export const useImageCache = () => {
  const cache = useCache('images', 200)

  const getCachedImage = useCallback((src) => {
    return cache.get(src)
  }, [cache])

  const cacheImage = useCallback((src, blob, ttl = 3600000) => { // 1 hour default TTL
    cache.set(src, blob, ttl)
  }, [cache])

  return {
    getCachedImage,
    cacheImage,
    clearCache: cache.clear
  }
}
