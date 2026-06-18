import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-fg-subtle focus-visible:border-leaf-400 focus-visible:ring-leaf-200 aria-invalid:border-destructive aria-invalid:ring-destructive/20 flex min-h-[120px] w-full rounded-md border bg-white px-3.5 py-3 text-sm leading-6 transition-colors outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
