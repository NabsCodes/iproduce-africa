import {
  Globe,
  GraduationCap,
  Handshake,
  type LucideIcon,
  Users,
} from "lucide-react";

import { WhyJoinServiceCard } from "@/components/home/why-join-service-card";
import { MotionFade } from "@/components/shared/motion/motion-fade";
import { MotionStagger } from "@/components/shared/motion/motion-stagger";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { homeContent } from "@/content/home";
import type { HomePageContent } from "@/lib/sanity/fetch/home-page";
import { type HOME_SERVICE_SLOT_LAYOUT } from "@/lib/sanity/page-slot-layout";
import type { BenefitTone } from "@/types/content";

const serviceIcons: Record<
  (typeof HOME_SERVICE_SLOT_LAYOUT)[number]["icon"],
  LucideIcon
> = {
  users: Users,
  "graduation-cap": GraduationCap,
  globe: Globe,
  handshake: Handshake,
};

export function WhyJoinUsSection({
  services,
}: {
  services: HomePageContent["services"];
}) {
  const { whyJoinUs } = homeContent;

  return (
    <section className="bg-subtle py-14 sm:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <MotionFade>
          <div className="flex flex-col gap-5 sm:gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <EyebrowBadge>{whyJoinUs.eyebrow}</EyebrowBadge>
              <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
                {whyJoinUs.title}
              </h2>
            </div>
            <p className="text-fg-muted max-w-md text-base leading-6 lg:text-right">
              {whyJoinUs.description}
            </p>
          </div>
        </MotionFade>

        <MotionStagger className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:mt-12 lg:gap-6">
          {services.map((item) => {
            const Icon = serviceIcons[item.icon];

            return (
              <WhyJoinServiceCard
                key={item.title}
                title={item.title}
                description={item.description}
                image={item.image}
                imageAlt={item.imageAlt}
                imagePosition={item.imagePosition}
                icon={Icon}
                tone={item.tone as BenefitTone}
              />
            );
          })}
        </MotionStagger>
      </div>
    </section>
  );
}
