import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'
import Button from '@/components/ui/Button'

describe('Button Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Button>Test Button</Button>)
      
      const button = screen.getByRole('button', { name: /test button/i })
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('Test Button')
    })

    it('renders with custom className', () => {
      render(<Button className="custom-class">Test</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('custom-class')
    })

    it('renders with different variants', () => {
      const { rerender } = render(<Button variant="secondary">Secondary</Button>)
      
      let button = screen.getByRole('button')
      expect(button).toHaveClass('bg-gray-700')

      rerender(<Button variant="danger">Danger</Button>)
      button = screen.getByRole('button')
      expect(button).toHaveClass('bg-red-600')
    })

    it('renders with different sizes', () => {
      const { rerender } = render(<Button size="sm">Small</Button>)
      
      let button = screen.getByRole('button')
      expect(button).toHaveClass('px-3 py-1.5 text-sm')

      rerender(<Button size="lg">Large</Button>)
      button = screen.getByRole('button')
      expect(button).toHaveClass('px-6 py-3 text-lg')
    })
  })

  describe('Interactions', () => {
    it('handles click events', async () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick}>Click me</Button>)
      
      const button = screen.getByRole('button')
      await fireEvent.click(button)
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('handles disabled state', () => {
      const handleClick = jest.fn()
      render(<Button disabled onClick={handleClick}>Disabled</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
      
      fireEvent.click(button)
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('handles loading state', () => {
      render(<Button loading>Loading...</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
      expect(button).toHaveAttribute('data-loading', 'true')
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<Button disabled>Accessible</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-disabled', 'true')
    })

    it('supports keyboard navigation', async () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick}>Keyboard</Button>)
      
      const button = screen.getByRole('button')
      button.focus()
      
      await fireEvent.keyDown(button, { key: 'Enter' })
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('has proper focus management', () => {
      render(<Button>Focus Test</Button>)
      
      const button = screen.getByRole('button')
      
      button.focus()
      expect(button).toHaveFocus()
      
      button.blur()
      expect(button).not.toHaveFocus()
    })
  })

  describe('Icon Support', () => {
    it('renders with left icon', () => {
      render(<Button icon={<span data-testid="test-icon">🚀</span>}>With Icon</Button>)
      
      const icon = screen.getByTestId('test-icon')
      expect(icon).toBeInTheDocument()
      expect(icon).toHaveTextContent('🚀')
    })

    it('renders with right icon', () => {
      render(<Button icon={<span data-testid="test-icon">⚡</span>} iconPosition="right">Right Icon</Button>)
      
      const icon = screen.getByTestId('test-icon')
      expect(icon).toBeInTheDocument()
    })
  })

  describe('Form Integration', () => {
    it('works in form context', async () => {
      const handleSubmit = jest.fn()
      render(
        <form onSubmit={handleSubmit}>
          <Button type="submit">Submit</Button>
        </form>
      )
      
      const button = screen.getByRole('button')
      await fireEvent.click(button)
      
      expect(handleSubmit).toHaveBeenCalledTimes(1)
    })
  })

  describe('Error Handling', () => {
    it('renders error state', () => {
      render(<Button error>Error Button</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('border-red-500')
    })

    it('shows error message when provided', () => {
      render(<Button error="Something went wrong">Error</Button>)
      
      const errorMessage = screen.getByText('Something went wrong')
      expect(errorMessage).toBeInTheDocument()
    })
  })
})
