"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
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
  /** Single-step forms — submit only, no back affordance or step counter. */
  singleStep?: boolean;
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
  singleStep = false,
}: MultiStepDialogFooterProps) {
  const isFirstStep = stepIndex === 0;
  const submittingLabel = "Submitting...";

  const advanceClass = cn(
    "h-10 min-w-[5.5rem] rounded-md px-4 text-sm transition-colors sm:min-w-0 sm:px-5",
    isStepValid
      ? "bg-forest-900 text-white hover:bg-forest-800"
      : "bg-leaf-100 text-forest-800 hover:bg-leaf-200",
  );

  function renderSubmitContent(mobileShortLabel: string) {
    return (
      <>
        {isSubmitting ? <Spinner aria-hidden className="size-4" /> : null}
        <span className="hidden sm:inline">
          {isSubmitting ? submittingLabel : submitLabel}
        </span>
        <span className="sm:hidden">{mobileShortLabel}</span>
        {!isSubmitting ? <ArrowRight className="size-4" aria-hidden /> : null}
      </>
    );
  }

  if (singleStep) {
    return (
      <div className="bg-subtle border-grey-200 flex justify-end border-t px-5 py-4 sm:px-7 sm:py-5">
        <Button
          type="button"
          variant="neutral"
          size="sm"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          onClick={onSubmit}
          className={advanceClass}
        >
          {renderSubmitContent("Submit")}
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-subtle border-grey-200 flex items-center justify-between gap-2 border-t px-5 py-4 sm:gap-3 sm:px-7 sm:py-5">
      <div className="shrink-0">
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

      <p
        className={cn(
          "text-fg-subtle min-w-0 flex-1 truncate px-1 text-center text-xs font-medium sm:text-sm",
          totalSteps <= 1 && "sr-only",
        )}
      >
        Step {stepIndex + 1} of {totalSteps}
      </p>

      <div className="shrink-0">
        {isLastStep ? (
          <Button
            type="button"
            variant="neutral"
            size="sm"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            onClick={onSubmit}
            className={advanceClass}
          >
            {renderSubmitContent("Submit")}
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
