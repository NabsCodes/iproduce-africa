import Link from "next/link";
import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/button";
import { EyebrowPill } from "@/components/ui/eyebrow-pill";

export const metadata: Metadata = {
  title: "Article not found",
  description: "The article you're looking for isn't available.",
  robots: { index: false, follow: true },
};

export default function BlogNotFoundPage() {
  return (
    <section className="max-w-8xl mx-auto flex w-full flex-1 items-center px-4 py-12 sm:px-6 sm:py-20 lg:min-h-[70vh] lg:px-8 lg:py-24">
      <div className="border-grey-200 w-full overflow-hidden rounded-xl border bg-white p-6 sm:p-10 lg:p-14">
        <div className="flex flex-col gap-6 sm:gap-7">
          <EyebrowPill tone="leaf">404 — Article not found</EyebrowPill>

          <h1 className="text-foreground font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
            We couldn&apos;t find that article.
          </h1>

          <p className="text-fg-muted max-w-2xl text-base leading-7 sm:text-lg">
            The URL you followed may have moved, been renamed, or never existed.
            Browse the rest of the blog or head back to the Academy hub.
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink
              href="/academy/blog"
              variant="green"
              size="md"
              className="w-full sm:w-auto"
            >
              Browse all articles
            </ButtonLink>
            <ButtonLink
              href="/academy"
              variant="green-soft"
              size="md"
              className="w-full sm:w-auto"
            >
              Back to Academy
            </ButtonLink>
            <ButtonLink
              href="/"
              variant="green-outline"
              size="md"
              className="w-full sm:w-auto"
            >
              Home
            </ButtonLink>
          </div>

          <div className="border-grey-200 mt-4 border-t pt-6">
            <p className="text-fg-subtle text-xs font-medium tracking-[0.18em] uppercase">
              Or jump to
            </p>
            <ul className="mt-3 flex flex-col gap-2 sm:gap-2.5">
              <li>
                <Link
                  href="/community"
                  className="text-foreground hover:text-leaf-700 text-sm font-medium underline-offset-4 transition-colors hover:underline sm:text-base"
                >
                  The Community
                </Link>
              </li>
              <li>
                <Link
                  href="/partners"
                  className="text-foreground hover:text-leaf-700 text-sm font-medium underline-offset-4 transition-colors hover:underline sm:text-base"
                >
                  Partner with us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-foreground hover:text-leaf-700 text-sm font-medium underline-offset-4 transition-colors hover:underline sm:text-base"
                >
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
