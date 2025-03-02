import React from 'react';
import { createRoot } from 'react-dom/client';
import InspirationResources from 'components/InspirationResources/InspirationResources';
import { ThemeProvider } from 'components/theme-provider';
import { ThemeToggle } from 'components/theme-toggle';
import './globals.css';

/**
 * App Component
 * 
 * This is the main application component that serves as the entry point.
 * It imports and renders the InspirationResources component.
 */
const App = () => {
  return (
    <ThemeProvider defaultTheme="system">
      <div className="app-container min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 p-4">
        <header className="max-w-4xl mx-auto py-8 flex flex-col items-center">
          <div className="absolute top-4 right-4">
            <ThemeToggle />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-center">Cursor Storybook Artifacts</h1>
          <p className="text-slate-600 dark:text-slate-400 text-center">A starter project for business users to create and customize components using Cursor and Storybook, providing a foundation for developers to build upon.</p>
        </header>
        <main>
          <InspirationResources />
        </main>
        <footer className="max-w-4xl mx-auto text-center py-8 mt-8 text-sm text-slate-500 dark:text-slate-400">
          <p>Built with React, Tailwind CSS, and Shadcn UI</p>
        </footer>
      </div>
    </ThemeProvider>
  );
};

// Render the App component to the DOM
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />); 