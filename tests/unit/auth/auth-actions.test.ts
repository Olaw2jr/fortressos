// tests/unit/auth/auth-actions.test.ts
import { login, registerUser } from '@/lib/auth/auth-actions';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

// Mock dependencies
jest.mock('@/lib/db', () => ({
  db: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    verificationToken: {
      findFirst: jest.fn(),
      delete: jest.fn(),
    }
  }
}));

jest.mock('bcryptjs', () => ({
  hash: jest.fn(() => Promise.resolve('hashed_password')),
  compare: jest.fn(() => Promise.resolve(true)),
}));

jest.mock('@/lib/email/send-email', () => ({
  sendVerificationEmail: jest.fn(() => Promise.resolve()),
  sendPasswordResetEmail: jest.fn(() => Promise.resolve()),
  sendMagicLinkEmail: jest.fn(() => Promise.resolve()),
}));

jest.mock('@/auth/auth-config', () => ({
  signIn: jest.fn(),
}));

jest.mock('@/lib/utils/auth-utils', () => ({
  generateVerificationToken: jest.fn(() => Promise.resolve({ token: 'test_token' })),
  generatePasswordResetToken: jest.fn(() => Promise.resolve({ token: 'test_token' })),
  generateMagicLinkToken: jest.fn(() => Promise.resolve({ token: 'test_token' })),
  verifyTwoFactorToken: jest.fn(() => true),
}));

describe('Auth Actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('registerUser', () => {
    it('should register a new user successfully', async () => {
      // Setup mocks
      (db.user.findUnique as jest.Mock).mockResolvedValueOnce(null);
      (db.user.create as jest.Mock).mockResolvedValueOnce({ id: 'user_id', email: 'test@example.com' });

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
      (db.user.findUnique as jest.Mock).mockResolvedValueOnce({ id: 'existing_user_id', email: 'test@example.com' });

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
      (db.user.findUnique as jest.Mock).mockResolvedValueOnce({
        id: 'user_id',
        email: 'test@example.com',
        password: 'hashed_password',
        emailVerified: new Date(),
        failedLoginAttempts: 0,
        lockedUntil: null,
        twoFactorEnabled: false
      });

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
      (db.user.findUnique as jest.Mock).mockResolvedValueOnce({
        id: 'user_id',
        email: 'test@example.com',
        password: 'hashed_password',
        emailVerified: new Date(),
        failedLoginAttempts: 0,
        lockedUntil: null,
        twoFactorEnabled: true,
        twoFactorSecret: 'secret'
      });

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
