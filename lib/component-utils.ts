import fs from 'fs';
import path from 'path';

// Component directories to exclude from the sidebar
const EXCLUDED_COMPONENT_DIRS = [
  'PlaygroundLayout',
  'ContentArea',
  'Documentation',
  'InspirationResources',
  'ui'
];

// Type declaration for Webpack's require.context
declare const require: {
  context: (directory: string, useSubdirectories: boolean, regExp: RegExp) => {
    keys(): string[];
    (id: string): any;
    resolve(id: string): string;
    id: string;
  };
};

/**
 * Get a list of component directories from the components folder
 * This returns a structured list of components.
 */
export function getComponentList() {
  const items: {
    name: string;
    children?: { name: string }[];
  }[] = [];
  
  try {
    // Use Webpack's require.context to get all component files
    const componentContext = require.context('../components', true, /\.tsx$/);
    
    // Get all component paths
    const componentPaths = componentContext.keys();
    
    // Extract unique component names from paths
    const componentNames = new Set<string>();
    componentPaths.forEach((path: string) => {
      // Extract component name from path (e.g., './ComponentName/ComponentName.tsx')
      const match = path.match(/\.\/([^/]+)\/\1\.tsx$/);
      if (match) {
        const componentName = match[1];
        if (!EXCLUDED_COMPONENT_DIRS.includes(componentName)) {
          componentNames.add(componentName);
        }
      }
    });
    
    // Convert to array and sort
    return Array.from(componentNames)
      .map(name => ({ name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error discovering components:', error);
    return [];
  }
}

/**
 * Get the component import path based on the component name
 */
export function getComponentImportPath(componentName: string) {
  return `../components/${componentName}/${componentName}`;
} 