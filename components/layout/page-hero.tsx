import type { EyebrowTone } from "@/types/content";
import { EyebrowPill } from "@/components/ui/eyebrow-pill";

type PageHeroProps = {
  eyebrow: string;
  eyebrowTone?: EyebrowTone;
  title: string;
  description: string;
};

export function PageHero({
  eyebrow,
  eyebrowTone = "tangerine",
  title,
  description,
}: PageHeroProps) {
  return (
    <section className="bg-bg-subtle py-20 sm:py-28">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="max-w-4xl">
          <EyebrowPill tone={eyebrowTone}>{eyebrow}</EyebrowPill>
          <h1 className="text-foreground mt-4 max-w-3xl font-serif text-4xl leading-[1.08] font-semibold sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-(--text-fg-muted) sm:text-lg">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
