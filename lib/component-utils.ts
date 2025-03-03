import fs from 'fs';
import path from 'path';

// Static list of components
// This list should be updated when new components are added to the project

// Component directories to exclude from the sidebar
const EXCLUDED_COMPONENT_DIRS = [
  'PlaygroundLayout',
  'ContentArea',
  'Documentation',
  'InspirationResources',
  'ui'
];

// This list is automatically generated during build time
// The actual components will be discovered through webpack's require.context
const AVAILABLE_COMPONENTS = [
  'HelloWorld',
  'PaymentDashboard'
];

/**
 * Get a list of component directories from the components folder
 * This returns a structured list of components.
 */
export function getComponentList() {
  const items: {
    name: string;
    children?: { name: string }[];
  }[] = [];
  
  // Filter out excluded directories and add remaining ones to the list
  AVAILABLE_COMPONENTS.forEach(dir => {
    if (!EXCLUDED_COMPONENT_DIRS.includes(dir)) {
      items.push({ name: dir });
    }
  });
  
  // Sort items alphabetically
  return items.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get the component import path based on the component name
 */
export function getComponentImportPath(componentName: string) {
  return `../components/${componentName}/${componentName}`;
} 