import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { PartnersAfricaMap } from "@/components/partners/partners-africa-map";
import { ButtonLink } from "@/components/ui/button";
import { EyebrowPill } from "@/components/ui/eyebrow-pill";
import { partnersPageContent } from "@/content/partners";

export function PartnersHeroSection() {
  const hero = partnersPageContent.hero;

  return (
    <section className="bg-subtle relative overflow-x-clip py-14 sm:py-16 lg:py-20">
      <Image
        src={hero.map.backdrop}
        alt=""
        aria-hidden
        width={567}
        height={260}
        sizes="(min-width: 1280px) 760px, (min-width: 1024px) 50vw, 55vw"
        className="pointer-events-none absolute top-0 right-0 z-0 h-auto w-[60vw] max-w-[760px] select-none sm:w-[55vw] lg:w-[42vw] xl:w-[43vw]"
      />

      <div className="max-w-8xl relative z-10 mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          <div className="relative z-10 flex max-w-3xl min-w-0 flex-col gap-6 lg:max-w-none">
            <div className="flex flex-col gap-4">
              <EyebrowPill tone={hero.eyebrowTone ?? "tangerine"} size="sm">
                {hero.eyebrow}
              </EyebrowPill>

              <h1 className="text-foreground font-serif text-3xl leading-[1.1] font-semibold tracking-[-0.01em] sm:text-5xl sm:leading-[1.05]">
                {hero.title.lead}{" "}
                <span className="text-leaf-600">{hero.title.accentOne}</span>{" "}
                {hero.title.middle}{" "}
                <span className="text-leaf-600">{hero.title.accentTwo}</span>
              </h1>
            </div>

            <p className="text-fg-muted max-w-xl text-base leading-7">
              {hero.description}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink
                href={hero.primaryCta.href}
                variant="green"
                size="lg"
                className="w-full sm:w-auto"
              >
                {hero.primaryCta.label}
              </ButtonLink>
              <ButtonLink
                href={hero.secondaryCta.href}
                variant="green-soft"
                size="lg"
                className="w-full sm:w-auto"
              >
                {hero.secondaryCta.label}
                <ArrowRight className="size-5" />
              </ButtonLink>
            </div>
          </div>

          <div className="relative z-10 flex min-w-0 justify-center lg:justify-end">
            <PartnersAfricaMap map={hero.map} stat={hero.stat} />
          </div>
        </div>
      </div>
    </section>
  );
}
