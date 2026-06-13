import Image from "next/image";
import {
  Play,
  Sprout,
  Globe,
  GraduationCap,
  Handshake,
  Users,
  UserRound,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { placeholderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

const pillars = [
  {
    title: "Agritech & Smart Agriculture",
    description:
      "End-to-end coaching on agritech to help agripreneurs scale sustainably. Precision tools and digital innovation for modern farms.",
    icon: Sprout,
    iconClass: "bg-acid-600 text-white",
  },
  {
    title: "Training & Capacity",
    description:
      "Structured programmes, workshops, and e-learning resources built for the modern African agricultural entrepreneur.",
    icon: GraduationCap,
    iconClass: "bg-[var(--forest-subtle)] text-forest-600",
  },
  {
    title: "Market & Trade Linkages",
    description:
      "Direct access to intra-African and global markets through our network of buyers, exporters, and trade partners.",
    icon: Globe,
    iconClass: "bg-[var(--forest-subtle)] text-forest-600",
  },
  {
    title: "Agribusiness Leadership",
    description:
      "Strategic collaboration with NGOs, donors, investors, and institutions driving agricultural development across Africa.",
    icon: Handshake,
    iconClass: "bg-[var(--forest-subtle)] text-forest-600",
  },
  {
    title: "Women in Agriculture",
    description: "Backing women-led enterprises across the value chain.",
    icon: UserRound,
    iconClass: "bg-[var(--forest-subtle)] text-forest-600",
  },
  {
    title: "Youth Development",
    description:
      "Bringing the next generation of African farmers and agripreneurs into modern, digitally-enabled agribusiness.",
    icon: Users,
    iconClass: "bg-[var(--forest-subtle)] text-forest-600",
  },
];

export function AboutSection() {
  return (
    <section className="bg-white py-20">
      <Container>
        <div className="flex flex-col gap-20 lg:flex-row lg:items-center">
          <div className="flex-1 rounded-t-[20px] rounded-b-lg bg-[var(--bg-muted)] p-7">
            <EyebrowBadge>What we do</EyebrowBadge>
            <h2 className="text-foreground mt-3 font-serif text-3xl leading-tight font-semibold tracking-[-0.01em] sm:text-[40px] sm:leading-[48px]">
              Integrating African Agripreneurs to the World Agro-ecosystem
            </h2>
            <div className="relative mt-9 aspect-[529/309] overflow-hidden rounded-3xl">
              <Image
                src={placeholderImages.whatWeDo}
                alt="Farmers harvesting crops together"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex size-12 items-center justify-center rounded-xl bg-[var(--bg-muted)]">
                  <Play className="fill-forest-600 text-forest-600 size-5" />
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="grid gap-8 sm:grid-cols-2">
              {pillars.map((pillar) => (
                <article key={pillar.title}>
                  <span
                    className={cn(
                      "flex size-12 items-center justify-center rounded-xl",
                      pillar.iconClass,
                    )}
                  >
                    <pillar.icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="text-foreground mt-6 font-sans text-lg font-semibold">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-5 text-[var(--text-fg-subtle)]">
                    {pillar.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
