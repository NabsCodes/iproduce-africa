"use client";

import { TriangleAlertIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { Button, ButtonLink } from "@/components/ui/button";
import { EyebrowPill } from "@/components/ui/eyebrow-pill";
import { systemPagesContent } from "@/content/system-pages";

const content = systemPagesContent.error;

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error("[error.tsx]", error);
      return;
    }
    // TODO(telemetry): forward error.digest + error.message to monitoring sink
    // once an observability tool (Sentry / Highlight / Vercel) is selected.
  }, [error]);

  return (
    <section className="max-w-8xl mx-auto flex w-full flex-1 items-center px-4 py-12 sm:px-6 sm:py-20 lg:min-h-[70vh] lg:px-8 lg:py-24">
      <div className="border-grey-200 relative w-full overflow-hidden rounded-xl border bg-white p-6 sm:p-10 lg:p-14">
        <div className="relative flex flex-col gap-6 sm:gap-7">
          <span
            aria-hidden
            className="bg-tangerine-100 text-tangerine-700 flex size-12 items-center justify-center rounded-full"
          >
            <TriangleAlertIcon
              className="text-destructive size-5"
              strokeWidth={2.25}
            />
          </span>

          <EyebrowPill tone="tangerine" className="text-destructive">
            {content.eyebrow}
          </EyebrowPill>

          <h1 className="text-foreground font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
            {content.title}
          </h1>

          <p className="text-fg-muted max-w-2xl text-base leading-7 sm:text-lg">
            {content.description}
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button
              type="button"
              variant="green"
              size="md"
              onClick={reset}
              className="w-full sm:w-auto"
            >
              {content.retryLabel}
            </Button>
            <ButtonLink
              href="/"
              variant="green-soft"
              size="md"
              className="w-full sm:w-auto"
            >
              {content.homeLabel}
            </ButtonLink>
            <Link
              href={content.supportHref}
              className="text-leaf-700 hover:text-leaf-800 text-sm font-medium underline-offset-4 transition-colors hover:underline sm:ml-1"
            >
              {content.supportLabel}
            </Link>
          </div>

          <p className="text-fg-subtle mt-2 text-xs">
            {content.referenceLabel}:{" "}
            {error.digest || content.referenceFallback}
          </p>
        </div>
      </div>
    </section>
  );
}
