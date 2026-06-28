"use client";

import type { Control, FieldValues, Path } from "react-hook-form";
import { useController } from "react-hook-form";

import {
  TurnstileWidget,
  getTurnstileSiteKey,
  isTurnstileRequiredInProduction,
} from "@/components/shared/turnstile-widget";
import { cn } from "@/lib/utils";
import { PUBLIC_FORM_HONEYPOT_FIELD } from "@/schemas/public-form";

type PublicFormSecurityFieldsProps<T extends FieldValues> = {
  control: Control<T>;
  turnstileTokenName?: "turnstileToken";
  resetNonce: number;
  turnstileSize?: "normal" | "compact";
  className?: string;
};

export function PublicFormSecurityFields<T extends FieldValues>({
  control,
  turnstileTokenName = "turnstileToken",
  resetNonce,
  turnstileSize = "normal",
  className,
}: PublicFormSecurityFieldsProps<T>) {
  const { field: honeypotField } = useController({
    control,
    name: PUBLIC_FORM_HONEYPOT_FIELD as Path<T>,
  });
  const { field: turnstileField } = useController({
    control,
    name: turnstileTokenName as Path<T>,
  });

  const siteKey = getTurnstileSiteKey();

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <input
        {...honeypotField}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      {siteKey ? (
        <TurnstileWidget
          siteKey={siteKey}
          resetNonce={resetNonce}
          size={turnstileSize}
          onTokenChange={(token) => turnstileField.onChange(token)}
        />
      ) : null}

      {isTurnstileRequiredInProduction() ? (
        <p className="text-destructive text-sm">
          Verification is temporarily unavailable. Please email us directly for
          now.
        </p>
      ) : null}
    </div>
  );
}
