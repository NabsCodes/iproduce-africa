"use client";

import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import * as React from "react";

import { CarouselDots as CarouselDotsBase } from "@/components/ui/carousel-dots";
import { cn } from "@/lib/utils";

type EmblaApi = UseEmblaCarouselType[1];
type EmblaRef = UseEmblaCarouselType[0];
type EmblaOptions = Parameters<typeof useEmblaCarousel>[0];

type CarouselContextValue = {
  emblaRef: EmblaRef;
  api: EmblaApi;
  selectedIndex: number;
  scrollSnaps: number[];
  scrollTo: (index: number) => void;
};

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const ctx = React.useContext(CarouselContext);
  if (!ctx) {
    throw new Error("Carousel components must be used within <Carousel>");
  }
  return ctx;
}

type CarouselProps = React.HTMLAttributes<HTMLDivElement> & {
  options?: EmblaOptions;
};

export function Carousel({
  options,
  className,
  children,
  ...props
}: CarouselProps) {
  const [emblaRef, api] = useEmblaCarousel({ align: "start", ...options });
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    const onInit = () => setScrollSnaps(api.scrollSnapList());

    onInit();
    onSelect();
    api.on("reInit", onInit);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api.off("reInit", onInit);
      api.off("reInit", onSelect);
      api.off("select", onSelect);
    };
  }, [api]);

  const scrollTo = React.useCallback(
    (index: number) => api?.scrollTo(index),
    [api],
  );

  return (
    <CarouselContext.Provider
      value={{ emblaRef, api, selectedIndex, scrollSnaps, scrollTo }}
    >
      <div className={className} {...props}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

export function CarouselContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { emblaRef } = useCarousel();
  return (
    <div
      ref={emblaRef}
      className="cursor-grab overflow-hidden select-none active:cursor-grabbing"
    >
      <div className={cn("flex", className)} {...props} />
    </div>
  );
}

export function CarouselItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={cn("min-w-0 shrink-0 grow-0", className)}
      {...props}
    />
  );
}

export function CarouselDots({
  className,
  tone,
}: {
  className?: string;
  tone?: "leaf" | "tangerine";
}) {
  const { selectedIndex, scrollSnaps, scrollTo } = useCarousel();

  if (scrollSnaps.length <= 1) return null;

  return (
    <CarouselDotsBase
      total={scrollSnaps.length}
      active={selectedIndex}
      onSelect={scrollTo}
      className={className}
      tone={tone}
    />
  );
}
