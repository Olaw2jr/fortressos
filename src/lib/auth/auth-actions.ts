// src/lib/auth/auth-actions.ts
"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { signIn } from "@/lib/auth/auth-config";
import { AuthError } from "next-auth";
import { sendVerificationEmail, sendPasswordResetEmail, sendMagicLinkEmail } from "@/lib/email/send-email";
import {
  generateVerificationToken,
  generatePasswordResetToken,
  generateMagicLinkToken,
  generateTwoFactorSecret,
  verifyTwoFactorToken,
  generateTwoFactorBackupCodes
} from "@/lib/utils/auth-utils";
import { LoginSchema, RegisterSchema, ResetPasswordSchema } from "./auth-schemas";
// Import redirect when needed
// import { redirect } from "next/navigation";

export async function registerUser(formData: z.infer<typeof RegisterSchema>) {
  try {
    const validatedFields = RegisterSchema.parse(formData);

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email: validatedFields.email }
    });

    if (existingUser) {
      return { error: "Email already in use" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedFields.password, 10);

    // Create user
    await db.user.create({
      data: {
        name: validatedFields.name,
        email: validatedFields.email,
        password: hashedPassword
      }
    });

    // Generate verification token
    const { token } = await generateVerificationToken(validatedFields.email);

    // Send verification email
    await sendVerificationEmail(validatedFields.email, token);

    return { success: "Verification email sent!" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }

    return { error: "Something went wrong. Please try again." };
  }
}

export async function login(formData: z.infer<typeof LoginSchema>) {
  try {
    const validatedFields = LoginSchema.parse(formData);

    // Check if user exists
    const user = await db.user.findUnique({
      where: { email: validatedFields.email }
    });

    if (!user) {
      return { error: "Invalid credentials" };
    }

    // Check if account is locked
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      const minutesLeft = Math.ceil(
        (user.lockedUntil.getTime() - Date.now()) / (1000 * 60)
      );
      return {
        error: `Account locked. Try again in ${minutesLeft} minute${minutesLeft > 1 ? 's' : ''}.`
      };
    }

    // Check if email is verified
    if (!user.emailVerified) {
      return { 
        error: "email-not-verified",
        email: user.email 
      };
    }

    try {
      // Handle 2FA if enabled
      if (user.twoFactorEnabled) {
        if (!validatedFields.code) {
          // First login step completed, return flag to request 2FA code
          return { twoFactor: true };
        }

        // Verify 2FA code
        const isValidToken = user.twoFactorSecret &&
          verifyTwoFactorToken(user.twoFactorSecret, validatedFields.code);

        if (!isValidToken) {
          return { error: "Invalid verification code" };
        }
      }

      // Validate password
      const isValidPassword = await bcrypt.compare(
        validatedFields.password,
        user.password ?? ""
      );

      if (!isValidPassword) {
        return { error: "Invalid credentials" };
      }

      // Sign in with NextAuth
      await signIn("credentials", {
        email: validatedFields.email,
        password: validatedFields.password,
        redirectTo: "/dashboard"
      });

      return { success: "Logged in successfully" };
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Invalid credentials" };
          default:
            return { error: "Something went wrong. Please try again." };
        }
      }

      throw error;
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }

    return { error: "Something went wrong. Please try again." };
  }
}

export async function sendMagicLink(email: string) {
  try {
    // Validate email
    const validatedEmail = z.string().email().parse(email);

    // Check if user exists
    const user = await db.user.findUnique({
      where: { email: validatedEmail }
    });

    if (!user) {
      // Don't reveal if user exists
      return { success: "Magic link sent if account exists!" };
    }

    // Generate magic link token
    const { token } = await generateMagicLinkToken(validatedEmail);

    // Send magic link email
    await sendMagicLinkEmail(validatedEmail, token);

    return { success: "Magic link sent! Check your email." };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: "Please provide a valid email address" };
    }

    return { error: "Something went wrong. Please try again." };
  }
}

export async function verifyMagicLink(token: string) {
  try {
    // Find token in database
    const magicLinkToken = await db.verificationToken.findFirst({
      where: {
        token,
        expires: { gt: new Date() }
      }
    });

    if (!magicLinkToken) {
      return { error: "Invalid or expired link" };
    }

    // Find user by email
    const user = await db.user.findUnique({
      where: { email: magicLinkToken.identifier }
    });

    if (!user) {
      return { error: "User not found" };
    }

    // Update user's email verification
    await db.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        lastLogin: new Date()
      }
    });

    // Delete the token
    await db.verificationToken.delete({
      where: { token: magicLinkToken.token }
    });

    // Create a custom JWT token for this user that will bypass normal login validation
    // We'll use this in the login flow
    const magicAuthToken = await createMagicAuthToken(user.id);

    return { 
      success: "Magic link verified! You will be logged in automatically.",
      email: user.email,
      magicAuthToken
    };
  } catch (error) {
    console.error("Magic link verification error:", error);
    return { error: "Something went wrong. Please try again." };
  }
}

import { randomBytes } from "crypto";

// Create a special short-lived token for magic link authentication
async function createMagicAuthToken(userId: string) {
  // Delete any existing magic auth tokens for this user
  await db.verificationToken.deleteMany({
    where: {
      identifier: `magic-auth-${userId}`
    }
  });
  
  // Create a new token that expires in 5 minutes
  const magicAuthToken = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
  
  // Store the token in the database
  await db.verificationToken.create({
    data: {
      token: magicAuthToken,
      expires,
      identifier: `magic-auth-${userId}` // Use a special identifier format
    }
  });
  
  return magicAuthToken;
}

// New function to login with a magic auth token
export async function loginWithMagicToken(token: string) {
  try {
    // Find the magic auth token
    const magicAuthToken = await db.verificationToken.findFirst({
      where: {
        token,
        expires: { gt: new Date() },
        identifier: { startsWith: 'magic-auth-' }
      }
    });
    
    if (!magicAuthToken) {
      return { error: "Invalid or expired magic authentication token" };
    }
    
    // Extract the user ID from the identifier
    const userId = magicAuthToken.identifier.replace('magic-auth-', '');
    
    // Find the user
    const user = await db.user.findUnique({
      where: { id: userId }
    });
    
    if (!user) {
      return { error: "User not found" };
    }
    
    // Delete the token
    await db.verificationToken.delete({
      where: { token: magicAuthToken.token }
    });
    
    // Return the user info for client-side sign-in
    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    };
  } catch (error) {
    console.error("Magic token login error:", error);
    return { error: "Something went wrong with magic link authentication" };
  }
}

export async function verifyEmail(token: string) {
  try {
    // Find token in database
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        token,
        expires: { gt: new Date() }
      }
    });

    if (!verificationToken) {
      return { error: "Invalid or expired verification link" };
    }

    // Update user's email verification
    await db.user.update({
      where: { email: verificationToken.identifier },
      data: { emailVerified: new Date() }
    });

    // Delete the token
    await db.verificationToken.delete({
      where: { token: verificationToken.token }
    });

    // Instead of forcing session termination, we'll let the user sign in fresh
    // The updated emailVerified field will be picked up on next login
    // This approach doesn't require client-side functions in server components
    console.log('Email verified successfully for user:', verificationToken.identifier);

    return { success: "Email verified successfully!" };
  } catch {
    return { error: "Something went wrong. Please try again." };
  }
}

export async function requestPasswordReset(email: string) {
  try {
    // Validate email
    const validatedEmail = z.string().email().parse(email);

    // Check if user exists
    const user = await db.user.findUnique({
      where: { email: validatedEmail }
    });

    if (!user) {
      // Don't reveal if user exists
      return { success: "Password reset email sent if account exists!" };
    }

    // Generate reset token
    const { token } = await generatePasswordResetToken(validatedEmail);

    // Send password reset email
    await sendPasswordResetEmail(validatedEmail, token);

    return { success: "Password reset email sent if account exists!" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }

    return { error: "Something went wrong. Please try again." };
  }
}

export async function resetPassword(
  token: string,
  formData: z.infer<typeof ResetPasswordSchema>
) {
  try {
    const validatedFields = ResetPasswordSchema.parse(formData);

    // Find token in database
    const passwordResetToken = await db.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetExpires: { gt: new Date() }
      }
    });

    if (!passwordResetToken) {
      return { error: "Invalid or expired reset link" };
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(validatedFields.password, 10);

    // Update user
    await db.user.update({
      where: { id: passwordResetToken.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null
      }
    });

    return { success: "Password reset successfully!" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }

    return { error: "Something went wrong. Please try again." };
  }
}

export async function setupTwoFactor(userId: string) {
  try {
    const user = await db.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return { error: "User not found" };
    }

    // Generate 2FA secret
    const { secret, qrCodeUrl } = await generateTwoFactorSecret(user.email);

    // Update user with secret but don't enable 2FA yet
    await db.user.update({
      where: { id: user.id },
      data: { twoFactorSecret: secret }
    });

    return {
      success: "Two-factor authentication setup initiated",
      qrCodeUrl
    };
  } catch {
    return { error: "Something went wrong. Please try again." };
  }
}

export async function enableTwoFactor(userId: string, code: string) {
  try {
    const user = await db.user.findUnique({
      where: { id: userId }
    });

    if (!user || !user.twoFactorSecret) {
      return { error: "Two-factor authentication not set up" };
    }

    // Verify code
    const isValidToken = verifyTwoFactorToken(user.twoFactorSecret, code);

    if (!isValidToken) {
      return { error: "Invalid verification code" };
    }

    // Generate backup codes
    const backupCodes = generateTwoFactorBackupCodes();

    // Enable 2FA and store backup codes
    await db.user.update({
      where: { id: user.id },
      data: {
        twoFactorEnabled: true,
        twoFactorBackupCodes: JSON.stringify(backupCodes)
      }
    });

    return {
      success: "Two-factor authentication enabled",
      backupCodes
    };
  } catch {
    return { error: "Something went wrong. Please try again." };
  }
}

export async function disableTwoFactor(userId: string, code: string) {
  try {
    // Validate the code first
    const user = await db.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return { error: "User not found" };
    }

    if (!user.twoFactorEnabled) {
      return { error: "Two-factor authentication is not enabled" };
    }

    // Verify the code
    const isValidToken = user.twoFactorSecret &&
      verifyTwoFactorToken(user.twoFactorSecret, code);

    if (!isValidToken) {
      return { error: "Invalid code" };
    }

    // Disable 2FA and clear the secret
    await db.user.update({
      where: { id: userId },
      data: {
        twoFactorEnabled: false,
        twoFactorSecret: null,
        twoFactorBackupCodes: null
      }
    });

    return { success: "Two-factor authentication disabled" };
  } catch (error) {
    console.error("Error disabling 2FA:", error);
    return { error: "Something went wrong. Please try again." };
  }
}

/**
 * Resend verification email to user
 * @param email - Email address to resend verification to
 */
export async function resendVerificationEmail(email: string) {
  try {
    // Validate email
    const validatedEmail = z.string().email().parse(email);
    
    // Check if user exists
    const user = await db.user.findUnique({
      where: { email: validatedEmail }
    });

    if (!user) {
      // Don't reveal if user exists for security
      return { success: "If an account exists, a verification email has been sent." };
    }

    // Don't send if already verified
    if (user.emailVerified) {
      return { success: "Your email is already verified. You can sign in." };
    }

    // Generate new verification token
    const { token } = await generateVerificationToken(validatedEmail);
    
    // Send verification email
    await sendVerificationEmail(validatedEmail, token);

    return { 
      success: "Verification email resent. Please check your inbox and spam folder." 
    };
  } catch (error) {
    console.error("Error resending verification email:", error);
    return { error: "Failed to resend verification email. Please try again." };
  }
}
