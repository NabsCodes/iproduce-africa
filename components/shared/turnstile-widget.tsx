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

function isTurnstileFullyLoaded(): boolean {
  return typeof window.turnstile?.render === "function";
}

function shouldInjectTurnstileScript(): boolean {
  if (typeof window === "undefined") {
    return true;
  }

  return (
    !isTurnstileFullyLoaded() && !document.getElementById(TURNSTILE_SCRIPT_ID)
  );
}

function waitForTurnstile(onReady: () => void): (() => void) | void {
  if (isTurnstileFullyLoaded()) {
    onReady();
    return;
  }

  const existingScript = document.getElementById(TURNSTILE_SCRIPT_ID);
  if (!existingScript) {
    return;
  }

  const handleReady = () => {
    if (isTurnstileFullyLoaded()) {
      onReady();
    }
  };

  existingScript.addEventListener("load", handleReady);

  const pollId = window.setInterval(() => {
    if (isTurnstileFullyLoaded()) {
      window.clearInterval(pollId);
      onReady();
    }
  }, 50);

  return () => {
    existingScript.removeEventListener("load", handleReady);
    window.clearInterval(pollId);
  };
}

type TurnstileWidgetProps = {
  siteKey: string;
  onTokenChange: (token: string) => void;
  resetNonce: number;
  size?: "normal" | "compact";
};

export function TurnstileWidget({
  siteKey,
  onTokenChange,
  resetNonce,
  size = "normal",
}: TurnstileWidgetProps) {
  const widgetContainerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenChangeRef = useRef(onTokenChange);
  const [isScriptReady, setIsScriptReady] = useState(isTurnstileFullyLoaded);
  const [shouldInjectScript] = useState(shouldInjectTurnstileScript);
  const [hasScriptError, setHasScriptError] = useState(false);

  useEffect(() => {
    onTokenChangeRef.current = onTokenChange;
  }, [onTokenChange]);

  useEffect(() => {
    if (isScriptReady) {
      return;
    }

    return waitForTurnstile(() => setIsScriptReady(true));
  }, [isScriptReady]);

  useEffect(() => {
    if (
      !isScriptReady ||
      !window.turnstile ||
      !widgetContainerRef.current ||
      widgetIdRef.current
    ) {
      return;
    }

    widgetIdRef.current = window.turnstile.render(widgetContainerRef.current, {
      sitekey: siteKey,
      callback: (token) => onTokenChangeRef.current(token),
      "expired-callback": () => onTokenChangeRef.current(""),
      "error-callback": () => onTokenChangeRef.current(""),
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
  }, [isScriptReady, siteKey, size]);

  useEffect(() => {
    if (!widgetIdRef.current || !window.turnstile) {
      return;
    }

    window.turnstile.reset(widgetIdRef.current);
    onTokenChangeRef.current("");
  }, [resetNonce]);

  return (
    <>
      {shouldInjectScript ? (
        <Script
          id={TURNSTILE_SCRIPT_ID}
          src={TURNSTILE_SCRIPT_SRC}
          strategy="afterInteractive"
          onReady={() => {
            setIsScriptReady(true);
            setHasScriptError(false);
          }}
          onError={() => {
            setHasScriptError(true);
            onTokenChange("");
          }}
        />
      ) : null}
      <div ref={widgetContainerRef} className="inline-block max-w-full" />
      {hasScriptError ? (
        <p className="text-destructive text-xs">
          Verification failed to load. Refresh and try again.
        </p>
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
