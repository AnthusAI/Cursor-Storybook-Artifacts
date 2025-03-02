import React, { useState, useEffect, useRef } from 'react';
import { Quote, ExternalLink } from 'lucide-react';

// Define types for the component props
interface DocumentationProps {
  initialWidth?: number;
  testMode?: boolean;
}

// Define types for the suggestion items
interface Suggestion {
  prompt: string;
  title: string;
  description: string;
  docLink?: string;
  docLinkText?: string;
  docDescription?: string;
}

// Define types for the resource items
interface Resource {
  name: string;
  url: string;
  description: string;
  category: string;
}

/**
 * A component that displays a curated list of front-end development resources
 * and AI agent suggestions, presented in a flat, modern design.
 * The layout is responsive and will display in two columns when the container is wide enough.
 */
const Documentation: React.FC<DocumentationProps> = ({ initialWidth = 0, testMode = false }) => {
  // State to track container width and column count
  const [containerWidth, setContainerWidth] = useState<number>(initialWidth);
  const containerRef = useRef<HTMLDivElement | null>(null);

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
  const getColumnClass = (): string => {
    // Use two columns when container is wider than 768px
    return containerWidth > 768 ? 'grid-cols-2' : 'grid-cols-1';
  };

  const suggestions: Suggestion[] = [
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

  const resources: Resource[] = [
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
      name: "TypeScript",
      url: "https://www.typescriptlang.org",
      description: "Adds error-checking to JavaScript, catching issues early and reducing costly bugs before they reach production.",
      category: "Programming Language"
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
    },
    {
      name: "Majestic",
      url: "https://github.com/Raathigesh/majestic",
      description: "A user-friendly visual interface for running tests without needing to understand command-line tools.",
      category: "Testing Tool"
    }
  ];

  return (
    <div ref={containerRef} className="documentation w-full overflow-y-auto">
      {/* Introduction Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3">Transform Your Business Ideas into Working Software</h2>
        <p className="mb-4 text-slate-700 dark:text-slate-300">
          Vibe Coding Workbench is a starter kit designed specifically for business leaders with a vision. 
          Instead of getting caught in endless design cycles and development delays, you can rapidly create 
          functional prototypes that demonstrate real business value. These prototypes are built on solid 
          foundations that professional developers can easily refine and integrate into production systems.
        </p>
        
        <p className="mb-4 text-slate-700 dark:text-slate-300">
          When you've created something valuable with Vibe Coding and need help taking it to the next level, 
          <a href="https://anth.us" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline"> Anthus AI Solutions</a> provides 
          the expertise to help you launch, deploy, and operate your application with enterprise-grade quality.
        </p>
        
        <h3 className="text-lg font-medium mb-2">Features:</h3>
        <ul className="list-disc pl-5 mb-4 text-slate-700 dark:text-slate-300 space-y-2">
          <li>
            <strong>Aligned with Agile Development:</strong> Make small, verifiable changes that add up to big results. 
            Each small step reduces risk and allows for continuous validation.
          </li>
          <li>
            <strong>Built on Test-Driven Development:</strong> Tests serve as specifications that lock in requirements 
            and prevent future changes from breaking existing functionality.
          </li>
          <li>
            <strong>Automatic Error Detection:</strong> Tools like TypeScript catch issues immediately, 
            when they're much cheaper and faster to fix than after deployment.
          </li>
          <li>
            <strong>Developer-Friendly Output:</strong> Everything you create is built on industry-standard 
            technologies that professional developers prefer, making handoff smooth.
          </li>
        </ul>
        
        <h3 className="text-lg font-medium mb-2">How to do it:</h3>
        <ol className="list-decimal pl-5 mb-4 text-slate-700 dark:text-slate-300 space-y-2">
          <li>
            <strong>Set up your development environment:</strong>
            <ul className="list-disc pl-5 mt-1 mb-2">
              <li>Open Cursor IDE</li>
              <li>Open a browser with three tabs:
                <ul className="list-disc pl-5 mt-1">
                  <li>Storybook - for component development</li>
                  <li>The application - to see your changes in context</li>
                  <li>Majestic - for visual testing</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <strong>Examples of what you can ask:</strong>
            <ul className="list-disc pl-5 mt-1">
              <li>"Create a new button component with primary and secondary variants"</li>
              <li>"Add form validation to the contact form"</li>
              <li>"Change the color scheme to match our brand colors"</li>
              <li>"Create a responsive navigation menu"</li>
            </ul>
          </li>
        </ol>
        
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Get started by exploring the suggestions below or browsing the technology resources 
          to understand the building blocks available for your project.
        </p>
      </div>
      
      {/* Suggestions Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Suggestions</h3>
        <div className={`grid ${getColumnClass()} gap-4`}>
          {suggestions.map((suggestion, index) => (
            <div 
              key={index} 
              className="bg-sky-100 dark:bg-sky-950 p-5 rounded-lg"
            >
              <h4 className="text-lg font-medium mb-3">{suggestion.title}</h4>
              <div className="mb-4">
                <div className="flex items-start gap-2 mb-2">
                  <Quote className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                  <p className="text-base italic bg-white dark:bg-slate-800 p-3 rounded-md border-l-2 border-blue-400 dark:border-blue-500">
                    "{suggestion.prompt}"
                  </p>
                </div>
              </div>
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
              className="block bg-sky-100 dark:bg-sky-950 p-5 rounded-lg no-underline"
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
      
      {/* Contact Section */}
      <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-950 rounded-lg">
        <h3 className="text-lg font-medium mb-3">Need Help with Your Project?</h3>
        <p className="mb-4 text-slate-700 dark:text-slate-300">
          Vibe Coding is designed to empower developers, not replace them. When you've created a valuable prototype 
          and are ready to take it to the next level, Anthus AI Solutions can help bridge the gap between prototype 
          and production with decades of experience in enterprise-level application development and operations.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 mt-4">
          <div>
            <h4 className="text-md font-medium mb-2">Our Services</h4>
            <ul className="list-disc pl-5 text-slate-700 dark:text-slate-300 space-y-1">
              <li>Seamless developer collaboration</li>
              <li>Enterprise-grade deployment</li>
              <li>Regulatory compliance (HIPAA, SOC2, etc.)</li>
              <li>24/7 operational support</li>
              <li>Strategic AI implementation</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-2">Contact Us</h4>
            <a 
              href="https://anth.us" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
            >
              <ExternalLink className="h-4 w-4" />
              Visit anth.us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation; 