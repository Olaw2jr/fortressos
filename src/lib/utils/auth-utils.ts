// src/lib/utils/auth-utils.ts
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { db } from "@/lib/db";
import * as speakeasy from "speakeasy";
import * as qrcode from "qrcode";

/**
 * Hash a password using bcrypt
 * @param password - The plain text password to hash
 * @returns The hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

/**
 * Verify a password against a hashed password
 * @param password - The plain text password to verify
 * @param hashedPassword - The hashed password to compare against
 * @returns Whether the password matches the hash
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

/**
 * Generate a random token
 * @returns A random token
 */
export function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * Create an expiration date for a token
 * @param hours - Number of hours until expiration
 * @returns The expiration date
 */
export function createTokenExpiry(hours: number): Date {
  return new Date(Date.now() + hours * 60 * 60 * 1000);
}

/**
 * Generate a verification token for email verification
 * @param email - The email to generate the token for
 * @returns The generated token and expiry
 */
export async function generateVerificationToken(email: string) {
  // Delete any existing tokens for this email
  await db.verificationToken.deleteMany({
    where: { identifier: email }
  });

  const token = generateToken();
  const expires = createTokenExpiry(24); // 24 hours

  // Store the token in the database
  await db.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires
    }
  });

  return { token, expires };
}

/**
 * Generate a password reset token
 * @param email - The email to generate the token for
 * @returns The generated token and expiry
 */
export async function generatePasswordResetToken(email: string) {
  const token = generateToken();
  const expires = createTokenExpiry(1); // 1 hour

  // Store the token in the user record
  await db.user.update({
    where: { email },
    data: {
      passwordResetToken: token,
      passwordResetExpires: expires
    }
  });

  return { token, expires };
}

/**
 * Generate a magic link token for passwordless authentication
 * @param email - The email to generate the token for
 * @returns The generated token and expiry
 */
export async function generateMagicLinkToken(email: string) {
  // Delete any existing tokens for this email
  await db.verificationToken.deleteMany({
    where: { identifier: email }
  });

  const token = generateToken();
  const expires = createTokenExpiry(1); // 1 hour

  // Store the token in the database
  await db.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires
    }
  });

  return { token, expires };
}

/**
 * Generate a two-factor authentication secret
 * @param email - The user's email for labeling
 * @returns The secret and QR code URL
 */
export async function generateTwoFactorSecret(email: string) {
  const secret = speakeasy.generateSecret({
    name: `FortressOS:${email}`
  });

  // toDataURL returns a Promise that resolves to the QR code data URL
  const qrCodeUrl = qrcode.toDataURL(secret.otpauth_url);

  return {
    secret: secret.base32,
    qrCodeUrl
  };
}

/**
 * Verify a two-factor authentication token
 * @param secret - The user's 2FA secret
 * @param token - The token to verify
 * @returns Whether the token is valid
 */
export function verifyTwoFactorToken(secret: string, token: string): boolean {
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
    window: 1 // Allow a time skew of ±30 seconds
  });
}

/**
 * Generate backup codes for two-factor authentication
 * @returns An array of backup codes
 */
export function generateTwoFactorBackupCodes(): string[] {
  const codes: string[] = [];

  // Generate 10 backup codes
  for (let i = 0; i < 10; i++) {
    const code = crypto.randomBytes(4).toString("hex"); // 8 character code
    codes.push(code);
  }

  return codes;
}

/**
 * Rate limiter for authentication attempts
 * @param identifier - The identifier to rate limit (e.g., IP address or email)
 * @param maxAttempts - Maximum number of attempts allowed in the time window
 * @param windowMs - Time window in milliseconds
 * @returns Whether the request should be allowed
 */
export async function rateLimitRequest(
  identifier: string,
  maxAttempts: number = 5,
  windowMs: number = 60 * 60 * 1000 // 1 hour
): Promise<boolean> {
  const key = `ratelimit:${identifier}`;

  // This would typically use Redis or a similar store in production
  // For simplicity, we'll use in-memory store here
  const attempts = globalThis.ratelimits?.get(key) || 0;

  if (attempts >= maxAttempts) {
    return false; // Rate limited
  }

  // Increment attempts
  if (!globalThis.ratelimits) {
    globalThis.ratelimits = new Map();
  }

  globalThis.ratelimits.set(key, attempts + 1);

  // Set expiry
  setTimeout(() => {
    globalThis.ratelimits?.delete(key);
  }, windowMs);

  return true; // Not rate limited
}

export async function getVerificationTokenByEmail(email: string) {
  try {
    const token = await db.verificationToken.findFirst({
      where: { identifier: email },
    });
    return token;
  } catch {
    return null;
  }
}

export async function getMagicLinkTokenByEmail(email: string) {
  try {
    // Use verificationToken table with as type filter for magic links
    const token = await db.verificationToken.findFirst({
      where: {
        identifier: email,
        // Assuming there's a way to identify magic link tokens
        // Add any additional filtering if needed
      },
    });
    return token;
  } catch {
    return null;
  }
}
