import React from 'react';
import { createRoot } from 'react-dom/client';
import Documentation from '../components/Documentation/Documentation';
import PlaygroundLayout from '../components/PlaygroundLayout/PlaygroundLayout';
import ContentArea from '../components/ContentArea/ContentArea';
import { ThemeProvider } from '../components/theme-provider';
import { ThemeToggle } from '../components/theme-toggle';
import './globals.css';

/**
 * DocumentationHeader Component
 * 
 * A component that displays the main title and description for the documentation area.
 * Also includes the theme toggle button in the top right.
 */
const DocumentationHeader: React.FC = () => (
  <div className="mb-6 relative">
    <div className="absolute top-0 right-0">
      <ThemeToggle />
    </div>
    <h1 className="text-2xl font-bold mb-2 pr-10">Vibe Coding Workbench</h1>
  </div>
);

/**
 * DocumentationArea Component
 * 
 * A wrapper component that receives the containerWidth prop from PlaygroundLayout
 * and passes it to the Documentation component.
 * This enables responsive column layout based on the available width.
 */
interface DocumentationAreaProps {
  containerWidth?: number;
}

const DocumentationArea: React.FC<DocumentationAreaProps> = ({ containerWidth }) => (
  <>
    <DocumentationHeader />
    <Documentation initialWidth={containerWidth} />
  </>
);

/**
 * App Component
 * 
 * This is the main application component that serves as the entry point.
 * It uses the PlaygroundLayout component to create a two-column layout with
 * ContentArea on the left and Documentation on the right.
 */
const App: React.FC = () => {
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
if (container) {
  const root = createRoot(container);
  root.render(<App />);
} 