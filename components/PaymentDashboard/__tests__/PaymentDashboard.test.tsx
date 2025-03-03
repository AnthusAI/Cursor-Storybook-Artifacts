import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PaymentDashboard from '../PaymentDashboard';

describe('PaymentDashboard', () => {
  it('renders the dashboard title', () => {
    render(<PaymentDashboard />);
    expect(screen.getByText('Payment Dashboard')).toBeInTheDocument();
  });

  it('renders all metric cards', () => {
    render(<PaymentDashboard />);
    
    // Check for metric titles
    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('Active Subscriptions')).toBeInTheDocument();
    expect(screen.getByText('Daily Transactions')).toBeInTheDocument();
    
    // Check for metric values
    expect(screen.getByText('$45,231.89')).toBeInTheDocument();
    expect(screen.getByText('2,431')).toBeInTheDocument();
    expect(screen.getByText('1,543')).toBeInTheDocument();
  });

  it('renders quick action buttons', () => {
    render(<PaymentDashboard />);
    
    expect(screen.getByText('Quick Actions')).toBeInTheDocument();
    expect(screen.getByText('View Reports')).toBeInTheDocument();
    expect(screen.getByText('Manage Users')).toBeInTheDocument();
  });
}); 