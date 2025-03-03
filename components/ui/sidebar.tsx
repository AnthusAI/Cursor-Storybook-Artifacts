import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: {
    name: string;
  }[];
  onSelectComponent: (componentName: string) => void;
  defaultWidth?: number;
}

/**
 * Sidebar Component
 * 
 * A resizable sidebar navigation component that displays a list of components.
 * Default width is 160px but can be adjusted by dragging the right edge.
 * Can be completely collapsed by dragging the handle all the way to the left.
 */
export function Sidebar({
  className,
  items,
  onSelectComponent,
  defaultWidth = 160,
  ...props
}: SidebarProps) {
  const [width, setWidth] = useState(defaultWidth);
  const [isDragging, setIsDragging] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Handle mouse down on the resize handle
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Handle mouse move to resize sidebar
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !sidebarRef.current) return;
      
      const sidebarRect = sidebarRef.current.getBoundingClientRect();
      const newWidth = e.clientX - sidebarRect.left;
      // Allow complete collapse (0px) up to 400px
      setWidth(Math.max(0, Math.min(400, newWidth)));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={sidebarRef}
      className={cn(
        "h-full bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 relative transition-all duration-200",
        className
      )}
      style={{ 
        width: `${width}px`,
        minWidth: width === 0 ? 0 : undefined,
        borderRightWidth: width === 0 ? 0 : undefined
      }}
      {...props}
    >
      <div className="p-4" style={{ opacity: width < 40 ? 0 : 1 }}>
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

      {/* Resize Handle */}
      <div
        className="absolute top-0 right-0 w-3 h-full cursor-col-resize hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        onMouseDown={handleMouseDown}
      >
        <div className="absolute top-1/2 right-0 -translate-y-1/2 h-16 w-full flex items-center justify-center">
          <div className="resize-handle-dots flex flex-col items-center justify-center gap-1">
            <div className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-500" />
            <div className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-500" />
            <div className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-500" />
          </div>
        </div>
      </div>
    </div>
  );
} 