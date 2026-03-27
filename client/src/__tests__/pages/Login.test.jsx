import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'
import Login from '@/pages/portal/Login'

// Mock useAuth hook
jest.mock('@/context/AuthContext', () => ({
  useAuth: () => ({
    login: jest.fn(),
    loading: false,
    error: null
  })
}))

// Mock useNavigate
const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

describe('Login Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockNavigate.mockClear()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  const renderWithRouter = (component) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    )
  }

  describe('Rendering', () => {
    it('renders login form', () => {
      renderWithRouter(<Login />)
      
      expect(screen.getByRole('heading', { name: /giriş yap/i })).toBeInTheDocument()
      expect(screen.getByLabelText(/e-posta/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/şifre/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /giriş yap/i })).toBeInTheDocument()
    })

    it('renders forgot password link', () => {
      renderWithRouter(<Login />)
      
      const forgotLink = screen.getByRole('link', { name: /şifremi unuttum/i })
      expect(forgotLink).toBeInTheDocument()
      expect(forgotLink).toHaveAttribute('href', '/portal/forgot-password')
    })
  })

  describe('Form Interaction', () => {
    it('updates input values on change', async () => {
      renderWithRouter(<Login />)
      
      const emailInput = screen.getByLabelText(/e-posta/i)
      const passwordInput = screen.getByLabelText(/şifre/i)
      
      await fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
      await fireEvent.change(passwordInput, { target: { value: 'password123' } })
      
      expect(emailInput).toHaveValue('test@example.com')
      expect(passwordInput).toHaveValue('password123')
    })

    it('submits form with valid credentials', async () => {
      const { useAuth } = require('@/context/AuthContext')
      const mockLogin = useAuth().login
      
      renderWithRouter(<Login />)
      
      const emailInput = screen.getByLabelText(/e-posta/i)
      const passwordInput = screen.getByLabelText(/şifre/i)
      const submitButton = screen.getByRole('button', { name: /giriş yap/i })
      
      await fireEvent.change(emailInput, { target: { value: 'test@axiar.io' } })
      await fireEvent.change(passwordInput, { target: { value: 'password123' } })
      await fireEvent.click(submitButton)
      
      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith({
          email: 'test@axiar.io',
          password: 'password123'
        })
      })
    })

    it('shows validation errors for empty fields', async () => {
      renderWithRouter(<Login />)
      
      const submitButton = screen.getByRole('button', { name: /giriş yap/i })
      await fireEvent.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/e-posta alanı zorunludur/i)).toBeInTheDocument()
        expect(screen.getByText(/şifre alanı zorunludur/i)).toBeInTheDocument()
      })
    })

    it('shows error for invalid credentials', async () => {
      const { useAuth } = require('@/context/AuthContext')
      const mockLogin = useAuth().login
      
      // Mock failed login
      mockLogin.mockImplementation(() => {
        throw new Error('Invalid credentials')
      })
      
      renderWithRouter(<Login />)
      
      const emailInput = screen.getByLabelText(/e-posta/i)
      const passwordInput = screen.getByLabelText(/şifre/i)
      const submitButton = screen.getByRole('button', { name: /giriş yap/i })
      
      await fireEvent.change(emailInput, { target: { value: 'wrong@email.com' } })
      await fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } })
      await fireEvent.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/geçersiz kimlik bilgileri/i)).toBeInTheDocument()
      })
    })
  })

  describe('Loading States', () => {
    it('shows loading state during login', async () => {
      const { useAuth } = require('@/context/AuthContext')
      useAuth.mockImplementation(() => ({
        login: jest.fn(),
        loading: true,
        error: null
      }))
      
      renderWithRouter(<Login />)
      
      const submitButton = screen.getByRole('button', { name: /giriş yap/i })
      expect(submitButton).toBeDisabled()
      expect(screen.getByText(/giriş yapılıyor/i)).toBeInTheDocument()
    })

    it('disables inputs during loading', async () => {
      const { useAuth } = require('@/context/AuthContext')
      useAuth.mockImplementation(() => ({
        login: jest.fn(),
        loading: true,
        error: null
      }))
      
      renderWithRouter(<Login />)
      
      const emailInput = screen.getByLabelText(/e-posta/i)
      const passwordInput = screen.getByLabelText(/şifre/i)
      
      expect(emailInput).toBeDisabled()
      expect(passwordInput).toBeDisabled()
    })
  })

  describe('Navigation', () => {
    it('redirects to dashboard on successful login', async () => {
      const { useAuth } = require('@/context/AuthContext')
      const mockLogin = useAuth().login
      
      // Mock successful login
      mockLogin.mockImplementation(() => Promise.resolve())
      
      renderWithRouter(<Login />)
      
      const emailInput = screen.getByLabelText(/e-posta/i)
      const passwordInput = screen.getByLabelText(/şifre/i)
      const submitButton = screen.getByRole('button', { name: /giriş yap/i })
      
      await fireEvent.change(emailInput, { target: { value: 'test@axiar.io' } })
      await fireEvent.change(passwordInput, { target: { value: 'password123' } })
      await fireEvent.click(submitButton)
      
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/portal/dashboard')
      })
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      renderWithRouter(<Login />)
      
      const emailInput = screen.getByLabelText(/e-posta/i)
      const passwordInput = screen.getByLabelText(/şifre/i)
      const submitButton = screen.getByRole('button', { name: /giriş yap/i })
      
      expect(emailInput).toHaveAttribute('aria-required', 'true')
      expect(passwordInput).toHaveAttribute('aria-required', 'true')
      expect(submitButton).toHaveAttribute('aria-label', expect.stringContaining('giriş yap'))
    })

    it('supports keyboard navigation', async () => {
      renderWithRouter(<Login />)
      
      const submitButton = screen.getByRole('button', { name: /giriş yap/i })
      submitButton.focus()
      
      await fireEvent.keyDown(submitButton, { key: 'Enter' })
      
      // Form should submit on Enter key
      await waitFor(() => {
        expect(screen.getByText(/e-posta alanı zorunludur/i)).toBeInTheDocument()
      })
    })

    it('has proper focus management', () => {
      renderWithRouter(<Login />)
      
      const emailInput = screen.getByLabelText(/e-posta/i)
      const passwordInput = screen.getByLabelText(/şifre/i)
      
      emailInput.focus()
      expect(emailInput).toHaveFocus()
      
      passwordInput.focus()
      expect(passwordInput).toHaveFocus()
      expect(emailInput).not.toHaveFocus()
    })
  })

  describe('Error Handling', () => {
    it('displays network error message', async () => {
      const { useAuth } = require('@/context/AuthContext')
      const mockLogin = useAuth().login
      
      // Mock network error
      mockLogin.mockImplementation(() => {
        throw new Error('Network error')
      })
      
      renderWithRouter(<Login />)
      
      const submitButton = screen.getByRole('button', { name: /giriş yap/i })
      await fireEvent.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/bağlantı hatası/i)).toBeInTheDocument()
      })
    })

    it('clears error on input change', async () => {
      const { useAuth } = require('@/context/AuthContext')
      useAuth.mockImplementation(() => ({
        login: jest.fn(),
        loading: false,
        error: 'Previous error'
      }))
      
      renderWithRouter(<Login />)
      
      const emailInput = screen.getByLabelText(/e-posta/i)
      
      await fireEvent.change(emailInput, { target: { value: 'new@email.com' } })
      
      // Error should be cleared
      expect(screen.queryByText(/previous error/i)).not.toBeInTheDocument()
    })
  })
})
