import React, { useState, useRef, useEffect } from 'react';
import './PlaygroundLayout.css';

/**
 * PlaygroundLayout Component
 * 
 * A two-column layout with a content area on the left and documentation on the right.
 * Uses a flat design with slate backgrounds and content areas.
 * Includes a draggable resize thumb to adjust the panel sizes.
 * The documentation area is responsive and will display content in two columns when wide enough.
 */
const PlaygroundLayout = ({ contentArea, documentationArea }) => {
  // Default left panel width (50%)
  const [leftPanelWidth, setLeftPanelWidth] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [docContainerWidth, setDocContainerWidth] = useState(0);
  const containerRef = useRef(null);
  const dragHandleRef = useRef(null);
  const docContainerRef = useRef(null);

  // Handle mouse down on the drag handle
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Handle mouse move to resize panels
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || !containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const mouseX = e.clientX - containerRect.left;
      
      // Calculate percentage (constrain between 20% and 80%)
      let newLeftPanelWidth = (mouseX / containerWidth) * 100;
      newLeftPanelWidth = Math.max(20, Math.min(80, newLeftPanelWidth));
      
      setLeftPanelWidth(newLeftPanelWidth);
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

  // Track documentation container width for responsive layout
  useEffect(() => {
    if (!docContainerRef.current) return;

    const updateDocWidth = () => {
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
  // This prevents React warnings about passing unknown props to DOM elements
  const documentationWithWidth = React.isValidElement(documentationArea) && 
    typeof documentationArea.type === 'function' ? 
    React.cloneElement(documentationArea, { containerWidth: docContainerWidth }) : 
    documentationArea;

  return (
    <div 
      ref={containerRef}
      className="playground-layout w-full h-full bg-slate-200 dark:bg-slate-800 p-4 rounded-lg flex"
    >
      {/* Content Area (Left Side) */}
      <div 
        className="content-container bg-slate-100 dark:bg-slate-900 rounded-xl p-4 shadow-sm overflow-y-auto"
        style={{ width: `${leftPanelWidth}%` }}
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
        className="documentation-container bg-slate-100 dark:bg-slate-900 rounded-xl p-4 shadow-sm overflow-y-auto"
        style={{ width: `${100 - leftPanelWidth}%` }}
      >
        {documentationWithWidth}
      </div>
    </div>
  );
};

export default PlaygroundLayout; 