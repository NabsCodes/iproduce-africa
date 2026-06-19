"use client";

import Image from "next/image";
import { Handshake, Users } from "lucide-react";
import { SiteCtaButton } from "@/components/shared/site-cta-button";
import { DecorativeRing } from "@/components/ui/decorative-ring";
import { cn } from "@/lib/utils";
import type { CtaSectionContent, CtaSectionIcon } from "@/types/content";

const defaultContent: CtaSectionContent = {
  eyebrow: "Be part of the future",
  title: "Join the Future of African Agriculture",
  descriptionLead:
    "Whether you're an agripreneur building your enterprise or an organisation looking to create lasting agricultural impact — your pathway starts here.",
  description:
    "Join free, connect across borders, and turn conversations into alliances.",
  ctas: [
    {
      label: "Join our community",
      href: "/community",
      variant: "green",
      icon: "users",
      action: "membership-dialog",
    },
    {
      label: "Partner with us",
      href: "/partners",
      variant: "tangerine",
      icon: "handshake",
    },
  ],
};

const ctaIcons: Record<CtaSectionIcon, typeof Users> = {
  users: Users,
  handshake: Handshake,
};

type CtaSectionProps = {
  overlapNext?: boolean;
  content?: CtaSectionContent;
};

export function CtaSection({
  overlapNext = true,
  content = defaultContent,
}: CtaSectionProps) {
  return (
    <section
      className={cn(
        "relative z-10",
        overlapNext
          ? "-mb-28 pb-0 sm:-mb-32 lg:-mb-40"
          : "bg-white py-14 sm:py-16 lg:py-20",
      )}
    >
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="bg-forest-900 relative overflow-clip rounded-xl px-6 py-14 text-center text-white sm:px-10 sm:py-16 lg:px-16 lg:py-[72px]">
          <DecorativeRing
            strokeWidth={10}
            className="text-tangerine-500 -top-12 -right-10 size-[150px] md:hidden"
          />
          <DecorativeRing
            strokeWidth={10}
            className="text-tangerine-500 top-1/2 -left-18 hidden size-[200px] -translate-y-1/2 md:block"
          />
          <DecorativeRing
            strokeWidth={10}
            className="text-leaf-700 top-0 right-0 hidden size-[260px] translate-x-1/2 -translate-y-1/2 md:block"
          />

          <Image
            src="/svgs/sprout.svg"
            alt="Sprout"
            aria-hidden
            width={228}
            height={158}
            unoptimized
            className="pointer-events-none absolute top-6 left-10 hidden w-44 md:block"
          />

          <Image
            src="/svgs/tree.svg"
            alt="Tree"
            aria-hidden
            width={355}
            height={308}
            priority
            unoptimized
            className="pointer-events-none absolute right-12 bottom-4 hidden w-72 md:block"
          />

          <Image
            src="/svgs/tree.svg"
            alt="Tree"
            aria-hidden
            width={355}
            height={308}
            unoptimized
            className="pointer-events-none absolute right-5 -bottom-18 w-36 opacity-25 md:hidden"
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col gap-2 opacity-80 sm:bottom-8 sm:gap-3 lg:bottom-10"
          >
            <Image
              src="/svgs/lines-1.svg"
              alt="Lines"
              width={1312}
              height={19}
              unoptimized
              className="w-full"
            />
            <Image
              src="/svgs/lines-2.svg"
              alt="Lines"
              width={1312}
              height={25}
              unoptimized
              className="w-full"
            />
            <Image
              src="/svgs/lines-3.svg"
              alt="Lines"
              width={1312}
              height={17}
              unoptimized
              className="w-full"
            />
          </div>

          <div className="relative mx-auto max-w-3xl">
            <div className="inline-flex items-center gap-3 py-2">
              <span
                className="bg-leaf-emphasized hidden h-px w-9 sm:block"
                aria-hidden
              />
              <span className="text-leaf-emphasized text-xs font-semibold tracking-[0.18em] uppercase">
                {content.eyebrow}
              </span>
            </div>

            <h2 className="mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
              {content.title}
            </h2>

            {content.descriptionLead ? (
              <p className="mt-4 hidden text-lg leading-7 text-[#dde5da] sm:block">
                {content.descriptionLead}
              </p>
            ) : null}
            <p
              className={cn(
                "text-base leading-6 text-[#dde5da] sm:text-lg sm:leading-7",
                content.descriptionLead ? "mt-4 sm:mt-2" : "mt-4",
              )}
            >
              {content.description}
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              {content.ctas.map((cta) => {
                const Icon = cta.icon ? ctaIcons[cta.icon] : null;

                return (
                  <SiteCtaButton
                    key={cta.href + cta.label}
                    href={cta.href}
                    action={cta.action}
                    variant={cta.variant}
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    {Icon ? <Icon className="hidden size-6 sm:block" /> : null}
                    {cta.label}
                  </SiteCtaButton>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
