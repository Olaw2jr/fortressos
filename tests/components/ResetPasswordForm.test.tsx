// tests/components/ResetPasswordForm.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PasswordResetForm } from '@/components/auth/password-reset-form';
import { resetPassword } from '@/lib/auth/auth-actions';
// Using Jest for testing

// Mock dependencies
jest.mock('@/lib/auth/auth-actions', () => ({
  resetPassword: jest.fn()
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}));

describe('ResetPasswordForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the reset password form correctly', () => {
    render(<PasswordResetForm />);

    expect(screen.getByRole('heading')).toHaveTextContent(/reset your password/i);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send reset link/i })).toBeInTheDocument();
  });

  it('should handle successful reset password request', async () => {
    (resetPassword as jest.Mock).mockResolvedValueOnce({
      success: 'Reset link sent if account exists!'
    });

    render(<PasswordResetForm />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /send reset link/i }));

    // Check that resetPassword was called with correct args
    await waitFor(() => {
      expect(resetPassword).toHaveBeenCalledWith('test@example.com');
    });

    // Check for success message
    await waitFor(() => {
      expect(screen.getByText(/reset link sent/i)).toBeInTheDocument();
    });
  });

  it('should show error message on reset password failure', async () => {
    (resetPassword as jest.Mock).mockResolvedValueOnce({
      error: 'Something went wrong'
    });

    render(<PasswordResetForm />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /send reset link/i }));

    // Check for error message
    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });

  it('should validate email format', async () => {
    render(<PasswordResetForm />);

    // Submit with empty email
    fireEvent.click(screen.getByRole('button', { name: /send reset link/i }));

    // Check for validation error
    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });

    // Fill with invalid email
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'not-an-email' }
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /send reset link/i }));

    // Check for validation error
    await waitFor(() => {
      expect(screen.getByText(/valid email/i)).toBeInTheDocument();
    });
  });
});
