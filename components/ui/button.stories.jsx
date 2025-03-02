import { Button } from './button';

export default {
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

/**
 * Default button with primary styling
 */
export const Default = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
  },
};

/**
 * Destructive button for dangerous actions
 */
export const Destructive = {
  args: {
    children: 'Delete',
    variant: 'destructive',
    size: 'default',
  },
};

/**
 * Outline button with a border
 */
export const Outline = {
  args: {
    children: 'Outline',
    variant: 'outline',
    size: 'default',
  },
};

/**
 * Secondary button with less emphasis
 */
export const Secondary = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
    size: 'default',
  },
};

/**
 * Ghost button with no background until hovered
 */
export const Ghost = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
    size: 'default',
  },
};

/**
 * Link button that looks like a hyperlink
 */
export const Link = {
  args: {
    children: 'Link',
    variant: 'link',
    size: 'default',
  },
};

/**
 * Small button
 */
export const Small = {
  args: {
    children: 'Small',
    variant: 'default',
    size: 'sm',
  },
};

/**
 * Large button
 */
export const Large = {
  args: {
    children: 'Large',
    variant: 'default',
    size: 'lg',
  },
};

/**
 * Icon button (square)
 */
export const Icon = {
  args: {
    children: '🔍',
    variant: 'default',
    size: 'icon',
  },
};

/**
 * Disabled button
 */
export const Disabled = {
  args: {
    children: 'Disabled',
    variant: 'default',
    size: 'default',
    disabled: true,
  },
}; 