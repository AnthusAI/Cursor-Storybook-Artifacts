import React from 'react';
import { render, screen } from '@testing-library/react';
import { PaymentDashboardHome } from '../PaymentDashboardHome';

// Mock the ResponsiveContainer to avoid size warnings
jest.mock('recharts', () => {
  const OriginalModule = jest.requireActual('recharts');
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: any) => (
      <div style={{ width: '100%', height: 300 }}>
        {children}
      </div>
    ),
  };
});

describe('PaymentDashboardHome', () => {
  it('renders the dashboard overview title', () => {
    render(<PaymentDashboardHome />);
    expect(screen.getByText('Dashboard Overview')).toBeInTheDocument();
  });

  it('renders all stat cards', () => {
    render(<PaymentDashboardHome />);
    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('Active Customers')).toBeInTheDocument();
    expect(screen.getByText('Success Rate')).toBeInTheDocument();
  });

  it('renders the payment volume chart', () => {
    render(<PaymentDashboardHome />);
    expect(screen.getByText('Payment Volume')).toBeInTheDocument();
  });
}); 