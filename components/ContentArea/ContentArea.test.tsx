import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContentArea from './ContentArea';
import * as componentUtils from '../../lib/component-utils';

// Mock the HelloWorld component
jest.mock('../HelloWorld/HelloWorld', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="hello-world-component">Hello World Component</div>,
  };
});

describe('ContentArea Component', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
  });
  
  it('renders the sidebar and content area', () => {
    render(<ContentArea />);
    
    // Check if the sidebar is rendered
    expect(screen.getByText('Components')).toBeInTheDocument();
    
    // Check if components are in the sidebar
    expect(screen.getByText('HelloWorld')).toBeInTheDocument();
    expect(screen.getByText('PaymentDashboard')).toBeInTheDocument();
    
    // Check that excluded components are not in the sidebar
    expect(screen.queryByText('ui')).not.toBeInTheDocument();
    expect(screen.queryByText('ContentArea')).not.toBeInTheDocument();
  });
  
  it('loads HelloWorld component by default', async () => {
    render(<ContentArea />);
    
    // Wait for the HelloWorld component to be loaded
    await waitFor(() => {
      expect(screen.getByTestId('hello-world-component')).toBeInTheDocument();
    });
  });
  
  it('handles component loading', async () => {
    // Mock console.error to prevent test output noise
    jest.spyOn(console, 'error').mockImplementation(() => {});
    
    render(<ContentArea />);
    
    // Wait for the HelloWorld component to be loaded (default)
    await waitFor(() => {
      expect(screen.getByTestId('hello-world-component')).toBeInTheDocument();
    });
    
    // Reset the mock to avoid affecting other tests
    (console.error as jest.Mock).mockRestore();
  });
}); 