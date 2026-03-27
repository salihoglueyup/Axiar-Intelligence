import { useState, useEffect, useCallback, useRef } from 'react'

export const useIntersection = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [entry, setEntry] = useState(null)
  const ref = useRef(null)

  const {
    threshold = 0.1,
    root = null,
    rootMargin = '0px',
    triggerOnce = false,
    enabled = true
  } = options

  useEffect(() => {
    if (!enabled) return

    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
        setEntry(entry)

        if (entry.isIntersecting && triggerOnce) {
          observer.unobserve(element)
        }
      },
      {
        threshold,
        root,
        rootMargin
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, root, rootMargin, triggerOnce, enabled])

  return {
    ref,
    isIntersecting,
    entry
  }
}

export const useIntersectionObserver = (elements, options = {}) => {
  const [entries, setEntries] = useState([])
  const observerRef = useRef(null)

  const {
    threshold = 0.1,
    root = null,
    rootMargin = '0px'
  } = options

  useEffect(() => {
    if (!elements || elements.length === 0) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        setEntries(entries)
      },
      {
        threshold,
        root,
        rootMargin
      }
    )

    elements.forEach(element => {
      if (element) {
        observerRef.current.observe(element)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [elements, threshold, root, rootMargin])

  return {
    entries,
    disconnect: () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }
}
