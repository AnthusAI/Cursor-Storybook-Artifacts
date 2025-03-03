import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PaymentDashboardLayout } from '../components/PaymentDashboard/PaymentDashboardLayout';
import { PaymentDashboardHome } from '../components/PaymentDashboard/PaymentDashboardHome';
import { BarChart3, CreditCard, Users, Settings } from 'lucide-react';

// Define route metadata that can be used for navigation
export const routes = [
  {
    path: '/dashboard',
    element: <PaymentDashboardHome />,
    label: 'Dashboard',
    icon: BarChart3,
    showInNav: true,
  },
  {
    path: '/dashboard/payments',
    element: (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Payments</h1>
        <p className="text-muted-foreground">Manage your payments and transactions here.</p>
      </div>
    ),
    label: 'Payments',
    icon: CreditCard,
    showInNav: true,
  },
  {
    path: '/dashboard/customers',
    element: (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Customers</h1>
        <p className="text-muted-foreground">View and manage your customer base.</p>
      </div>
    ),
    label: 'Customers',
    icon: Users,
    showInNav: true,
  },
  {
    path: '/dashboard/settings',
    element: (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-muted-foreground">Configure your account settings.</p>
      </div>
    ),
    label: 'Settings',
    icon: Settings,
    showInNav: true,
  },
];

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<PaymentDashboardLayout />}>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path.replace('/dashboard/', '')}
              element={route.element}
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}; 