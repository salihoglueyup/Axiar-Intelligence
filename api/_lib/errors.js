// Custom Error Classes
export class ApiError extends Error {
  constructor(status, message, details = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.details = details
  }
}

export class BadRequestError extends ApiError {
  constructor(message = 'Bad Request', details = null) {
    super(400, message, details)
    this.name = 'BadRequestError'
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized access') {
    super(401, message)
    this.name = 'UnauthorizedError'
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = 'Access forbidden') {
    super(403, message)
    this.name = 'ForbiddenError'
  }
}

export class NotFoundError extends ApiError {
  constructor(message = 'Resource not found') {
    super(404, message)
    this.name = 'NotFoundError'
  }
}

export class RateLimitError extends ApiError {
  constructor(message = 'Too many requests', retryAfter = 900) {
    super(429, message)
    this.name = 'RateLimitError'
    this.retryAfter = retryAfter
  }
}

export class InternalServerError extends ApiError {
  constructor(message = 'Internal server error') {
    super(500, message)
    this.name = 'InternalServerError'
  }
}

// Error response helper (Maintains compatibility with existing code)
export const sendError = (res, errorTypeOrStatus, customMessage = null) => {
  if (typeof errorTypeOrStatus === 'number') {
    return res.status(errorTypeOrStatus).json({
      error: customMessage || 'An error occurred',
      status: errorTypeOrStatus
    })
  }

  const errorsMap = {
    unauthorized: { status: 401, message: 'Unauthorized access' },
    forbidden: { status: 403, message: 'Access forbidden' },
    notFound: { status: 404, message: 'Resource not found' },
    validationError: { status: 400, message: 'Validation error' },
    rateLimit: { status: 429, message: 'Too many requests' },
    serverError: { status: 500, message: 'Internal server error' }
  }

  const error = errorsMap[errorTypeOrStatus] || errorsMap.serverError
  return res.status(error.status).json({
    error: customMessage || error.message,
    status: error.status
  })
}

// Success response helper
export const sendSuccess = (res, data, message = 'Success') => {
  return res.status(200).json({
    success: true,
    message,
    data
  })
}

// Created response helper
export const sendCreated = (res, data, message = 'Resource created successfully') => {
  return res.status(201).json({
    success: true,
    message,
    data
  })
}

// No content response helper
export const sendNoContent = (res, message = 'Operation completed successfully') => {
  return res.status(204).json({
    success: true,
    message
  })
}
