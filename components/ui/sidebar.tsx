import React from 'react';
import { cn } from '../../lib/utils';

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: {
    name: string;
  }[];
  onSelectComponent: (componentName: string) => void;
}

/**
 * Sidebar Component
 * 
 * A sidebar navigation component that displays a list of components.
 */
export function Sidebar({
  className,
  items,
  onSelectComponent,
  ...props
}: SidebarProps) {
  return (
    <div
      className={cn(
        "w-64 h-full bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800",
        className
      )}
      {...props}
    >
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Components</h2>
        <nav className="space-y-1">
          {items.map((item) => (
            <div key={item.name} className="mb-2">
              <button
                onClick={() => onSelectComponent(item.name)}
                className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {item.name}
              </button>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
} 