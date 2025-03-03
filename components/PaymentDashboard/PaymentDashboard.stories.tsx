import type { Meta, StoryObj } from '@storybook/react';
import PaymentDashboard from './PaymentDashboard';

const meta: Meta<typeof PaymentDashboard> = {
  title: 'Components/PaymentDashboard',
  component: PaymentDashboard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A modern dashboard component that displays key metrics and statistics for a payment processing system.'
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PaymentDashboard>;

export const Default: Story = {}; 