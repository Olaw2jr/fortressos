// src/lib/email/templates/verification-email.ts
import { baseTemplate } from "./base-template";

/**
 * Generate HTML for email verification emails
 * @param token - The verification token
 * @returns HTML email template
 */
export function getVerificationEmailHTML(verificationUrl: string): string {
  const title = "Verify Your Email Address";
  const preheader = "Please verify your email address to complete your registration.";
  
  const content = `
    <h1 style="color: #333333; font-size: 24px; margin-bottom: 16px; text-align: center;">
      Verify Your Email Address
    </h1>
    <p>
      Thank you for registering with FortressOS. To complete your registration and secure your account, 
      please verify your email address by clicking the button below.
    </p>
    <p>
      This link will expire in 24 hours for security purposes.
    </p>
  `;
  
  return baseTemplate(
    title,
    preheader,
    content,
    "Verify Email",
    verificationUrl,
  );
}
