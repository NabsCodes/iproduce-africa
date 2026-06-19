"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MultiStepDialogFooterProps = {
  stepIndex: number;
  totalSteps: number;
  isLastStep: boolean;
  isStepValid: boolean;
  isSubmitting: boolean;
  backLabel: string;
  continueLabel: string;
  submitLabel: string;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
};

export function MultiStepDialogFooter({
  stepIndex,
  totalSteps,
  isLastStep,
  isStepValid,
  isSubmitting,
  backLabel,
  continueLabel,
  submitLabel,
  onBack,
  onNext,
  onSubmit,
}: MultiStepDialogFooterProps) {
  const isFirstStep = stepIndex === 0;
  const submittingLabel = "Submitting...";

  const advanceClass = cn(
    "h-10 rounded-md px-4 text-sm transition-colors sm:px-5",
    isStepValid
      ? "bg-forest-900 text-white hover:bg-forest-800"
      : "bg-leaf-100 text-forest-800 hover:bg-leaf-200",
  );

  return (
    <div className="bg-subtle border-grey-200 grid grid-cols-3 items-center gap-3 border-t px-5 py-4 sm:px-7 sm:py-5">
      <div className="justify-self-start">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onBack}
          tabIndex={isFirstStep ? -1 : 0}
          aria-hidden={isFirstStep || undefined}
          className={cn(
            "h-10 rounded-md px-3 text-sm sm:px-4",
            isFirstStep && "pointer-events-none invisible",
          )}
        >
          <ArrowLeft className="size-4" />
          <span className="hidden sm:inline">{backLabel}</span>
        </Button>
      </div>

      <p className="text-fg-subtle justify-self-center text-center text-xs font-medium sm:text-sm">
        Step {stepIndex + 1} of {totalSteps}
      </p>

      <div className="justify-self-end">
        {isLastStep ? (
          <Button
            type="button"
            variant="neutral"
            size="sm"
            disabled={isSubmitting || !isStepValid}
            onClick={onSubmit}
            className={advanceClass}
          >
            <span className="hidden sm:inline">
              {isSubmitting ? submittingLabel : submitLabel}
            </span>
            <span className="sm:hidden">
              {isSubmitting ? submittingLabel : "Submit"}
            </span>
            <ArrowRight className="size-4" />
          </Button>
        ) : (
          <Button
            type="button"
            variant="neutral"
            size="sm"
            onClick={onNext}
            className={advanceClass}
          >
            {continueLabel}
            <ArrowRight className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
