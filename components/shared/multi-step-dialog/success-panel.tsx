"use client";

import { Check } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";

export type MultiStepDialogSuccessStep = {
  title: string;
  description: string;
};

export type MultiStepDialogSuccess = {
  title: string;
  description: string;
  doneLabel: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  nextSteps?: readonly MultiStepDialogSuccessStep[];
};

type MultiStepDialogSuccessPanelProps = {
  title: string;
  success: MultiStepDialogSuccess;
  onDone: () => void;
};

export function MultiStepDialogSuccessPanel({
  title,
  success,
  onDone,
}: MultiStepDialogSuccessPanelProps) {
  const reduce = useReducedMotionSafe();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: reduce ? 0 : 0.28,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex flex-col"
    >
      <div className="border-grey-200 border-b px-5 pt-5 pb-4 sm:px-7 sm:pt-6 sm:pb-5">
        <DialogTitle className="text-foreground pr-10 font-serif text-lg font-semibold sm:text-xl">
          {title}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {success.description}
        </DialogDescription>
      </div>
      <div className="flex flex-col items-center px-5 py-8 text-center sm:px-7 sm:py-10">
        <span
          aria-hidden
          className="border-leaf-300 bg-leaf-100 text-leaf-700 flex size-20 items-center justify-center rounded-full border-2 border-dashed"
        >
          <Check className="size-8" strokeWidth={2.5} />
        </span>
        <h3 className="text-foreground mt-6 font-serif text-xl font-semibold sm:text-2xl">
          {success.title}
        </h3>
        <p className="text-fg-muted mt-3 max-w-full text-sm leading-6 sm:text-base">
          {success.description}
        </p>

        {success.nextSteps && success.nextSteps.length > 0 ? (
          <div className="bg-leaf-50 mt-6 w-full rounded-xl p-5 text-left sm:p-6">
            <ol className="flex flex-col gap-4">
              {success.nextSteps.map((step, index) => (
                <li key={step.title} className="flex gap-3">
                  <span className="border-leaf-400 text-leaf-700 flex size-7 shrink-0 items-center justify-center rounded-full border bg-white text-xs font-semibold">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-foreground text-sm font-semibold">
                      {step.title}
                    </p>
                    <p className="text-fg-muted mt-0.5 text-sm leading-6">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ) : null}

        <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button
            type="button"
            variant="neutral"
            size="sm"
            onClick={onDone}
            className="bg-forest-900 hover:bg-forest-800 h-10 w-full rounded-md px-6 text-sm sm:w-auto sm:px-8"
          >
            {success.doneLabel}
          </Button>
          {success.secondaryHref && success.secondaryLabel ? (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="h-10 w-full px-6 text-sm sm:w-auto sm:px-8"
            >
              <Link href={success.secondaryHref} onClick={onDone}>
                {success.secondaryLabel}
              </Link>
            </Button>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
