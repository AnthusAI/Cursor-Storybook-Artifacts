import React, { useState, useEffect, useRef } from 'react';
import { Quote, ExternalLink, CheckCircle, ArrowRight, Rocket } from 'lucide-react';

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
    // Section 1: Creative Component Development
    {
      prompt: "Create a new pagination component with next/previous buttons",
      title: "Create a new component",
      description: "Build custom UI components tailored to your specific application requirements.",
      docLink: "https://ui.shadcn.com/docs/components/accordion",
      docLinkText: "Shadcn UI Components",
      docDescription: "A menu of different components you can add to your project"
    },
    {
      prompt: "Change the primary button color to indigo",
      title: "Change component colors",
      description: "Modify the color scheme of UI components to match your brand or design preferences.",
      docLink: "https://tailwindcss.com/docs/colors",
      docLinkText: "Tailwind Color Palette",
      docDescription: "Like a restaurant menu for colors the AI understands"
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
      prompt: "Add email and password validation to the login form",
      title: "Add form validation",
      description: "Implement client-side validation for form inputs with appropriate error messages and feedback."
    },
    // Section 2: Sharing with Developers
    {
      prompt: "I want to start working on a new feature for the dashboard",
      title: "Create a new feature branch",
      description: "Start working on a new feature in a separate branch to keep your changes organized.",
      docDescription: "Learn how to manage your work with Git branches"
    },
    {
      prompt: "Show me what branch I'm currently on",
      title: "Check your current branch",
      description: "View your current working branch and see all available branches.",
      docDescription: "Stay oriented in your Git workspace"
    },
    {
      prompt: "Save my changes with a message explaining the new navigation menu",
      title: "Save your work (commit)",
      description: "Save your changes with a clear message describing what you did.",
      docDescription: "Document your progress with Git commits"
    },
    {
      prompt: "Share my navigation menu changes on GitHub",
      title: "Share with developers (push)",
      description: "Share your work with the development team by pushing to GitHub.",
      docDescription: "Collaborate with your team through GitHub"
    }
  ];

  const resources: Resource[] = [
    {
      name: "Storybook",
      url: "https://storybook.js.org",
      description: "A visual catalog where you can see and interact with each piece of your application in isolation. This makes it easy to review designs, test functionality, and communicate your vision to developers without needing to understand code.",
      category: "Design & Testing"
    },
    {
      name: "Majestic",
      url: "https://github.com/Raathigesh/majestic",
      description: "A user-friendly dashboard that shows you if everything in your application is working correctly. It turns complex technical tests into simple green (working) or red (needs attention) indicators that anyone can understand.",
      category: "Quality Assurance"
    },
    {
      name: "Shadcn UI",
      url: "https://ui.shadcn.com",
      description: "A collection of pre-built, professional-looking components that ensure your application follows modern design standards. Think of it as a library of building blocks that have already been tested and refined for optimal user experience.",
      category: "Design System"
    },
    {
      name: "Tailwind CSS",
      url: "https://tailwindcss.com",
      description: "A design system that makes it easy to create consistent, professional-looking interfaces. Instead of writing complex design code, you can use simple, human-readable terms to describe how you want things to look.",
      category: "Design Framework"
    },
    {
      name: "Lucide Icons",
      url: "https://lucide.dev",
      description: "A comprehensive collection of modern, consistent icons that help make your application more intuitive and professional. These icons are designed to work seamlessly across all devices and screen sizes.",
      category: "Visual Elements"
    },
    {
      name: "TypeScript",
      url: "https://www.typescriptlang.org",
      description: "A safeguard system that catches potential problems before they can affect your users. It helps ensure your application remains reliable and maintainable as it grows, reducing costly bugs and maintenance issues.",
      category: "Code Quality"
    },
    {
      name: "React",
      url: "https://react.dev",
      description: "The foundation that powers many of the world's most successful web applications. It enables smooth, app-like experiences that users expect from modern software, while ensuring your application can grow without becoming difficult to maintain.",
      category: "Core Technology"
    },
    {
      name: "Jest",
      url: "https://jestjs.io",
      description: "An automated testing system that helps ensure new changes don't break existing features. It provides confidence that your application will continue working reliably as it evolves.",
      category: "Quality Assurance"
    }
  ];

  return (
    <div ref={containerRef} className="documentation w-full overflow-y-auto">
      {/* Introduction Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3">Transform Your Business Ideas into Working Software</h2>
        <p className="mb-4 text-slate-700 dark:text-slate-300">
          Vibe Coding Workbench is a <b>curated framework for business leaders</b> who want to create production-ready web applications. 
          It leverages <a href="https://cursor.sh" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Cursor</a>'s 
          powerful AI capabilities, enhanced with specific opinions and best practices for creating components that deliver real business value.
        </p>
        <p className="mb-4 text-slate-700 dark:text-slate-300">
          Instead of getting caught in endless design cycles or struggling with AI tools that generate throwaway code, 
          you can use our carefully selected set of technologies and practices to <b>create production-ready prototypes 
          that professional developers can build upon</b>.
        </p>
        <p className="mb-4 text-slate-700 dark:text-slate-300">
          This framework provides a <b>proven structure for development</b>, with integrated rules that guide Cursor's AI 
          toward professional-grade code. Everything you create follows established patterns and best practices, making it 
          easy for development teams to refine and integrate into production systems.
        </p>
        
        <h3 className="text-lg font-medium mb-2">Built on Professional Tools:</h3>
        <ul className="list-disc pl-5 mb-4 text-slate-700 dark:text-slate-300 space-y-2">
          <li>
            <strong>Cursor's AI Technology:</strong> Powerful AI-driven development with our added opinions 
            about component structure, testing, and code organization
          </li>
          <li>
            <strong>Storybook Integration:</strong> Visual development environment for building and testing 
            components in isolation
          </li>
          <li>
            <strong>Comprehensive Testing:</strong> Automated tests that serve as specifications and prevent 
            future changes from breaking functionality
          </li>
          <li>
            <strong>Modern Stack:</strong> React, TypeScript, and other production-ready technologies that 
            professional teams prefer
          </li>
        </ul>
        
        <h3 className="text-lg font-medium mb-2">How to Use It:</h3>
        <ol className="list-decimal pl-5 mb-4 text-slate-700 dark:text-slate-300 space-y-2">
          <li>
            <strong>Set up your environment:</strong>
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
            <strong>Describe what you want to build:</strong>
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
          to understand the building blocks available in this framework.
        </p>
      </div>
      
      {/* Suggestions Section */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-6">How to Get Creative with AI Assistance</h3>
        <div className={`grid ${getColumnClass()} gap-4`}>
          {suggestions.slice(0, 5).map((suggestion, index) => (
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

        <h3 className="text-xl font-bold mb-6 mt-12">How to Share Your Creations with Your Developers</h3>
        <div className={`grid ${getColumnClass()} gap-4`}>
          {suggestions.slice(5).map((suggestion, index) => (
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
        <h3 className="text-xl font-bold mb-6">Technology Stack</h3>
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
              <h4 className="text-lg font-medium mb-2 text-blue-600 dark:text-blue-400">{resource.name}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{resource.description}</p>
            </a>
          ))}
        </div>
      </div>
      
      {/* Enterprise Solutions Section */}
      <div className="mt-12 p-8 bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-950 dark:to-sky-950 rounded-lg">
        <h3 className="text-2xl font-bold mb-4 text-blue-900 dark:text-blue-100">Launch Your App with Enterprise-Grade Excellence</h3>
        <p className="mb-6 text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
          At Anthus AI Solutions, we excel at launching and operating applications that deliver real business value. With decades 
          of experience in enterprise-level deployment and operations, we ensure your application runs with the sophistication, 
          reliability, and scalability that modern businesses demand.
        </p>
        
        <div className="grid sm:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-200">Enterprise-Grade Operations</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">Advanced monitoring and automated deployment systems</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">Robust change management and validation</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">24/7 operational support and incident response</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">Regulatory compliance (GDPR, CCPA, SOC2)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">AI-enhanced operations (ChatOps)</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-200">Business Transformation</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <ArrowRight className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">Strategic consulting on business-developer collaboration</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">Seamless integration of prototypes into production</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">Scalable infrastructure that grows with your needs</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">Strategic AI implementation for business value</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center">
          <a 
            href="https://anth.us" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            <Rocket className="h-5 w-5" />
            Launch Your Enterprise Application
          </a>
        </div>
      </div>
    </div>
  );
};

export default Documentation; 