import { test, expect } from '@playwright/test'

test.describe('Dashboard Page E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Mock authentication
    await page.addInitScript(() => {
      window.localStorage.setItem('userSession', JSON.stringify({
        id: '1',
        email: 'test@axiar.io',
        token: 'mock-token'
      }))
    })
    
    await page.goto('/portal/dashboard')
  })

  test('should display dashboard content', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
    await expect(page.getByText('Hoş Geldiniz, Test User')).toBeVisible()
  })

  test('should display navigation menu', async ({ page }) => {
    await expect(page.getByRole('navigation')).toBeVisible()
    
    // Check if navigation links are present
    const projectsLink = page.getByRole('link', { name: 'Projeler' })
    const reportsLink = page.getByRole('link', { name: 'Raporlar' })
    const invoicesLink = page.getByRole('link', { name: 'Faturalar' })
    const settingsLink = page.getByRole('link', { name: 'Ayarlar' })
    
    await expect(projectsLink).toBeVisible()
    await expect(reportsLink).toBeVisible()
    await expect(invoicesLink).toBeVisible()
    await expect(settingsLink).toBeVisible()
  })

  test('should display statistics cards', async ({ page }) => {
    // Check for statistics cards
    await expect(page.getByText('Aktif Projeler')).toBeVisible()
    await expect(page.getByText('Toplam Raporlar')).toBeVisible()
    await expect(page.getByText('Bekleyen Faturalar')).toBeVisible()
    await expect(page.getByText('Sistem Durumu')).toBeVisible()
  })

  test('should navigate to projects page', async ({ page }) => {
    const projectsLink = page.getByRole('link', { name: 'Projeler' })
    await projectsLink.click()
    
    await expect(page).toHaveURL('/portal/projects')
  })

  test('should navigate to reports page', async ({ page }) => {
    const reportsLink = page.getByRole('link', { name: 'Raporlar' })
    await reportsLink.click()
    
    await expect(page).toHaveURL('/portal/reports')
  })

  test('should navigate to invoices page', async ({ page }) => {
    const invoicesLink = page.getByRole('link', { name: 'Faturalar' })
    await invoicesLink.click()
    
    await expect(page).toHaveURL('/portal/invoices')
  })

  test('should navigate to settings page', async ({ page }) => {
    const settingsLink = page.getByRole('link', { name: 'Ayarlar' })
    await settingsLink.click()
    
    await expect(page).toHaveURL('/portal/settings')
  })

  test('should display recent activity', async ({ page }) => {
    await expect(page.getByText('Son Aktiviteler')).toBeVisible()
    
    // Check for activity items
    const activityItems = page.locator('[data-testid="activity-item"]')
    await expect(activityItems.first()).toBeVisible()
  })

  test('should handle responsive design', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
    
    // Check if navigation collapses to mobile menu
    const mobileMenu = page.locator('[data-testid="mobile-menu"]')
    await expect(mobileMenu).toBeVisible()
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 })
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
  })

  test('should handle data loading states', async ({ page }) => {
    // Mock slow API responses
    await page.route('/api/dashboard/stats', route => {
      setTimeout(() => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            activeProjects: 5,
            totalReports: 23,
            pendingInvoices: 3,
            systemStatus: 'healthy'
          })
        })
      }, 2000)
    })

    await page.reload()
    
    // Check for loading states
    await expect(page.locator('[data-testid="stats-loading"]')).toBeVisible()
    
    // Wait for data to load
    await expect(page.getByText('Aktif Projeler')).toBeVisible()
    await expect(page.getByText('5')).toBeVisible()
  })

  test('should handle error states', async ({ page }) => {
    // Mock API error
    await page.route('/api/dashboard/stats', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Failed to load dashboard data' })
      })
    })

    await page.reload()
    
    // Check for error state
    await expect(page.getByText('Veri yüklenemedi')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Tekrar Dene' })).toBeVisible()
  })

  test('should be accessible via keyboard', async ({ page }) => {
    await page.keyboard.press('Tab')
    
    // Check if navigation gets focus
    const firstNavLink = page.locator('[data-testid="nav-link"]').first()
    await expect(firstNavLink).toBeFocused()
    
    // Navigate through navigation
    await page.keyboard.press('ArrowRight')
    const secondNavLink = page.locator('[data-testid="nav-link"]').nth(1)
    await expect(secondNavLink).toBeFocused()
    
    // Activate link with Enter
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/portal\/(projects|reports|invoices|settings)/)
  })

  test('should have proper meta tags', async ({ page }) => {
    const title = await page.title()
    expect(title).toBe('Dashboard | Axiar Intelligence Platform')
    
    const description = await page.getAttribute('meta[name="description"]', 'content')
    expect(description).toContain('Axiar Intelligence Platform dashboard')
  })

  test('should handle real-time updates', async ({ page }) => {
    // Mock WebSocket messages
    await page.evaluate(() => {
      window.addEventListener('message', (event) => {
        if (event.data.type === 'dashboard-update') {
          // Update UI based on message
          const statsElement = document.querySelector('[data-testid="stats-container"]')
          if (statsElement) {
            statsElement.innerHTML = `
              <div class="text-2xl font-bold text-cyan-400">6</div>
              <div class="text-sm text-gray-400">Aktif Projeler</div>
            `
          }
        }
      })
    })
    
    // Simulate real-time update
    await page.evaluate(() => {
      window.postMessage({
        type: 'dashboard-update',
        data: { activeProjects: 6 }
      }, '*')
    })
    
    // Check if UI updated
    await expect(page.getByText('6')).toBeVisible()
  })

  test('should handle user interactions', async ({ page }) => {
    // Test quick actions
    const quickActionButtons = page.locator('[data-testid="quick-action"]')
    await expect(quickActionButtons.first()).toBeVisible()
    
    // Click quick action
    await quickActionButtons.first().click()
    
    // Check if action modal opens
    await expect(page.locator('[data-testid="action-modal"]')).toBeVisible()
  })

  test('should handle data filtering', async ({ page }) => {
    // Look for filter controls
    const filterDropdown = page.locator('[data-testid="date-filter"]')
    await expect(filterDropdown).toBeVisible()
    
    // Select different filter
    await filterDropdown.selectOption('Son 7 Gün')
    
    // Check if data updates
    await expect(page.locator('[data-testid="filtered-data"]')).toBeVisible()
  })

  test('should handle export functionality', async ({ page }) => {
    const exportButton = page.getByRole('button', { name: 'Dışa Aktar' })
    await expect(exportButton).toBeVisible()
    
    // Mock download
    const downloadPromise = page.waitForEvent('download')
    await exportButton.click()
    
    await expect(downloadPromise).resolves()
  })

  test('should handle logout', async ({ page }) => {
    const logoutButton = page.getByRole('button', { name: 'Çıkış Yap' })
    await expect(logoutButton).toBeVisible()
    
    await logoutButton.click()
    
    // Should redirect to login
    await expect(page).toHaveURL('/portal/login')
    
    // Should clear session
    const session = await page.evaluate(() => {
      return localStorage.getItem('userSession')
    })
    expect(session).toBeNull()
  })
})
