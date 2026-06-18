import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // General appearance
        "flex h-11 w-full min-w-0 rounded-md border bg-transparent px-3.5 py-2 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium md:text-sm",

        // Borders & colors
        "border-input ring-offset-background placeholder:text-muted-foreground",

        // Focus
        "focus-visible:ring-ring focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:outline-none",

        // Disabled
        "disabled:bg-input/50 dark:disabled:bg-input/80 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",

        // File input
        "file:text-foreground",

        // Invalid/Aria-invalid
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-invalid:ring-2",

        // Dark mode
        "dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",

        className,
      )}
      {...props}
    />
  );
}

export { Input };
