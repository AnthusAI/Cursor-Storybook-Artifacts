import React from 'react';
import { createRoot } from 'react-dom/client';
import InspirationResources from 'components/InspirationResources/InspirationResources';
import PlaygroundLayout from 'components/PlaygroundLayout/PlaygroundLayout';
import ContentArea from 'components/ContentArea/ContentArea';
import { ThemeProvider } from 'components/theme-provider';
import { ThemeToggle } from 'components/theme-toggle';
import './globals.css';

/**
 * DocumentationHeader Component
 * 
 * A component that displays the main title and description for the documentation area.
 * Also includes the theme toggle button in the top right.
 */
const DocumentationHeader = () => (
  <div className="mb-6 relative">
    <div className="absolute top-0 right-0">
      <ThemeToggle />
    </div>
    <h1 className="text-2xl font-bold mb-2 pr-10">Cursor Storybook Artifacts</h1>
    <p className="text-slate-600 dark:text-slate-400">
      A starter project for business users to create and customize components using Cursor and Storybook, 
      providing a foundation for developers to build upon.
    </p>
  </div>
);

/**
 * DocumentationArea Component
 * 
 * A wrapper component that receives the containerWidth prop from PlaygroundLayout
 * and passes it to the InspirationResources component.
 * This enables responsive column layout based on the available width.
 */
const DocumentationArea = ({ containerWidth }) => (
  <>
    <DocumentationHeader />
    <InspirationResources initialWidth={containerWidth} />
  </>
);

/**
 * App Component
 * 
 * This is the main application component that serves as the entry point.
 * It uses the PlaygroundLayout component to create a two-column layout with
 * ContentArea on the left and InspirationResources on the right.
 */
const App = () => {
  return (
    <ThemeProvider defaultTheme="system">
      <div className="app-container min-h-screen h-screen w-screen overflow-hidden bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-50 p-2 flex flex-col">
        <main className="flex-grow overflow-hidden">
          <PlaygroundLayout 
            contentArea={<ContentArea />}
            documentationArea={<DocumentationArea />}
          />
        </main>
      </div>
    </ThemeProvider>
  );
};

// Create root and render app
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />); 