import { ArrowUpRight } from "lucide-react";

import { SiteCtaButton } from "@/components/shared/site-cta-button";
import type { ApplyBannerContent, ApplyBannerCta } from "@/types/content";

type CommunityApplyBannerProps = {
  content: ApplyBannerContent;
};

function CommunityApplyBannerCta({ cta }: { cta: ApplyBannerCta }) {
  return (
    <SiteCtaButton
      href={cta.href}
      action={cta.action}
      variant={cta.variant}
      size="lg"
      className="w-full sm:w-auto"
    >
      {cta.label}
      {cta.variant === "green" ? (
        <ArrowUpRight className="size-5" />
      ) : null}
    </SiteCtaButton>
  );
}

export function CommunityApplyBanner({ content }: CommunityApplyBannerProps) {
  return (
    <section className="bg-leaf-100 py-14 sm:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-xl">
            <h2 className="text-foreground font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-3xl">
              {content.title}
            </h2>
            <p className="text-fg-muted mt-2 text-base leading-7">
              {content.subtitle}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:shrink-0">
            {content.ctas.map((cta) => (
              <CommunityApplyBannerCta key={cta.href + cta.label} cta={cta} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
