import React from 'react';
import { render, screen } from '@testing-library/react';
import InspirationResources from './InspirationResources';

describe('InspirationResources', () => {
  test('renders section headings', () => {
    render(<InspirationResources />);
    expect(screen.getByText('Suggestions')).toBeInTheDocument();
    expect(screen.getByText('Technologies')).toBeInTheDocument();
  });

  test('renders resource items as links', () => {
    render(<InspirationResources />);
    
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
    render(<InspirationResources />);
    
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
    render(<InspirationResources />);
    
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

  test('renders example prompt labels', () => {
    render(<InspirationResources />);
    const promptLabels = screen.getAllByText('Example Prompt');
    expect(promptLabels.length).toBeGreaterThan(0);
  });
}); 