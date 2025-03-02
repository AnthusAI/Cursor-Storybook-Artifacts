# Cursor Storybook

## AI-Assisted Component Development

This project creates an environment for AI-assisted component development, similar to systems like [Claude Artifacts](https://support.anthropic.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them), [v0.dev](https://v0.dev), and [bolt.new](https://bolt.new). These platforms connect AI chat sessions with code drafts, turning AI into an assistant that continuously works on code files or multi-file projects.

### How This Project Compares to Other AI Development Platforms

- **Claude Artifacts** displays HTML content, allowing interactive preview and development of HTML components directly within the chat interface.
- **v0.dev** and **bolt.new** offer sophisticated setups for creating functional components using Shadcn UI and React.
- **Cursor Storybook** provides more freedom to create custom structures beyond what's supported by v0.dev or Claude Artifacts. A key advantage is direct connection to Git projects, enabling team collaboration through Git and GitHub.

### Key Benefits of This Approach

- **Component Stability**: Components can be stabilized through unit testing and Storybook interaction testing, which serves as a specification and communicates requirements to developers.
- **Validation**: The unit testing capability provides validation that systems like v0.dev and bolt.new cannot, helping mitigate risks when making changes.
- **Accessibility for Non-Developers**: Even non-developer business users can leverage agile software development practices by taking small, verifiable steps. The framework comes with testing and Git integration pre-configured.
  - **Ready-to-Use Resources**: The setup includes [Lucide icons](https://lucide.dev/icons/) (a comprehensive icon library), [Tailwind colors](https://tailwindcss.com/docs/colors) (a standardized color palette), and [Shadcn UI components](https://ui.shadcn.com/docs/components/accordion) (pre-built UI elements) that can be easily referenced and used without deep technical knowledge.
  - **Visual References**: Business users can directly browse these resources to communicate design preferences and requirements to AI or developers using standardized terminology.
- **Simplified Development**: Development is simplified through Storybook Stories with mock data, allowing focus on frontend components without backend concerns.
- **Component Isolation**: Components can be viewed in isolation, and there's a basic app that loads components from Storybook Stories, starting with a Hello World example.

### Extensibility

The project can be forked to become a production app, potentially adding technologies like Next.js or alternatives to Webpack. The current bare-bones technology stack was chosen for simplicity and mainstream compatibility when integrating components into real applications.

When you're ready to deploy your application to production:
1. Build the application using `npm run build`
2. Deploy the resulting bundle to your preferred hosting provider (AWS, Vercel, Netlify, etc.)
3. Set up CI/CD pipelines to automate the deployment process as needed

This separation between Storybook (development environment) and the application (production product) allows you to develop and test components in isolation before deploying the complete application to users.

### Getting Started

To use this project, simply open it in [Cursor](https://www.cursor.com/en) and communicate with the Cursor agent about desired components. The AI will help you create, test, and document components according to best practices.

---

This is a bare-bones example project for front-end development using [Cursor](https://www.cursor.com/en) for AI-assisted development and [Storybook](https://storybook.js.org) to interactively display React components. The project demonstrates a structured approach to component development with testing.

## Project Overview

This project serves as a template for building React applications with a component-first approach. It leverages Cursor's AI-powered development environment to streamline the development process and enforce best practices through built-in rules. It includes:

- [Cursor](https://www.cursor.com/en) AI for intelligent code assistance and guided development
- [Storybook](https://storybook.js.org) 8 for component development and documentation
- [Shadcn UI](https://ui.shadcn.com) for beautiful, accessible UI components
- [React](https://react.dev) 19 with modern hooks
- [Tailwind CSS](https://tailwindcss.com) for styling
- Webpack 5 for bundling
- [Jest](https://jestjs.io) and React Testing Library for unit testing
- A standardized component structure

## Understanding Storybook vs. The Application

This project uses two different ways to view and work with components:

### What is Storybook?

**Storybook** is a development environment for UI components. It allows you to:
- View each component in isolation (separate from the rest of the app)
- See components in different states by changing their properties
- Interact with components to test their behavior
- Read documentation about how to use each component

Think of Storybook as a "component playground" or "component catalog" where you can see all the available components and how they work individually.

### What is the Application?

**The Application** is the actual web app that users will see. It:
- Combines multiple components together into a complete interface
- Shows how components work together in a real-world context
- Represents the final product that users will interact with
- Can be deployed to hosting providers like AWS, Vercel, Netlify, or similar platforms as your production application

The application imports components from the `components` directory and assembles them into a complete user interface.

### Development Workflow

The recommended workflow is:
1. First, build and test individual components in Storybook
2. Then, assemble those components into the full application

This approach helps ensure that each component works correctly on its own before being integrated into the larger application.

## Project Structure

The project follows a simplified organization:

```
cursor-storybook/
├── __mocks__/                  # Jest mocks
│   └── styleMock.js            # Mock for CSS imports in tests
├── components/                 # All components
│   ├── ui/                     # Shadcn UI components
│   │   ├── button.jsx          # Button component
│   │   ├── card.jsx            # Card component
│   │   └── ...                 # Other UI components
│   └── ComponentName/          # Each component in its own directory
│       ├── ComponentName.jsx         # The React component
│       ├── ComponentName.css         # Component-specific styles
│       ├── ComponentName.stories.jsx # Storybook stories
│       └── ComponentName.test.jsx    # Unit tests
├── lib/                        # Utility functions
│   └── utils.js                # Utility functions for Shadcn UI
├── src/
│   ├── index.js                # Main application entry point
│   ├── index.html              # HTML template
│   └── globals.css             # Global styles and Tailwind directives
├── .storybook/                 # Storybook configuration
├── .cursor/                    # Cursor AI rules and instructions
│   └── rules/                  # Development process rules for AI assistance
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── jest.config.js              # Jest configuration
├── jest.setup.js               # Jest setup file
├── webpack.config.js           # Webpack configuration
├── package.json                # Project dependencies and scripts
└── README.md                   # Project documentation
```

Each component follows a standard structure:

```
ComponentName/
├── ComponentName.jsx           # The React component
├── ComponentName.css           # Component-specific styles
├── ComponentName.stories.jsx   # Storybook stories for the component
└── ComponentName.test.jsx      # Unit tests for the component
```

## Development Philosophy

This project structure encourages:

1. **Component-First Development**: Build isolated, reusable components before assembling them into pages or features.
2. **Visual Testing**: Use Storybook to visually test components in isolation, ensuring they look and behave correctly in various states.
3. **Test-Driven Development**: Write tests to ensure component functionality and prevent regressions.
4. **Documentation as Code**: Document components through Storybook stories, making documentation a natural part of the development process.

Creating tests for components using Storybook interaction tests and JavaScript unit tests is highly recommended, as that's the way to turn a functional prototype into a specification that is codified in a stable way over time.

## Example Component: HelloWorld

The project includes a simple HelloWorld component that demonstrates the basic structure:

- **HelloWorld.jsx**: A React component that displays a card with a greeting and a button to change the greeting. It uses Shadcn UI's Card and Button components.
- **HelloWorld.css**: Styles for the component (though most styling comes from Tailwind CSS and Shadcn UI).
- **HelloWorld.stories.jsx**: Storybook stories showing the component in different states.
- **HelloWorld.test.jsx**: Tests that verify the component renders correctly and responds to user interactions.

This component demonstrates how to use Shadcn UI components within your own custom components.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd cursor-storybook
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Development

1. **Start Storybook** to develop and view components in isolation:
   ```
   npm run storybook
   ```
   This will open Storybook in your browser at http://localhost:6006.
   
   In Storybook, you'll see a list of all available components on the left side. Click on a component to view it and its documentation. You can interact with the component and see how it behaves with different properties.

2. **Run the application** to see how components work together:
   ```
   npm start
   ```
   This will start the application at http://localhost:3000.
   
   The application shows how components are assembled into a complete user interface. It imports components from the `components` directory and renders them together.

3. Run tests:
   ```
   npm test
   ```

4. Build for production:
   ```
   npm run build
   ```
   This will create a production-ready build in the `dist` directory.

## How the Application Works

The application is structured as follows:

1. **Entry Point**: `src/index.js` is the main entry point that renders the App component.

2. **App Component**: The App component in `src/index.js` serves as the main container for the application. It:
   - Provides the overall layout (header, main content, footer)
   - Imports and renders components from the `components` directory
   - Applies global styles from `src/styles.css`

3. **Components**: Individual UI components live in the `components` directory. Each component:
   - Is self-contained with its own styles, tests, and stories
   - Can be imported and used in the App component
   - Can be viewed and tested in isolation using Storybook

When you add a new component to the `components` directory, you can:
1. Develop and test it in isolation using Storybook
2. Import it into the App component to use it in the application

## Creating a New Component

To create a new component, follow these steps:

1. Create a new directory in `components` with the name of your component.
2. Create the following files in the directory:
   - `ComponentName.jsx`: The React component
   - `ComponentName.css`: Component-specific styles
   - `ComponentName.stories.jsx`: Storybook stories
   - `ComponentName.test.jsx`: Unit tests

3. Follow the pattern established by the HelloWorld component.

4. Import and use your component in the App component in `src/index.js`.

## Testing

The project uses Jest and React Testing Library for testing. Tests are located alongside the components they test.

To run tests:

```
npm test
```

### Writing Tests

When writing tests, focus on:

1. Testing component rendering
2. Testing user interactions
3. Testing state changes
4. Testing props handling

Example:

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import MyComponent from './MyComponent';

test('renders correctly', () => {
  render(<MyComponent />);
  expect(screen.getByText('Expected Text')).toBeInTheDocument();
});

test('responds to user interaction', () => {
  render(<MyComponent />);
  fireEvent.click(screen.getByRole('button'));
  expect(screen.getByText('New Text')).toBeInTheDocument();
});
```

## Storybook

Storybook is used for developing and documenting components in isolation.

To run Storybook:

```
npm run storybook
```

### Writing Stories

When writing stories, focus on:

1. Showing the component in different states
2. Documenting the component's props
3. Providing examples of how to use the component

Example:

```jsx
import MyComponent from './MyComponent';

export default {
  title: 'Components/MyComponent',
  component: MyComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary'] },
  },
};

export const Default = {
  args: {
    label: 'Default Button',
  },
};

export const Primary = {
  args: {
    label: 'Primary Button',
    variant: 'primary',
  },
};
```

## Technologies Used

- **[Storybook](https://storybook.js.org)**: A tool for developing UI components in isolation, enabling component-driven development
- **[Shadcn UI](https://ui.shadcn.com)**: A collection of beautifully designed, accessible UI components built with Tailwind CSS
- **[Cursor](https://www.cursor.com/en)**: An AI-powered code editor that enhances developer productivity with intelligent assistance
- **[React](https://react.dev)**: A JavaScript library for building user interfaces
- **[Tailwind CSS](https://tailwindcss.com)**: A utility-first CSS framework for rapidly building custom designs
- **Webpack**: A module bundler for JavaScript applications
- **[Jest](https://jestjs.io)**: A JavaScript testing framework
- **React Testing Library**: A testing utility for React components
- **Babel**: A JavaScript compiler

### Cursor Rules

This project uses Cursor's rules files (in the `.cursor/` directory) to help less-experienced developers follow best practices and a repeatable process for component development. These rules provide:

- Guidance on component structure and organization
- Standardized processes for creating new components
- Reminders about testing and documentation requirements
- Best practices for maintaining code quality

The rules help ensure consistency across the codebase and make it easier for new developers to contribute effectively to the project.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## UI Component System: Shadcn UI

This project uses [Shadcn UI](https://ui.shadcn.com/), a collection of re-usable components built with [Tailwind CSS](https://tailwindcss.com/) and Radix UI. Shadcn UI provides:

- Beautiful, accessible UI components
- Customizable components that you own and can modify
- A consistent design system
- Dark mode support

### How Shadcn UI Works

Unlike traditional component libraries, Shadcn UI is not installed as a dependency. Instead, you copy and paste the components you need into your project. This gives you complete ownership of the code and allows you to customize the components to fit your needs.

The components are built with:

- [Tailwind CSS](https://tailwindcss.com/) for styling
  - Browse the [Tailwind color palette](https://tailwindcss.com/docs/colors) to reference specific colors in your designs
- [class-variance-authority](https://cva.style/docs) for creating component variants
- [clsx](https://github.com/lukeed/clsx) for conditionally applying classes
- [tailwind-merge](https://github.com/dcastil/tailwind-merge) for merging Tailwind CSS classes
- [Lucide](https://lucide.dev) for beautiful, consistent icons
  - Browse the [complete icon library](https://lucide.dev/icons/) to find icons for your components

### Using Shadcn UI Components

The project includes several Shadcn UI components in the `components/ui` directory. To use these components:

1. Import the component in your React file:
   ```jsx
   import { Button } from '../ui/button';
   ```

2. Use the component in your JSX:
   ```jsx
   <Button variant="outline">Click me</Button>
   ```

3. Refer to the component's file or the [Shadcn UI documentation](https://ui.shadcn.com/docs/components/accordion) for available props and variants.

### Resources for Non-Technical Users

If you're a business user or designer working with developers or AI assistants:

- Use the [Shadcn UI Components Gallery](https://ui.shadcn.com/docs/components/accordion) to browse available component types
- Reference the [Tailwind Color Palette](https://tailwindcss.com/docs/colors) when discussing color choices
- Browse the [Lucide Icon Library](https://lucide.dev/icons/) to select icons for your components

These resources provide a common visual language that helps non-technical users communicate design requirements effectively. 