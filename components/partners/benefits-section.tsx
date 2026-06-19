import {
  Bike,
  Globe,
  GraduationCap,
  Lightbulb,
  Network,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { partnersPageContent } from "@/content/partners";
import type {
  PartnerBenefitIconKey,
  PartnerBenefitItem,
} from "@/types/partners";

const iconMap: Record<PartnerBenefitIconKey, LucideIcon> = {
  globe: Globe,
  "graduation-cap": GraduationCap,
  network: Network,
  lightbulb: Lightbulb,
  bike: Bike,
  sprout: Sprout,
};

function BenefitCard({ item }: { item: PartnerBenefitItem }) {
  const Icon = iconMap[item.icon];
  return (
    <div className="group border-default hover:border-tangerine-300 flex flex-col gap-5 rounded-xl border bg-white p-6 transition-colors duration-300 sm:p-7">
      <span className="bg-tangerine-subtle text-tangerine-700 group-hover:bg-tangerine-400 flex size-12 items-center justify-center rounded-md transition-colors duration-300 group-hover:text-white">
        <Icon className="size-5" aria-hidden />
      </span>
      <div className="flex flex-col gap-2">
        <h3 className="text-foreground group-hover:text-tangerine-600 font-serif text-lg font-semibold transition-colors duration-300 sm:text-xl">
          {item.title}
        </h3>
        <p className="text-fg-muted text-sm leading-6">{item.description}</p>
      </div>
    </div>
  );
}

export function BenefitsSection() {
  const section = partnersPageContent.whyPartner;
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-12">
          <div>
            <EyebrowBadge>{section.eyebrow}</EyebrowBadge>
            <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
              {section.title}
            </h2>
          </div>
          <p className="text-fg-muted text-base leading-7 sm:text-lg lg:max-w-md lg:justify-self-end">
            {section.description}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {section.items.map((item) => (
            <BenefitCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
