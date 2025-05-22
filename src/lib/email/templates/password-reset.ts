// src/lib/email/templates/password-reset.ts
import { baseTemplate } from "./base-template";

/**
 * Generate HTML for password reset emails
 * @param resetUrl - The password reset URL
 * @returns HTML email template
 */
export function getPasswordResetHTML(resetUrl: string): string {
  const title = "Reset Your Password";
  const preheader = "Follow this link to reset your password.";
  
  const content = `
    <h1 style="color: #333333; font-size: 24px; margin-bottom: 16px; text-align: center;">
      Reset Your Password
    </h1>
    <p>
      We received a request to reset your password for your FortressOS account. 
      Click the button below to set a new password.
    </p>
    <p>
      This link will expire in 1 hour for security purposes. If you did not request a password reset, 
      please ignore this email or contact support if you have concerns.
    </p>
  `;
  
  return baseTemplate(
    title,
    preheader,
    content,
    "Reset Password",
    resetUrl,
  );
}
