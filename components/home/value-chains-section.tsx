import { FocusAreaCard } from "@/components/home/focus-area-card";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/carousel";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { homeContent } from "@/content/home";

export function ValueChainsSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <EyebrowBadge>Core areas of focus</EyebrowBadge>
            <h2 className="text-foreground mt-3 font-serif text-[40px] leading-[48px] font-semibold tracking-[-0.01em]">
              Four connected sectors
            </h2>
          </div>
          <p className="text-fg-muted max-w-[360px] text-base leading-6">
            Four connected sectors forming the backbone of iProduce
            Africa&apos;s agribusiness transformation agenda.
          </p>
        </div>

        <Carousel className="mt-10" aria-label="Core focus areas">
          <CarouselContent className="-ml-6">
            {homeContent.valueChains.map((chain) => (
              <CarouselItem
                key={chain.title}
                className="basis-[282px] pl-6"
              >
                <FocusAreaCard {...chain} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots className="mt-10 justify-end" />
        </Carousel>
      </div>
    </section>
  );
}
