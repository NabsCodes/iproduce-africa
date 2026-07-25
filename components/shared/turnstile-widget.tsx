"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useEffect, useRef, useState } from "react";

type TurnstileWidgetProps = {
  siteKey: string;
  onTokenChange: (token: string) => void;
  resetNonce: number;
  size?: "normal" | "compact";
  fallbackEmail?: string;
  tone?: "default" | "dark";
};

export function TurnstileWidget({
  siteKey,
  onTokenChange,
  resetNonce,
  size = "normal",
  fallbackEmail,
  tone = "default",
}: TurnstileWidgetProps) {
  const ref = useRef<TurnstileInstance>(null);
  const previousResetNonceRef = useRef(resetNonce);
  const onTokenChangeRef = useRef(onTokenChange);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    onTokenChangeRef.current = onTokenChange;
  }, [onTokenChange]);

  useEffect(() => {
    if (resetNonce === previousResetNonceRef.current) return;
    previousResetNonceRef.current = resetNonce;
    ref.current?.reset();
    setHasError(false);
    onTokenChangeRef.current("");
  }, [resetNonce]);

  function handleRetry() {
    setHasError(false);
    onTokenChangeRef.current("");
    ref.current?.reset();
  }

  function handleUnavailable() {
    setHasError(true);
    onTokenChangeRef.current("");
  }

  return (
    <>
      {/* Always visible: the widget renders a checkbox/status card so users can
          see and complete verification. An earlier "interaction-only" config
          kept the widget invisible for low-risk visitors, but if the silent
          token had not arrived when they hit Submit they were told to "complete
          verification" with nothing on screen to complete. A visible widget
          makes that state legible and lets Cloudflare still challenge
          higher-risk visitors. */}
      <Turnstile
        ref={ref}
        siteKey={siteKey}
        onSuccess={(token) => {
          setHasError(false);
          onTokenChangeRef.current(token);
        }}
        onExpire={() => onTokenChangeRef.current("")}
        onError={handleUnavailable}
        onTimeout={handleUnavailable}
        onUnsupported={handleUnavailable}
        scriptOptions={{ onError: handleUnavailable }}
        options={{
          theme: tone === "dark" ? "dark" : "light",
          size,
          appearance: "always",
          retry: "auto",
        }}
      />
      {hasError ? (
        <div className="flex flex-col gap-2 text-xs leading-5">
          <p className={tone === "dark" ? "text-rose-300" : "text-destructive"}>
            Verification is having trouble.
          </p>
          <div
            className={
              tone === "dark"
                ? "flex flex-wrap items-center gap-x-2 gap-y-1 text-white/60"
                : "text-fg-muted flex flex-wrap items-center gap-x-2 gap-y-1"
            }
          >
            <button
              type="button"
              onClick={handleRetry}
              className={
                tone === "dark"
                  ? "text-leaf-300 hover:text-leaf-200 font-medium underline underline-offset-2"
                  : "text-forest-700 hover:text-forest-800 font-medium underline underline-offset-2"
              }
            >
              Try again
            </button>
            {fallbackEmail ? (
              <span>
                Or email{" "}
                <a
                  href={`mailto:${fallbackEmail}`}
                  className={
                    tone === "dark"
                      ? "text-leaf-300 hover:text-leaf-200 font-medium underline underline-offset-2"
                      : "text-forest-700 hover:text-forest-800 font-medium underline underline-offset-2"
                  }
                >
                  {fallbackEmail}
                </a>
              </span>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

export function getTurnstileSiteKey(): string | null {
  const key = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
  return key && key.length > 0 ? key : null;
}

export function isTurnstileBypassedLocally(): boolean {
  return !getTurnstileSiteKey() && process.env.NODE_ENV !== "production";
}

export function isTurnstileRequiredInProduction(): boolean {
  return !getTurnstileSiteKey() && process.env.NODE_ENV === "production";
}
