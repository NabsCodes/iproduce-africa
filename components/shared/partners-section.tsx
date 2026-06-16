import { EyebrowBadge } from "@/components/ui/eyebrow-badge";

const partnerSlots = Array.from({ length: 7 }, (_, index) => index + 1);

export function PartnersSection() {
  return (
    <section className="bg-forest-subtle pt-36 pb-14 sm:pt-40 sm:pb-16 lg:pt-56 lg:pb-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="text-center">
          <EyebrowBadge className="justify-center">Our partners</EyebrowBadge>
          <h2 className="text-foreground mt-3 font-serif text-3xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
            Trusted by Partners across the Ecosystem
          </h2>
          <p className="text-fg-muted mx-auto mt-4 max-w-2xl text-base leading-6">
            Our trainings, network and alliances are organised around
            high-opportunity value chains — with more being added.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3 sm:mt-10 sm:gap-4">
          {partnerSlots.map((slot) => (
            <div
              key={slot}
              className="border-border flex h-12 w-[152px] items-center justify-center rounded-xl border bg-white sm:h-14 sm:w-[184px]"
            >
              <span className="text-fg-subtle text-[11px] font-semibold tracking-[0.14em]">
                PARTNER LOGO
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
