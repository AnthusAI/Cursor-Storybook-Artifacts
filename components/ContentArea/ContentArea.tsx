import React from 'react';
import './ContentArea.css';

/**
 * ContentArea Component
 * 
 * A placeholder component for the left side of the playground layout.
 * This will be where interactive content is displayed.
 */
const ContentArea: React.FC = () => {
  return (
    <div className="content-area h-full flex flex-col items-center justify-center">
      <div className="text-center max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Interactive Content Area</h2>
        <p className="mb-6 text-slate-600 dark:text-slate-400">
          This is where your interactive components will be displayed. You can modify this area to showcase your custom components.
        </p>
        <div className="p-6 border border-dashed border-slate-300 dark:border-slate-600 rounded-lg">
          <p className="text-slate-500 dark:text-slate-400">
            Your component will appear here
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContentArea; 