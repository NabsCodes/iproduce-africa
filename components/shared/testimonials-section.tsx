import { Quote } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { DecorativeRing } from "@/components/ui/decorative-ring";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { homeContent } from "@/content/home";
import type { TestimonialItem } from "@/types/content";

type TestimonialsSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: readonly TestimonialItem[];
};

export function TestimonialsSection({
  eyebrow = "Our impact",
  title = "What our community says",
  description = "Farmers, traders and innovators on what iProduce changed for them.",
  items = homeContent.testimonials,
}: TestimonialsSectionProps = {}) {
  return (
    <section className="relative overflow-clip bg-white py-14 sm:py-16 lg:py-20">
      <DecorativeRing
        strokeWidth={5}
        className="text-tangerine-300 top-0 right-0 hidden size-[320px] translate-x-[60%] -translate-y-1/2 md:block lg:size-[380px]"
      />
      <div className="max-w-8xl relative mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="max-w-xl">
          <EyebrowBadge>{eyebrow}</EyebrowBadge>
          <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
            {title}
          </h2>
          <p className="text-fg-muted mt-3 text-base leading-6">
            {description}
          </p>
        </div>

        <Carousel className="mt-8 sm:mt-10" aria-label="Community testimonials">
          <CarouselContent className="-ml-4 sm:-ml-6">
            {items.map((item) => (
              <CarouselItem
                key={item.name}
                className="basis-full pl-4 sm:basis-1/2 sm:pl-6 lg:basis-1/3"
              >
                <Card className="bg-subtle flex min-h-[300px] flex-col gap-0 rounded-xl border-0 py-0 shadow-none ring-0">
                  <CardContent className="flex flex-1 flex-col gap-4 px-6 pt-6 sm:px-8 sm:pt-8">
                    <Quote className="text-leaf-600 size-6" aria-hidden />
                    <p className="text-foreground font-serif text-[20px] leading-[30px] font-semibold sm:text-xl sm:leading-7">
                      {item.quote}
                    </p>
                  </CardContent>
                  <CardFooter className="mt-auto flex items-center gap-3 border-0 bg-transparent px-6 pt-4 pb-6 sm:px-8 sm:pb-8">
                    <Avatar>
                      {item.image ? (
                        <AvatarImage src={item.image} alt={item.name} />
                      ) : null}
                      <AvatarFallback className="bg-leaf-muted text-forest-600 text-[11px] font-semibold tracking-wide">
                        {item.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-foreground text-[13px] font-medium">
                        {item.name}
                      </p>
                      <p className="text-fg-subtle text-xs">{item.role}</p>
                    </div>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots className="mt-8 justify-center sm:mt-10" />
        </Carousel>
      </div>
    </section>
  );
}
