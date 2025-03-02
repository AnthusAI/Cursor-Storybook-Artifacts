import React from "react";
import { Button } from "./ui/button";
import { useTheme } from "./theme-provider";

export function ThemeToggle(): React.ReactElement {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light")}
      className="rounded-full relative"
    >
      <SunIcon 
        className="h-5 w-5 transition-all absolute inset-0 m-auto opacity-0 data-[active=true]:opacity-100" 
        data-active={theme === "light"} 
      />
      <MoonIcon 
        className="h-5 w-5 transition-all absolute inset-0 m-auto opacity-0 data-[active=true]:opacity-100" 
        data-active={theme === "dark"} 
      />
      <SystemIcon 
        className="h-5 w-5 transition-all absolute inset-0 m-auto opacity-0 data-[active=true]:opacity-100" 
        data-active={theme === "system"} 
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

interface IconProps extends React.SVGProps<SVGSVGElement> {}

function SunIcon(props: IconProps): React.ReactElement {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon(props: IconProps): React.ReactElement {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function SystemIcon(props: IconProps): React.ReactElement {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
} 