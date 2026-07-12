import { Quote } from "lucide-react";

import { VoicesLogoGrid } from "@/components/partners/voices-logo-grid";
import { MotionFade } from "@/components/shared/motion/motion-fade";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/carousel";
import { DecorativeRing } from "@/components/ui/decorative-ring";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { partnersPageContent } from "@/content/partners";
import { cn } from "@/lib/utils";
import type { TestimonialItem } from "@/types/content";
import type { Partner } from "@/types/partners";

type VoicesSectionProps = {
  voices: readonly TestimonialItem[];
  partners: readonly Partner[];
};

export function VoicesSection({ voices, partners }: VoicesSectionProps) {
  const section = partnersPageContent.voices;
  const hasVoices = voices.length > 0;
  const hasLogos = partners.length > 0;
  // Two columns only when both collections have content — either one alone
  // gets the full-width, centered single-column treatment instead of a
  // blank column next to it.
  const twoColumn = hasVoices && hasLogos;

  return (
    <section className="bg-subtle relative overflow-clip py-14 sm:py-16 lg:py-20">
      <DecorativeRing
        strokeWidth={5}
        className="text-tangerine-300 top-0 right-0 hidden size-[320px] translate-x-[60%] -translate-y-1/2 md:block xl:size-[380px]"
      />
      <div className="max-w-8xl relative mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div
          className={cn(
            "grid gap-10 lg:items-start lg:gap-14",
            twoColumn ? "lg:grid-cols-[1.05fr_1fr]" : "lg:grid-cols-1",
          )}
        >
          <div
            className={cn("min-w-0", !twoColumn && "mx-auto w-full max-w-2xl")}
          >
            <MotionFade>
              <EyebrowBadge>{section.eyebrow}</EyebrowBadge>
              <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
                {section.title}
              </h2>
            </MotionFade>

            {hasVoices ? (
              <MotionFade delay={0.08}>
                <Carousel className="mt-8" aria-label="Partner testimonials">
                  <CarouselContent>
                    {voices.map((item) => (
                      <CarouselItem key={item.name} className="basis-full">
                        <article className="elevation-1 relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-md bg-white p-5 sm:p-9">
                          <Quote
                            className="text-fg-subtle/5 pointer-events-none absolute top-5 left-5 size-14 -rotate-180 sm:top-6 sm:left-6 sm:size-16"
                            aria-hidden
                          />
                          <Quote
                            className="text-fg-subtle/15 pointer-events-none absolute right-5 bottom-5 size-14 sm:right-6 sm:bottom-6 sm:size-16"
                            aria-hidden
                          />
                          <p className="text-foreground relative flex-1 pt-10 font-serif text-lg leading-[1.65] sm:pt-12 sm:text-xl">
                            {item.quote}
                          </p>
                          <div className="relative mt-6 sm:mt-8">
                            <p className="text-foreground font-serif text-base font-semibold">
                              {item.name}
                            </p>
                            <p className="text-fg-muted mt-1 text-sm">
                              {item.role}
                            </p>
                          </div>
                        </article>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselDots className="mt-6" tone="tangerine" />
                </Carousel>
              </MotionFade>
            ) : null}

            {/* Logos-only: no second grid column exists, so the grid renders
                inline below the heading instead. */}
            {!twoColumn && hasLogos ? (
              <div className="mt-8">
                <VoicesLogoGrid partners={partners} />
              </div>
            ) : null}
          </div>

          {twoColumn ? <VoicesLogoGrid partners={partners} /> : null}
        </div>
      </div>
    </section>
  );
}
