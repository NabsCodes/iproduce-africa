import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  Lightbulb,
  Play,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { homeContent } from "@/content/home";

const academyIcons: Record<string, LucideIcon> = {
  "graduation-cap": GraduationCap,
  lightbulb: Lightbulb,
  users: Users,
  "trending-up": TrendingUp,
};

export function WhatWeDoSection() {
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
          <div className="bg-muted flex-1 rounded-t-[20px] rounded-b-lg p-5 sm:p-7">
            <EyebrowBadge>{homeContent.about.eyebrow}</EyebrowBadge>
            <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
              {homeContent.about.title}
            </h2>
            <div className="relative mt-7 aspect-529/309 overflow-hidden rounded-3xl sm:mt-9">
              <Image
                src={homeContent.about.image}
                alt={homeContent.about.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-muted flex size-12 items-center justify-center rounded-xl">
                  <Play className="fill-forest-600 text-forest-600 size-5" />
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              {homeContent.academyHighlights.map((card) => {
                const Icon = academyIcons[card.icon];
                return (
                  <Link
                    key={card.title}
                    href={card.href}
                    className="group border-border hover:border-leaf-300 focus-visible:border-leaf-400 focus-visible:ring-leaf-200 flex flex-col rounded-2xl border bg-white p-5 transition-colors focus-visible:ring-2 focus-visible:outline-none sm:p-6"
                  >
                    <span className="bg-leaf-subtle text-leaf-700 group-hover:bg-leaf-600 flex size-12 items-center justify-center rounded-full transition-colors group-hover:text-white">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="text-foreground mt-5 font-serif text-lg font-semibold sm:mt-6">
                      {card.title}
                    </h3>
                    <p className="text-fg-subtle mt-2 text-sm leading-5">
                      {card.description}
                    </p>
                    <span className="text-leaf-700 group-hover:text-leaf-800 mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors">
                      Jump to section
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
