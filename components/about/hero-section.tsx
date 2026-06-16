import { EyebrowPill } from "@/components/ui/eyebrow-pill";
import { EcosystemOrbit } from "@/components/about/ecosystem-orbit";
import { aboutPageContent } from "@/content/about";

export function AboutHeroSection() {
  const { hero } = aboutPageContent;

  return (
    <section className="bg-subtle overflow-x-clip py-16">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="flex max-w-3xl min-w-0 flex-col gap-8">
            <div className="flex flex-col gap-4">
              <EyebrowPill tone="tangerine" size="sm">
                {hero.eyebrow}
              </EyebrowPill>

              <h1 className="text-foreground font-serif text-[40px] leading-none font-semibold tracking-[-0.02em] sm:text-[52px]">
                <span className="block leading-[1.07] lg:leading-16">
                  {hero.title.lineOne.lead}
                  <span className="text-leaf-600">
                    {hero.title.lineOne.accent}
                  </span>
                </span>
                <span className="text-leaf-600 block leading-[1.07] lg:leading-16">
                  {hero.title.lineTwo}
                </span>
                <span className="block leading-[1.07] lg:leading-16">
                  {hero.title.lineThree}
                </span>
              </h1>
            </div>

            <p className="text-fg-muted text-base leading-7">
              {hero.description}
            </p>
          </div>

          <div className="flex min-w-0 justify-center overflow-visible lg:justify-end">
            <EcosystemOrbit orbit={hero.orbit} />
          </div>
        </div>
      </div>
    </section>
  );
}
