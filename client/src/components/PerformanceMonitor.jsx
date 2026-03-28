import React, { useState, useEffect, useCallback } from 'react'
import { useAnalytics } from '@/hooks/useAnalytics'

const PerformanceMonitor = ({ children }) => {
  const { trackPerformance, trackError } = useAnalytics()
  const [metrics, setMetrics] = useState({
    fcp: 0, // First Contentful Paint
    lcp: 0, // Largest Contentful Paint
    fid: 0, // First Input Delay
    cls: 0, // Cumulative Layout Shift
    ttfb: 0 // Time to First Byte
  })

  // Measure Core Web Vitals
  useEffect(() => {
    if ('PerformanceObserver' in window) {
      // First Contentful Paint
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach(entry => {
          if (entry.name === 'first-contentful-paint') {
            setMetrics(prev => ({ ...prev, fcp: entry.startTime }))
            trackPerformance('fcp', Math.round(entry.startTime), 'milliseconds')
          }
        })
      })
      fcpObserver.observe({ entryTypes: ['paint'] })

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        if (lastEntry) {
          setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }))
          trackPerformance('lcp', Math.round(lastEntry.startTime), 'milliseconds')
        }
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach(entry => {
          if (entry.name === 'first-input') {
            setMetrics(prev => ({ ...prev, fid: entry.processingStart - entry.startTime }))
            trackPerformance('fid', Math.round(entry.processingStart - entry.startTime), 'milliseconds')
          }
        })
      })
      fidObserver.observe({ entryTypes: ['first-input'] })

      // Cumulative Layout Shift
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach(entry => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
            setMetrics(prev => ({ ...prev, cls: Math.round(clsValue * 1000) / 1000 }))
          }
        })
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })

      // Resource timing
      const resourceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach(entry => {
          if (entry.initiatorType === 'navigation') {
            setMetrics(prev => ({ ...prev, ttfb: entry.responseStart - entry.requestStart }))
            trackPerformance('ttfb', Math.round(entry.responseStart - entry.requestStart), 'milliseconds')
          }
        })
      })
      resourceObserver.observe({ entryTypes: ['navigation'] })

      return () => {
        fcpObserver.disconnect()
        lcpObserver.disconnect()
        fidObserver.disconnect()
        clsObserver.disconnect()
        resourceObserver.disconnect()
      }
    }
  }, [trackPerformance])

  // Monitor memory usage
  useEffect(() => {
    const measureMemory = () => {
      if ('memory' in performance) {
        const memoryInfo = performance.memory
        const memoryUsage = {
          used: Math.round(memoryInfo.usedJSHeapSize / 1048576), // MB
          total: Math.round(memoryInfo.totalJSHeapSize / 1048576), // MB
          limit: Math.round(memoryInfo.jsHeapSizeLimit / 1048576) // MB
        }
        trackPerformance('memory_used', memoryUsage.used, 'MB')
        trackPerformance('memory_total', memoryUsage.total, 'MB')
      }
    }

    const interval = setInterval(measureMemory, 30000) // Every 30 seconds
    return () => clearInterval(interval)
  }, [trackPerformance])

  // Monitor network conditions
  useEffect(() => {
    const measureNetwork = () => {
      if ('connection' in navigator) {
        const connection = navigator.connection
        const networkInfo = {
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
          saveData: connection.saveData
        }
        trackPerformance('network_type', networkInfo.effectiveType, 'string')
        trackPerformance('network_downlink', networkInfo.downlink, 'Mbps')
        trackPerformance('network_rtt', networkInfo.rtt, 'milliseconds')
      }
    }

    measureNetwork()
    window.addEventListener('online', measureNetwork)
    window.addEventListener('offline', measureNetwork)

    return () => {
      window.removeEventListener('online', measureNetwork)
      window.removeEventListener('offline', measureNetwork)
    }
  }, [trackPerformance])



  // Performance score calculation
  const calculatePerformanceScore = useCallback(() => {
    const { fcp, lcp, fid, cls } = metrics
    
    let score = 100
    
    // FCP scoring (0-1800ms, good: <1000ms)
    if (fcp > 1800) score -= 25
    else if (fcp > 1000) score -= 15
    
    // LCP scoring (0-2500ms, good: <1200ms)
    if (lcp > 2500) score -= 25
    else if (lcp > 1200) score -= 15
    
    // FID scoring (0-300ms, good: <100ms)
    if (fid > 300) score -= 25
    else if (fid > 100) score -= 15
    
    // CLS scoring (0-0.25, good: <0.1)
    if (cls > 0.25) score -= 25
    else if (cls > 0.1) score -= 15
    
    return Math.max(0, score)
  }, [metrics])

  const performanceScore = calculatePerformanceScore()

  return (
    <>
      {children}
      
      {/* Performance metrics panel (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-lg shadow-xl z-50 text-xs">
          <h3 className="font-bold mb-2">Performance Metrics</h3>
          <div className="space-y-1">
            <div>FCP: {metrics.fcp}ms</div>
            <div>LCP: {metrics.lcp}ms</div>
            <div>FID: {metrics.fid}ms</div>
            <div>CLS: {metrics.cls}</div>
            <div>TTFB: {metrics.ttfb}ms</div>
            <div className="font-bold mt-2">Score: {performanceScore}</div>
          </div>
        </div>
      )}
    </>
  )
}

export default PerformanceMonitor
