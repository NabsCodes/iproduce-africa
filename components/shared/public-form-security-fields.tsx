"use client";

import type { Control, FieldValues, Path } from "react-hook-form";
import { useController } from "react-hook-form";

import {
  getTurnstileSiteKey,
  isTurnstileRequiredInProduction,
  TurnstileWidget,
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
  tone?: "default" | "dark";
};

export function PublicFormSecurityFields<T extends FieldValues>({
  control,
  turnstileTokenName = "turnstileToken",
  resetNonce,
  turnstileSize = "normal",
  className,
  onTurnstileRetry,
  tone = "default",
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
            tone={tone}
          />
          <p
            className={cn(
              "text-xs leading-5",
              tone === "dark" ? "text-white/50" : "text-fg-muted",
            )}
          >
            Protected by Cloudflare Turnstile.{" "}
            <a
              href="https://www.cloudflare.com/privacypolicy/"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "underline underline-offset-2 transition-colors",
                tone === "dark" && "hover:text-white/80",
              )}
            >
              Privacy
            </a>{" "}
            ·{" "}
            <a
              href="https://www.cloudflare.com/website-terms/"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "underline underline-offset-2 transition-colors",
                tone === "dark" && "hover:text-white/80",
              )}
            >
              Terms
            </a>
          </p>
        </>
      ) : null}

      {isTurnstileRequiredInProduction() ? (
        <p
          className={cn(
            "text-sm",
            tone === "dark" ? "text-rose-300" : "text-destructive",
          )}
        >
          Verification is temporarily unavailable. Please email us at{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className={cn(
              "font-medium underline underline-offset-2",
              tone === "dark" ? "text-leaf-300" : "text-forest-700",
            )}
          >
            {siteConfig.email}
          </a>
          .
        </p>
      ) : null}
    </div>
  );
}
