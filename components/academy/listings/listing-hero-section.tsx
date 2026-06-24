import { MotionFade } from "@/components/shared/motion/motion-fade";
import { EyebrowPill } from "@/components/ui/eyebrow-pill";
import type { AcademyListingHeroContent } from "@/types/academy";

type AcademyListingHeroSectionProps = {
  content: AcademyListingHeroContent;
};

/**
 * Shared dark-band hero for Academy listing routes — Blog, Webinars,
 * Courses. Eyebrow + title + description are the only per-route differences.
 */
export function AcademyListingHeroSection({
  content,
}: AcademyListingHeroSectionProps) {
  return (
    <section className="bg-forest-900 text-white">
      <div className="max-w-8xl mx-auto w-full px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 xl:px-10">
        <MotionFade className="mx-auto flex max-w-full flex-col items-center text-center">
          <EyebrowPill tone="leaf">{content.eyebrow}</EyebrowPill>

          <h1 className="mt-5 font-serif text-3xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px] lg:text-5xl lg:leading-[60px]">
            {content.title}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
            {content.description}
          </p>
        </MotionFade>
      </div>
    </section>
  );
}
