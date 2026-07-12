import { MotionFade } from "@/components/shared/motion/motion-fade";
import { PartnerLogo } from "@/components/shared/partner-logo";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { Marquee } from "@/components/ui/marquee";
import type { Partner } from "@/types/partners";

type PartnersSectionProps = {
  partners: readonly Partner[];
};

export function PartnersSection({ partners }: PartnersSectionProps) {
  return (
    <section className="bg-forest-subtle py-14 sm:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <MotionFade>
          <div className="text-center">
            <EyebrowBadge className="justify-center">Our partners</EyebrowBadge>
            <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
              Trusted by Partners across the Ecosystem
            </h2>
            <p className="text-fg-muted mx-auto mt-4 max-w-2xl text-base leading-6">
              Our trainings, network and alliances are organised around
              high-opportunity value chains — with more being added.
            </p>
          </div>

          <div className="relative mt-10 sm:mt-12">
            <Marquee
              pauseOnHover
              repeat={4}
              className="[--duration:20s] [--gap:1rem]"
            >
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="border-border/60 bg-panel flex h-16 w-[180px] items-center justify-center rounded-xl border px-6 sm:h-20 sm:w-[240px] sm:px-8"
                >
                  <PartnerLogo partner={partner} />
                </div>
              ))}
            </Marquee>

            <div className="from-forest-subtle pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r to-transparent sm:w-24" />
            <div className="from-forest-subtle pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l to-transparent sm:w-24" />
          </div>
        </MotionFade>
      </div>
    </section>
  );
}
