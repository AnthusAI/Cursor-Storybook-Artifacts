import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';

interface HelloWorldProps {
  initialName?: string;
}

/**
 * A simple HelloWorld component that displays a card with a greeting and a button
 * that changes the greeting when clicked.
 */
const HelloWorld: React.FC<HelloWorldProps> = ({ initialName = 'World' }) => {
  const [name, setName] = useState(initialName);
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    const names = ['World', 'Friend', 'Developer', 'Cursor User', 'Storybook Fan'];
    const nextIndex = (clickCount + 1) % names.length;
    setName(names[nextIndex]);
    setClickCount(nextIndex);
  };

  return (
    <Card className="w-[350px] mx-auto">
      <CardHeader>
        <CardTitle>Hello, {name}!</CardTitle>
        <CardDescription>Welcome to Vibe Coding Workbench.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          This component is built using Shadcn UI components.
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleClick}>
          Change Greeting
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HelloWorld; 