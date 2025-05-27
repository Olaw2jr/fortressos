import React from 'react';
import { render, screen } from '@testing-library/react';

// A simple test component
const TestComponent = ({ text }) => {
  return <div data-testid="test-component">{text}</div>;
};

describe('Basic Component Tests', () => {
  it('renders the component with text', () => {
    render(<TestComponent text="Hello World" />);
    const element = screen.getByTestId('test-component');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello World');
  });
  
  it('handles empty text', () => {
    render(<TestComponent text="" />);
    const element = screen.getByTestId('test-component');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('');
  });
});
