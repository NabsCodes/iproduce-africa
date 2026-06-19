import Image from "next/image";
import { Quote } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/carousel";
import { DecorativeRing } from "@/components/ui/decorative-ring";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { partnersPageContent } from "@/content/partners";

export function VoicesSection() {
  const section = partnersPageContent.voices;

  return (
    <section className="bg-subtle relative overflow-clip py-14 sm:py-16 lg:py-20">
      <DecorativeRing
        strokeWidth={5}
        className="text-tangerine-300 top-0 right-0 hidden size-[320px] translate-x-[60%] -translate-y-1/2 md:block xl:size-[380px]"
      />
      <div className="max-w-8xl relative mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-start lg:gap-14">
          <div className="min-w-0">
            <EyebrowBadge>{section.eyebrow}</EyebrowBadge>
            <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
              {section.title}
            </h2>

            <Carousel className="mt-8" aria-label="Partner testimonials">
              <CarouselContent>
                {section.items.map((item) => (
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
          </div>

          <div className="grid min-w-0 grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {section.logos.slice(0, 6).map((logo) => (
              <div
                key={logo.id}
                className="border-grey-200 flex aspect-5/3 min-w-0 items-center justify-center rounded-md border bg-white p-4 sm:p-5"
              >
                <Image
                  src={logo.logo}
                  alt={logo.name}
                  width={140}
                  height={60}
                  className="h-auto max-h-10 w-auto max-w-full object-contain opacity-80 sm:max-h-14"
                />
              </div>
            ))}
            {section.logos.slice(6).map((logo) => (
              <div
                key={logo.id}
                className="border-grey-200 hidden aspect-5/3 min-w-0 items-center justify-center rounded-md border bg-white p-4 sm:flex sm:p-5"
              >
                <Image
                  src={logo.logo}
                  alt={logo.name}
                  width={140}
                  height={60}
                  className="h-auto max-h-10 w-auto max-w-full object-contain opacity-80 sm:max-h-14"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
