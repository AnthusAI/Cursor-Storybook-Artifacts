import type { Meta, StoryObj } from '@storybook/react';
import Documentation from './Documentation';

const meta: Meta<typeof Documentation> = {
  title: 'Components/Documentation',
  component: Documentation,
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

type Story = StoryObj<typeof Documentation>;

/**
 * Default story showing the Documentation component with a flat design.
 * The component features:
 * - A Suggestions section with quoted example prompts, titles, and descriptions
 * - A Technologies section with fully clickable resource cards
 * - Consistent styling between sections with background colors and hover effects
 */
export const Default: Story = {
  args: {},
}; 