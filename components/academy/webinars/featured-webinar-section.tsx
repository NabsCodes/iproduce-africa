import Image from "next/image";
import { ArrowUpRight, CalendarDays, MapPin, Users } from "lucide-react";

import { MotionFade } from "@/components/shared/motion/motion-fade";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import type { AcademyWebinar } from "@/types/academy";

type FeaturedWebinarSectionProps = {
  webinar: AcademyWebinar;
};

export function FeaturedWebinarSection({
  webinar,
}: FeaturedWebinarSectionProps) {
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className="relative aspect-5/4 overflow-hidden rounded-xl lg:aspect-4/3">
            <Image
              src={webinar.image}
              alt={webinar.imageAlt ?? webinar.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <MotionFade className="flex flex-col">
            <EyebrowBadge>Featured event</EyebrowBadge>

            <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-3xl sm:leading-[44px] lg:text-4xl lg:leading-[48px]">
              {webinar.title}
            </h2>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Badge variant="leaf">{webinar.type}</Badge>
              {webinar.format ? (
                <Badge variant="forest">{webinar.format}</Badge>
              ) : null}
            </div>

            <p className="text-fg-muted mt-5 text-base leading-7">
              {webinar.excerpt}
            </p>

            {(webinar.dateLabel || webinar.location || webinar.speakers) && (
              <ul className="text-fg-muted mt-5 flex flex-col gap-2 text-sm leading-6">
                {webinar.dateLabel ? (
                  <li className="flex items-start gap-2">
                    <CalendarDays className="text-fg-subtle mt-0.5 size-4 shrink-0" />
                    <span>{webinar.dateLabel}</span>
                  </li>
                ) : null}
                {webinar.location ? (
                  <li className="flex items-start gap-2">
                    <MapPin className="text-fg-subtle mt-0.5 size-4 shrink-0" />
                    <span>{webinar.location}</span>
                  </li>
                ) : null}
                {webinar.speakers ? (
                  <li className="flex items-start gap-2">
                    <Users className="text-fg-subtle mt-0.5 size-4 shrink-0" />
                    <span>{webinar.speakers}</span>
                  </li>
                ) : null}
              </ul>
            )}

            <div className="mt-7">
              <ButtonLink
                href={`/academy/webinars/${webinar.slug}`}
                variant="outline"
                size="md"
              >
                View details
                <ArrowUpRight className="size-4" />
              </ButtonLink>
            </div>
          </MotionFade>
        </div>
      </div>
    </section>
  );
}
