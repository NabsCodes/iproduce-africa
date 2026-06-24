import { ArrowUpRight } from "lucide-react";

import {
  ContentCard,
  type ContentCardTone,
} from "@/components/shared/content-card";
import { MotionFade } from "@/components/shared/motion/motion-fade";
import { MotionStagger } from "@/components/shared/motion/motion-stagger";
import { ButtonLink } from "@/components/ui/button";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import type {
  AcademyRelatedItem,
  AcademyRelatedSectionContent,
} from "@/types/academy";

export type { AcademyRelatedItem } from "@/types/academy";

type AcademyRelatedSectionProps = {
  content: AcademyRelatedSectionContent;
  items: readonly AcademyRelatedItem[];
};

export function AcademyRelatedSection({
  content,
  items,
}: AcademyRelatedSectionProps) {
  const { eyebrow, title, description, viewAllLabel, viewAllHref } = content;
  if (items.length === 0) return null;

  return (
    <>
      <MotionFade className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
        <div className="max-w-2xl">
          <EyebrowBadge>{eyebrow}</EyebrowBadge>
          <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-3xl sm:leading-[40px]">
            {title}
          </h2>
          {description ? (
            <p className="text-fg-muted mt-3 max-w-xl text-base leading-7">
              {description}
            </p>
          ) : null}
        </div>

        <ButtonLink
          href={viewAllHref}
          variant="green-link"
          size="sm"
          className="self-start lg:self-end"
        >
          {viewAllLabel}
          <ArrowUpRight className="size-4" />
        </ButtonLink>
      </MotionFade>

      <MotionStagger className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {items.map((item) => (
          <ContentCard
            key={item.key}
            image={item.image}
            imageAlt={item.imageAlt}
            href={item.href}
            category={item.category}
            categoryTone={item.categoryTone as ContentCardTone | undefined}
            meta={item.meta}
            title={item.title}
            description={item.description}
            className="bg-white"
          />
        ))}
      </MotionStagger>
    </>
  );
}
