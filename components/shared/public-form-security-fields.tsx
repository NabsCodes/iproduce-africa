"use client";

import type { Control, FieldValues, Path } from "react-hook-form";
import { useController } from "react-hook-form";

import {
  TurnstileWidget,
  getTurnstileSiteKey,
  isTurnstileRequiredInProduction,
} from "@/components/shared/turnstile-widget";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";
import { PUBLIC_FORM_HONEYPOT_FIELD } from "@/schemas/public-form";

type PublicFormSecurityFieldsProps<T extends FieldValues> = {
  control: Control<T>;
  turnstileTokenName?: "turnstileToken";
  resetNonce: number;
  turnstileSize?: "normal" | "compact";
  className?: string;
  onTurnstileRetry?: () => void;
};

export function PublicFormSecurityFields<T extends FieldValues>({
  control,
  turnstileTokenName = "turnstileToken",
  resetNonce,
  turnstileSize = "normal",
  className,
  onTurnstileRetry,
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
        <>
          <TurnstileWidget
            siteKey={siteKey}
            resetNonce={resetNonce}
            size={turnstileSize}
            fallbackEmail={siteConfig.email}
            onRetry={onTurnstileRetry}
            onTokenChange={(token) => turnstileField.onChange(token)}
          />
          <p className="text-fg-muted text-xs leading-5">
            Protected by Cloudflare Turnstile.{" "}
            <a
              href="https://www.cloudflare.com/privacypolicy/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              Privacy
            </a>{" "}
            ·{" "}
            <a
              href="https://www.cloudflare.com/website-terms/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              Terms
            </a>
          </p>
        </>
      ) : null}

      {isTurnstileRequiredInProduction() ? (
        <p className="text-destructive text-sm">
          Verification is temporarily unavailable. Please email us at{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-forest-700 font-medium underline underline-offset-2"
          >
            {siteConfig.email}
          </a>
          .
        </p>
      ) : null}
    </div>
  );
}
