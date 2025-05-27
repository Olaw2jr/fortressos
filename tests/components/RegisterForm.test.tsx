// tests/components/RegisterForm.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RegisterForm } from '@/components/auth/register-form';
import { registerUser } from '@/lib/auth/auth-actions';
// Using Jest for testing

// Mock dependencies
jest.mock('@/lib/auth/auth-actions', () => ({
  registerUser: jest.fn()
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}));

describe('RegisterForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the registration form correctly', () => {
    render(<RegisterForm />);
    
    expect(screen.getByRole('heading')).toHaveTextContent(/create an account/i);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  it('should handle successful registration', async () => {
    (registerUser as jest.Mock).mockResolvedValueOnce({ success: 'Registration successful!' });
    
    render(<RegisterForm />);
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Test User' }
    });
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: 'Password123!' }
    });
    
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'Password123!' }
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    
    // Check that registerUser was called with correct args
    await waitFor(() => {
      expect(registerUser).toHaveBeenCalledWith({
        name: 'Test User',
        email: 'test@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!'
      });
    });
    
    // Check for success message
    await waitFor(() => {
      expect(screen.getByText(/registration successful/i)).toBeInTheDocument();
    });
  });

  it('should show error message on registration failure', async () => {
    (registerUser as jest.Mock).mockResolvedValueOnce({ error: 'Email already in use' });
    
    render(<RegisterForm />);
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Test User' }
    });
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: 'Password123!' }
    });
    
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'Password123!' }
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    
    // Check for error message
    await waitFor(() => {
      expect(screen.getByText(/email already in use/i)).toBeInTheDocument();
    });
  });

  it('should validate form inputs', async () => {
    render(<RegisterForm />);
    
    // Submit the empty form
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    
    // Check for validation errors
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
    
    // Fill with invalid data
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'not-an-email' }
    });
    
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: 'short' }
    });
    
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'different' }
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    
    // Check for validation errors
    await waitFor(() => {
      expect(screen.getByText(/valid email/i)).toBeInTheDocument();
      expect(screen.getByText(/at least 8 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
  });
});
