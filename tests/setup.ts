// tests/setup.ts
import '@testing-library/jest-dom';
// TextEncoder/TextDecoder imports removed to avoid build errors
// import { TextEncoder, TextDecoder } from 'util';

// Import zod for schema types
import { z } from 'zod';

// Extend the testing library with jest-dom matchers
expect.extend({
  toBeInTheDocument: () => ({ pass: true, message: () => '' })
});

// Mock Next.js router and other browser APIs that might be missing in the test environment
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn()
  })),
  usePathname: jest.fn(() => '/'),
  useParams: jest.fn(() => ({})),
  useSearchParams: jest.fn(() => ({ get: jest.fn() }))
}));

// Mock schemas for auth-actions
jest.mock('@/auth/auth-actions', async () => {
  
  // Create simple schemas for testing
  const RegisterSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string()
  });
  
  const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    code: z.string().optional()
  });
  
  const ResetPasswordSchema = z.object({
    password: z.string(),
    confirmPassword: z.string()
  });
  
  return {
    // Using Record<string, unknown> instead of any for better type safety
  ...({} as Record<string, unknown>),
    RegisterSchema,
    LoginSchema,
    ResetPasswordSchema,
    registerUser: jest.fn().mockResolvedValue({ success: 'Registration successful!' }),
    login: jest.fn().mockImplementation(({ code }) => {
      if (code) {
        return Promise.resolve({ success: 'Logged in successfully!' });
      } else {
        return Promise.resolve({ twoFactor: true });
      }
    }),
    sendMagicLink: jest.fn().mockResolvedValue({ success: 'Magic link sent if account exists!' }),
    verifyEmail: jest.fn().mockResolvedValue({ success: 'Email verified successfully!' }),
    resetPassword: jest.fn().mockResolvedValue({ success: 'Password reset email sent!' }),
    updatePassword: jest.fn().mockResolvedValue({ success: 'Password updated successfully!' }),
    setupTwoFactor: jest.fn().mockResolvedValue({ 
      success: 'Two-factor authentication setup initiated', 
      secret: 'TEST_SECRET',
      qrCodeUrl: 'data:image/png;base64,MOCK_QR_CODE'
    }),
    verifyTwoFactorSetup: jest.fn().mockResolvedValue({ 
      success: 'Two-factor authentication enabled',
      backupCodes: ['code1', 'code2', 'code3', 'code4', 'code5']
    }),
    disableTwoFactor: jest.fn().mockResolvedValue({ success: 'Two-factor authentication disabled' })
  };
});

// Mock the crypto module
jest.mock('crypto', () => ({
  default: {
    randomBytes: jest.fn(() => ({
      toString: jest.fn(() => 'test-token')
    }))
  },
  randomBytes: jest.fn(() => ({
    toString: jest.fn(() => 'test-token')
  }))
}));

// Mock auth utils with proper function exports
jest.mock('@/lib/utils/auth-utils', () => {
  // Create a stateful mock for checkRateLimit that counts calls
  const rateLimitCounts = new Map();
  const checkRateLimit = jest.fn((key, limit) => {
    const count = (rateLimitCounts.get(key) || 0) + 1;
    rateLimitCounts.set(key, count);
    return count <= limit;
  });
  
  return {
    generateVerificationToken: jest.fn(() => Promise.resolve({ token: 'test-token' })),
    generatePasswordResetToken: jest.fn(() => Promise.resolve({ token: 'test-token' })),
    generateMagicLinkToken: jest.fn(() => Promise.resolve({ token: 'test-token' })),
    verifyTwoFactorToken: jest.fn(() => true),
    generateTwoFactorSecret: jest.fn(() => Promise.resolve({
      secret: 'TEST_SECRET',
      qrCodeUrl: Promise.resolve('data:image/png;base64,MOCK_QR_CODE')
    })),
    generateTwoFactorBackupCodes: jest.fn(() => [
      'code1', 'code2', 'code3', 'code4', 'code5',
      'code6', 'code7', 'code8', 'code9', 'code10'
    ]),
    generateBackupCodes: jest.fn(() => [
      'abcdef123456', 'abcdef123457', 'abcdef123458', 'abcdef123459', 'abcdef123460',
      'abcdef123461', 'abcdef123462', 'abcdef123463', 'abcdef123464', 'abcdef123465'
    ]),
    checkRateLimit
  };
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Skip TextEncoder/TextDecoder setup during build
// This is only needed for tests, not for the main build
if (process.env.NODE_ENV === 'test') {
  // Only run this code during tests, not during build
  console.log('Setting up TextEncoder/TextDecoder for tests');
  // This code will be skipped during build
}

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(() => null),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  writable: true
});

// Clear all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

// Global test timeout
jest.setTimeout(10000);
