import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'
import Input from '@/components/ui/Input'

describe('Input Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Input placeholder="Test input" />)
      
      const input = screen.getByPlaceholderText('Test input')
      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('type', 'text')
    })

    it('renders with custom type', () => {
      render(<Input type="email" placeholder="Email" />)
      
      const input = screen.getByPlaceholderText('Email')
      expect(input).toHaveAttribute('type', 'email')
    })

    it('renders with label', () => {
      render(<Input label="Test Label" placeholder="Test" />)
      
      const label = screen.getByText('Test Label')
      const input = screen.getByPlaceholderText('Test')
      
      expect(label).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('aria-labelledby', expect.any(String))
    })

    it('renders with icon', () => {
      render(<Input icon={<span data-testid="test-icon">🔍</span>} placeholder="Search" />)
      
      const icon = screen.getByTestId('test-icon')
      expect(icon).toBeInTheDocument()
    })
  })

  describe('Value Handling', () => {
    it('handles controlled input', async () => {
      const handleChange = jest.fn()
      render(<Input value="initial" onChange={handleChange} />)
      
      const input = screen.getByDisplayValue('initial')
      expect(input).toBeInTheDocument()
      
      await fireEvent.change(input, { target: { value: 'new value' } })
      expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({
        target: expect.objectContaining({ value: 'new value' })
      }))
    })

    it('handles uncontrolled input', async () => {
      render(<Input defaultValue="default" />)
      
      const input = screen.getByDisplayValue('default')
      expect(input).toBeInTheDocument()
      
      await fireEvent.change(input, { target: { value: 'changed' } })
      expect(input).toHaveDisplayValue('changed')
    })
  })

  describe('Validation', () => {
    it('shows error state', () => {
      render(<Input error="This field is required" />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('border-red-500')
    })

    it('displays error message', () => {
      render(<Input error="Error message" />)
      
      const errorMessage = screen.getByText('Error message')
      expect(errorMessage).toBeInTheDocument()
    })

    it('applies required attribute', () => {
      render(<Input required />)
      
      const input = screen.getByRole('textbox')
      expect(input).toBeRequired()
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<Input aria-label="Custom label" />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-label', 'Custom label')
    })

    it('supports keyboard navigation', async () => {
      const handleChange = jest.fn()
      render(<Input onChange={handleChange} />)
      
      const input = screen.getByRole('textbox')
      input.focus()
      
      await fireEvent.keyDown(input, { key: 'a' })
      expect(handleChange).toHaveBeenCalled()
    })

    it('has proper focus management', () => {
      render(<Input />)
      
      const input = screen.getByRole('textbox')
      
      input.focus()
      expect(input).toHaveFocus()
      
      input.blur()
      expect(input).not.toHaveFocus()
    })
  })

  describe('Special Features', () => {
    it('handles password type', () => {
      render(<Input type="password" placeholder="Password" />)
      
      const input = screen.getByPlaceholderText('Password')
      expect(input).toHaveAttribute('type', 'password')
    })

    it('handles textarea type', () => {
      render(<Input type="textarea" placeholder="Message" />)
      
      const textarea = screen.getByPlaceholderText('Message')
      expect(textarea).toBeInTheDocument()
      expect(textarea.tagName).toBe('TEXTAREA')
    })

    it('handles disabled state', () => {
      render(<Input disabled />)
      
      const input = screen.getByRole('textbox')
      expect(input).toBeDisabled()
    })

    it('handles maxlength', () => {
      render(<Input maxLength={10} />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('maxlength', '10')
    })
  })

  describe('Form Integration', () => {
    it('works within form', async () => {
      const handleSubmit = jest.fn()
      render(
        <form onSubmit={handleSubmit}>
          <Input name="testField" placeholder="Test" />
          <button type="submit">Submit</button>
        </form>
      )
      
      const input = screen.getByPlaceholderText('Test')
      await fireEvent.change(input, { target: { value: 'test value' } })
      
      const form = screen.getByRole('form')
      fireEvent.submit(form)
      
      expect(handleSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          elements: expect.arrayContaining([
            expect.objectContaining({
              name: 'testField',
              value: 'test value'
            })
          ])
        })
      )
    })
  })
})
