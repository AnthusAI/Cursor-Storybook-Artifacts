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
    <div className="absolute top-0 right-0 flex gap-2">
      <ThemeToggle />
      <button
        onClick={() => {
          // We'll handle this in the parent component
          const event = new CustomEvent('toggleDocumentation');
          window.dispatchEvent(event);
        }}
        className="rounded-full relative w-10 h-10 inline-flex items-center justify-center border border-input bg-background hover:bg-accent hover:text-accent-foreground"
        aria-label="Close documentation"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </div>
    <h1 className="text-2xl font-bold mb-2 pr-20">Vibe Coding Workbench</h1>
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
      <div className="app-container min-h-screen h-screen w-screen overflow-hidden bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-50 p-1 flex flex-col">
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