import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import PlaygroundLayout from './PlaygroundLayout';

const meta: Meta<typeof PlaygroundLayout> = {
  title: 'Components/PlaygroundLayout',
  component: PlaygroundLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PlaygroundLayout>;

export const Default: Story = {
  args: {
    contentArea: (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">Content Area</h3>
          <p>This is where interactive content will be displayed.</p>
        </div>
      </div>
    ),
    documentationArea: (
      <div>
        <h3 className="text-xl font-bold mb-4">Documentation Area</h3>
        <p className="mb-4">This area contains documentation, resources, and helpful information.</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Documentation item 1</li>
          <li>Documentation item 2</li>
          <li>Documentation item 3</li>
        </ul>
      </div>
    ),
  },
}; 