import '@testing-library/jest-dom'
import { configure } from '@testing-library/react'
import { server } from 'msw/node'
import { handlers } from './__mocks__/handlers'

// Configure React Testing Library
configure({
  testIdAttribute: 'data-testid',
  asyncUtilTimeout: 5000,
  asyncWrapper: async (cb) => {
    await cb()
  }
})

// Setup MSW server
beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'warn'
  })
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})

// Global test utilities
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback) {
    this.callback = callback
  }
  
  observe() {
    // Mock intersection observer behavior
    setTimeout(() => {
      this.callback([{
        isIntersecting: true,
        target: document.createElement('div')
      }])
    }, 100)
  }
  
  unobserve() {}
  disconnect() {}
}

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock scrollTo
Element.prototype.scrollTo = jest.fn()
window.scrollTo = jest.fn()

// Mock getComputedStyle
window.getComputedStyle = jest.fn(() => ({
  getPropertyValue: jest.fn(),
}))

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

// Mock sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock
})
