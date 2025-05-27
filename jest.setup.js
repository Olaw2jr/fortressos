// jest.setup.js
// Add testing-library jest-dom matchers
import '@testing-library/jest-dom';

// Configure Jest mocks for Next.js components and environment
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
  usePathname: () => '/',
  useParams: () => ({}),
  useSearchParams: () => ({ get: jest.fn() }),
}));

// Mock Next auth
jest.mock('next-auth', () => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
  useSession: jest.fn(() => ({
    data: null,
    status: 'unauthenticated',
  })),
}));

// Set up globals for tests
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Suppress React 18 console errors/warnings in tests
jest.spyOn(console, 'error').mockImplementation(() => {});
jest.spyOn(console, 'warn').mockImplementation(() => {});
