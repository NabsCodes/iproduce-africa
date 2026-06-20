import Image from "next/image";
import { GraduationCap, Play, UsersRound } from "lucide-react";

import { SiteCtaButton } from "@/components/shared/site-cta-button";
import { DecorativeRing } from "@/components/ui/decorative-ring";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { aboutPageContent } from "@/content/about";

export function StorySection() {
  const story = aboutPageContent.story;

  return (
    <section className="overflow-hidden bg-white py-14 sm:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative">
            <DecorativeRing
              strokeWidth={6}
              className="text-tangerine-300 -top-8 -right-6 size-[180px] sm:-top-10 sm:-right-8 sm:size-[220px]"
            />
            <div className="bg-muted relative aspect-4/3 overflow-hidden rounded-xl">
              <Image
                src={story.image}
                alt="Our story"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <span
                aria-hidden
                className="bg-leaf-subtle text-leaf-700 pointer-events-none absolute top-1/2 left-1/2 inline-flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl"
              >
                <Play className="size-5 fill-current" />
              </span>
            </div>
          </div>

          <div>
            <EyebrowBadge>{story.eyebrow}</EyebrowBadge>
            <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
              {story.title}
            </h2>
            <div className="text-fg-muted mt-5 space-y-4 text-base leading-7">
              {story.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <SiteCtaButton
                href={story.primaryCta.href}
                action={story.primaryCta.action}
                size="md"
              >
                <UsersRound />
                {story.primaryCta.label}
              </SiteCtaButton>
              <SiteCtaButton
                href={story.secondaryCta.href}
                variant="tangerine-outline"
                size="md"
              >
                <GraduationCap />
                {story.secondaryCta.label}
              </SiteCtaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
