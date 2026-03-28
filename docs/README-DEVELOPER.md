# 🛠️ Axiar Intelligence Platform - Developer Guide

## 📋 Table of Contents

- [Setup](#setup)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Testing](#testing)
- [TypeScript](#typescript)
- [Git Workflow](#git-workflow)
- [Debugging](#debugging)
- [Performance](#performance)
- [Deployment](#deployment)

## 🚀 Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git
- VS Code (recommended)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd axiarintelligence(windsurf)/client

# Install dependencies
npm install

# Setup git hooks
npm run prepare
```

### Environment Variables

Create a `.env.local` file:

```env
VITE_API_URL=http://localhost:3000
VITE_WS_URL=ws://localhost:3000
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_SENTRY_DSN=your-sentry-dsn
```

## 🔄 Development Workflow

### Daily Workflow

1. **Start development server**
   ```bash
   npm run dev
   ```

2. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Write code following the style guide
   - Add tests for new functionality
   - Update documentation

4. **Run quality checks**
   ```bash
   npm run lint
   npm run type-check
   npm run test
   ```

5. **Format code**
   ```bash
   npm run format
   ```

6. **Commit changes**
   ```bash
   git add .
   git commit -m "feat(component): add new feature"
   ```

7. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format with Prettier
npm run format:check # Check formatting
npm run type-check   # TypeScript type check

# Testing
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
npm run test:e2e     # Run E2E tests
npm run test:e2e:ui  # Run E2E tests with UI
```

## 🎨 Code Style

### ESLint Configuration

We use ESLint with TypeScript and React plugins. Configuration is in `.eslintrc.js`.

### Prettier Configuration

Code is formatted with Prettier. Configuration is in `.prettierrc`.

### Key Rules

- Use single quotes for strings
- Use semicolons
- Maximum line length: 100 characters
- Use TypeScript for all new files
- Follow React best practices
- Use functional components with hooks

### Component Structure

```tsx
import React from 'react'
import { motion } from 'framer-motion'

// Types
interface ComponentProps {
  title: string
  onSubmit: (data: FormData) => void
}

// Component
const Component: React.FC<ComponentProps> = ({ title, onSubmit }) => {
  // Hooks
  const [state, setState] = useState()

  // Handlers
  const handleSubmit = useCallback(() => {
    // Implementation
  }, [])

  // Effects
  useEffect(() => {
    // Implementation
  }, [])

  return (
    <motion.div>
      {/* JSX */}
    </motion.div>
  )
}

export default Component
```

## 🧪 Testing

### Unit Tests

We use Jest and React Testing Library for unit tests.

```bash
# Run all tests
npm run test

# Run in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

### E2E Tests

We use Playwright for end-to-end testing.

```bash
# Run E2E tests
npm run test:e2e

# Run with UI
npm run test:e2e:ui
```

### Test Structure

```
src/
├── __tests__/
│   ├── components/
│   │   └── Button.test.tsx
│   ├── hooks/
│   │   └── useAuth.test.ts
│   └── utils/
│       └── helpers.test.ts
├── __mocks__/
│   └── handlers.ts
└── setupTests.ts
```

### Writing Tests

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from '@jest/globals'
import Button from '@/components/ui/Button'

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

## 🔷 TypeScript

### Type Definitions

All types are defined in `src/types/index.ts`.

### Usage

```tsx
import type { User, Project } from '@/types'

interface ComponentProps {
  user: User
  projects: Project[]
}
```

### Best Practices

- Use interfaces for object shapes
- Use types for unions and primitives
- Prefer `interface` over `type` for object types
- Use generic types when appropriate
- Avoid `any` - use `unknown` instead

## 🌿 Git Workflow

### Branch Strategy

- `main` - Production-ready code
- `develop` - Integration branch
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Critical fixes

### Commit Messages

We use conventional commits:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Code style
- `refactor` - Refactoring
- `test` - Tests
- `chore` - Maintenance

Examples:
```
feat(auth): add password reset functionality
fix(ui): resolve button alignment issue
docs(readme): update installation guide
```

### Pull Requests

1. Create PR from feature branch to `develop`
2. Ensure all checks pass
3. Request review from team members
4. Address feedback
5. Merge when approved

## 🐛 Debugging

### VS Code Debugging

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Chrome against localhost",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

### Browser DevTools

- Use React DevTools for component debugging
- Use Redux DevTools for state debugging
- Use Performance tab for performance analysis

### Common Issues

1. **TypeScript errors**: Check `tsconfig.json` paths
2. **Import errors**: Verify file extensions and paths
3. **Hook errors**: Ensure hooks are called at top level
4. **Performance issues**: Use React.memo and useMemo

## ⚡ Performance

### Code Splitting

```tsx
import { lazy } from 'react'
import { Suspense } from 'react'

const LazyComponent = lazy(() => import('./LazyComponent'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  )
}
```

### Optimization Tips

- Use `React.memo` for expensive components
- Use `useMemo` for expensive calculations
- Use `useCallback` for stable function references
- Implement virtual scrolling for large lists
- Optimize images and assets

### Performance Monitoring

We have built-in performance monitoring:

```tsx
import { usePerformanceMonitor } from '@/hooks/usePerformance'

function Component() {
  const { trackPerformance } = usePerformanceMonitor()
  
  useEffect(() => {
    trackPerformance('component_render', 100, 'ms')
  }, [])
}
```

## 🚀 Deployment

### Build Process

```bash
# Build for production
npm run build

# Preview build
npm run preview
```

### Environment Setup

Create environment-specific `.env` files:

- `.env.development` - Development variables
- `.env.production` - Production variables
- `.env.test` - Test variables

### Deployment Checklist

- [ ] All tests pass
- [ ] Build succeeds
- [ ] Environment variables are set
- [ ] Performance metrics are acceptable
- [ ] Security audit passes
- [ ] Documentation is updated

## 📚 Resources

### Documentation

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

### Tools

- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Options](https://prettier.io/docs/options/)
- [Jest Matchers](https://jestjs.io/docs/expect)
- [Playwright API](https://playwright.dev/docs/api/class-playwright)

### Best Practices

- [React Best Practices](https://react.dev/learn/thinking-in-react)
- [TypeScript Best Practices](https://typescript-eslint.io/rules/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-testing-mistakes)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Update documentation
6. Submit a pull request

## 📞 Support

For questions or issues:

- Create an issue in the repository
- Contact the development team
- Check the documentation first

---

Happy coding! 🎉
