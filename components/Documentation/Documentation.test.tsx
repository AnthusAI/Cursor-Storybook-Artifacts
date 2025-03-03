import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Documentation from './Documentation';

// Mock ResizeObserver
class MockResizeObserver implements ResizeObserver {
  callback: ResizeObserverCallback;
  
  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }
  
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

// Set the global ResizeObserver
global.ResizeObserver = MockResizeObserver;

describe('Documentation', () => {
  test('renders section headings', () => {
    render(<Documentation testMode={true} />);
    expect(screen.getByText('Transform Your Business Ideas into Working Software')).toBeInTheDocument();
    expect(screen.getByText('Built on Professional Tools:')).toBeInTheDocument();
    expect(screen.getByText('How to Use It:')).toBeInTheDocument();
  });

  test('renders resource items as links', () => {
    render(<Documentation testMode={true} />);
    
    // Check that resource names are rendered and are part of links
    const shadcnLink = screen.getByText('Shadcn UI').closest('a');
    const lucideLink = screen.getByText('Lucide Icons').closest('a');
    const tailwindLink = screen.getByText('Tailwind CSS').closest('a');
    const jestLink = screen.getByText('Jest').closest('a');
    
    expect(shadcnLink).toHaveAttribute('href', 'https://ui.shadcn.com');
    expect(lucideLink).toHaveAttribute('href', 'https://lucide.dev');
    expect(tailwindLink).toHaveAttribute('href', 'https://tailwindcss.com');
    expect(jestLink).toHaveAttribute('href', 'https://jestjs.io');
    
    // Verify v0.dev is not present
    expect(screen.queryByText('v0.dev')).not.toBeInTheDocument();
  });

  test('renders suggestion prompts with quotes', () => {
    render(<Documentation testMode={true} />);
    
    // Check for example prompts
    expect(screen.getByText(/Change the primary button color to indigo/)).toBeInTheDocument();
    expect(screen.getByText(/Create a new pagination component with next\/previous buttons/)).toBeInTheDocument();
    expect(screen.getByText(/Change the icon on the card component to brain-circuit/)).toBeInTheDocument();
    
    // Check for titles
    expect(screen.getByText('Change component colors')).toBeInTheDocument();
    expect(screen.getByText('Create a new component')).toBeInTheDocument();
    expect(screen.getByText('Change component icons')).toBeInTheDocument();
    
    // Check for descriptions
    expect(screen.getByText(/Modify the color scheme of UI components/)).toBeInTheDocument();
    expect(screen.getByText(/Replace icons with alternatives from the Lucide icon library/)).toBeInTheDocument();
  });

  test('renders documentation links and descriptions in suggestions', () => {
    render(<Documentation testMode={true} />);
    
    // Check for Tailwind colors link
    const tailwindColorsLink = screen.getByText('Tailwind Color Palette');
    expect(tailwindColorsLink).toBeInTheDocument();
    expect(tailwindColorsLink).toHaveAttribute('href', 'https://tailwindcss.com/docs/colors');
    
    // Check for Shadcn UI components link
    const shadcnComponentsLink = screen.getByText('Shadcn UI Components');
    expect(shadcnComponentsLink).toBeInTheDocument();
    expect(shadcnComponentsLink).toHaveAttribute('href', 'https://ui.shadcn.com/docs/components/accordion');
    
    // Check for Lucide icons link
    const lucideIconsLink = screen.getByText('Lucide Icons Library');
    expect(lucideIconsLink).toBeInTheDocument();
    expect(lucideIconsLink).toHaveAttribute('href', 'https://lucide.dev/icons/');
    
    // Check for the documentation descriptions
    expect(screen.getByText('Like a restaurant menu for colors the AI understands')).toBeInTheDocument();
    expect(screen.getByText('A menu of different components you can add to your project')).toBeInTheDocument();
    expect(screen.getByText('Browse the complete collection of available icons')).toBeInTheDocument();
  });

  test('renders quote icons for suggestion prompts', () => {
    render(<Documentation testMode={true} />);
    // Check for quote icons
    const quoteIcons = document.querySelectorAll('.lucide-quote');
    expect(quoteIcons.length).toBeGreaterThan(0);
  });

  test('uses single column layout for narrow containers', () => {
    // Render with a narrow container width
    const { container } = render(<Documentation initialWidth={500} testMode={true} />);
    const grids = container.querySelectorAll('.grid');
    
    // Check that all grids have the single column class
    grids.forEach(grid => {
      expect(grid.classList.contains('grid-cols-1')).toBe(true);
      expect(grid.classList.contains('grid-cols-2')).toBe(false);
    });
  });

  test('uses two column layout for wide containers', () => {
    // Render with a wide container width
    const { container } = render(<Documentation initialWidth={1000} testMode={true} />);
    const grids = container.querySelectorAll('.grid');
    
    // Check that all grids have the two column class
    grids.forEach(grid => {
      expect(grid.classList.contains('grid-cols-2')).toBe(true);
      expect(grid.classList.contains('grid-cols-1')).toBe(false);
    });
  });
}); 