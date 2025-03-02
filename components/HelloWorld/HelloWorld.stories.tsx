import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import HelloWorld from './HelloWorld';

const meta: Meta<typeof HelloWorld> = {
  title: 'Components/HelloWorld',
  component: HelloWorld,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    initialName: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof HelloWorld>;

/**
 * Default story with the default "World" greeting
 */
export const Default: Story = {
  args: {
    initialName: 'World',
  },
};

/**
 * Story with a custom initial greeting
 */
export const CustomGreeting: Story = {
  args: {
    initialName: 'Cursor User',
  },
};

/**
 * Story with a longer name to test layout
 */
export const LongName: Story = {
  args: {
    initialName: 'Enthusiastic Storybook Developer',
  },
}; 