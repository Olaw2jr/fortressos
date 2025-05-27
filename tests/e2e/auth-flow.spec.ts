import { test, expect } from '@playwright/test';

// Full end-to-end test of the authentication flow
test.describe('Authentication Flow', () => {
  const userEmail = `test-${Date.now()}@example.com`;
  const userPassword = 'SecurePassword123!';
  const userName = 'Test User';

  test('should allow users to register an account', async ({ page }) => {
    // Navigate to the registration page
    await page.goto('/register');
    await expect(page).toHaveTitle(/Create an account/);

    // Fill out the registration form
    await page.fill('input[name="name"]', userName);
    await page.fill('input[name="email"]', userEmail);
    await page.fill('input[name="password"]', userPassword);
    await page.fill('input[name="confirmPassword"]', userPassword);
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Should redirect to the verification page
    await page.waitForURL('**/verify-email**');
    await expect(page.locator('h1')).toContainText(/Verify your email/);
  });

  test('should allow users to login', async ({ page }) => {
    // Navigate to the login page
    await page.goto('/login');
    await expect(page).toHaveTitle(/Sign in/);

    // Fill out the login form
    await page.fill('input[name="email"]', userEmail);
    await page.fill('input[name="password"]', userPassword);
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // This might redirect to 2FA or directly to dashboard depending on setup
    await Promise.race([
      page.waitForURL('**/dashboard**'),
      page.waitForURL('**/two-factor**')
    ]);
    
    // Handle 2FA if needed
    if (page.url().includes('two-factor')) {
      // In a real test, we'd need a way to get the 2FA code
      // For now, we'll just verify we're on the 2FA page
      await expect(page.locator('h1')).toContainText(/Two-Factor Authentication/);
    } else {
      // Check that we're logged in
      await expect(page.locator('h1')).toContainText(/Dashboard/);
    }
  });

  test('should allow users to reset their password', async ({ page }) => {
    // Navigate to the forgot password page
    await page.goto('/reset-password');
    await expect(page).toHaveTitle(/Reset your password/);

    // Fill out the forgot password form
    await page.fill('input[name="email"]', userEmail);
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Check for success message
    await expect(page.locator('div[role="alert"]')).toContainText(/sent/i);
  });
});

// Test security features
test.describe('Security Features', () => {
  test('should lock account after multiple failed login attempts', async ({ page }) => {
    // Navigate to the login page
    await page.goto('/login');
    
    // Attempt to login multiple times with incorrect password
    for (let i = 0; i < 5; i++) {
      await page.fill('input[name="email"]', 'existing@example.com');
      await page.fill('input[name="password"]', 'WrongPassword' + i);
      await page.click('button[type="submit"]');
      
      // Wait for error message
      await page.waitForSelector('div[role="alert"]');
    }
    
    // Check for account locked message after multiple attempts
    await expect(page.locator('div[role="alert"]')).toContainText(/account locked/i);
  });
});

// Test responsive design
test.describe('Responsive Design', () => {
  test('should be responsive on mobile devices', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Test login page
    await page.goto('/login');
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    
    // Test register page
    await page.goto('/register');
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });
});
