// tests/e2e/auth/authentication.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Go to home page before each test
    await page.goto('/');
  });

  test('should allow user to register', async ({ page }) => {
    // Navigate to register page
    await page.click('text=Sign up');
    
    // Fill out registration form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', `test-${Date.now()}@example.com`);
    await page.fill('input[name="password"]', 'Password123!');
    await page.fill('input[name="confirmPassword"]', 'Password123!');
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Verify success message
    await expect(page.locator('text=Verification email sent')).toBeVisible();
  });

  test('should allow user to login with email and password', async ({ page }) => {
    // Navigate to login page
    await page.click('text=Sign in');
    
    // Fill out login form
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'Password123!');
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Verify user is redirected to dashboard (or sees success message)
    // Note: This might fail in CI since the test user might not exist
    // In a real implementation, you'd seed test data first
    await expect(page.url()).toContain('/dashboard');
  });

  test('should show error for invalid credentials', async ({ page }) => {
    // Navigate to login page
    await page.click('text=Sign in');
    
    // Fill out login form with incorrect password
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'WrongPassword!');
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Verify error message
    await expect(page.locator('text=Invalid email or password')).toBeVisible();
  });

  test('should allow user to request password reset', async ({ page }) => {
    // Navigate to login page
    await page.click('text=Sign in');
    
    // Click on forgot password link
    await page.click('text=Forgot password?');
    
    // Fill out password reset form
    await page.fill('input[name="email"]', 'test@example.com');
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Verify success message
    await expect(page.locator('text=Password reset email sent')).toBeVisible();
  });

  test('should allow user to request magic link', async ({ page }) => {
    // Navigate to login page
    await page.click('text=Sign in');
    
    // Fill out email field
    await page.fill('input[name="email"]', 'test@example.com');
    
    // Click on magic link button
    await page.click('text=Magic Link');
    
    // Verify success message
    await expect(page.locator('text=Magic link sent')).toBeVisible();
  });

  // Note: Testing the actual magic link, email verification, and password reset
  // would require either mocking the email service or setting up a test email server
  // These tests would then click the links in emails and verify the respective flows
});
