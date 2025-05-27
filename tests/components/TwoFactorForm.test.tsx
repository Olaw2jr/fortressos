// tests/components/TwoFactorForm.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TwoFactorForm } from '@/components/auth/two-factor-form';
import { verifyTwoFactorToken } from '@/lib/utils/auth-utils';
// Using Jest for testing

// Mock dependencies
jest.mock('@/lib/utils/auth-utils', () => ({
  verifyTwoFactorToken: jest.fn()
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}));

describe('TwoFactorForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the two-factor form correctly', () => {
    render(<TwoFactorForm />);
    
    expect(screen.getByRole('heading')).toHaveTextContent(/two-factor authentication/i);
    expect(screen.getByLabelText(/authentication code/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /verify/i })).toBeInTheDocument();
  });

  it('should handle valid two-factor code submission', async () => {
    (verifyTwoFactorToken as jest.Mock).mockReturnValueOnce(true);
    
    const mockOnSuccess = jest.fn();
    render(<TwoFactorForm onSuccess={mockOnSuccess} />);
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/authentication code/i), {
      target: { value: '123456' }
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /verify/i }));
    
    // Check that onSuccess was called
    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('should show error message for invalid code', async () => {
    (verifyTwoFactorToken as jest.Mock).mockReturnValueOnce(false);
    
    render(<TwoFactorForm />);
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/authentication code/i), {
      target: { value: '654321' }
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /verify/i }));
    
    // Check for error message
    await waitFor(() => {
      expect(screen.getByText(/invalid code/i)).toBeInTheDocument();
    });
  });

  it('should validate the code format', async () => {
    render(<TwoFactorForm />);
    
    // Submit with no code
    fireEvent.click(screen.getByRole('button', { name: /verify/i }));
    
    // Check for validation error
    await waitFor(() => {
      expect(screen.getByText(/code is required/i)).toBeInTheDocument();
    });
    
    // Enter an invalid code (too short)
    fireEvent.change(screen.getByLabelText(/authentication code/i), {
      target: { value: '123' }
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /verify/i }));
    
    // Check for validation error
    await waitFor(() => {
      expect(screen.getByText(/code must be 6 digits/i)).toBeInTheDocument();
    });
  });
});
