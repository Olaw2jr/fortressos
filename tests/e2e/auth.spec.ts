// e2e/auth.spec.ts
import { test, expect } from "@playwright/test";

test("complete authentication flow", async ({ page }) => {
  // Registration
  await page.goto("/auth/register");
  await page.fill("input[name=email]", "test@example.com");
  await page.fill("input[name=password]", "Password123!");
  await page.click("button[type=submit]");
  
  // Verify redirect to verification page
  await expect(page).toHaveURL(/auth\/verify-request/);
  
  // More test steps
});