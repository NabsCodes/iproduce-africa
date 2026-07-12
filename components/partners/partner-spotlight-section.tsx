"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { PartnerStoryDialog } from "@/components/partners/partner-story-dialog";
import { CatalogueImage } from "@/components/shared/catalogue-image";
import { MotionFade } from "@/components/shared/motion/motion-fade";
import { MotionStagger } from "@/components/shared/motion/motion-stagger";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { partnersPageContent } from "@/content/partners";
import { cn } from "@/lib/utils";
import type { PartnerSpotlightItem } from "@/types/partners";

const INITIAL_VISIBLE = 4;
const PAGE_SIZE = 4;

function PartnerSpotlightCard({
  item,
  viewStoryLabel,
  onOpen,
}: {
  item: PartnerSpotlightItem;
  viewStoryLabel: string;
  onOpen: () => void;
}) {
  const isLogo = item.imageVariant === "logo";

  return (
    <Card className="group border-default hover:border-leaf-300 focus-within:border-leaf-300 h-full min-h-0 flex-col gap-0 overflow-hidden border bg-white p-0 shadow-none ring-0 transition-colors sm:min-h-44 sm:flex-row lg:min-h-48">
      <CatalogueImage
        src={item.image}
        alt={item.imageAlt}
        fit={isLogo ? "contain" : "cover"}
        sizes="(min-width: 1024px) 160px, (min-width: 640px) 128px, 100vw"
        className={cn(
          "aspect-5/3 w-full shrink-0 sm:aspect-square sm:w-32 sm:self-stretch lg:w-40",
          isLogo ? "bg-subtle" : "bg-muted",
        )}
        imageClassName={cn(
          "transition-transform duration-300 group-hover:scale-[1.02]",
          isLogo ? "p-4 sm:p-5" : undefined,
        )}
      />

      <CardContent className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-foreground font-serif text-base font-semibold sm:text-lg">
          {item.name}
        </p>
        <p className="text-fg-subtle mt-1 text-xs sm:text-sm">
          {item.descriptor}
        </p>
        <p className="text-fg-muted mt-3 line-clamp-2 flex-1 text-sm leading-6">
          {item.description}
        </p>
        <div className="mt-auto pt-3">
          <Button
            type="button"
            variant="green-link"
            size="sm"
            aria-haspopup="dialog"
            aria-label={`View partnership story for ${item.name}`}
            onClick={onOpen}
            className="decoration-leaf-700/50 hover:decoration-leaf-700 h-auto p-0 text-sm font-semibold underline underline-offset-4"
          >
            {viewStoryLabel}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function PartnerSpotlightSection() {
  const section = partnersPageContent.spotlight;
  const sorted = [...section.items].sort(
    (a, b) => a.order - b.order,
  ) as PartnerSpotlightItem[];

  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [selected, setSelected] = useState<PartnerSpotlightItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  if (!sorted.length) {
    return null;
  }

  const visibleItems = sorted.slice(0, visibleCount);
  const hasMore = visibleCount < sorted.length;

  function handleOpen(item: PartnerSpotlightItem) {
    setSelected(item);
    setDialogOpen(true);
  }

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <MotionFade>
          <div className="max-w-2xl">
            <EyebrowBadge tone="neutral">{section.eyebrow}</EyebrowBadge>
            <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
              {section.title}
            </h2>
            <p className="text-fg-muted mt-4 text-base leading-7">
              {section.description}
            </p>
          </div>
        </MotionFade>

        <MotionStagger className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5">
          {visibleItems.map((item) => (
            <PartnerSpotlightCard
              key={item.id}
              item={item}
              viewStoryLabel={section.viewStoryLabel}
              onOpen={() => handleOpen(item)}
            />
          ))}
        </MotionStagger>

        {hasMore ? (
          <div className="mt-8 flex justify-center sm:mt-10">
            <Button
              type="button"
              variant="neutral-outline"
              size="md"
              onClick={() =>
                setVisibleCount((current) =>
                  Math.min(current + PAGE_SIZE, sorted.length),
                )
              }
              className="px-6"
            >
              {section.showMoreLabel}
              <ChevronDown className="size-4" />
            </Button>
          </div>
        ) : null}
      </div>

      <PartnerStoryDialog
        partner={selected}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        readMoreLabel={section.readMoreLabel}
        websiteLabel={section.websiteLabel}
      />
    </section>
  );
}
