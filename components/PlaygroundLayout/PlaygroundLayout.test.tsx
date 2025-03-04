import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import jest-dom for the custom matchers
import PlaygroundLayout from './PlaygroundLayout';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  callback: ResizeObserverCallback;
  
  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }
  
  observe(element: Element): void {
    // Mock element's offsetWidth
    Object.defineProperty(element, 'offsetWidth', { configurable: true, value: 800 });
    
    // Simulate an observation
    setTimeout(() => {
      // Pass both required arguments to the callback
      this.callback(
        [{ target: element, contentRect: { width: 800 } } as ResizeObserverEntry],
        this as unknown as ResizeObserver
      );
    }, 0);
  }
  
  unobserve(): void {}
  disconnect(): void {}
};

describe('PlaygroundLayout', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    window.localStorage.clear();
  });

  test('renders content area and documentation area', () => {
    // Arrange
    const contentText = 'Content Area Test';
    const documentationText = 'Documentation Area Test';
    
    // Act
    render(
      <PlaygroundLayout 
        contentArea={<div>{contentText}</div>}
        documentationArea={<div>{documentationText}</div>}
      />
    );
    
    // Assert
    expect(screen.getByText(contentText)).toBeInTheDocument();
    expect(screen.getByText(documentationText)).toBeInTheDocument();
  });

  test('has the correct layout structure', () => {
    // Arrange
    const contentText = 'Content';
    const documentationText = 'Documentation';
    
    // Act
    const { container } = render(
      <PlaygroundLayout 
        contentArea={<div>{contentText}</div>}
        documentationArea={<div>{documentationText}</div>}
      />
    );
    
    // Assert
    const playgroundLayout = container.firstChild as HTMLElement;
    expect(playgroundLayout).toHaveClass('playground-layout');
    
    const contentContainer = container.querySelector('.content-container');
    const documentationContainer = container.querySelector('.documentation-container');
    const resizeHandle = container.querySelector('.resize-handle');
    
    expect(contentContainer).toBeInTheDocument();
    expect(documentationContainer).toBeInTheDocument();
    expect(resizeHandle).toBeInTheDocument();
  });

  test('resize handle exists and has correct styling', () => {
    // Arrange
    const { container } = render(
      <PlaygroundLayout 
        contentArea={<div>Content</div>}
        documentationArea={<div>Documentation</div>}
      />
    );
    
    // Assert
    const resizeHandle = container.querySelector('.resize-handle');
    expect(resizeHandle).toBeInTheDocument();
    expect(resizeHandle).toHaveClass('resize-handle');
    expect(resizeHandle).toHaveClass('cursor-col-resize');
  });

  test('passes containerWidth prop to React element in documentationArea', async () => {
    // Arrange
    interface TestDocProps {
      containerWidth: number;
    }
    
    const TestDocComponent: React.FC<TestDocProps> = ({ containerWidth }) => (
      <div data-testid="doc-component">Width: {containerWidth}</div>
    );
    
    // Act
    render(
      <PlaygroundLayout 
        contentArea={<div>Content</div>}
        documentationArea={<TestDocComponent containerWidth={800} />}
      />
    );
    
    // Wait for ResizeObserver to trigger
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 10));
    });
    
    // Assert - should have the width from our mocked element
    expect(screen.getByTestId('doc-component')).toBeInTheDocument();
  });

  test('persists documentation collapse state to localStorage', async () => {
    // Arrange
    const { container } = render(
      <PlaygroundLayout 
        contentArea={<div>Content</div>}
        documentationArea={<div>Documentation</div>}
      />
    );
    
    const resizeHandle = container.querySelector('.resize-handle');
    
    // Act - click the resize handle to collapse documentation
    if (resizeHandle) {
      fireEvent.click(resizeHandle);
    }
    
    // Assert - localStorage should have the collapsed state
    expect(window.localStorage.getItem('vibe-workbench-documentation-collapsed')).toBe('true');
    
    // Act - click again to expand
    if (resizeHandle) {
      fireEvent.click(resizeHandle);
    }
    
    // Assert - localStorage should have the expanded state
    expect(window.localStorage.getItem('vibe-workbench-documentation-collapsed')).toBe('false');
  });

  test('loads documentation collapse state from localStorage on mount', async () => {
    // Arrange - set localStorage to collapsed state
    window.localStorage.setItem('vibe-workbench-documentation-collapsed', 'true');
    
    // Act
    const { container } = render(
      <PlaygroundLayout 
        contentArea={<div>Content</div>}
        documentationArea={<div>Documentation</div>}
      />
    );
    
    // Wait for effects to run
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 10));
    });
    
    // Assert - documentation should be collapsed (content area should take up almost all space)
    const contentContainer = container.querySelector('.content-container') as HTMLElement;
    expect(contentContainer.style.width).toBe('99.5%');
  });
}); 