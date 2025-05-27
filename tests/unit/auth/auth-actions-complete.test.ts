/**
 * Complete tests for auth actions using Jest
 */
import { db } from '@/lib/db';
import * as authUtils from '@/lib/utils/auth-utils';
import * as emailService from '@/lib/email/send-email';
import * as authConfig from '@/lib/auth/auth-config';

// Create mock implementations
jest.mock('@/lib/db', () => ({
  db: {
    user: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    verificationToken: {
      findFirst: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
    }
  }
}));

jest.mock('@/lib/utils/auth-utils', () => ({
  hashPassword: jest.fn().mockResolvedValue('hashed_password'),
  verifyPassword: jest.fn().mockResolvedValue(true),
  generateToken: jest.fn().mockReturnValue('generated_token'),
  createTokenExpiry: jest.fn().mockReturnValue(new Date(Date.now() + 3600000)),
  generateVerificationToken: jest.fn().mockResolvedValue({ 
    token: 'verification_token', 
    expires: new Date(Date.now() + 86400000) 
  }),
  generatePasswordResetToken: jest.fn().mockResolvedValue({ 
    token: 'reset_token', 
    expires: new Date(Date.now() + 3600000) 
  }),
  generateMagicLinkToken: jest.fn().mockResolvedValue({ 
    token: 'magic_link_token', 
    expires: new Date(Date.now() + 3600000) 
  }),
  generateTwoFactorSecret: jest.fn().mockResolvedValue({
    secret: 'two_factor_secret',
    qrCodeUrl: 'data:image/png;base64,fake_qr_code'
  }),
  verifyTwoFactorToken: jest.fn().mockReturnValue(true),
  generateTwoFactorBackupCodes: jest.fn().mockReturnValue(['backup1', 'backup2', 'backup3']),
  rateLimitRequest: jest.fn().mockResolvedValue(true)
}));

jest.mock('@/lib/email/send-email', () => ({
  sendVerificationEmail: jest.fn().mockResolvedValue(undefined),
  sendPasswordResetEmail: jest.fn().mockResolvedValue(undefined),
  sendMagicLinkEmail: jest.fn().mockResolvedValue(undefined)
}));

jest.mock('@/auth/auth-config', () => ({
  signIn: jest.fn().mockResolvedValue({ ok: true })
}));

// After setting up the mocks, we can import the auth actions
import { 
  registerUser, 
  login,
  setupTwoFactor,
  enableTwoFactor,
  disableTwoFactor,
  requestPasswordReset,
  resetPassword,
  sendMagicLink,
  verifyMagicLink,
  verifyEmail
} from '@/auth/auth-actions';

describe('Auth Actions - Complete Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    it('should register a new user successfully', async () => {
      // Mock implementations
      (db.user.findUnique as jest.Mock).mockResolvedValueOnce(null);
      (db.user.create as jest.Mock).mockResolvedValueOnce({ 
        id: 'user123', 
        name: 'Test User',
        email: 'test@example.com' 
      });

      // Execute function
      const result = await registerUser({
        name: 'Test User',
        email: 'test@example.com',
        password: 'StrongPass123!',
        confirmPassword: 'StrongPass123!'
      });

      // Assert
      expect(result.success).toBe("Verification email sent!");
      expect(db.user.create).toHaveBeenCalled();
      expect(authUtils.generateVerificationToken).toHaveBeenCalledWith('test@example.com');
      expect(emailService.sendVerificationEmail).toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should allow login with valid credentials', async () => {
      // Mock implementations
      (db.user.findUnique as jest.Mock).mockResolvedValueOnce({
        id: 'user123',
        email: 'test@example.com',
        password: 'hashed_password',
        emailVerified: new Date(),
        failedLoginAttempts: 0,
        lockedUntil: null,
        twoFactorEnabled: false
      });

      // Execute function
      const result = await login({
        email: 'test@example.com',
        password: 'StrongPass123!'
      });

      // Assert login was successful
      expect(result.success).toBeDefined();
      expect(authConfig.signIn).toHaveBeenCalled();
    });

    it('should require 2FA when enabled', async () => {
      // Mock implementations
      (db.user.findUnique as jest.Mock).mockResolvedValueOnce({
        id: 'user123',
        email: 'test@example.com',
        password: 'hashed_password',
        emailVerified: new Date(),
        failedLoginAttempts: 0,
        lockedUntil: null,
        twoFactorEnabled: true,
        twoFactorSecret: 'secret123'
      });

      // Execute function without 2FA code
      const result = await login({
        email: 'test@example.com',
        password: 'StrongPass123!'
      });

      // Assert 2FA is required
      expect(result.twoFactor).toBe(true);
      expect(authConfig.signIn).not.toHaveBeenCalled();
    });
  });

  describe('Two-Factor Authentication', () => {
    it('should set up 2FA for a user', async () => {
      // Mock implementations
      (db.user.findUnique as jest.Mock).mockResolvedValueOnce({
        id: 'user123',
        email: 'test@example.com'
      });

      // Execute function
      const result = await setupTwoFactor('user123');

      // Assert
      expect(result.success).toBeDefined();
      expect(result.qrCodeUrl).toBeDefined();
      expect(db.user.update).toHaveBeenCalledWith({
        where: { id: 'user123' },
        data: { twoFactorSecret: 'two_factor_secret' }
      });
    });

    it('should enable 2FA with valid verification code', async () => {
      // Mock implementations
      (db.user.findUnique as jest.Mock).mockResolvedValueOnce({
        id: 'user123',
        email: 'test@example.com',
        twoFactorSecret: 'secret123'
      });

      // Execute function
      const result = await enableTwoFactor('user123', '123456');

      // Assert
      expect(result.success).toBeDefined();
      expect(result.backupCodes).toBeDefined();
      expect(authUtils.verifyTwoFactorToken).toHaveBeenCalledWith('secret123', '123456');
      expect(db.user.update).toHaveBeenCalledWith({
        where: { id: 'user123' },
        data: { 
          twoFactorEnabled: true,
          twoFactorBackupCodes: expect.any(String)
        }
      });
    });
  });

  describe('Password Reset', () => {
    it('should send password reset email', async () => {
      // Mock implementations
      (db.user.findUnique as jest.Mock).mockResolvedValueOnce({
        id: 'user123',
        email: 'test@example.com'
      });

      // Execute function
      const result = await requestPasswordReset('test@example.com');

      // Assert
      expect(result.success).toBeDefined();
      expect(authUtils.generatePasswordResetToken).toHaveBeenCalledWith('test@example.com');
      expect(emailService.sendPasswordResetEmail).toHaveBeenCalled();
    });

    it('should reset password with valid token', async () => {
      // Mock implementations
      (db.user.findFirst as jest.Mock).mockResolvedValueOnce({
        id: 'user123',
        email: 'test@example.com',
        passwordResetToken: 'valid_token',
        passwordResetExpires: new Date(Date.now() + 3600000)
      });

      // Execute function
      const result = await resetPassword('valid_token', {
        password: 'NewPassword123!',
        confirmPassword: 'NewPassword123!'
      });

      // Assert
      expect(result.success).toBeDefined();
      expect(authUtils.hashPassword).toHaveBeenCalled();
      expect(db.user.update).toHaveBeenCalledWith({
        where: { id: 'user123' },
        data: {
          password: 'hashed_password',
          passwordResetToken: null,
          passwordResetExpires: null
        }
      });
    });
  });
});
