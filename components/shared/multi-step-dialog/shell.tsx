"use client";

import type { FormHTMLAttributes, ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import { MultiStepDialogStepper, type MultiStepDialogStep } from "./stepper";
import {
  MultiStepDialogSuccessPanel,
  type MultiStepDialogSuccess,
} from "./success-panel";

type MultiStepDialogShellProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: ReactNode;
  title: string;
  description: string;
  steps: readonly MultiStepDialogStep[];
  stepIndex: number;
  submitted: boolean;
  success?: MultiStepDialogSuccess;
  onSuccessDone?: () => void;
  formProps: FormHTMLAttributes<HTMLFormElement>;
  children: ReactNode;
  footer: ReactNode;
  className?: string;
};

export function MultiStepDialogShell({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  steps,
  stepIndex,
  submitted,
  success,
  onSuccessDone,
  formProps,
  children,
  footer,
  className,
}: MultiStepDialogShellProps) {
  const { className: formClassName, ...restFormProps } = formProps;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent
        className={cn(
          "max-h-[calc(100vh-2rem)] gap-0 overflow-hidden p-0 sm:max-w-[640px]",
          className,
        )}
      >
        {submitted && success ? (
          <MultiStepDialogSuccessPanel
            title={title}
            success={success}
            onDone={onSuccessDone ?? (() => onOpenChange(false))}
          />
        ) : (
          <form
            {...restFormProps}
            className={cn(
              "flex max-h-[calc(100vh-2rem)] flex-col",
              formClassName,
            )}
          >
            <div className="border-grey-200 border-b px-5 pt-5 pb-4 sm:px-7 sm:pt-6 sm:pb-5">
              <DialogTitle className="text-foreground pr-10 font-serif text-lg font-semibold sm:text-xl">
                {title}
              </DialogTitle>
              <DialogDescription className="sr-only">
                {description}
              </DialogDescription>
              <MultiStepDialogStepper steps={steps} stepIndex={stepIndex} />
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-7 sm:py-7">
              {children}
            </div>

            {footer}
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
