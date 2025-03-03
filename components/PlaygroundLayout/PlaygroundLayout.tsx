import React, { useState, useRef, useEffect, ReactNode, ReactElement } from 'react';
import './PlaygroundLayout.css';

interface PlaygroundLayoutProps {
  contentArea: ReactNode;
  documentationArea: ReactNode;
}

// Interface for components that can accept containerWidth
interface WithContainerWidth {
  containerWidth?: number;
}

/**
 * PlaygroundLayout Component
 * 
 * A two-column layout with a content area on the left and documentation on the right.
 * Uses a flat design with slate backgrounds and content areas.
 * Includes a draggable resize thumb to adjust the panel sizes.
 * Panels can be completely collapsed by dragging the resize handle to either edge.
 */
const PlaygroundLayout: React.FC<PlaygroundLayoutProps> = ({ contentArea, documentationArea }) => {
  // Default left panel width (50%)
  const [leftPanelWidth, setLeftPanelWidth] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [docContainerWidth, setDocContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);
  const docContainerRef = useRef<HTMLDivElement>(null);

  // Handle mouse down on the drag handle
  const handleMouseDown = (e: React.MouseEvent): void => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Handle mouse move to resize panels
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      if (!isDragging || !containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const mouseX = e.clientX - containerRect.left;
      
      // Calculate percentage (allow full collapse: 0% to 100%)
      let newLeftPanelWidth = (mouseX / containerWidth) * 100;
      newLeftPanelWidth = Math.max(0, Math.min(100, newLeftPanelWidth));
      
      setLeftPanelWidth(newLeftPanelWidth);
    };

    const handleMouseUp = (): void => {
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

  // Track documentation container width for responsive layout
  useEffect(() => {
    if (!docContainerRef.current) return;

    const updateDocWidth = (): void => {
      if (docContainerRef.current) {
        setDocContainerWidth(docContainerRef.current.offsetWidth);
      }
    };

    // Initial measurement
    updateDocWidth();

    // Set up resize observer to detect container width changes
    const resizeObserver = new ResizeObserver(updateDocWidth);
    resizeObserver.observe(docContainerRef.current);

    return () => {
      if (docContainerRef.current) {
        resizeObserver.unobserve(docContainerRef.current);
      }
      resizeObserver.disconnect();
    };
  }, []);

  // Only pass containerWidth prop to React components that can accept it
  const documentationWithWidth = React.isValidElement(documentationArea) && 
    typeof documentationArea.type === 'function' ? 
    React.cloneElement(documentationArea as ReactElement<WithContainerWidth>, { containerWidth: docContainerWidth }) : 
    documentationArea;

  return (
    <div 
      ref={containerRef}
      className="playground-layout w-full h-full bg-slate-200 dark:bg-slate-800 p-2 rounded-lg flex"
    >
      {/* Content Area (Left Side) */}
      <div 
        className="content-container bg-slate-100 dark:bg-slate-900 rounded-xl p-4 shadow-sm overflow-y-auto transition-all duration-200"
        style={{ 
          width: `${leftPanelWidth}%`,
          minWidth: leftPanelWidth === 0 ? 0 : undefined,
          padding: leftPanelWidth === 0 ? 0 : undefined
        }}
      >
        {contentArea}
      </div>

      {/* Resize Handle */}
      <div 
        ref={dragHandleRef}
        className="resize-handle cursor-col-resize"
        onMouseDown={handleMouseDown}
      >
        <div className="resize-handle-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>

      {/* Documentation Area (Right Side) */}
      <div 
        ref={docContainerRef}
        className="documentation-container bg-slate-100 dark:bg-slate-900 rounded-xl p-4 shadow-sm overflow-y-auto transition-all duration-200"
        style={{ 
          width: `${100 - leftPanelWidth}%`,
          minWidth: leftPanelWidth === 100 ? 0 : undefined,
          padding: leftPanelWidth === 100 ? 0 : undefined
        }}
      >
        {documentationWithWidth}
      </div>
    </div>
  );
};

export default PlaygroundLayout; 