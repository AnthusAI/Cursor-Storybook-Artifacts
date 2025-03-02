import HelloWorld from './HelloWorld';

export default {
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

/**
 * Default story with the default "World" greeting
 */
export const Default = {
  args: {
    initialName: 'World',
  },
};

/**
 * Story with a custom initial greeting
 */
export const CustomGreeting = {
  args: {
    initialName: 'Cursor User',
  },
};

/**
 * Story with a longer name to test layout
 */
export const LongName = {
  args: {
    initialName: 'Enthusiastic Storybook Developer',
  },
}; 