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
 * Default width is 400px but can be adjusted by dragging the right edge.
 * Can be completely collapsed by dragging the handle all the way to the left.
 */
export function Sidebar({
  className,
  items,
  onSelectComponent,
  defaultWidth = 400,
  ...props
}: SidebarProps) {
  const [width, setWidth] = useState(defaultWidth);
  const [isDragging, setIsDragging] = useState(false);
  const [lastExpandedWidth, setLastExpandedWidth] = useState(defaultWidth);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Handle mouse down on the resize handle
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    // Only start dragging on mouse move
    const initialX = e.clientX;
    const moveThreshold = 5; // pixels
    
    const handleInitialMove = (moveEvent: MouseEvent) => {
      if (Math.abs(moveEvent.clientX - initialX) > moveThreshold) {
        setIsDragging(true);
        document.removeEventListener('mousemove', handleInitialMove);
      }
    };
    
    document.addEventListener('mousemove', handleInitialMove);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', handleInitialMove);
    }, { once: true });
  };

  // Handle click on the resize handle
  const handleClick = () => {
    if (isDragging) return; // Don't handle click if we were dragging
    
    if (width === 0) {
      // If collapsed, expand to last known width
      setWidth(lastExpandedWidth);
    } else {
      // If expanded, save current width and collapse
      setLastExpandedWidth(width);
      setWidth(0);
    }
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
        "h-full bg-slate-100 dark:bg-slate-900 border-r border-border relative transition-all duration-200",
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold truncate">Components</h2>
          <button
            onClick={() => {
              setLastExpandedWidth(width);
              setWidth(0);
            }}
            className="rounded-full relative w-10 h-10 inline-flex items-center justify-center border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            aria-label="Close sidebar"
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
        <nav className="space-y-1">
          {items.map((item) => (
            <div key={item.name} className="mb-2">
              <button
                onClick={() => onSelectComponent(item.name)}
                className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-accent text-foreground/60 hover:text-foreground truncate"
              >
                {item.name}
              </button>
            </div>
          ))}
        </nav>
      </div>

      {/* Resize Handle */}
      <div
        className="absolute top-0 right-0 w-3 h-full cursor-col-resize hover:bg-accent transition-colors"
        onMouseDown={handleMouseDown}
        onClick={handleClick}
      >
        <div className="absolute top-1/2 right-0 -translate-y-1/2 h-16 w-full flex items-center justify-center">
          <div className="resize-handle-dots flex flex-col items-center justify-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60" />
          </div>
        </div>
      </div>
    </div>
  );
} 