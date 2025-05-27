// tests/unit/auth/auth-actions-jest.test.ts
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
      deleteMany: jest.fn(),
    }
  }
}));

jest.mock('bcryptjs', () => ({
  hash: jest.fn().mockResolvedValue('hashed_password'),
  compare: jest.fn().mockResolvedValue(true),
}));

jest.mock('@/lib/email/send-email', () => ({
  sendVerificationEmail: jest.fn().mockResolvedValue(undefined),
  sendPasswordResetEmail: jest.fn().mockResolvedValue(undefined),
  sendMagicLinkEmail: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('@/auth/auth-config', () => ({
  signIn: jest.fn(),
}));

jest.mock('@/lib/utils/auth-utils', () => ({
  generateVerificationToken: jest.fn().mockResolvedValue({ token: 'test_token', expires: new Date() }),
  generatePasswordResetToken: jest.fn().mockResolvedValue({ token: 'test_token', expires: new Date() }),
  generateMagicLinkToken: jest.fn().mockResolvedValue({ token: 'test_token', expires: new Date() }),
  verifyTwoFactorToken: jest.fn().mockReturnValue(true),
}));

describe('Auth Actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    it('should register a new user successfully', async () => {
      // Setup mocks
      (db.user.findUnique as jest.Mock).mockResolvedValueOnce(null);
      (db.user.create as jest.Mock).mockResolvedValueOnce({ 
        id: 'user_id', 
        email: 'test@example.com'
      });

      // Call the function
      const result = await registerUser({
        name: 'Test User',
        email: 'test@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!'
      });

      // Assertions
      expect(result.success).toBe("Verification email sent!");
      expect(db.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' }
      });
      expect(bcrypt.hash).toHaveBeenCalled();
      expect(db.user.create).toHaveBeenCalled();
    });

    it('should return an error if the email is already in use', async () => {
      // Setup mocks
      (db.user.findUnique as jest.Mock).mockResolvedValueOnce({ 
        id: 'existing_user_id', 
        email: 'test@example.com' 
      });

      // Call the function
      const result = await registerUser({
        name: 'Test User',
        email: 'test@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!'
      });

      // Assertions
      expect(result.error).toBe("Email already in use");
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
      expect(result.success).toBe("Logged in successfully");
    });

    it('should handle two-factor authentication', async () => {
      // Setup mocks for first call (without code)
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

      // Assertions for first call
      expect(resultWithoutCode.twoFactor).toBe(true);

      // Setup mocks for second call (with code)
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

      // Call the function with code
      const resultWithCode = await login({
        email: 'test@example.com',
        password: 'Password123!',
        code: '123456'
      });

      // Assertions for the second call
      expect(resultWithCode.success).toBe("Logged in successfully");
    });
  });
});
