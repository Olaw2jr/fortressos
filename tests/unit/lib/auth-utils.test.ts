import { hashPassword, verifyPassword, generateToken, createTokenExpiry, verifyTwoFactorToken } from '@/lib/utils/auth-utils';
import * as speakeasy from 'speakeasy';

// Mock dependencies
jest.mock('speakeasy', () => ({
  totp: {
    verify: jest.fn()
  }
}));

describe('Auth Utilities', () => {
  describe('hashPassword', () => {
    it('should hash a password', async () => {
      const password = 'TestPassword123!';
      const hashedPassword = await hashPassword(password);
      
      // Hashed password should be different from the original
      expect(hashedPassword).not.toBe(password);
      // Bcrypt hashes should be ~60 characters
      expect(hashedPassword.length).toBeGreaterThan(50);
    });
    
    it('should create different hashes for the same password', async () => {
      const password = 'TestPassword123!';
      const hash1 = await hashPassword(password);
      const hash2 = await hashPassword(password);
      
      // Different salt should be used for each hash
      expect(hash1).not.toBe(hash2);
    });
  });
  
  describe('verifyPassword', () => {
    it('should verify a correct password', async () => {
      const password = 'TestPassword123!';
      const hashedPassword = await hashPassword(password);
      
      const isValid = await verifyPassword(password, hashedPassword);
      expect(isValid).toBe(true);
    });
    
    it('should reject an incorrect password', async () => {
      const password = 'TestPassword123!';
      const wrongPassword = 'WrongPassword123!';
      const hashedPassword = await hashPassword(password);
      
      const isValid = await verifyPassword(wrongPassword, hashedPassword);
      expect(isValid).toBe(false);
    });
  });
  
  describe('generateToken', () => {
    it('should generate a random token', () => {
      const token = generateToken();
      
      // Token should be a non-empty string
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(0);
      
      // Generate another token and confirm it's different
      const token2 = generateToken();
      expect(token).not.toBe(token2);
    });
    
    it('should generate a 64-character hex string', () => {
      const token = generateToken();
      
      // 32 bytes in hex is 64 characters
      expect(token.length).toBe(64);
      // Should be hexadecimal characters only
      expect(token).toMatch(/^[0-9a-f]+$/);
    });
  });
  
  describe('createTokenExpiry', () => {
    it('should create a date in the future', () => {
      const hours = 24;
      const expiry = createTokenExpiry(hours);
      
      // Should be a Date object
      expect(expiry instanceof Date).toBe(true);
      
      // Should be approximately 24 hours in the future
      const now = new Date();
      const expectedExpiry = new Date(now.getTime() + hours * 60 * 60 * 1000);
      
      // Allow 10ms difference for execution time
      const timeDifference = Math.abs(expiry.getTime() - expectedExpiry.getTime());
      expect(timeDifference).toBeLessThan(10);
    });
  });
  
  describe('verifyTwoFactorToken', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    
    it('should verify a valid token', () => {
      // Mock implementation for this test
      (speakeasy.totp.verify as jest.Mock).mockReturnValueOnce(true);
      
      const secret = 'ABCDEFGHIJKLMNOP';
      const token = '123456';
      
      const result = verifyTwoFactorToken(secret, token);
      
      expect(result).toBe(true);
      expect(speakeasy.totp.verify).toHaveBeenCalledWith({
        secret,
        encoding: 'base32',
        token,
        window: 1
      });
    });
    
    it('should reject an invalid token', () => {
      // Mock implementation for this test
      (speakeasy.totp.verify as jest.Mock).mockReturnValueOnce(false);
      
      const secret = 'ABCDEFGHIJKLMNOP';
      const token = 'invalid';
      
      const result = verifyTwoFactorToken(secret, token);
      
      expect(result).toBe(false);
      expect(speakeasy.totp.verify).toHaveBeenCalledWith({
        secret,
        encoding: 'base32',
        token,
        window: 1
      });
    });
  });
});
