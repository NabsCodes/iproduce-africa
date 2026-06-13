import { Container } from "@/components/ui/container";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";

const partnerSlots = Array.from({ length: 7 }, (_, index) => index + 1);

export function PartnersSection() {
  return (
    <section className="bg-[var(--forest-subtle)] pt-56 pb-20">
      <Container>
        <div className="text-center">
          <EyebrowBadge className="justify-center">Our partners</EyebrowBadge>
          <h2 className="text-foreground mt-3 font-serif text-[40px] leading-[48px] font-semibold tracking-[-0.01em]">
            Trusted by Partners across the Ecosystem
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-6 text-[var(--text-fg-muted)]">
            Our trainings, network and alliances are organised around
            high-opportunity value chains — with more being added.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {partnerSlots.map((slot) => (
            <div
              key={slot}
              className="flex h-14 w-[184px] items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-white"
            >
              <span className="text-[11px] font-semibold tracking-[0.14em] text-[var(--text-fg-subtle)]">
                PARTNER LOGO
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
