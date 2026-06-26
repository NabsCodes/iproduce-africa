import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import {
  ContentCard,
  type ContentCardTone,
} from "@/components/shared/content-card";
import { MotionFade } from "@/components/shared/motion/motion-fade";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";

export type LearningListingItem = {
  href: string;
  image: string;
  imageAlt?: string;
  category: string;
  categoryTone?: ContentCardTone;
  meta?: string;
  title: string;
  description?: string;
};

type LearningListingSectionProps = {
  id?: string;
  eyebrow: string;
  title: string;
  items: readonly LearningListingItem[];
  columns?: 3 | 4;
  viewMoreLabel: string;
  viewMoreHref?: string;
  countLabel?: string;
  className?: string;
  headerSlot?: ReactNode;
};

const columnClassByCount: Record<3 | 4, string> = {
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-2 xl:grid-cols-4",
};

export function LearningListingSection({
  id,
  eyebrow,
  title,
  items,
  columns = 3,
  viewMoreLabel,
  viewMoreHref,
  countLabel,
  className,
  headerSlot,
}: LearningListingSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-36 bg-white py-14 sm:py-16 md:scroll-mt-48 lg:scroll-mt-52 lg:py-20",
        className,
      )}
    >
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <MotionFade>
          <div className="max-w-2xl">
            <EyebrowBadge>{eyebrow}</EyebrowBadge>
            <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
              {title}
            </h2>
            {headerSlot}
          </div>

          <div
            className={cn(
              "mt-10 grid gap-5 sm:gap-6 lg:mt-12",
              columnClassByCount[columns],
            )}
          >
            {items.map((item) => (
              <ContentCard
                key={item.title}
                image={item.image}
                imageAlt={item.imageAlt}
                href={item.href}
                category={item.category}
                categoryTone={item.categoryTone}
                meta={item.meta}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-3 sm:mt-12">
            <ViewMoreControl href={viewMoreHref} label={viewMoreLabel} />
            {countLabel ? (
              <p className="text-fg-subtle text-center text-sm">{countLabel}</p>
            ) : null}
          </div>
        </MotionFade>
      </div>
    </section>
  );
}

function ViewMoreControl({ href, label }: { href?: string; label: string }) {
  if (href) {
    return (
      <ButtonLink href={href} variant="neutral-outline" size="md">
        {label}
        <ArrowRight className="size-4" aria-hidden />
      </ButtonLink>
    );
  }

  return (
    <button
      type="button"
      disabled
      data-state="coming-soon"
      className="cursor-not-allowed opacity-70"
    >
      {label}
      <ArrowRight className="size-4" aria-hidden />
    </button>
  );
}
