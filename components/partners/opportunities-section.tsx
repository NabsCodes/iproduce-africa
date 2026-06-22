import {
  Coins,
  GraduationCap,
  Handshake,
  Network,
  Search,
  Users,
  type LucideIcon,
} from "lucide-react";

import { MotionFade } from "@/components/shared/motion/motion-fade";
import { MotionStagger } from "@/components/shared/motion/motion-stagger";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { partnersPageContent } from "@/content/partners";
import type {
  PartnerOpportunity,
  PartnerOpportunityIconKey,
} from "@/types/partners";

const iconMap: Record<PartnerOpportunityIconKey, LucideIcon> = {
  "graduation-cap": GraduationCap,
  coins: Coins,
  network: Network,
  search: Search,
  handshake: Handshake,
  users: Users,
};

function OpportunityCard({ item }: { item: PartnerOpportunity }) {
  const Icon = iconMap[item.icon];
  return (
    <div className="group elevation-1 hover:elevation-2 flex gap-4 rounded-lg border border-transparent bg-white p-5 transition-all duration-300 sm:gap-5 sm:p-6">
      <span className="bg-leaf-700 group-hover:bg-leaf-600 flex size-11 shrink-0 items-center justify-center rounded-md text-white transition-colors duration-300">
        <Icon className="size-5" aria-hidden />
      </span>
      <div className="flex flex-col gap-2">
        <h3 className="text-foreground group-hover:text-leaf-600 font-serif text-base font-semibold transition-colors duration-300 sm:text-lg">
          {item.title}
        </h3>
        <p className="text-fg-muted text-sm leading-6">{item.description}</p>
      </div>
    </div>
  );
}

export function OpportunitiesSection() {
  const section = partnersPageContent.opportunities;
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="bg-leaf-subtle rounded-xl px-5 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
          <MotionFade>
            <div className="max-w-2xl">
              <EyebrowBadge>{section.eyebrow}</EyebrowBadge>
              <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
                {section.title}
              </h2>
              <p className="text-fg-muted mt-4 text-base leading-7">
                {section.description}
              </p>
            </div>
          </MotionFade>

          <MotionStagger className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 lg:grid-cols-2 lg:gap-6">
            {section.items.map((item) => (
              <OpportunityCard key={item.title} item={item} />
            ))}
          </MotionStagger>
        </div>
      </div>
    </section>
  );
}
