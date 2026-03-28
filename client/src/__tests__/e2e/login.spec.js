import { test, expect } from '@playwright/test'

test.describe('Login Page E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portal/login')
  })

  test('should display login form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Giriş Yap' })).toBeVisible()
    await expect(page.getByLabel('E-posta')).toBeVisible()
    await expect(page.getByLabel('Şifre')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Giriş Yap' })).toBeVisible()
  })

  test('should show validation errors for empty form', async ({ page }) => {
    await page.getByRole('button', { name: 'Giriş Yap' }).click()
    
    await expect(page.getByText('E-posta alanı zorunludur')).toBeVisible()
    await expect(page.getByText('Şifre alanı zorunludur')).toBeVisible()
  })

  test('should show error for invalid credentials', async ({ page }) => {
    await page.getByLabel('E-posta').fill('wrong@email.com')
    await page.getByLabel('Şifre').fill('wrongpassword')
    await page.getByRole('button', { name: 'Giriş Yap' }).click()
    
    await expect(page.getByText('Geçersiz kimlik bilgileri')).toBeVisible()
  })

  test('should login successfully with valid credentials', async ({ page }) => {
    await page.getByLabel('E-posta').fill('test@axiar.io')
    await page.getByLabel('Şifre').fill('password123')
    await page.getByRole('button', { name: 'Giriş Yap' }).click()
    
    // Should redirect to dashboard
    await expect(page).toHaveURL('/portal/dashboard')
  })

  test('should navigate to forgot password', async ({ page }) => {
    const forgotLink = page.getByRole('link', { name: 'Şifremi Unuttum' })
    await expect(forgotLink).toBeVisible()
    
    await forgotLink.click()
    await expect(page).toHaveURL('/portal/forgot-password')
  })

  test('should handle loading state', async ({ page }) => {
    // Mock slow response
    await page.route('/api/auth/login', route => {
      setTimeout(() => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            user: { id: '1', email: 'test@axiar.io' },
            token: 'mock-token'
          })
        })
      }, 2000)
    })

    await page.getByLabel('E-posta').fill('test@axiar.io')
    await page.getByLabel('Şifre').fill('password123')
    await page.getByRole('button', { name: 'Giriş Yap' }).click()
    
    // Should show loading state
    await expect(page.getByRole('button', { name: 'Giriş Yapılıyor...' })).toBeVisible()
    await expect(page.getByLabel('E-posta')).toBeDisabled()
    await expect(page.getByLabel('Şifre')).toBeDisabled()
    
    // Should complete after response
    await expect(page.getByRole('button', { name: 'Giriş Yap' })).toBeVisible()
    await expect(page).toHaveURL('/portal/dashboard')
  })

  test('should be accessible via keyboard', async ({ page }) => {
    await page.keyboard.press('Tab')
    await expect(page.getByLabel('E-posta')).toBeFocused()
    
    await page.keyboard.press('Tab')
    await expect(page.getByLabel('Şifre')).toBeFocused()
    
    await page.keyboard.press('Tab')
    await expect(page.getByRole('button', { name: 'Giriş Yap' })).toBeFocused()
    
    await page.keyboard.press('Enter')
    await expect(page.getByText('E-posta alanı zorunludur')).toBeVisible()
  })

  test('should have proper meta tags', async ({ page }) => {
    const title = await page.title()
    expect(title).toBe('Giriş Yap | Axiar Intelligence Platform')
    
    const description = await page.getAttribute('meta[name="description"]', 'content')
    expect(description).toContain('Axiar Intelligence Platform')
  })

  test('should handle responsive design', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.getByRole('heading', { name: 'Giriş Yap' })).toBeVisible()
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.getByRole('heading', { name: 'Giriş Yap' })).toBeVisible()
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 })
    await expect(page.getByRole('heading', { name: 'Giriş Yap' })).toBeVisible()
  })

  test('should handle network errors gracefully', async ({ page }) => {
    // Mock network error
    await page.route('/api/auth/login', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Network error' })
      })
    })

    await page.getByLabel('E-posta').fill('test@axiar.io')
    await page.getByLabel('Şifre').fill('password123')
    await page.getByRole('button', { name: 'Giriş Yap' }).click()
    
    await expect(page.getByText('Bağlantı hatası')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Giriş Yap' })).toBeVisible()
  })

  test('should clear errors on input change', async ({ page }) => {
    // First trigger error
    await page.getByRole('button', { name: 'Giriş Yap' }).click()
    await expect(page.getByText('E-posta alanı zorunludur')).toBeVisible()
    
    // Clear error by typing
    await page.getByLabel('E-posta').fill('test@axiar.io')
    await expect(page.getByText('E-posta alanı zorunludur')).not.toBeVisible()
  })

  test('should have proper loading indicators', async ({ page }) => {
    // Mock loading state
    await page.route('/api/auth/login', () => {
      // Don't fulfill immediately to show loading
    })

    await page.getByLabel('E-posta').fill('test@axiar.io')
    await page.getByLabel('Şifre').fill('password123')
    await page.getByRole('button', { name: 'Giriş Yap' }).click()
    
    // Check for loading attributes
    const button = page.getByRole('button', { name: 'Giriş Yap' })
    await expect(button).toHaveAttribute('data-loading', 'true')
    await expect(button).toBeDisabled()
  })
})
