// tests/integration/auth/login-form.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from '@/components/auth/login-form';
import { login, sendMagicLink } from '@/lib/auth/auth-actions';
// Using Jest for testing
import '@testing-library/jest-dom';

// Note: The global mocks from tests/setup.ts are used instead of defining mocks here

describe('LoginForm Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should submit the form with valid credentials', async () => {
    // Mock successful login
    (login as jest.Mock).mockResolvedValueOnce({ success: 'Logged in successfully!' });

    // Render the component
    render(<LoginForm />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'Password123!' }
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    // Check that login was called with the correct arguments
    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'Password123!',
        code: ''
      });
    });

    // Check for success message
    await waitFor(() => {
      expect(screen.getByText(/logged in successfully/i)).toBeInTheDocument();
    });
  });

  it('should show error message on login failure', async () => {
    // Mock failed login
    (login as jest.Mock).mockResolvedValueOnce({ error: 'Invalid credentials' });

    // Render the component
    render(<LoginForm />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'WrongPassword123!' }
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    // Check for error message
    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  it('should show two-factor authentication input when required', async () => {
    // Mock 2FA challenge
    (login as jest.Mock).mockResolvedValueOnce({ twoFactor: true });

    // Render the component
    render(<LoginForm />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'Password123!' }
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    // Check that 2FA input is displayed
    await waitFor(() => {
      expect(screen.getByLabelText(/two-factor authentication code/i)).toBeInTheDocument();
    });

    // Now submit with a 2FA code
    (login as jest.Mock).mockResolvedValueOnce({ success: 'Logged in successfully!' });

    fireEvent.change(screen.getByLabelText(/two-factor authentication code/i), {
      target: { value: '123456' }
    });

    fireEvent.click(screen.getByRole('button', { name: /verify/i }));

    // Check for success message
    await waitFor(() => {
      expect(screen.getByText(/logged in successfully/i)).toBeInTheDocument();
    });
  });

  it('should send magic link when requested', async () => {
    // Mock magic link success
    (sendMagicLink as jest.Mock).mockResolvedValueOnce({ success: 'Magic link sent if account exists!' });

    // Render the component
    render(<LoginForm />);

    // Fill out the email field
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });

    // Click the magic link button
    fireEvent.click(screen.getByRole('button', { name: /magic link/i }));

    // Check that sendMagicLink was called
    await waitFor(() => {
      expect(sendMagicLink).toHaveBeenCalledWith('test@example.com');
    });

    // Check for success message
    await waitFor(() => {
      expect(screen.getByText(/magic link sent/i)).toBeInTheDocument();
    });
  });
});
