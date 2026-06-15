import { ValueChainsCarousel } from "@/components/home/value-chains-carousel";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";

export function ValueChainsSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <EyebrowBadge>Core areas of focus</EyebrowBadge>
            <h2 className="text-foreground mt-3 font-serif text-[40px] leading-[48px] font-semibold tracking-[-0.01em]">
              Four connected sectors
            </h2>
          </div>
          <p className="max-w-[360px] text-base leading-6 text-[var(--text-fg-muted)]">
            Four connected sectors forming the backbone of iProduce
            Africa&apos;s agribusiness transformation agenda.
          </p>
        </div>

        <div className="mt-10">
          <ValueChainsCarousel />
        </div>
      </div>
    </section>
  );
}
