import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { EyebrowPill } from "@/components/ui/eyebrow-pill";
import { homeContent } from "@/content/home";

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

export function HeroSection() {
  const { hero } = homeContent;
  const { lead, accent, trail } = splitTitleByAccent(hero.title);

  return (
    <section>
      {/* Mobile: stacked white layout */}
      <div className="bg-white px-4 pt-10 pb-12 sm:px-6 lg:hidden">
        <div className="mx-auto flex max-w-xl flex-col gap-6">
          <EyebrowPill tone={hero.eyebrowTone} size="sm">
            {hero.eyebrow}
          </EyebrowPill>

          <h1 className="text-foreground font-serif text-[34px] leading-[1.1] font-semibold tracking-[-0.02em] sm:text-4xl">
            {lead}
            <span className="text-leaf-700">{accent}</span>
            {trail}
          </h1>

          <p className="text-fg-muted text-base leading-6">
            {hero.description}
          </p>

          <div className="flex flex-col gap-3">
            <ButtonLink
              href={hero.primaryCta.href}
              variant="green"
              size="lg"
              fullWidth
            >
              {hero.primaryCta.label}
              <ArrowUpRight className="size-5" />
            </ButtonLink>
            <ButtonLink
              href={hero.secondaryCta.href}
              variant="green-soft"
              size="lg"
              fullWidth
            >
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>

          <div className="relative aspect-5/4 overflow-hidden rounded-3xl">
            <Image
              src={hero.image}
              alt={hero.imageAlt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 0"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {hero.stats.map((stat) => (
              <div
                key={stat.label}
                className="border-border rounded-2xl border bg-white px-3 py-4 text-center"
              >
                <p className="text-foreground font-serif text-xl font-semibold">
                  {stat.value}
                  <span className="font-normal">{stat.suffix}</span>
                </p>
                <p className="text-fg-subtle mt-1 text-[11px]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop: full-bleed overlay layout */}
      <div className="relative hidden min-h-[720px] overflow-hidden lg:block">
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
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
              <EyebrowPill tone={hero.eyebrowTone} size="sm">
                {hero.eyebrow}
              </EyebrowPill>

              <h1 className="mt-6 font-serif text-4xl leading-[1.06] font-semibold tracking-[-0.02em] text-white sm:text-5xl lg:text-[72px] lg:leading-[76px]">
                {hero.title}
              </h1>

              <p className="mt-8 max-w-[618px] text-lg leading-7 text-white">
                {hero.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <ButtonLink
                  href={hero.primaryCta.href}
                  variant="green"
                  size="lg"
                >
                  {hero.primaryCta.label}
                  <ArrowUpRight className="size-5" />
                </ButtonLink>
                <ButtonLink
                  href={hero.secondaryCta.href}
                  variant="green-soft"
                  size="lg"
                >
                  {hero.secondaryCta.label}
                </ButtonLink>
              </div>
            </div>

            <div className="w-full max-w-md rounded-lg border border-white/20 bg-white/20 p-6 backdrop-blur-sm lg:w-auto lg:max-w-none">
              <div className="mb-4 flex items-center gap-2">
                <span
                  className="bg-leaf-emphasized size-1.5 shrink-0 rounded-full"
                  aria-hidden
                />
                <div className="h-px flex-1 bg-[#e2dfda]" aria-hidden />
              </div>
              <div className="flex gap-8 sm:gap-10">
                {hero.stats.map((stat, index) => (
                  <div key={stat.label}>
                    <p className="font-serif text-[32px] leading-10 tracking-[-0.01em] text-white">
                      <span className="font-semibold">{stat.value}</span>
                      <span
                        className={
                          index === 2
                            ? "text-leaf-emphasized font-normal italic"
                            : undefined
                        }
                      >
                        {stat.suffix}
                      </span>
                    </p>
                    <p className="mt-1 text-xs text-white">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
