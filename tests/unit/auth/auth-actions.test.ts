// tests/unit/auth/auth-actions.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { 
  login, 
  registerUser, 
  sendMagicLink, 
  verifyEmail, 
  resetPassword 
} from '@/auth/auth-actions';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

// Mock dependencies
vi.mock('@/lib/db', () => ({
  db: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    verificationToken: {
      findFirst: vi.fn(),
      delete: vi.fn(),
    }
  }
}));

vi.mock('bcryptjs', () => ({
  hash: vi.fn(() => Promise.resolve('hashed_password')),
  compare: vi.fn(() => Promise.resolve(true)),
}));

vi.mock('@/lib/email/send-email', () => ({
  sendVerificationEmail: vi.fn(() => Promise.resolve()),
  sendPasswordResetEmail: vi.fn(() => Promise.resolve()),
  sendMagicLinkEmail: vi.fn(() => Promise.resolve()),
}));

vi.mock('@/auth/auth-config', () => ({
  signIn: vi.fn(),
}));

vi.mock('@/lib/utils/auth-utils', () => ({
  generateVerificationToken: vi.fn(() => Promise.resolve({ token: 'test_token' })),
  generatePasswordResetToken: vi.fn(() => Promise.resolve({ token: 'test_token' })),
  generateMagicLinkToken: vi.fn(() => Promise.resolve({ token: 'test_token' })),
  verifyTwoFactorToken: vi.fn(() => true),
}));

describe('Auth Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('registerUser', () => {
    it('should register a new user successfully', async () => {
      // Setup mocks
      vi.mocked(db.user.findUnique).mockResolvedValueOnce(null);
      vi.mocked(db.user.create).mockResolvedValueOnce({ id: 'user_id', email: 'test@example.com' } as any);

      // Call the function
      const result = await registerUser({
        name: 'Test User',
        email: 'test@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!'
      });

      // Assertions
      expect(result.success).toBeDefined();
      expect(db.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' }
      });
      expect(bcrypt.hash).toHaveBeenCalledWith('Password123!', 10);
      expect(db.user.create).toHaveBeenCalled();
    });

    it('should return an error if the email is already in use', async () => {
      // Setup mocks
      vi.mocked(db.user.findUnique).mockResolvedValueOnce({ id: 'existing_user_id', email: 'test@example.com' } as any);

      // Call the function
      const result = await registerUser({
        name: 'Test User',
        email: 'test@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!'
      });

      // Assertions
      expect(result.error).toBe('Email already in use');
      expect(db.user.create).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should login a user successfully', async () => {
      // Setup mocks
      vi.mocked(db.user.findUnique).mockResolvedValueOnce({
        id: 'user_id',
        email: 'test@example.com',
        password: 'hashed_password',
        emailVerified: new Date(),
        failedLoginAttempts: 0,
        lockedUntil: null,
        twoFactorEnabled: false
      } as any);

      // Call the function
      const result = await login({
        email: 'test@example.com',
        password: 'Password123!'
      });

      // Assertions
      expect(result.success).toBeDefined();
    });

    it('should handle two-factor authentication', async () => {
      // Setup mocks
      vi.mocked(db.user.findUnique).mockResolvedValueOnce({
        id: 'user_id',
        email: 'test@example.com',
        password: 'hashed_password',
        emailVerified: new Date(),
        failedLoginAttempts: 0,
        lockedUntil: null,
        twoFactorEnabled: true,
        twoFactorSecret: 'secret'
      } as any);

      // Call the function without code
      const resultWithoutCode = await login({
        email: 'test@example.com',
        password: 'Password123!'
      });

      // Assertions
      expect(resultWithoutCode.twoFactor).toBe(true);

      // Call the function with code
      const resultWithCode = await login({
        email: 'test@example.com',
        password: 'Password123!',
        code: '123456'
      });

      // Assertions for the second call
      expect(resultWithCode.success).toBeDefined();
    });
  });

  // Additional tests would cover the rest of the functions:
  // - sendMagicLink
  // - verifyEmail
  // - resetPassword
  // - verifyMagicLink
  // - etc.
});
