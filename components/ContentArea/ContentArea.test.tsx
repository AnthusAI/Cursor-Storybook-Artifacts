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

// Create a spy on getComponentList to control its return value in tests
jest.spyOn(componentUtils, 'getComponentList').mockImplementation(() => [
  { name: 'HelloWorld' },
  { name: 'Button' },
  { name: 'Card' },
]);

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
    const sidebarButtons = screen.getAllByRole('button');
    const helloWorldButton = sidebarButtons.find(button => button.textContent === 'HelloWorld');
    expect(helloWorldButton).toBeInTheDocument();
    
    const buttonComponent = sidebarButtons.find(button => button.textContent === 'Button');
    expect(buttonComponent).toBeInTheDocument();
  });
  
  it('loads HelloWorld component by default', async () => {
    render(<ContentArea />);
    
    // Wait for the HelloWorld component to be loaded
    await waitFor(() => {
      expect(screen.getByTestId('hello-world-component')).toBeInTheDocument();
    });
    
    // Check if the component name is displayed in the header
    const headings = screen.getAllByRole('heading');
    const componentHeading = headings.find(heading => heading.textContent === 'HelloWorld');
    expect(componentHeading).toBeInTheDocument();
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