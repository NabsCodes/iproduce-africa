"use client";

import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "border-input data-[state=checked]:bg-leaf-600 data-[state=checked]:border-leaf-600 focus-visible:ring-leaf-200 focus-visible:border-leaf-400 peer inline-flex size-[18px] shrink-0 items-center justify-center rounded-[5px] border bg-white transition-colors outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:text-white",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current"
      >
        <Check className="size-3" strokeWidth={3} aria-hidden />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
