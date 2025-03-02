import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'UI/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onSelectComponent: { action: 'component selected' },
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    items: [
      { name: 'HelloWorld' },
      { name: 'Button' },
      { name: 'Card' },
    ],
  },
};

export const Empty: Story = {
  args: {
    items: [],
  },
}; 