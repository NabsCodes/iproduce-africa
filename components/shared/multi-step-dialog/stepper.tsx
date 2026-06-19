"use client";

import { Fragment } from "react";
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
      className="mt-4 flex w-full items-start sm:mt-5"
      aria-label="Form steps"
    >
      {steps.map((step, index) => {
        const isCurrent = index === stepIndex;
        const isComplete = index < stepIndex;
        const isLast = index === steps.length - 1;
        const connectorComplete = index < stepIndex;

        return (
          <Fragment key={step.id}>
            <li
              aria-current={isCurrent ? "step" : undefined}
              className="flex shrink-0 flex-col items-center gap-1.5 sm:gap-2"
            >
              <span
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold transition-colors sm:size-7 sm:text-xs",
                  isComplete && "bg-leaf-500 text-white",
                  isCurrent &&
                    "bg-forest-900 ring-leaf-200 ring-offset-background text-white ring-2 ring-offset-2",
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
                  "max-w-22 text-center text-[11px] leading-tight font-medium transition-colors sm:max-w-none sm:text-sm sm:leading-snug sm:whitespace-nowrap",
                  isCurrent && "text-foreground font-semibold",
                  isComplete && "text-leaf-700",
                  !isCurrent && !isComplete && "text-fg-subtle",
                )}
              >
                {step.label}
              </span>
            </li>

            {!isLast ? (
              <li
                aria-hidden
                className="flex min-w-4 flex-1 items-start pt-3 sm:min-w-8 sm:pt-3.5"
              >
                <span className="bg-grey-200 relative h-0.5 w-full overflow-hidden rounded-full sm:h-[3px]">
                  <span
                    className={cn(
                      "bg-leaf-500 absolute inset-y-0 left-0 rounded-full transition-[width] duration-300 ease-out",
                      connectorComplete ? "w-full" : "w-0",
                    )}
                  />
                </span>
              </li>
            ) : null}
          </Fragment>
        );
      })}
    </ol>
  );
}
