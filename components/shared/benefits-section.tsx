import {
  Bike,
  Clock,
  Globe,
  GraduationCap,
  Handshake,
  Lightbulb,
  type LucideIcon,
  Mail,
  Network,
  Send,
  Sprout,
  TrendingUp,
  Users,
} from "lucide-react";

import { MotionFade } from "@/components/shared/motion/motion-fade";
import { MotionStagger } from "@/components/shared/motion/motion-stagger";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { cn } from "@/lib/utils";
import type {
  BenefitIconKey,
  BenefitItem,
  BenefitsSectionContent,
} from "@/types/content";

const iconMap: Record<BenefitIconKey, LucideIcon> = {
  globe: Globe,
  "graduation-cap": GraduationCap,
  network: Network,
  lightbulb: Lightbulb,
  bike: Bike,
  sprout: Sprout,
  mail: Mail,
  users: Users,
  handshake: Handshake,
  "trending-up": TrendingUp,
  clock: Clock,
  send: Send,
};

type BenefitsSectionProps = {
  content: BenefitsSectionContent;
  chipShape: "square" | "round";
  headerLayout: "split" | "stacked";
  columns?: 2 | 3;
  interactive?: boolean;
  sectionId?: string;
  className?: string;
};

const gridColumnClasses = {
  2: "sm:grid-cols-2 lg:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
} as const;

function getTone(index: number, item: BenefitItem): "leaf" | "tangerine" {
  return item.tone ?? (index % 2 === 0 ? "leaf" : "tangerine");
}

function BenefitCard({
  item,
  index,
  chipShape,
  interactive,
}: {
  item: BenefitItem;
  index: number;
  chipShape: "square" | "round";
  interactive: boolean;
}) {
  const Icon = iconMap[item.icon];
  const tone = getTone(index, item);

  const chipClasses = interactive
    ? item.tone === undefined
      ? "bg-tangerine-subtle text-tangerine-700 group-hover:bg-tangerine-400 group-hover:text-white"
      : tone === "leaf"
        ? "bg-leaf-100 text-leaf-700 group-hover:bg-leaf-600 group-hover:text-white"
        : "bg-tangerine-100 text-tangerine-700 group-hover:bg-tangerine-400 group-hover:text-white"
    : tone === "leaf"
      ? "bg-leaf-100 text-leaf-700"
      : "bg-tangerine-100 text-tangerine-700";

  const cardHoverClasses = interactive
    ? item.tone === undefined
      ? "group hover:border-tangerine-300 transition-colors duration-300"
      : tone === "leaf"
        ? "group hover:border-leaf-300 transition-colors duration-300"
        : "group hover:border-tangerine-300 transition-colors duration-300"
    : "";

  const titleHoverClasses = interactive
    ? item.tone === undefined
      ? "group-hover:text-tangerine-600 transition-colors duration-300"
      : tone === "leaf"
        ? "group-hover:text-leaf-600 transition-colors duration-300"
        : "group-hover:text-tangerine-600 transition-colors duration-300"
    : "";

  return (
    <div
      className={cn(
        "border-default flex h-full flex-col gap-5 rounded-xl border bg-white p-6 sm:p-7",
        cardHoverClasses,
      )}
    >
      <span
        className={cn(
          "flex size-12 items-center justify-center transition-colors duration-300",
          chipShape === "round" ? "rounded-full" : "rounded-md",
          chipClasses,
        )}
      >
        <Icon className="size-5" aria-hidden />
      </span>
      <div className="flex flex-col gap-2">
        <h3
          className={cn(
            "text-foreground font-serif text-lg font-semibold sm:text-xl",
            titleHoverClasses,
          )}
        >
          {item.title}
        </h3>
        <p className="text-fg-muted text-sm leading-6">{item.description}</p>
      </div>
    </div>
  );
}

export function BenefitsSection({
  content,
  chipShape,
  headerLayout,
  columns = 3,
  interactive = false,
  sectionId,
  className,
}: BenefitsSectionProps) {
  return (
    <section
      id={sectionId}
      className={cn("bg-white py-14 sm:py-16 lg:py-20", className)}
    >
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <MotionFade>
          {headerLayout === "split" ? (
            <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-12">
              <div>
                <EyebrowBadge>{content.eyebrow}</EyebrowBadge>
                <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
                  {content.title}
                </h2>
              </div>
              {content.description ? (
                <p className="text-fg-muted text-base leading-7 sm:text-lg lg:max-w-md lg:justify-self-end">
                  {content.description}
                </p>
              ) : null}
            </div>
          ) : (
            <div className="max-w-[640px]">
              <EyebrowBadge>{content.eyebrow}</EyebrowBadge>
              <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
                {content.title}
              </h2>
              {content.description ? (
                <p className="text-fg-muted mt-4 text-base leading-7 sm:text-lg">
                  {content.description}
                </p>
              ) : null}
            </div>
          )}
        </MotionFade>

        <MotionStagger
          className={cn(
            "mt-10 grid gap-4 sm:gap-5 lg:mt-14 lg:gap-6",
            gridColumnClasses[columns],
          )}
        >
          {content.items.map((item, index) => (
            <BenefitCard
              key={item.title}
              item={item}
              index={index}
              chipShape={chipShape}
              interactive={interactive}
            />
          ))}
        </MotionStagger>
      </div>
    </section>
  );
}
