import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Sidebar } from './sidebar';

describe('Sidebar Component', () => {
  const mockItems = [
    { name: 'HelloWorld' },
    { name: 'Button' },
    { name: 'Card' },
  ];
  
  const mockSelectComponent = jest.fn();
  
  beforeEach(() => {
    mockSelectComponent.mockClear();
  });
  
  it('renders the sidebar with component items', () => {
    render(<Sidebar items={mockItems} onSelectComponent={mockSelectComponent} />);
    
    // Check if the title is rendered
    expect(screen.getByText('Components')).toBeInTheDocument();
    
    // Check if the items are rendered
    expect(screen.getByText('HelloWorld')).toBeInTheDocument();
    expect(screen.getByText('Button')).toBeInTheDocument();
    expect(screen.getByText('Card')).toBeInTheDocument();
  });
  
  it('calls onSelectComponent when a component is clicked', () => {
    render(<Sidebar items={mockItems} onSelectComponent={mockSelectComponent} />);
    
    // Click on a component
    fireEvent.click(screen.getByText('HelloWorld'));
    
    // Check if the callback was called with the correct arguments
    expect(mockSelectComponent).toHaveBeenCalledWith('HelloWorld');
  });
  
  it('renders empty state correctly', () => {
    render(<Sidebar items={[]} onSelectComponent={mockSelectComponent} />);
    
    // Title should still be visible
    expect(screen.getByText('Components')).toBeInTheDocument();
    
    // No items should be rendered
    expect(screen.queryByText('HelloWorld')).not.toBeInTheDocument();
    expect(screen.queryByText('Button')).not.toBeInTheDocument();
  });
}); 