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

export function TestimonialsSection() {
  return (
    <section className="relative overflow-clip bg-white py-20">
      <DecorativeRing
        strokeWidth={5}
        className="text-tangerine-300 top-0 right-0 hidden size-[320px] translate-x-[60%] -translate-y-1/2 md:block lg:size-[380px]"
      />
      <div className="max-w-8xl relative mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="max-w-xl">
          <EyebrowBadge>Our impact</EyebrowBadge>
          <h2 className="text-foreground mt-3 font-serif text-[40px] leading-[48px] font-semibold tracking-[-0.01em]">
            What our community says
          </h2>
          <p className="text-fg-muted mt-3 text-base leading-6">
            Farmers, traders and innovators on what iProduce changed for them.
          </p>
        </div>

        <Carousel className="mt-10" aria-label="Community testimonials">
          <CarouselContent className="-ml-6">
            {homeContent.testimonials.map((item) => (
              <CarouselItem
                key={item.name}
                className="basis-full pl-6 sm:basis-1/2 lg:basis-1/3"
              >
                <Card className="bg-subtle flex h-full flex-col gap-4 rounded-[20px] border-0 p-8 shadow-none ring-0">
                  <CardContent className="flex flex-1 flex-col gap-4 p-0">
                    <Quote className="text-leaf-600 size-6" aria-hidden />
                    <p className="text-foreground font-serif text-xl leading-7 font-semibold">
                      {item.quote}
                    </p>
                  </CardContent>
                  <CardFooter className="mt-auto flex items-center gap-3 border-0 bg-transparent p-0 pt-2">
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
          <CarouselDots className="mt-10 justify-center" />
        </Carousel>
      </div>
    </section>
  );
}
