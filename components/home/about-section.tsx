import Image from "next/image";
import {
  Play,
  Sprout,
  Globe,
  GraduationCap,
  Handshake,
  Users,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { homeContent } from "@/content/home";
import { placeholderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

const pillarIcons = {
  sprout: Sprout,
  "graduation-cap": GraduationCap,
  globe: Globe,
  handshake: Handshake,
  "user-round": UserRound,
  users: Users,
} satisfies Record<string, LucideIcon>;

export function AboutSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-8xl mx-auto w-full px-4 md:px-6">
        <div className="flex flex-col gap-20 lg:flex-row lg:items-center">
          <div className="flex-1 rounded-t-[20px] rounded-b-lg bg-(--bg-muted) p-7">
            <EyebrowBadge>What we do</EyebrowBadge>
            <h2 className="text-foreground mt-3 font-serif text-3xl leading-tight font-semibold tracking-[-0.01em] sm:text-[40px] sm:leading-[48px]">
              Integrating African Agripreneurs to the World Agro-ecosystem
            </h2>
            <div className="relative mt-9 aspect-529/309 overflow-hidden rounded-3xl">
              <Image
                src={placeholderImages.whatWeDo}
                alt="Farmers harvesting crops together"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex size-12 items-center justify-center rounded-xl bg-(--bg-muted)">
                  <Play className="fill-forest-600 text-forest-600 size-5" />
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="grid gap-8 sm:grid-cols-2">
              {homeContent.pillars.map((pillar, index) => {
                const Icon = pillarIcons[pillar.icon];

                return (
                  <article key={pillar.title}>
                    <span
                      className={cn(
                        "flex size-12 items-center justify-center rounded-xl",
                        index === 0
                          ? "bg-leaf-600 text-white"
                          : "text-forest-600 bg-(--forest-subtle)",
                      )}
                    >
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="text-foreground mt-6 font-sans text-lg font-semibold">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm leading-5 text-(--text-fg-subtle)">
                      {pillar.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
