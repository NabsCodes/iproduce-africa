import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { aboutPageContent } from "@/content/about";

export function ImpactStatsSection() {
  const impact = aboutPageContent.impactStats;

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="text-center">
          <EyebrowBadge className="justify-center">
            {impact.eyebrow}
          </EyebrowBadge>
          <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
            {impact.title}
          </h2>
          <p className="text-fg-muted mx-auto mt-4 max-w-2xl text-base leading-6">
            {impact.description}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:mt-12 lg:grid-cols-4">
          {impact.items.map((item) => (
            <div
              key={item.label}
              className="border-border rounded-2xl border bg-white p-6 sm:p-8"
            >
              <p className="text-fg-muted text-[11px] font-semibold tracking-[0.18em] uppercase">
                {item.label}
              </p>
              <p className="text-foreground mt-6 font-serif text-5xl leading-none font-semibold tracking-tight tabular-nums sm:mt-8 sm:text-6xl">
                {item.value}
                {item.accent ? (
                  <span className="text-tangerine-500">{item.accent}</span>
                ) : null}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
