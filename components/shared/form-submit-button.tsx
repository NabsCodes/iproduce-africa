"use client";

import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type FormSubmitButtonProps = Omit<ComponentProps<typeof Button>, "children"> & {
  isSubmitting: boolean;
  label: string;
  submittingLabel?: string;
  showArrow?: boolean;
};

export function FormSubmitButton({
  isSubmitting,
  label,
  submittingLabel = "Submitting...",
  showArrow = false,
  disabled,
  ...props
}: FormSubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={disabled ?? isSubmitting}
      aria-busy={isSubmitting}
      {...props}
    >
      {isSubmitting ? <Spinner aria-hidden className="size-4" /> : null}
      {isSubmitting ? submittingLabel : label}
      {showArrow && !isSubmitting ? (
        <ArrowRight className="size-4" aria-hidden />
      ) : null}
    </Button>
  );
}
