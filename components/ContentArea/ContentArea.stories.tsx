import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ContentArea from './ContentArea';

// No need to mock getComponentList since it's now a static list

const meta: Meta<typeof ContentArea> = {
  title: 'Layout/ContentArea',
  component: ContentArea,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ContentArea>;

export const Default: Story = {}; 