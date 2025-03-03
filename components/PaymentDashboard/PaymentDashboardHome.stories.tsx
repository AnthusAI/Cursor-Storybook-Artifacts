import type { Meta, StoryObj } from '@storybook/react';
import { PaymentDashboardHome } from './PaymentDashboardHome';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof PaymentDashboardHome> = {
  title: 'PaymentDashboard/Home',
  component: PaymentDashboardHome,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof PaymentDashboardHome>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify the title is present
    await expect(canvas.getByText('Dashboard Overview')).toBeInTheDocument();
    
    // Verify stat cards are present
    await expect(canvas.getByText('Total Revenue')).toBeInTheDocument();
    await expect(canvas.getByText('Active Customers')).toBeInTheDocument();
    await expect(canvas.getByText('Success Rate')).toBeInTheDocument();
    
    // Verify chart is present
    await expect(canvas.getByText('Payment Volume')).toBeInTheDocument();
  },
};

export const WithDifferentData: Story = {
  args: {
    data: [
      { name: 'Aug', value: 6000 },
      { name: 'Sep', value: 4500 },
      { name: 'Oct', value: 5800 },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify custom data points are displayed
    await expect(canvas.getByText('Aug')).toBeInTheDocument();
    await expect(canvas.getByText('Sep')).toBeInTheDocument();
    await expect(canvas.getByText('Oct')).toBeInTheDocument();
  },
}; 