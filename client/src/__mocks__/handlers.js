import { rest } from 'msw'

// Mock API handlers
export const handlers = [
  // Auth endpoints
  rest.post('/api/auth/login', (req, res, ctx) => {
    const { email, password } = req.body
    
    if (email === 'test@axiar.io' && password === 'password123') {
      return res(
        ctx.status(200),
        ctx.json({
          user: {
            id: '1',
            email: 'test@axiar.io',
            name: 'Test User'
          },
          token: 'mock-jwt-token',
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        })
      )
    }
    
    return res(
      ctx.status(401),
      ctx.json({
        error: 'Invalid credentials'
      })
    )
  }),

  rest.post('/api/auth/register', (req, res, ctx) => {
    const { email, name } = req.body
    
    return res(
      ctx.status(201),
      ctx.json({
        user: {
          id: '2',
          email,
          name
        },
        token: 'mock-jwt-token-new',
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      })
    )
  }),

  rest.post('/api/auth/logout', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ message: 'Logged out successfully' })
    )
  }),

  // Projects endpoints
  rest.get('/api/projects', (req, res, ctx) => {
    const mockProjects = [
      {
        id: '1',
        title: 'CyberGuard AI',
        description: 'AI-powered cybersecurity platform',
        status: 'active',
        progress: 75,
        client_id: 'client-1',
        created_at: '2024-01-15T10:00:00Z',
        updated_at: '2024-03-20T15:30:00Z'
      },
      {
        id: '2',
        title: 'Metazon Capital OS',
        description: 'Financial management system',
        status: 'completed',
        progress: 100,
        client_id: 'client-2',
        created_at: '2024-02-01T09:00:00Z',
        updated_at: '2024-03-10T14:20:00Z'
      }
    ]
    
    return res(
      ctx.status(200),
      ctx.json(mockProjects)
    )
  }),

  rest.post('/api/projects', (req, res, ctx) => {
    const newProject = {
      id: String(Date.now()),
      ...req.body,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    return res(
      ctx.status(201),
      ctx.json(newProject)
    )
  }),

  rest.put('/api/projects/:id', (req, res, ctx) => {
    const { id } = req.params
    const updatedProject = {
      id,
      ...req.body,
      updated_at: new Date().toISOString()
    }
    
    return res(
      ctx.status(200),
      ctx.json(updatedProject)
    )
  }),

  rest.delete('/api/projects/:id', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ message: 'Project deleted successfully' })
    )
  }),

  // Reports endpoints
  rest.get('/api/reports', (req, res, ctx) => {
    const mockReports = [
      {
        id: '1',
        title: 'Security Audit Report',
        type: 'security',
        summary: 'Monthly security assessment',
        file_name: 'security-audit-march.pdf',
        file_size: 2048576,
        created_at: '2024-03-01T10:00:00Z'
      },
      {
        id: '2',
        title: 'Performance Analysis',
        type: 'performance',
        summary: 'System performance metrics',
        file_name: 'performance-analysis.pdf',
        file_size: 1536789,
        created_at: '2024-03-15T14:30:00Z'
      }
    ]
    
    return res(
      ctx.status(200),
      ctx.json(mockReports)
    )
  }),

  rest.post('/api/reports', (req, res, ctx) => {
    const newReport = {
      id: String(Date.now()),
      ...req.body,
      created_at: new Date().toISOString()
    }
    
    return res(
      ctx.status(201),
      ctx.json(newReport)
    )
  }),

  // Invoices endpoints
  rest.get('/api/invoices', (req, res, ctx) => {
    const mockInvoices = [
      {
        id: '1',
        invoice_no: 'AXR-2024-001',
        client_id: 'client-1',
        client_name: 'Ahmet Yılmaz',
        client_company: 'TechCorp',
        amount: 150000,
        currency: 'TRY',
        status: 'sent',
        issue_date: '2024-03-01',
        due_date: '2024-03-15'
      },
      {
        id: '2',
        invoice_no: 'AXR-2024-002',
        client_id: 'client-2',
        client_name: 'Mehmet Kaya',
        client_company: 'FinanceHub',
        amount: 250000,
        currency: 'TRY',
        status: 'paid',
        issue_date: '2024-02-15',
        due_date: '2024-03-01',
        paid_date: '2024-02-28'
      }
    ]
    
    return res(
      ctx.status(200),
      ctx.json(mockInvoices)
    )
  }),

  rest.post('/api/invoices', (req, res, ctx) => {
    const newInvoice = {
      id: String(Date.now()),
      invoice_no: `AXR-2024-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      ...req.body,
      created_at: new Date().toISOString()
    }
    
    return res(
      ctx.status(201),
      ctx.json(newInvoice)
    )
  }),

  // User profile endpoints
  rest.get('/api/user/profile', (req, res, ctx) => {
    const mockProfile = {
      id: '1',
      email: 'test@axiar.io',
      full_name: 'Test User',
      company: 'Test Company',
      phone: '+90 555 0123',
      avatar_url: null,
      bio: 'Test user for development',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-03-20T12:00:00Z'
    }
    
    return res(
      ctx.status(200),
      ctx.json(mockProfile)
    )
  }),

  rest.put('/api/user/profile', (req, res, ctx) => {
    const updatedProfile = {
      ...req.body,
      updated_at: new Date().toISOString()
    }
    
    return res(
      ctx.status(200),
      ctx.json(updatedProfile)
    )
  }),

  // Contact endpoint
  rest.post('/api/contact', (req, res, ctx) => {
    const { name, email, message } = req.body
    
    // Simulate email sending delay
    setTimeout(() => {
      console.log('Contact form submission:', { name, email, message })
    }, 1000)
    
    return res(
      ctx.status(200),
      ctx.json({ message: 'Contact form submitted successfully' })
    )
  }),

  // Error simulation endpoints
  rest.get('/api/test/error', (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ error: 'Simulated server error' })
    )
  }),

  rest.get('/api/test/network-error', (req, res) => {
    // Simulate network error
    return res.networkError('Network error simulated')
  }),

  rest.get('/api/test/timeout', (req, res, ctx) => {
    // Simulate timeout
    setTimeout(() => {
      return res(
        ctx.status(200),
        ctx.json({ message: 'Delayed response' })
      )
    }, 5000)
  })
]
