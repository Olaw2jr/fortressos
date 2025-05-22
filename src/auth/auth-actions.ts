// src/auth/auth-actions.ts
"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { signIn } from "@/auth/auth-config";
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

// Schema definitions
export const RegisterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  password: z.string().min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string()
}).refine(async data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

export const LoginSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(1, "Password is required"),
  code: z.string().optional()
});

export const ResetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string()
}).refine(async data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

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
    const user = await db.user.create({
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
      return { error: "Please verify your email before logging in" };
    }

    try {
      // Handle 2FA if enabled
      if (user.twoFactorEnabled) {
        if (!validatedFields.code) {
          // If no code provided but 2FA is enabled, we need to ask for the code
          return { twoFactor: true };
        }
        
        // Verify 2FA code
        const isValidToken = verifyTwoFactorToken(
          user.twoFactorSecret!, 
          validatedFields.code
        );
        
        if (!isValidToken) {
          return { error: "Invalid two-factor code" };
        }
      }

      // Attempt sign in
      await signIn("credentials", {
        email: validatedFields.email,
        password: validatedFields.password,
        redirectTo: "/dashboard"
      });
      
      // Reset failed login attempts on successful login
      await db.user.update({
        where: { id: user.id },
        data: {
          failedLoginAttempts: 0,
          lockedUntil: null,
          lastLogin: new Date()
        }
      });

      return { success: "Logged in successfully!" };
    } catch (error) {
      if (error instanceof AuthError) {
        // Increment failed login attempts
        const updatedUser = await db.user.update({
          where: { email: validatedFields.email },
          data: {
            failedLoginAttempts: {
              increment: 1
            },
            lockedUntil: user.failedLoginAttempts >= 4 
              ? new Date(Date.now() + 30 * 60 * 1000) // Lock for 30 minutes
              : null
          }
        });
        
        if (updatedUser.failedLoginAttempts >= 5) {
          const minutesLocked = 30;
          return { 
            error: `Too many failed attempts. Account locked for ${minutesLocked} minutes.` 
          };
        }
        
        return { error: "Invalid credentials" };
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
    const emailSchema = z.string().email("Valid email is required");
    const validatedEmail = emailSchema.parse(email);
    
    // Check if user exists
    const user = await db.user.findUnique({
      where: { email: validatedEmail }
    });

    if (!user) {
      // Don't reveal that the user doesn't exist for security
      return { success: "Magic link sent if account exists!" };
    }

    // Check if account is locked
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      // Still don't reveal the account is locked for security
      return { success: "Magic link sent if account exists!" };
    }

    // Generate token
    const { token } = await generateMagicLinkToken(validatedEmail);
    
    // Send magic link email
    await sendMagicLinkEmail(validatedEmail, token);

    return { success: "Magic link sent if account exists!" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
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

    // Find user
    const user = await db.user.findUnique({
      where: { email: magicLinkToken.identifier }
    });

    if (!user) {
      return { error: "User not found" };
    }

    // If email not verified, verify it
    if (!user.emailVerified) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      });
    }

    // Delete token after use
    await db.verificationToken.delete({
      where: { token }
    });

    // Sign in user
    await signIn("credentials", {
      email: user.email,
      password: "", // No password needed for magic link
      redirectTo: "/dashboard",
      magicLink: true
    });

    return { success: "Logged in successfully!" };
  } catch (error) {
    return { error: "Something went wrong. Please try again." };
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

    // Update user
    await db.user.update({
      where: { email: verificationToken.identifier },
      data: { emailVerified: new Date() }
    });

    // Delete token after use
    await db.verificationToken.delete({
      where: { token }
    });

    return { success: "Email verified successfully!" };
  } catch (error) {
    return { error: "Something went wrong. Please try again." };
  }
}

export async function requestPasswordReset(email: string) {
  try {
    const emailSchema = z.string().email("Valid email is required");
    const validatedEmail = emailSchema.parse(email);
    
    // Find user
    const user = await db.user.findUnique({
      where: { email: validatedEmail }
    });

    if (!user) {
      // Don't reveal that the user doesn't exist for security
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
  } catch (error) {
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
  } catch (error) {
    return { error: "Something went wrong. Please try again." };
  }
}

export async function disableTwoFactor(userId: string, code: string) {
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

    // Disable 2FA
    await db.user.update({
      where: { id: user.id },
      data: { 
        twoFactorEnabled: false,
        twoFactorSecret: null,
        twoFactorBackupCodes: null
      }
    });

    return { success: "Two-factor authentication disabled" };
  } catch (error) {
    return { error: "Something went wrong. Please try again." };
  }
}