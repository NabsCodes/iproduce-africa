import { CoreFocusCard } from "@/components/home/core-focus-card";
import { MotionFade } from "@/components/shared/motion/motion-fade";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/carousel";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { homeContent } from "@/content/home";

export function CoreFocusSection() {
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <MotionFade>
          <div className="flex flex-col gap-5 sm:gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <EyebrowBadge>Core areas of focus</EyebrowBadge>
              <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
                Core Focus Areas
              </h2>
            </div>
            <p className="text-fg-muted max-w-[360px] text-base leading-6">
              Value chains where women agripreneurs are building — and where
              iProduce Africa concentrates programmes and partnerships.
            </p>
          </div>
        </MotionFade>

        <Carousel className="mt-8 sm:mt-10" aria-label="Core focus areas">
          <CarouselContent className="-ml-4 sm:-ml-6">
            {homeContent.valueChains.map((chain, index) => (
              <CarouselItem
                key={chain.title}
                className="basis-[252px] pl-4 sm:basis-[282px] sm:pl-6"
              >
                <MotionFade delay={index * 0.08} className="h-full">
                  <CoreFocusCard {...chain} />
                </MotionFade>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots className="mt-8 justify-start sm:mt-10 sm:justify-end" />
        </Carousel>
      </div>
    </section>
  );
}
