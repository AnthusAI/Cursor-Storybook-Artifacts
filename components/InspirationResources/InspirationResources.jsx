import React, { useState, useEffect, useRef } from 'react';

/**
 * A component that displays a curated list of front-end development resources
 * and AI agent suggestions, presented in a flat, modern design.
 * The layout is responsive and will display in two columns when the container is wide enough.
 */
const InspirationResources = ({ initialWidth = 0, testMode = false }) => {
  // State to track container width and column count
  const [containerWidth, setContainerWidth] = useState(initialWidth);
  const containerRef = useRef(null);

  // Update container width on resize
  useEffect(() => {
    // Skip ResizeObserver in test mode
    if (testMode) return;
    
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    // Initial measurement
    updateWidth();

    // Set up resize observer to detect container width changes
    const resizeObserver = new ResizeObserver(updateWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Clean up
    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [testMode]);

  // Determine column count based on container width
  const getColumnClass = () => {
    // Use two columns when container is wider than 768px
    return containerWidth > 768 ? 'grid-cols-2' : 'grid-cols-1';
  };

  const suggestions = [
    {
      prompt: "Change the primary button color to indigo",
      title: "Change component colors",
      description: "Modify the color scheme of UI components to match your brand or design preferences.",
      docLink: "https://tailwindcss.com/docs/colors",
      docLinkText: "Tailwind Color Palette",
      docDescription: "Like a restaurant menu for colors the AI understands"
    },
    {
      prompt: "Create a new pagination component with next/previous buttons",
      title: "Create a new component",
      description: "Build custom UI components tailored to your specific application requirements.",
      docLink: "https://ui.shadcn.com/docs/components/accordion",
      docLinkText: "Shadcn UI Components",
      docDescription: "A menu of different components you can add to your project"
    },
    {
      prompt: "Change the icon on the card component to brain-circuit",
      title: "Change component icons",
      description: "Replace icons with alternatives from the Lucide icon library to better match your content.",
      docLink: "https://lucide.dev/icons/",
      docLinkText: "Lucide Icons Library",
      docDescription: "Browse the complete collection of available icons"
    },
    {
      prompt: "Create a modal dialog with a form and submit button",
      title: "Create a modal dialog box",
      description: "Build interactive modal components for forms, alerts, or confirmations with proper focus management."
    },
    {
      prompt: "Add a bar chart component that displays monthly sales data",
      title: "Add a chart component",
      description: "Integrate data visualization components to represent statistics or metrics in a visual format."
    },
    {
      prompt: "Add email and password validation to the login form",
      title: "Add form validation",
      description: "Implement client-side validation for form inputs with appropriate error messages and feedback."
    }
  ];

  const resources = [
    {
      name: "Shadcn UI",
      url: "https://ui.shadcn.com",
      description: "Beautifully designed components built with Radix UI and Tailwind CSS.",
      category: "UI Components"
    },
    {
      name: "Lucide Icons",
      url: "https://lucide.dev",
      description: "Beautiful & consistent icon toolkit made by the community.",
      category: "Icons"
    },
    {
      name: "Tailwind CSS",
      url: "https://tailwindcss.com",
      description: "A utility-first CSS framework for rapidly building custom designs.",
      category: "CSS Framework"
    },
    {
      name: "React",
      url: "https://react.dev",
      description: "A JavaScript library for building user interfaces.",
      category: "JavaScript Library"
    },
    {
      name: "Storybook",
      url: "https://storybook.js.org",
      description: "Frontend workshop for building UI components and pages in isolation.",
      category: "Development Tool"
    },
    {
      name: "Jest",
      url: "https://jestjs.io",
      description: "A delightful JavaScript testing framework with a focus on simplicity.",
      category: "Testing Framework"
    }
  ];

  return (
    <div ref={containerRef} className="documentation-resources w-full overflow-y-auto">
      {/* Suggestions Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Suggestions</h3>
        <div className={`grid ${getColumnClass()} gap-4`}>
          {suggestions.map((suggestion, index) => (
            <div 
              key={index} 
              className="bg-slate-50 dark:bg-slate-900 p-5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="mb-1">
                <span className="text-xs text-slate-500 dark:text-slate-400 block mb-2">Example Prompt</span>
                <p className="text-sm italic bg-white dark:bg-slate-800 p-3 rounded-md mb-3 border-l-2 border-blue-400 dark:border-blue-500">
                  "{suggestion.prompt}"
                </p>
              </div>
              <h4 className="text-lg font-medium mb-1">{suggestion.title}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{suggestion.description}</p>
              {suggestion.docLink && (
                <div className="mt-2">
                  <a 
                    href={suggestion.docLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm block"
                  >
                    {suggestion.docLinkText || "View documentation"}
                  </a>
                  {suggestion.docDescription && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {suggestion.docDescription}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Technologies Section */}
      <div>
        <h3 className="text-lg font-medium mb-4">Technologies</h3>
        <div className={`grid ${getColumnClass()} gap-4`}>
          {resources.map((resource, index) => (
            <a 
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer" 
              className="block bg-slate-50 dark:bg-slate-900 p-5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors no-underline"
            >
              <div className="mb-1">
                <span className="text-xs text-slate-500 dark:text-slate-400">{resource.category}</span>
              </div>
              <h4 className="text-lg font-medium mb-1 text-blue-600 dark:text-blue-400">{resource.name}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">{resource.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InspirationResources; 