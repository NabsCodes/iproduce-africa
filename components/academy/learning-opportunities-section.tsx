import { JumpSectionCard } from "@/components/shared/jump-section-card";
import { MotionFade } from "@/components/shared/motion/motion-fade";
import { MotionStagger } from "@/components/shared/motion/motion-stagger";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { academyContent } from "@/content/academy";

export function LearningOpportunitiesSection() {
  const opportunities = academyContent.opportunities;

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <MotionFade>
          <div className="text-center">
            <EyebrowBadge className="justify-center">
              {opportunities.eyebrow}
            </EyebrowBadge>
            <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
              {opportunities.title}
            </h2>
          </div>
        </MotionFade>

        <MotionStagger className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-12 lg:grid-cols-4 lg:gap-6">
          {opportunities.items.map((card) => (
            <JumpSectionCard
              key={card.title}
              href={card.anchor}
              icon={card.icon}
              title={card.title}
              description={card.description}
              variant="academy"
            />
          ))}
        </MotionStagger>
      </div>
    </section>
  );
}
