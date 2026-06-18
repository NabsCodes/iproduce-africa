import {
  Building2,
  HeartHandshake,
  Landmark,
  Package,
  Rocket,
  Ship,
  Sparkles,
  Sprout,
  Truck,
  type LucideIcon,
} from "lucide-react";

import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { academyContent } from "@/content/academy";
import type {
  AcademyParticipant,
  AcademyParticipantIconKey,
} from "@/types/academy";

const participantIcons: Record<AcademyParticipantIconKey, LucideIcon> = {
  rocket: Rocket,
  sprout: Sprout,
  package: Package,
  truck: Truck,
  ship: Ship,
  landmark: Landmark,
  "heart-handshake": HeartHandshake,
  sparkles: Sparkles,
  building: Building2,
};

function ParticipantCard({ item }: { item: AcademyParticipant }) {
  const Icon = participantIcons[item.icon];
  return (
    <article className="group border-default hover:border-tangerine-300 flex items-start gap-4 rounded-lg border bg-white p-5 transition-colors duration-300 sm:p-6">
      <span className="bg-leaf-subtle text-leaf-700 group-hover:bg-tangerine-400 flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 group-hover:text-white">
        <Icon className="size-5" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-foreground group-hover:text-tangerine-600 font-serif text-base font-semibold transition-colors duration-300 sm:text-lg">
          {item.title}
        </p>
        <p className="text-fg-muted mt-1 text-sm leading-5">
          {item.description}
        </p>
      </div>
    </article>
  );
}

export function TargetParticipantsSection() {
  const participants = academyContent.participants;

  return (
    <section className="bg-subtle py-14 sm:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <EyebrowBadge>{participants.eyebrow}</EyebrowBadge>
            <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
              {participants.title}
            </h2>
          </div>
          <p className="text-fg-muted max-w-md text-base leading-7">
            {participants.description}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-12 lg:grid-cols-3 lg:gap-6">
          {participants.items.map((item) => (
            <ParticipantCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
