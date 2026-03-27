// Security utilities and helpers

// Content Security Policy
export const cspDirectives = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'"],
  'style-src': ["'self'", "'unsafe-inline'"],
  'img-src': ["'self'", 'data:', 'https:'],
  'font-src': ["'self'"],
  'connect-src': ["'self'", 'https:'],
  'frame-src': ["'none'"],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'frame-ancestors': ["'none'"],
  'upgrade-insecure-requests': []
}

export const generateCSP = () => {
  return Object.entries(cspDirectives)
    .map(([directive, values]) => `${directive} ${values.join(' ')}`)
    .join('; ')
}

// Security Headers
export const securityHeaders = {
  'Content-Security-Policy': generateCSP(),
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-XSS-Protection': '1; mode=block',
  'Access-Control-Allow-Origin': process.env.NODE_ENV === 'development' ? '*' : 'https://axiar.io',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-CSRF-Token',
  'Access-Control-Allow-Credentials': 'true'
}

// Input Sanitization
export const sanitizeInput = (input, options = {}) => {
  if (typeof input !== 'string') return input

  const {
    allowHTML = false,
    maxLength = 1000,
    allowedTags = [],
    allowedAttributes = []
  } = options

  let sanitized = input

  // Remove potentially dangerous characters
  sanitized = sanitized
    .replace(/[\x00-\x1F\x7F]/g, '') // Control characters
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Unicode control characters
    .trim()

  // HTML sanitization
  if (!allowHTML) {
    sanitized = sanitized
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
      .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
  }

  // Length limit
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength)
  }

  return sanitized
}

// URL Validation
export const isValidURL = (url) => {
  try {
    const urlObj = new URL(url)
    return ['http:', 'https:'].includes(urlObj.protocol)
  } catch {
    return false
  }
}

// Email Validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Phone Validation
export const isValidPhone = (phone) => {
  const phoneRegex = /^\+?[0-9\s\-()]+$/
  return phoneRegex.test(phone)
}

// Password Strength Checker
export const checkPasswordStrength = (password) => {
  if (!password || typeof password !== 'string') {
    return { score: 0, feedback: 'Şifre gerekli' }
  }

  let score = 0
  const feedback = []

  // Length check
  if (password.length >= 8) score += 1
  else feedback.push('En az 8 karakter olmalı')

  if (password.length >= 12) score += 1
  else feedback.push('12+ karakter daha güvenli')

  // Character variety checks
  if (/[a-z]/.test(password)) {
    score += 1
  } else {
    feedback.push('Küçük harf içermeli')
  }

  if (/[A-Z]/.test(password)) {
    score += 1
  } else {
    feedback.push('Büyük harf içermeli')
  }

  if (/[0-9]/.test(password)) {
    score += 1
  } else {
    feedback.push('Rakam içermeli')
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    score += 1
  } else {
    feedback.push('Özel karakter içermeli')
  }

  // Common patterns check
  const commonPatterns = [
    /123456/, /password/i, /qwerty/i, /abc123/i,
    /admin/i, /letmein/i, /welcome/i
  ]

  const hasCommonPattern = commonPatterns.some(pattern => pattern.test(password))
  if (hasCommonPattern) {
    score -= 2
    feedback.push('Yaygın şifre desenlerinden kaçının')
  }

  // Repeated characters check
  const hasRepeatedChars = /(.)\1{2,}/.test(password)
  if (hasRepeatedChars) {
    score -= 1
    feedback.push('Tekrar eden karakterlerden kaçının')
  }

  // Determine strength
  let strength = 'weak'
  if (score >= 6) strength = 'very-strong'
  else if (score >= 5) strength = 'strong'
  else if (score >= 4) strength = 'medium'
  else if (score >= 3) strength = 'fair'

  return {
    score: Math.max(0, Math.min(6, score)),
    strength,
    feedback
  }
}

// CSRF Token Generator
export const generateCSRFToken = () => {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

// Rate Limiting Helper
export const createRateLimiter = (maxRequests, windowMs) => {
  const requests = []

  return {
    check: () => {
      const now = Date.now()
      const windowStart = now - windowMs
      
      // Remove old requests
      while (requests.length > 0 && requests[0] <= windowStart) {
        requests.shift()
      }

      return requests.length < maxRequests
    },
    
    add: () => {
      requests.push(Date.now())
    },
    
    reset: () => {
      requests.length = 0
    },
    
    count: () => requests.length
  }
}

// Security Event Logger
export const logSecurityEvent = (event, details = {}) => {
  const securityEvent = {
    timestamp: new Date().toISOString(),
    type: event,
    severity: details.severity || 'medium',
    details,
    userAgent: navigator.userAgent,
    url: window.location.href,
    sessionId: sessionStorage.getItem('sessionId') || 'unknown'
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.warn('Security Event:', securityEvent)
  }

  // Send to monitoring service in production
  if (process.env.NODE_ENV === 'production') {
    // Dynamic import to avoid circular deps in utility file
    import('@/services/api').then(({ default: api }) => {
      api.post('/security/log', securityEvent).catch(() => {})
    }).catch(() => {})
  }
}

// Session Management
export const sessionManager = {
  create: (userData) => {
    const session = {
      id: generateCSRFToken(),
      userId: userData.id,
      email: userData.email,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      ...userData
    }
    
    sessionStorage.setItem('userSession', JSON.stringify(session))
    return session
  },

  get: () => {
    const sessionData = sessionStorage.getItem('userSession')
    if (!sessionData) return null

    const session = JSON.parse(sessionData)
    
    // Check expiration
    if (new Date(session.expiresAt) < new Date()) {
      sessionStorage.removeItem('userSession')
      return null
    }

    return session
  },

  update: (updates) => {
    const session = sessionManager.get()
    if (session) {
      const updatedSession = { ...session, ...updates }
      sessionStorage.setItem('userSession', JSON.stringify(updatedSession))
      return updatedSession
    }
    return null
  },

  destroy: () => {
    sessionStorage.removeItem('userSession')
    sessionStorage.removeItem('sessionId')
  }
}
