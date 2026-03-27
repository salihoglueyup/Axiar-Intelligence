import { createClient } from '@supabase/supabase-js'
import { ApiError, BadRequestError, UnauthorizedError, ForbiddenError, RateLimitError } from './errors'

// Helper for Supabase Client (Lazy Load)
let supabaseInstance = null
const getSupabase = () => {
  if (!supabaseInstance) {
    supabaseInstance = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    )
  }
  return supabaseInstance
}

// 1. Performance & Request Logger Middleware
export const withLogging = (handler) => async (req, res) => {
  const start = Date.now()
  const { method, url } = req
  
  // Create a proxy for res.end to capture the status code
  const oldEnd = res.end
  res.end = function (...args) {
    const duration = Date.now() - start
    const status = res.statusCode
    const logEmoji = status >= 400 ? '❌' : '✅'
    
    console.log(`${logEmoji} [${method}] ${url} - Status: ${status} - Duration: ${duration}ms`)
    return oldEnd.apply(res, args)
  }

  return handler(req, res)
}

// 2. Validation Middleware (Zod Integration)
export const withValidation = (schema, type = 'body') => (handler) => async (req, res) => {
  try {
    let dataToValidate
    if (type === 'body') {
      // Handle both req.body (express-like) and req.json() (web-standard/Vercel)
      dataToValidate = req.body || (req.json ? await req.json() : {})
    } else {
      dataToValidate = req.query || {}
    }

    const result = schema.safeParse(dataToValidate)
    
    if (!result.success) {
      throw new BadRequestError('Validation failed', result.error.format())
    }

    // Attach validated data to request for easy access
    req.validatedData = result.data
    return handler(req, res)
  } catch (error) {
    if (error instanceof ApiError) throw error
    throw new BadRequestError('Invalid request data: ' + error.message)
  }
}

// CORS middleware
export const withCors = (handler) => async (req, res) => {
  const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['http://localhost:5173', 'http://localhost:3000']
  
  const origin = req.headers.origin
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, x-organization-id')
  res.setHeader('Access-Control-Allow-Credentials', 'true')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  return handler(req, res)
}

// Authentication middleware
export const withAuth = (handler) => async (req, res) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedError('Unauthorized: Missing or invalid token')
    }

    const token = authHeader.split(' ')[1]
    const supabase = getSupabase()

    const { data: { user }, error } = await supabase.auth.getUser(token)
    
    if (error || !user) {
      throw new UnauthorizedError('Unauthorized: Invalid or expired token')
    }

    req.user = user
    return handler(req, res)
  } catch (error) {
    if (error instanceof ApiError) throw error
    throw new UnauthorizedError(error.message)
  }
}

// Admin middleware
export const withAdmin = (handler) => async (req, res) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedError()
    }

    const token = authHeader.split(' ')[1]
    const supabase = getSupabase()

    const { data: { user }, error } = await supabase.auth.getUser(token)
    
    if (error || !user) {
      throw new UnauthorizedError('Invalid token')
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profileError || profile?.role !== 'admin') {
      throw new ForbiddenError('Admin access required')
    }

    req.user = user
    return handler(req, res)
  } catch (error) {
    if (error instanceof ApiError) throw error
    throw new ForbiddenError(error.message)
  }
}

// Rate limiting middleware
const rateLimitMap = new Map()
const CLEANUP_INTERVAL = 60000

setInterval(() => {
  const now = Date.now()
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(key)
    }
  }
}, CLEANUP_INTERVAL).unref?.()

export const withRateLimit = (handler, options = {}) => {
  const {
    windowMs = 15 * 60 * 1000,
    max = 100
  } = options

  return async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown'
    const now = Date.now()

    let record = rateLimitMap.get(ip)

    if (!record || now > record.resetTime) {
      record = {
        count: 0,
        resetTime: now + windowMs
      }
    }

    record.count++
    rateLimitMap.set(ip, record)

    if (record.count > max) {
      const retryAfter = Math.ceil((record.resetTime - now) / 1000)
      res.setHeader('Retry-After', retryAfter)
      throw new RateLimitError('Too many requests', retryAfter)
    }

    return handler(req, res)
  }
}

// Main Error handling middleware
export const withErrorHandling = (handler) => async (req, res) => {
  try {
    return await handler(req, res)
  } catch (error) {
    console.error(`[API Error] ${req.method} ${req.url}:`, error)

    if (error instanceof ApiError) {
      return res.status(error.status).json({
        error: error.message,
        status: error.status,
        details: error.details || undefined,
        retryAfter: error.retryAfter || undefined
      })
    }

    const status = error.status || 500
    return res.status(status).json({ 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
      status
    })
  }
}

// Composition helper
export const withMiddleware = (handler, ...middlewares) => {
  let currentHandler = handler
  
  // We want logging to be outermost to capture everything, 
  // then error handling, then the rest.
  const allMiddlewares = [withLogging, withErrorHandling, ...middlewares]
  
  for (const middleware of [...allMiddlewares].reverse()) {
    currentHandler = middleware(currentHandler)
  }
  
  return currentHandler
}
