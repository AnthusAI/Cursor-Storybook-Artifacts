import type { Meta, StoryObj } from '@storybook/react';
import InspirationResources from './InspirationResources';

const meta: Meta<typeof InspirationResources> = {
  title: 'Components/InspirationResources',
  component: InspirationResources,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A modern, flat-design component that displays front-end development resources and AI agent suggestions. Features a clean layout with consistent styling across sections, quoted example prompts with descriptions, and fully clickable technology cards.'
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof InspirationResources>;

/**
 * Default story showing the InspirationResources component with a flat design.
 * The component features:
 * - A Suggestions section with quoted example prompts, titles, and descriptions
 * - A Technologies section with fully clickable resource cards
 * - Consistent styling between sections with background colors and hover effects
 */
export const Default: Story = {
  args: {},
}; 