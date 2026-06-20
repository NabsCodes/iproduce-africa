"use client";

import { TriangleAlertIcon } from "lucide-react";

import { systemPagesContent } from "@/content/system-pages";

// Brand hex values mirror the tokens in app/globals.css. They live inline
// because global-error renders when the root layout (which imports
// globals.css and sets up next/font variables) has crashed — we can't
// trust Tailwind or the brand fonts loaded. Keep these in sync when the
// palette changes.
const COLORS = {
  background: "#f7f9f5",
  surface: "#ffffff",
  border: "#e5e7eb",
  text: "#0f1d12",
  muted: "#516057",
  subtle: "#8a978f",
  link: "#1f6b3a",
  tangerineSurface: "#fef3e6",
  destructive: "#dc2626",
};

const SANS_STACK =
  "'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
const SERIF_STACK = "'Fraunces', Georgia, 'Times New Roman', serif";

const content = systemPagesContent.globalError;

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          padding: "16px",
          fontFamily: SANS_STACK,
          backgroundColor: COLORS.background,
          color: COLORS.text,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <main
          style={{
            width: "100%",
            maxWidth: 720,
            backgroundColor: COLORS.surface,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 12,
            padding: "24px",
            boxSizing: "border-box",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <span
              aria-hidden
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 48,
                height: 48,
                borderRadius: 9999,
                backgroundColor: COLORS.tangerineSurface,
              }}
            >
              <TriangleAlertIcon
                width={20}
                height={20}
                strokeWidth={2.25}
                color={COLORS.destructive}
              />
            </span>

            <span
              style={{
                display: "inline-flex",
                alignSelf: "flex-start",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                borderRadius: 9999,
                backgroundColor: COLORS.tangerineSurface,
                color: COLORS.destructive,
                fontSize: "0.8125rem",
                fontWeight: 600,
                letterSpacing: "0.01em",
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 9999,
                  backgroundColor: COLORS.destructive,
                }}
              />
              {content.eyebrow}
            </span>

            <h1
              style={{
                margin: 0,
                fontFamily: SERIF_STACK,
                fontSize: "clamp(1.875rem, 4vw, 2.75rem)",
                lineHeight: 1.15,
                fontWeight: 600,
                color: COLORS.text,
              }}
            >
              {content.title}
            </h1>

            <p
              style={{
                margin: 0,
                maxWidth: "42rem",
                fontSize: "1rem",
                lineHeight: 1.7,
                color: COLORS.muted,
              }}
            >
              {content.body}{" "}
              <a
                href={`mailto:${content.supportEmail}`}
                style={{
                  color: COLORS.link,
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                {content.supportEmail}
              </a>
              .
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                marginTop: 4,
              }}
            >
              <button
                type="button"
                onClick={reset}
                style={{
                  appearance: "none",
                  border: 0,
                  borderRadius: 8,
                  padding: "12px 22px",
                  fontSize: "0.9375rem",
                  fontWeight: 500,
                  fontFamily: "inherit",
                  backgroundColor: COLORS.text,
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                {content.retryLabel}
              </button>
              {/*
                Intentionally a plain <a>, not next/link. A crashed root
                layout means the App Router context can't be trusted —
                hard-navigating with a full page reload is the safer
                recovery path here.
              */}
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a
                href="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  borderRadius: 8,
                  padding: "12px 22px",
                  fontSize: "0.9375rem",
                  fontWeight: 500,
                  border: `1px solid ${COLORS.border}`,
                  backgroundColor: COLORS.surface,
                  color: COLORS.text,
                  textDecoration: "none",
                }}
              >
                {content.homeLabel}
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
