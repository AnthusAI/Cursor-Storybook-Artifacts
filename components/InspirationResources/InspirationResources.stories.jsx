import InspirationResources from './InspirationResources';

export default {
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

/**
 * Default story showing the InspirationResources component with a flat design.
 * The component features:
 * - A Suggestions section with quoted example prompts, titles, and descriptions
 * - A Technologies section with fully clickable resource cards
 * - Consistent styling between sections with background colors and hover effects
 */
export const Default = {
  args: {},
}; 