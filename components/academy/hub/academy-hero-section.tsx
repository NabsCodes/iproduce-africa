import { ArrowRight, Clock3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { AcademyHeroSearchForm } from "@/components/academy/hub/academy-hero-search-form";
import { MotionFade } from "@/components/shared/motion/motion-fade";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
import { EyebrowPill } from "@/components/ui/eyebrow-pill";
import { academyContent } from "@/content/academy";
import { formatAcademyShortDate } from "@/lib/academy-dates";
import type { AcademyWebinar } from "@/types/academy";

type AcademyHeroSectionProps = {
  nextLive: AcademyWebinar | null;
  isHappening: boolean;
};

export function AcademyHeroSection({
  nextLive,
  isHappening,
}: AcademyHeroSectionProps) {
  const hero = academyContent.hero;
  const nextLiveCard = nextLive
    ? {
        eyebrow: isHappening ? "Happening now" : "Next Live Session",
        label: `${nextLive.title} · ${formatAcademyShortDate(nextLive.date)}`,
        href: `/academy/webinars/${nextLive.slug}`,
      }
    : {
        eyebrow: hero.announcement.eyebrow,
        label: hero.announcement.message,
        href: hero.announcement.href,
      };

  return (
    <section
      id="overview"
      className="bg-subtle relative scroll-mt-36 overflow-x-clip pt-12 pb-16 sm:pt-16 sm:pb-20 lg:scroll-mt-40 lg:pt-20 lg:pb-24"
    >
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div>
            <MotionFade>
              <EyebrowPill tone={hero.eyebrowTone}>{hero.eyebrow}</EyebrowPill>
              <h1 className="text-foreground mt-5 font-serif text-3xl leading-[1.1] font-semibold tracking-[-0.01em] whitespace-pre-line sm:text-5xl sm:leading-[1.05]">
                {hero.title.lead}
                <span className="text-leaf-600">{hero.title.accent}</span>
                {hero.title.trail}
              </h1>
            </MotionFade>
            <p className="text-fg-muted mt-5 max-w-xl text-base leading-7">
              {hero.description}
            </p>

            <MotionFade delay={0.2}>
              <AcademyHeroSearchForm
                placeholder={hero.searchPlaceholder}
                label={hero.searchLabel}
              />
            </MotionFade>

            <div className="mt-8 flex items-center gap-3">
              <AvatarGroup className="*:data-[slot=avatar]:ring-background *:data-[slot=avatar]:size-8 *:data-[slot=avatar]:ring-2">
                {hero.members.map((member) => (
                  <Avatar key={member.initials}>
                    {member.image ? (
                      <AvatarImage src={member.image} alt={member.name} />
                    ) : null}
                    <AvatarFallback className="bg-leaf-muted text-forest-600 text-[10px] font-semibold">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </AvatarGroup>
              <p className="text-fg-muted max-w-md text-sm leading-5">
                {hero.trustLabel}
              </p>
            </div>
          </div>

          <MotionFade className="relative min-w-0" delay={0.12}>
            <div
              className="bg-tangerine-100 absolute -top-8 -right-8 hidden size-[120px] rounded-full lg:block"
              aria-hidden
            />
            <div className="bg-muted relative aspect-square overflow-hidden rounded-xl">
              <Image
                src={hero.image}
                alt={hero.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <Link
              href={nextLiveCard.href}
              className="border-default group/next focus-visible:ring-tangerine-400 hover:border-tangerine-400 absolute right-4 bottom-4 left-4 flex items-center gap-4 rounded-lg border bg-white p-4 transition-[border-color,background-color] duration-200 ease-out hover:bg-white focus-visible:ring-2 focus-visible:outline-none sm:right-auto sm:-bottom-10 sm:left-8 sm:max-w-[380px]"
            >
              <span className="bg-leaf-subtle text-leaf-700 group-hover/next:bg-tangerine-400 flex size-12 shrink-0 items-center justify-center rounded-md transition-colors duration-300 group-hover/next:text-white">
                <Clock3 className="size-5" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-tangerine-600 text-[11px] font-semibold tracking-[0.18em] uppercase">
                  {nextLiveCard.eyebrow}
                </p>
                <p className="text-foreground group-hover/next:text-tangerine-800 mt-1 text-base leading-5 font-semibold transition-colors duration-300 sm:text-[17px]">
                  {nextLiveCard.label}
                </p>
              </div>
              <ArrowRight
                className="text-tangerine-600 size-5 shrink-0 transition-transform duration-300 group-hover/next:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </MotionFade>
        </div>
      </div>
    </section>
  );
}
