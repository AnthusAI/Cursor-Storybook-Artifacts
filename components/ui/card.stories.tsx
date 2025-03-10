import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from './card';
import { Button } from './button';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

/**
 * Default card with all subcomponents
 */
export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * Card with just header and content
 */
export const HeaderAndContent: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is a card with just a header and content.</p>
      </CardContent>
    </Card>
  ),
};

/**
 * Card with multiple actions in the footer
 */
export const MultipleActions: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card with multiple actions</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card has multiple actions in the footer.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * Card with custom styling
 */
export const CustomStyling: Story = {
  render: () => (
    <Card className="w-[350px] border-primary">
      <CardHeader className="bg-primary text-primary-foreground">
        <CardTitle>Custom Card</CardTitle>
        <CardDescription className="text-primary-foreground/80">
          This card has custom styling
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <p>This card demonstrates custom styling capabilities.</p>
      </CardContent>
      <CardFooter>
        <Button variant="secondary">Action</Button>
      </CardFooter>
    </Card>
  ),
}; 