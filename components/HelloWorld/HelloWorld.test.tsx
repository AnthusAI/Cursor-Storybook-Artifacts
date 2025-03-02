import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HelloWorld from './HelloWorld';

describe('HelloWorld Component', () => {
  test('renders with default greeting', () => {
    render(<HelloWorld />);
    expect(screen.getByText(/Hello, World!/i)).toBeInTheDocument();
    expect(screen.getByText(/Welcome to Vibe Coding Workbench./i)).toBeInTheDocument();
  });

  test('renders with custom greeting', () => {
    render(<HelloWorld initialName="Tester" />);
    expect(screen.getByText(/Hello, Tester!/i)).toBeInTheDocument();
  });

  test('changes greeting when button is clicked', () => {
    render(<HelloWorld />);
    
    // Initial state check
    expect(screen.getByText(/Hello, World!/i)).toBeInTheDocument();
    
    // Click the button
    const button = screen.getByText('Change Greeting');
    fireEvent.click(button);
    
    // Check that greeting changed
    expect(screen.queryByText(/Hello, World!/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Hello, Friend!/i)).toBeInTheDocument();
    
    // Click again
    fireEvent.click(button);
    expect(screen.getByText(/Hello, Developer!/i)).toBeInTheDocument();
  });
}); 