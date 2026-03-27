import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Analytics = ({ measurementId }) => {
  const location = useLocation()

  useEffect(() => {
    // Google Analytics 4
    if (measurementId) {
      // Load gtag script
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
      document.head.appendChild(script)

      // Initialize gtag
      window.dataLayer = window.dataLayer || []
      window.gtag = function() {
        window.dataLayer.push(arguments)
      }
      window.gtag('js', new Date())
      window.gtag('config', measurementId, {
        page_title: document.title,
        page_location: window.location.href
      })
    }

    // Vercel Analytics
    if (window.va) {
      window.va('pageview')
    }
  }, [measurementId])

  useEffect(() => {
    // Track page changes
    if (window.gtag) {
      window.gtag('config', measurementId, {
        page_title: document.title,
        page_location: window.location.href
      })
    }

    if (window.va) {
      window.va('pageview')
    }
  }, [location, measurementId])

  // Custom tracking functions
  const trackEvent = (eventName, parameters = {}) => {
    if (window.gtag) {
      window.gtag('event', eventName, parameters)
    }
  }

  const trackUserInteraction = (action, category, label) => {
    trackEvent('user_interaction', {
      action,
      category,
      label,
      custom_parameter: 'custom_value'
    })
  }

  const trackPerformance = (metricName, value) => {
    trackEvent('performance_metric', {
      metric_name: metricName,
      metric_value: value
    })
  }

  // Make tracking functions globally available
  useEffect(() => {
    window.trackEvent = trackEvent
    window.trackUserInteraction = trackUserInteraction
    window.trackPerformance = trackPerformance
  }, [])

  return null
}

export default Analytics
