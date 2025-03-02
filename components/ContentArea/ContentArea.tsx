import React, { useState, useEffect, Suspense } from 'react';
import './ContentArea.css';
import { Sidebar } from '../ui/sidebar';
import { getComponentList } from '../../lib/component-utils';

// Import the HelloWorld component directly as a fallback
import HelloWorld from '../HelloWorld/HelloWorld';

/**
 * ContentArea Component
 * 
 * A component for the left side of the playground layout.
 * Includes a sidebar that dynamically lists available components
 * and a content display area that renders the selected component.
 */
const ContentArea: React.FC = () => {
  const [componentList, setComponentList] = useState<ReturnType<typeof getComponentList>>([]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [DynamicComponent, setDynamicComponent] = useState<React.ComponentType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load the component list on mount
  useEffect(() => {
    try {
      const components = getComponentList();
      setComponentList(components);
      
      // Default to HelloWorld if available
      const helloWorldItem = components.find(item => item.name === 'HelloWorld');
      if (helloWorldItem) {
        handleSelectComponent('HelloWorld');
      }
    } catch (err) {
      console.error('Failed to load component list:', err);
      setError('Failed to load component list');
    }
  }, []);

  // Handle component selection
  const handleSelectComponent = async (componentName: string) => {
    setSelectedComponent(componentName);
    setIsLoading(true);
    setError(null);

    try {
      // Special case for HelloWorld which is imported directly
      if (componentName === 'HelloWorld') {
        setDynamicComponent(() => HelloWorld);
        setIsLoading(false);
        return;
      }

      // For other components, dynamically import them
      let Component;
      
      try {
        // For top-level components
        const module = await import(`../${componentName}/${componentName}`);
        Component = module.default;
      } catch (importError) {
        console.error(`Failed to import component ${componentName}:`, importError);
        throw new Error(`Component ${componentName} could not be loaded. Make sure it exists and is exported correctly.`);
      }
      
      if (!Component) {
        throw new Error(`Component ${componentName} was found but not exported correctly. Check the component file.`);
      }
      
      setDynamicComponent(() => Component);
    } catch (err) {
      console.error(`Failed to load component ${componentName}:`, err);
      setError(`Failed to load component ${componentName}: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setDynamicComponent(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="content-area h-full flex">
      {/* Sidebar */}
      <Sidebar 
        items={componentList} 
        onSelectComponent={handleSelectComponent}
        className="flex-shrink-0"
      />
      
      {/* Component Display Area */}
      <div className="flex-grow p-6 overflow-auto">
        <div className="mb-4">
          {selectedComponent && (
            <h2 className="text-xl font-semibold">
              {selectedComponent}
            </h2>
          )}
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 min-h-[300px] flex items-center justify-center">
          {isLoading ? (
            <div className="text-center">
              <p>Loading component...</p>
            </div>
          ) : error ? (
            <div className="text-center text-red-500">
              <p>{error}</p>
            </div>
          ) : DynamicComponent ? (
            <Suspense fallback={<div>Loading...</div>}>
              <DynamicComponent />
            </Suspense>
          ) : (
            <div className="text-center text-slate-500 dark:text-slate-400">
              <p>Select a component from the sidebar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentArea; 