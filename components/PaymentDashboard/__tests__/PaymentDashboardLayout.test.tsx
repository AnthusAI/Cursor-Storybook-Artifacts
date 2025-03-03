import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { PaymentDashboardLayout } from '../PaymentDashboardLayout';

const renderWithRouter = (component: React.ReactNode, { route = '/dashboard' } = {}) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      {component}
    </MemoryRouter>
  );
};

describe('PaymentDashboardLayout', () => {
  it('renders the layout with sidebar open by default', () => {
    renderWithRouter(<PaymentDashboardLayout />);
    expect(screen.getByText('PayFlow')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('toggles sidebar visibility when clicking the toggle button', () => {
    renderWithRouter(<PaymentDashboardLayout />);
    const toggleButton = screen.getByLabelText('Toggle sidebar');
    
    // Initially sidebar is open
    expect(document.querySelector('aside')).toHaveClass('translate-x-0');
    
    // Click to close
    fireEvent.click(toggleButton);
    expect(document.querySelector('aside')).toHaveClass('-translate-x-full');
    
    // Click to open
    fireEvent.click(toggleButton);
    expect(document.querySelector('aside')).toHaveClass('translate-x-0');
  });

  it('highlights the active menu item based on current route', () => {
    renderWithRouter(<PaymentDashboardLayout />, { route: '/dashboard' });
    const dashboardLink = screen.getByText('Dashboard').closest('a');
    expect(dashboardLink).toHaveClass('bg-primary/10');
  });
}); 