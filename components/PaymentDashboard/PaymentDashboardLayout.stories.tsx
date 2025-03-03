import type { Meta, StoryObj } from '@storybook/react';
import { PaymentDashboardLayout } from './PaymentDashboardLayout';
import { BrowserRouter } from 'react-router-dom';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof PaymentDashboardLayout> = {
  title: 'PaymentDashboard/Layout',
  component: PaymentDashboardLayout,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof PaymentDashboardLayout>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify the logo is present
    await expect(canvas.getByText('PayFlow')).toBeInTheDocument();
    
    // Verify navigation items are present
    await expect(canvas.getByText('Dashboard')).toBeInTheDocument();
    await expect(canvas.getByText('Payments')).toBeInTheDocument();
    await expect(canvas.getByText('Customers')).toBeInTheDocument();
    await expect(canvas.getByText('Settings')).toBeInTheDocument();
  },
}; 