"use client";

import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";

export type MultiStepDialogSuccess = {
  title: string;
  description: string;
  doneLabel: string;
  secondaryLabel?: string;
  secondaryHref?: string;
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
  return (
    <div className="flex flex-col">
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
        <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button
            type="button"
            variant="neutral"
            size="sm"
            onClick={onDone}
            className="bg-forest-900 hover:bg-forest-800 h-10 rounded-md px-6 text-sm sm:px-8"
          >
            {success.doneLabel}
          </Button>
          {success.secondaryHref && success.secondaryLabel ? (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="h-10 px-6 text-sm sm:px-8"
            >
              <Link href={success.secondaryHref} onClick={onDone}>
                {success.secondaryLabel}
              </Link>
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
