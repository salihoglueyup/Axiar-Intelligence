import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

// Test utilities
export const createMockProps = (overrides = {}) => ({
  children: null,
  className: '',
  disabled: false,
  loading: false,
  error: null,
  ...overrides
})

export const createMockEvent = (type, overrides = {}) => {
  const event = new Event(type, { bubbles: true, cancelable: true })
  Object.assign(event, overrides)
  return event
}

export const createMockUser = (overrides = {}) => ({
  id: '1',
  email: 'test@axiar.io',
  name: 'Test User',
  company: 'Test Company',
  avatar_url: null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-03-20T12:00:00Z',
  ...overrides
})

export const createMockProject = (overrides = {}) => ({
  id: '1',
  title: 'Test Project',
  description: 'Test project description',
  status: 'active',
  progress: 50,
  client_id: 'client-1',
  created_at: '2024-01-15T10:00:00Z',
  updated_at: '2024-03-20T15:30:00Z',
  ...overrides
})

export const createMockReport = (overrides = {}) => ({
  id: '1',
  title: 'Test Report',
  type: 'security',
  summary: 'Test report summary',
  file_name: 'test-report.pdf',
  file_size: 1024000,
  created_at: '2024-03-01T10:00:00Z',
  ...overrides
})

export const createMockInvoice = (overrides = {}) => ({
  id: '1',
  invoice_no: 'AXR-2024-001',
  client_id: 'client-1',
  client_name: 'Test Client',
  client_company: 'Test Company',
  amount: 100000,
  currency: 'TRY',
  status: 'sent',
  issue_date: '2024-03-01',
  due_date: '2024-03-15',
  ...overrides
})

// Component testing helpers
export const renderWithProviders = (component, providers = {}) => {
  let wrappedComponent = component
  
  Object.entries(providers).forEach(([Provider, props]) => {
    wrappedComponent = (
      <Provider {...props}>
        {wrappedComponent}
      </Provider>
    )
  })
  
  return render(wrappedComponent)
}

export const waitForElement = async (testId, options = {}) => {
  return waitFor(() => {
    return screen.getByTestId(testId)
  }, options)
}

export const waitForElementToDisappear = async (testId, options = {}) => {
  return waitFor(() => {
    const element = screen.queryByTestId(testId)
    return element === null
  }, options)
}

// Form testing helpers
export const fillForm = async (formData) => {
  for (const [field, value] of Object.entries(formData)) {
    const element = screen.getByLabelText(field)
    await fireEvent.change(element, { target: { value } })
  }
}

export const submitForm = async (formSelector = 'form') => {
  const form = screen.getByRole('form', { name: formSelector })
  await fireEvent.submit(form)
}

// Assertion helpers
export const expectElementToBeVisible = (testId) => {
  const element = screen.getByTestId(testId)
  expect(element).toBeInTheDocument()
  expect(element).toBeVisible()
}

export const expectElementToBeHidden = (testId) => {
  const element = screen.queryByTestId(testId)
  expect(element).not.toBeInTheDocument()
}

export const expectElementToHaveText = (testId, text) => {
  const element = screen.getByTestId(testId)
  expect(element).toHaveTextContent(text)
}

export const expectElementToHaveClass = (testId, className) => {
  const element = screen.getByTestId(testId)
  expect(element).toHaveClass(className)
}

// Mock API helpers
export const mockApiResponse = (endpoint, data, options = {}) => {
  const { status = 200, delay = 0 } = options
  
  return {
    url: endpoint,
    response: {
      status,
      data,
      headers: { 'Content-Type': 'application/json' }
    },
    delay
  }
}

export const mockApiError = (endpoint, error, options = {}) => {
  const { status = 500, delay = 0 } = options
  
  return {
    url: endpoint,
    response: {
      status,
      error,
      headers: { 'Content-Type': 'application/json' }
    },
    delay
  }
}

// Async testing helpers
export const waitForAsync = async (callback, options = {}) => {
  const { timeout = 5000 } = options
  
  return waitFor(callback, { timeout })
}

export const expectAsyncToResolve = async (promise, expectedValue) => {
  const result = await promise
  expect(result).toEqual(expectedValue)
}

export const expectAsyncToReject = async (promise, expectedError) => {
  await expect(promise).rejects()
  // Note: This would need to be adjusted based on your testing framework
}

// Performance testing helpers
export const measureRenderTime = async (component) => {
  const startTime = performance.now()
  render(component)
  const endTime = performance.now()
  return endTime - startTime
}

export const expectRenderTimeToBeLessThan = async (component, maxTime) => {
  const renderTime = await measureRenderTime(component)
  expect(renderTime).toBeLessThan(maxTime)
}

// Accessibility testing helpers
export const checkAccessibility = async (container) => {
  // This would integrate with axe-core or similar accessibility testing library
  const interactiveElements = container.querySelectorAll('button, a, input, select, textarea')
  
  const issues = []
  
  interactiveElements.forEach((element, index) => {
    if (!element.getAttribute('aria-label') && !element.textContent.trim()) {
      issues.push({
        element,
        issue: 'Missing aria-label',
        index
      })
    }
  })
  
  return issues
}

export const expectToBeAccessible = async (component) => {
  const { container } = render(component)
  const issues = await checkAccessibility(container)
  
  expect(issues).toHaveLength(0)
  issues.forEach(issue => {
    console.warn('Accessibility issue:', issue)
  })
}

// Network testing helpers
export const mockNetworkCondition = (condition) => {
  Object.defineProperty(navigator, 'onLine', {
    writable: true,
    value: condition
  })
}

export const simulateNetworkChange = (condition) => {
  mockNetworkCondition(condition)
  window.dispatchEvent(new Event('online'))
}

// Local storage testing helpers
export const setLocalStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getLocalStorageItem = (key) => {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : null
}

export const clearLocalStorage = () => {
  localStorage.clear()
}

// Session storage testing helpers
export const setSessionStorageItem = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value))
}

export const getSessionStorageItem = (key) => {
  const item = sessionStorage.getItem(key)
  return item ? JSON.parse(item) : null
}

export const clearSessionStorage = () => {
  sessionStorage.clear()
}

// Date testing helpers
export const createMockDate = (dateString) => {
  return new Date(dateString)
}

export const expectDateToBeRecent = (date, maxDaysOld = 7) => {
  const now = new Date()
  const diffTime = now - date
  const diffDays = diffTime / (1000 * 60 * 60 * 24)
  
  expect(diffDays).toBeLessThanOrEqual(maxDaysOld)
}

// File testing helpers
export const createMockFile = (overrides = {}) => ({
  name: 'test-file.pdf',
  size: 1024000,
  type: 'application/pdf',
  lastModified: new Date().toISOString(),
  ...overrides
})

export const simulateFileUpload = async (file, inputElement) => {
  const fileData = new File(['test content'], { type: file.type })
  
  Object.defineProperty(inputElement, 'files', {
    value: [fileData],
    writable: true
  })
  
  fireEvent.change(inputElement)
}
