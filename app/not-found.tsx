import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { EyebrowPill } from "@/components/ui/eyebrow-pill";
import { systemPagesContent } from "@/content/system-pages";

const content = systemPagesContent.notFound;

export const metadata: Metadata = {
  title: "Page not found",
  description: content.description,
  robots: { index: false, follow: true },
};

export default function NotFoundPage() {
  return (
    <section className="max-w-8xl mx-auto flex w-full flex-1 items-center px-4 py-12 sm:px-6 sm:py-20 lg:min-h-[70vh] lg:px-8 lg:py-24">
      <div className="border-grey-200 relative w-full overflow-hidden rounded-xl border bg-white p-6 sm:p-10 lg:p-14">
        <div
          aria-hidden
          className="pointer-events-none absolute top-6 right-6 hidden lg:block xl:right-10"
        >
          <Image
            src="/svgs/logo-mark.svg"
            alt=""
            width={260}
            height={260}
            unoptimized
            className="opacity-30"
          />
        </div>

        <div className="relative flex flex-col gap-6 sm:gap-7">
          <span
            aria-hidden
            className="bg-leaf-100 flex size-12 items-center justify-center rounded-xl"
          >
            <Image
              src="/svgs/logo-mark.svg"
              alt=""
              width={28}
              height={28}
              priority
              unoptimized
            />
          </span>

          <EyebrowPill tone="leaf">{content.eyebrow}</EyebrowPill>

          <h1 className="text-foreground font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
            {content.title}
          </h1>

          <p className="text-fg-muted max-w-2xl text-base leading-7 sm:text-lg">
            {content.description}
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {content.ctas.map((cta) => (
              <ButtonLink
                key={cta.href}
                href={cta.href}
                variant={cta.variant}
                size="md"
                className="w-full sm:w-auto"
              >
                {cta.label}
              </ButtonLink>
            ))}
          </div>

          <div className="border-grey-200 mt-4 border-t pt-6">
            <p className="text-fg-subtle text-xs font-medium tracking-[0.18em] uppercase">
              {content.popularEyebrow}
            </p>
            <ul className="mt-3 flex flex-col gap-2 sm:gap-2.5">
              {content.popularLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground hover:text-leaf-700 text-sm font-medium underline-offset-4 transition-colors hover:underline sm:text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
