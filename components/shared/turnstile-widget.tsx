"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

const TURNSTILE_SCRIPT_ID = "cloudflare-turnstile-script";
const TURNSTILE_SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "flexible" | "compact";
          appearance?: "always" | "execute" | "interaction-only";
        },
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

function isTurnstileReady(): boolean {
  return typeof window.turnstile?.render === "function";
}

function shouldInjectTurnstileScript(): boolean {
  if (typeof window === "undefined") {
    return true;
  }

  if (isTurnstileReady()) {
    return false;
  }

  return !document.getElementById(TURNSTILE_SCRIPT_ID);
}

type TurnstileWidgetProps = {
  siteKey: string;
  onTokenChange: (token: string) => void;
  resetNonce: number;
  size?: "normal" | "compact";
  fallbackEmail?: string;
  onRetry?: () => void;
};

export function TurnstileWidget({
  siteKey,
  onTokenChange,
  resetNonce,
  size = "normal",
  fallbackEmail,
  onRetry,
}: TurnstileWidgetProps) {
  const widgetContainerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenChangeRef = useRef(onTokenChange);
  const [shouldInjectScript] = useState(shouldInjectTurnstileScript);
  const [scriptReady, setScriptReady] = useState(
    () => typeof window !== "undefined" && isTurnstileReady(),
  );
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    onTokenChangeRef.current = onTokenChange;
  }, [onTokenChange]);

  useEffect(() => {
    if (scriptReady) {
      return;
    }

    const script = document.getElementById(TURNSTILE_SCRIPT_ID);
    if (!script) {
      return;
    }

    const handleLoad = () => {
      if (isTurnstileReady()) {
        setScriptReady(true);
      }
    };

    script.addEventListener("load", handleLoad);
    return () => script.removeEventListener("load", handleLoad);
  }, [scriptReady]);

  useEffect(() => {
    if (
      !scriptReady ||
      hasError ||
      !window.turnstile ||
      !widgetContainerRef.current ||
      widgetIdRef.current
    ) {
      return;
    }

    widgetIdRef.current = window.turnstile.render(widgetContainerRef.current, {
      sitekey: siteKey,
      callback: (token) => {
        setHasError(false);
        onTokenChangeRef.current(token);
      },
      "expired-callback": () => onTokenChangeRef.current(""),
      "error-callback": () => {
        setHasError(true);
        onTokenChangeRef.current("");
      },
      theme: "light",
      size,
      appearance: "interaction-only",
    });

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [hasError, scriptReady, siteKey, size]);

  useEffect(() => {
    if (!widgetIdRef.current || !window.turnstile) {
      return;
    }

    window.turnstile.reset(widgetIdRef.current);
    setHasError(false);
    onTokenChangeRef.current("");
  }, [resetNonce]);

  function handleRetry() {
    setHasError(false);
    onTokenChangeRef.current("");

    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }

    onRetry?.();
  }

  return (
    <>
      {shouldInjectScript ? (
        <Script
          id={TURNSTILE_SCRIPT_ID}
          src={TURNSTILE_SCRIPT_SRC}
          strategy="afterInteractive"
          onReady={() => {
            setScriptReady(true);
            setHasError(false);
          }}
          onError={() => {
            setHasError(true);
            onTokenChange("");
          }}
        />
      ) : null}
      <div
        ref={widgetContainerRef}
        className={hasError ? "hidden" : "inline-block max-w-full"}
      />
      {hasError ? (
        <div className="flex flex-col gap-2 text-xs leading-5">
          <p className="text-destructive">Verification could not load.</p>
          <div className="text-fg-muted flex flex-wrap items-center gap-x-3 gap-y-1">
            <button
              type="button"
              onClick={handleRetry}
              className="text-forest-700 hover:text-forest-800 font-medium underline underline-offset-2"
            >
              Retry verification
            </button>
            {fallbackEmail ? (
              <span>
                Or email{" "}
                <a
                  href={`mailto:${fallbackEmail}`}
                  className="text-forest-700 hover:text-forest-800 font-medium underline underline-offset-2"
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
