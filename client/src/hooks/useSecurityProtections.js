import { useState, useCallback, useEffect } from 'react'
import { z } from 'zod'

// XSS Protection
export const useXSSProtection = () => {
  const sanitizeInput = useCallback((input) => {
    if (typeof input !== 'string') return input

    return input
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, '') // Remove event handlers
      .trim()
  }, [])

  const sanitizeHTML = useCallback((html) => {
    if (typeof html !== 'string') return html

    // Basic HTML sanitization
    const temp = document.createElement('div')
    temp.textContent = html
    return temp.innerHTML
  }, [])

  const validateInput = useCallback((input, options = {}) => {
    const { 
      maxLength = 1000, 
      allowedChars = /^[a-zA-Z0-9\s\-_.,!?@#$%&*()]+$/,
      blockPatterns = [/script:/i, /javascript:/i, /on\w+=/i]
    } = options

    if (typeof input !== 'string') {
      return { valid: false, error: 'Input must be a string' }
    }

    if (input.length > maxLength) {
      return { valid: false, error: `Input too long (max ${maxLength} characters)` }
    }

    if (!allowedChars.test(input)) {
      return { valid: false, error: 'Invalid characters detected' }
    }

    for (const pattern of blockPatterns) {
      if (pattern.test(input)) {
        return { valid: false, error: 'Potentially malicious content detected' }
      }
    }

    return { valid: true }
  }, [])

  return {
    sanitizeInput,
    sanitizeHTML,
    validateInput
  }
}

// CSRF Protection
export const useCSRFProtection = () => {
  const [csrfToken, setCsrfToken] = useState('')

  const generateToken = useCallback(() => {
    const token = Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
    setCsrfToken(token)
    return token
  }, [])

  const validateToken = useCallback((token) => {
    return token === csrfToken && token.length === 64
  }, [csrfToken])

  const getHeaders = useCallback(() => {
    return {
      'X-CSRF-Token': csrfToken,
      'X-Requested-With': 'XMLHttpRequest'
    }
  }, [csrfToken])

  useEffect(() => {
    generateToken()
  }, [generateToken])

  return {
    csrfToken,
    generateToken,
    validateToken,
    getHeaders
  }
}

// Rate Limiting
export const useRateLimit = (maxRequests = 10, windowMs = 60000) => {
  const [requests, setRequests] = useState([])
  const [isBlocked, setIsBlocked] = useState(false)

  const checkRateLimit = useCallback(() => {
    const now = Date.now()
    const windowStart = now - windowMs

    const recentRequests = requests.filter(timestamp => timestamp > windowStart)
    
    if (recentRequests.length >= maxRequests) {
      setIsBlocked(true)
      setTimeout(() => setIsBlocked(false), windowMs)
      return false
    }

    setRequests([...recentRequests, now])
    return true
  }, [requests, maxRequests, windowMs])

  const resetRateLimit = useCallback(() => {
    setRequests([])
    setIsBlocked(false)
  }, [])

  return {
    isBlocked,
    checkRateLimit,
    resetRateLimit,
    requestCount: requests.length
  }
}

// Input Validation Schemas
export const securitySchemas = {
  email: z.string().email('Geçerli bir e-posta adresi girin'),
  password: z.string()
    .min(8, 'Şifre en az 8 karakter olmalı')
    .regex(/[A-Z]/, 'Şifre en az bir büyük harf içermeli')
    .regex(/[a-z]/, 'Şifre en az bir küçük harf içermeli')
    .regex(/[0-9]/, 'Şifre en az bir rakam içermeli')
    .regex(/[^A-Za-z0-9]/, 'Şifre en az bir özel karakter içermeli'),
  phone: z.string()
    .regex(/^\+?[0-9\s\-()]+$/, 'Geçerli bir telefon numarası girin'),
  url: z.string().url('Geçerli bir URL girin'),
  name: z.string()
    .min(2, 'İsim en az 2 karakter olmalı')
    .max(50, 'İsim en fazla 50 karakter olabilir')
    .regex(/^[a-zA-Z\sğüşıöçİĞÜŞİÖÇ]+$/, 'İsim sadece harf içerebilir'),
  description: z.string()
    .max(500, 'Açıklama en fazla 500 karakter olabilir')
}

// Security Headers Helper
export const getSecurityHeaders = () => {
  return {
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https:;",
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
  }
}

// Security Event Logger
export const useSecurityLogger = () => {
  const logSecurityEvent = useCallback((event, details = {}) => {
    const securityEvent = {
      timestamp: new Date().toISOString(),
      type: event,
      severity: details.severity || 'medium',
      details,
      userAgent: navigator.userAgent,
      ip: details.ip || 'unknown'
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('Security Event:', securityEvent)
    }

    // Send to monitoring service in production
    if (process.env.NODE_ENV === 'production' && window.gtag) {
      window.gtag('event', 'security_event', {
        event_category: 'security',
        event_label: event,
        custom_parameters: securityEvent
      })
    }
  }, [])

  return {
    logSecurityEvent
  }
}
