import { JumpSectionCard } from "@/components/shared/jump-section-card";
import { MotionFade } from "@/components/shared/motion/motion-fade";
import { MotionStagger } from "@/components/shared/motion/motion-stagger";
import { VideoPoster } from "@/components/shared/video-poster";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { academyHomePreview } from "@/content/academy";
import { homeContent } from "@/content/home";
import type { HomePageContent } from "@/lib/sanity/fetch/home-page";

export function WhatWeDoSection({
  poster,
}: {
  poster: HomePageContent["whatWeDoPoster"];
}) {
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
          <MotionFade className="bg-muted flex-1 rounded-t-xl rounded-b-lg p-5 sm:p-7">
            <EyebrowBadge>{homeContent.about.eyebrow}</EyebrowBadge>
            <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
              {homeContent.about.title}
            </h2>
            <VideoPoster
              poster={poster.image}
              posterAlt={poster.imageAlt}
              video={poster.video}
              title={homeContent.about.videoAriaLabel}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="mt-7 aspect-529/309 sm:mt-9"
            />
          </MotionFade>

          <MotionStagger className="grid flex-1 gap-4 sm:grid-cols-2 sm:gap-6">
            {academyHomePreview.opportunities.map((card) => (
              <JumpSectionCard
                key={card.title}
                href={card.href}
                icon={card.icon}
                title={card.title}
                description={card.description}
                variant="home"
              />
            ))}
          </MotionStagger>
        </div>
      </div>
    </section>
  );
}
