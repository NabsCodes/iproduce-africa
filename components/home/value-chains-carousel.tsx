"use client";

import * as React from "react";
import { FocusAreaCard } from "@/components/home/focus-area-card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { CarouselDots } from "@/components/ui/carousel-dots";
import { homeContent } from "@/content/home";

export function ValueChainsCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [activeSnap, setActiveSnap] = React.useState(0);
  const [snapCount, setSnapCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    const carouselApi = api;

    function syncCarouselState() {
      setActiveSnap(carouselApi.selectedScrollSnap());
      setSnapCount(carouselApi.scrollSnapList().length);
    }

    syncCarouselState();
    carouselApi.on("select", syncCarouselState);
    carouselApi.on("reInit", syncCarouselState);

    return () => {
      carouselApi.off("select", syncCarouselState);
      carouselApi.off("reInit", syncCarouselState);
    };
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      opts={{ align: "start", containScroll: "trimSnaps" }}
      aria-label="Core focus areas"
    >
      <CarouselContent className="-ml-6">
        {homeContent.valueChains.map((chain) => (
          <CarouselItem key={chain.title} className="basis-[282px] pl-6">
            <FocusAreaCard {...chain} />
          </CarouselItem>
        ))}
      </CarouselContent>

      {snapCount > 1 && (
        <CarouselDots
          total={snapCount}
          active={activeSnap}
          onSelect={(index) => api?.scrollTo(index)}
          className="mt-10 justify-end"
        />
      )}
    </Carousel>
  );
}
