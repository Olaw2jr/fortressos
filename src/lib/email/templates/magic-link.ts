// src/lib/email/templates/magic-link.ts
import { baseTemplate } from "./base-template";

/**
 * Generate HTML for magic link authentication emails
 * @param loginUrl - The magic link URL
 * @returns HTML email template
 */
export function getMagicLinkHTML(loginUrl: string): string {
  const title = "Sign In to Your Account";
  const preheader = "Your secure sign-in link for FortressOS.";
  
  const content = `
    <h1 style="color: #333333; font-size: 24px; margin-bottom: 16px; text-align: center;">
      Sign In to FortressOS
    </h1>
    <p>
      Click the button below to securely sign in to your FortressOS account. 
      No password required!
    </p>
    <p>
      This magic link will expire in 1 hour for security purposes and can only be used once.
      If you didn't request this email, please ignore it or contact support if you have concerns.
    </p>
  `;
  
  return baseTemplate(
    title,
    preheader,
    content,
    "Sign In Securely",
    loginUrl,
  );
}
