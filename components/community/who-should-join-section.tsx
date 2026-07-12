import {
  Coins,
  Factory,
  Globe,
  Lightbulb,
  type LucideIcon,
  Sprout,
  Store,
  TreePine,
  Truck,
  UserRound,
} from "lucide-react";

import { MotionFade } from "@/components/shared/motion/motion-fade";
import { MotionStagger } from "@/components/shared/motion/motion-stagger";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { communityPageContent } from "@/content/community";
import type { WhoShouldJoinIconKey } from "@/types/community";

const iconMap: Record<WhoShouldJoinIconKey, LucideIcon> = {
  sprout: Sprout,
  "tree-pine": TreePine,
  factory: Factory,
  truck: Truck,
  store: Store,
  coins: Coins,
  "user-round": UserRound,
  lightbulb: Lightbulb,
  globe: Globe,
};

export function WhoShouldJoinSection() {
  const section = communityPageContent.whoShouldJoin;

  return (
    <section className="bg-subtle py-14 sm:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <MotionFade>
          <div className="max-w-[640px]">
            <EyebrowBadge>{section.eyebrow}</EyebrowBadge>
            <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
              {section.title}
            </h2>
            <p className="text-fg-muted mt-4 text-base leading-7">
              {section.description}
            </p>
          </div>
        </MotionFade>

        <MotionStagger className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {section.items.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <div
                key={item.title}
                className="group border-default hover:border-leaf-300 flex items-start gap-4 rounded-xl border bg-white p-5 transition-colors duration-300 sm:p-6"
              >
                <span className="bg-leaf-100 text-leaf-700 group-hover:bg-leaf-600 flex size-10 shrink-0 items-center justify-center rounded-md transition-colors duration-300 group-hover:text-white">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="text-foreground group-hover:text-leaf-600 font-serif text-base font-semibold transition-colors duration-300 sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="text-fg-muted mt-1 text-sm leading-6">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </MotionStagger>
      </div>
    </section>
  );
}
