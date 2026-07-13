import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";

import { MotionFade } from "@/components/shared/motion/motion-fade";
import { SiteCtaButton } from "@/components/shared/site-cta-button";
import { EyebrowPill } from "@/components/ui/eyebrow-pill";
import { homeContent } from "@/content/home";
import type { HomePageContent } from "@/lib/sanity/fetch/home-page";

const TITLE_ACCENT = "Local and Global";

function splitTitleByAccent(title: string) {
  const accentIndex = title.indexOf(TITLE_ACCENT);
  if (accentIndex === -1) {
    return { lead: title, accent: "", trail: "" };
  }
  return {
    lead: title.slice(0, accentIndex),
    accent: TITLE_ACCENT,
    trail: title.slice(accentIndex + TITLE_ACCENT.length),
  };
}

export function HeroSection({ hero }: { hero: HomePageContent["hero"] }) {
  const heroShell = homeContent.hero;
  const { lead, accent, trail } = splitTitleByAccent(hero.title);

  return (
    <section>
      {/* Mobile: stacked white layout */}
      <div className="bg-subtle px-4 pt-10 pb-12 sm:px-6 md:hidden">
        <div className="mx-auto flex flex-col gap-6">
          <MotionFade className="flex flex-col gap-6">
            <EyebrowPill tone={heroShell.eyebrowTone} size="sm">
              {heroShell.eyebrow}
            </EyebrowPill>

            <h1 className="text-foreground font-serif text-[34px] leading-[1.1] font-semibold tracking-[-0.02em] sm:text-4xl">
              {lead}
              <span className="text-leaf-700">{accent}</span>
              {trail}
            </h1>

            <p className="text-fg-muted text-base leading-6">
              {hero.description}
            </p>
          </MotionFade>

          <div className="flex flex-col gap-3">
            <SiteCtaButton
              href={heroShell.primaryCta.href}
              action={heroShell.primaryCta.action}
              size="lg"
              fullWidth
            >
              {heroShell.primaryCta.label}
              <ArrowUpRight className="size-5" />
            </SiteCtaButton>
          </div>

          <MotionFade
            delay={0.12}
            scaleFrom={0.98}
            className="relative aspect-5/4 overflow-hidden rounded-xl"
          >
            <Image
              src={heroShell.image}
              alt={heroShell.imageAlt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 0"
            />
          </MotionFade>

          <div className="grid gap-3 sm:grid-cols-3">
            {heroShell.proofPoints.map((point) => (
              <div
                key={point.label}
                className="border-border rounded-lg border bg-white px-4 py-4"
              >
                <CheckCircle2 className="text-leaf-600 size-5" aria-hidden />
                <p className="text-foreground mt-3 font-serif text-lg leading-6 font-semibold">
                  {point.label}
                </p>
                <p className="text-fg-muted mt-1 text-sm leading-5">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop: full-bleed overlay layout */}
      <div className="relative hidden min-h-[720px] overflow-hidden md:block">
        <Image
          src={heroShell.image}
          alt={heroShell.imageAlt}
          fill
          priority
          className="object-cover"
          sizes="(min-width: 768px) 100vw, 0px"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(66deg, rgba(15, 30, 2, 0.5) 25.56%, rgba(15, 30, 2, 0.5) 43.5%, rgba(0, 0, 0, 0) 92%)",
          }}
        />

        <div className="max-w-8xl relative mx-auto flex min-h-[720px] w-full items-end px-4 pt-16 pb-[72px] sm:px-6 lg:px-8 xl:px-10">
          <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <MotionFade>
                <EyebrowPill tone={heroShell.eyebrowTone} size="sm">
                  {heroShell.eyebrow}
                </EyebrowPill>

                <h1 className="mt-6 font-serif text-4xl leading-[1.06] font-semibold tracking-[-0.02em] text-white sm:text-5xl lg:text-[72px] lg:leading-[76px]">
                  {hero.title}
                </h1>

                <p className="mt-8 max-w-[618px] text-lg leading-7 text-white">
                  {hero.description}
                </p>
              </MotionFade>

              {/* CTA stays outside the MotionFade per spec — it does not animate. */}
              <div className="mt-8 flex flex-wrap gap-4">
                <SiteCtaButton
                  href={heroShell.primaryCta.href}
                  action={heroShell.primaryCta.action}
                  size="lg"
                >
                  {heroShell.primaryCta.label}
                  <ArrowUpRight className="size-5" />
                </SiteCtaButton>
              </div>

              <div className="mt-6 flex max-w-2xl flex-wrap gap-x-6 gap-y-3 lg:hidden">
                {heroShell.proofPoints.map((point) => (
                  <div
                    key={point.label}
                    className="flex min-w-0 items-center gap-2.5"
                  >
                    <CheckCircle2
                      className="text-leaf-emphasized size-5 shrink-0"
                      aria-hidden
                    />
                    <span className="text-sm leading-5 font-semibold text-white">
                      {point.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <MotionFade
              delay={0.18}
              className="bg-forest-950/45 hidden w-full max-w-[360px] rounded-xl border border-white/20 p-5 text-white shadow-[0_24px_70px_-36px_rgba(0,0,0,0.7)] backdrop-blur-md lg:block"
            >
              <div className="flex items-center gap-2">
                <span
                  className="bg-leaf-emphasized size-2 shrink-0 rounded-full"
                  aria-hidden
                />
                <p className="text-leaf-emphasized text-xs font-semibold tracking-[0.16em] uppercase">
                  Start here
                </p>
              </div>
              <h2 className="mt-4 font-serif text-2xl leading-8 font-semibold">
                Community pathway
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/85">
                Join the network for learning, market access and practical
                support as the ecosystem grows.
              </p>

              <div className="mt-5 flex flex-col gap-3">
                {heroShell.proofPoints.map((point) => (
                  <div key={point.label} className="flex items-center gap-2.5">
                    <CheckCircle2
                      className="text-leaf-emphasized size-4 shrink-0"
                      aria-hidden
                    />
                    <span className="text-sm leading-5 font-medium">
                      {point.label}
                    </span>
                  </div>
                ))}
              </div>
            </MotionFade>
          </div>
        </div>
      </div>
    </section>
  );
}
