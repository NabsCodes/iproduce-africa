"use client";

import type { FormHTMLAttributes, ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";
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
  const reduce = useReducedMotionSafe();
  const { className: formClassName, ...restFormProps } = formProps;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent
        className={cn(
          "max-h-[calc(100vh-1rem)] max-w-[calc(100vw-0.75rem)] gap-0 overflow-hidden p-0 sm:max-h-[calc(100vh-2rem)] sm:max-w-[640px]",
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
              "flex max-h-[calc(100vh-1rem)] flex-col sm:max-h-[calc(100vh-2rem)]",
              formClassName,
            )}
          >
            <div className="border-grey-200 border-b px-4 pt-5 pb-4 sm:px-7 sm:pt-6 sm:pb-5">
              <DialogTitle className="text-foreground pr-10 font-serif text-lg font-semibold sm:text-xl">
                {title}
              </DialogTitle>
              <DialogDescription className="sr-only">
                {description}
              </DialogDescription>
              {steps.length > 1 ? (
                <MultiStepDialogStepper steps={steps} stepIndex={stepIndex} />
              ) : null}
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-5 pb-8 sm:px-7 sm:py-7 sm:pb-7">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={stepIndex}
                  initial={reduce ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    reduce
                      ? undefined
                      : { opacity: 0, y: -4, transition: { duration: 0.12 } }
                  }
                  transition={{
                    duration: reduce ? 0 : 0.18,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </div>

            {footer}
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
