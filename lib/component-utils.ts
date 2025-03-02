// Static list of components
// This list should be updated when new components are added to the project

// Component directories to exclude from the sidebar
const EXCLUDED_COMPONENT_DIRS = ['PlaygroundLayout', 'ContentArea', 'Documentation', 'InspirationResources', 'ui'];

// Regular components (top-level folders in the components directory)
const REGULAR_COMPONENTS = [
  { name: 'HelloWorld' },
  // Add new components here when they are created
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
  
  // Add regular components
  REGULAR_COMPONENTS.forEach(component => {
    if (!EXCLUDED_COMPONENT_DIRS.includes(component.name)) {
      items.push({ name: component.name });
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