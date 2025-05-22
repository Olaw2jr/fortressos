// __tests__/components/LoginForm.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LoginForm } from "@/components/auth/LoginForm";

describe("LoginForm", () => {
  it("shows validation errors for empty fields", async () => {
    render(<LoginForm />);
    
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });
  
  // Other tests
});