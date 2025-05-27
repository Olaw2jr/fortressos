// src/lib/email/send-email.ts
import nodemailer from "nodemailer";
import { getVerificationEmailHTML } from "./templates/verification-email";
import { getPasswordResetHTML } from "./templates/password-reset";
import { getMagicLinkHTML } from "./templates/magic-link";

/**
 * Configure email transporter
 * In development, you can use services like Mailtrap or Ethereal
 * In production, use a proper email service
 */
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
  secure: process.env.EMAIL_SERVER_SECURE === "true",
});

/**
 * Send a verification email to a user
 * @param email - The recipient's email address
 * @param token - The verification token
 */
export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;
  const html = getVerificationEmailHTML(verificationUrl);

  try {
    await transporter.sendMail({
      from: `"FortressOS Security" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Verify your email address",
      html,
      text: `Please verify your email address by visiting ${verificationUrl}`,
    });
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
}

/**
 * Send a password reset email to a user
 * @param email - The recipient's email address
 * @param token - The password reset token
 */
export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/new-password?token=${token}`;
  const html = getPasswordResetHTML(resetUrl);

  try {
    await transporter.sendMail({
      from: `"FortressOS Security" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Reset your password",
      html,
      text: `Reset your password by visiting ${resetUrl}`,
    });
    console.log(`Password reset email sent to ${email}`);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send password reset email");
  }
}

/**
 * Send a magic link email to a user
 * @param email - The recipient's email address
 * @param token - The magic link token
 */
export async function sendMagicLinkEmail(email: string, token: string) {
  const loginUrl = `${process.env.NEXTAUTH_URL}/magic-link?token=${token}`;
  const html = getMagicLinkHTML(loginUrl);

  try {
    await transporter.sendMail({
      from: `"FortressOS Security" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Your secure sign-in link",
      html,
      text: `Sign in to your account by visiting ${loginUrl}`,
    });
    console.log(`Magic link email sent to ${email}`);
  } catch (error) {
    console.error("Error sending magic link email:", error);
    throw new Error("Failed to send magic link email");
  }
}
