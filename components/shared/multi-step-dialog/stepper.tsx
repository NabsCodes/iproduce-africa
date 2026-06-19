"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

export type MultiStepDialogStep = {
  id: string;
  label: string;
};

type MultiStepDialogStepperProps = {
  steps: readonly MultiStepDialogStep[];
  stepIndex: number;
};

export function MultiStepDialogStepper({
  steps,
  stepIndex,
}: MultiStepDialogStepperProps) {
  return (
    <ol
      className="mt-4 flex w-full items-center sm:mt-5"
      aria-label="Form steps"
    >
      {steps.map((step, index) => {
        const isCurrent = index === stepIndex;
        const isComplete = index < stepIndex;
        const isLast = index === steps.length - 1;

        return (
          <li
            key={step.id}
            className={cn(
              "flex items-center gap-2 sm:gap-3",
              !isLast && "flex-1",
            )}
          >
            <span
              aria-current={isCurrent ? "step" : undefined}
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold transition-colors sm:size-7 sm:text-xs",
                isComplete && "bg-leaf-500 text-white",
                isCurrent && "bg-forest-900 text-white",
                !isCurrent &&
                  !isComplete &&
                  "border-grey-300 text-fg-subtle border bg-white",
              )}
            >
              {isComplete ? (
                <Check className="size-3.5" strokeWidth={3} aria-hidden />
              ) : (
                index + 1
              )}
            </span>
            <span
              className={cn(
                "hidden text-sm font-medium whitespace-nowrap transition-colors sm:inline",
                isCurrent ? "text-foreground" : "text-fg-subtle",
              )}
            >
              {step.label}
            </span>
            {!isLast ? (
              <span
                aria-hidden
                className={cn(
                  "h-px flex-1 transition-colors",
                  isComplete ? "bg-leaf-500" : "bg-grey-200",
                )}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
