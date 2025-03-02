import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    children: {
      control: 'text',
    },
    className: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * Default button with primary styling
 */
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
  },
};

/**
 * Destructive button for dangerous actions
 */
export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
    size: 'default',
  },
};

/**
 * Outline button with a border
 */
export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
    size: 'default',
  },
};

/**
 * Secondary button with less emphasis
 */
export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
    size: 'default',
  },
};

/**
 * Ghost button with no background until hovered
 */
export const Ghost: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
    size: 'default',
  },
};

/**
 * Link button that looks like a hyperlink
 */
export const Link: Story = {
  args: {
    children: 'Link',
    variant: 'link',
    size: 'default',
  },
};

/**
 * Small button
 */
export const Small: Story = {
  args: {
    children: 'Small',
    variant: 'default',
    size: 'sm',
  },
};

/**
 * Large button
 */
export const Large: Story = {
  args: {
    children: 'Large',
    variant: 'default',
    size: 'lg',
  },
};

/**
 * Icon button (square)
 */
export const Icon: Story = {
  args: {
    children: '🔍',
    variant: 'default',
    size: 'icon',
  },
};

/**
 * Disabled button
 */
export const Disabled: Story = {
  args: {
    children: 'Disabled',
    variant: 'default',
    size: 'default',
    disabled: true,
  },
}; 