import { ArrowUpRight } from "lucide-react";

import { SocialIcon } from "@/components/layout/social-icon";
import { MotionFade } from "@/components/shared/motion/motion-fade";
import { MotionStagger } from "@/components/shared/motion/motion-stagger";
import {
  darkPanelDashedRingClass,
  DashedDecorativeRing,
} from "@/components/ui/decorative-ring";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { homeContent } from "@/content/home";
import { cn } from "@/lib/utils";
import type { SiteSocialLink } from "@/types/site";

function buildSocialCards(socialLinks: readonly SiteSocialLink[]) {
  return homeContent.stayConnected.platforms
    .map((platform) =>
      socialLinks.find((social) => social.platform === platform),
    )
    .filter((social): social is SiteSocialLink => social !== undefined);
}

function SocialCard({ social }: { social: SiteSocialLink }) {
  const cardClass =
    "group/social border-white/10 bg-forest-900/70 flex min-h-[132px] flex-col justify-between rounded-lg border p-5 text-left transition-colors sm:min-h-[148px] sm:p-6";
  const cardContent = (
    <>
      <span className="bg-leaf-900/80 text-leaf-300 inline-flex size-11 items-center justify-center rounded-xl">
        <SocialIcon platform={social.platform} className="size-[18px]" />
      </span>
      <span className="mt-6 flex items-end justify-between gap-4">
        <span className="font-serif text-2xl leading-none font-semibold text-white sm:text-[28px]">
          {social.label}
        </span>
        <ArrowUpRight className="text-leaf-300 size-5 transition-transform group-hover/social:translate-x-0.5 group-hover/social:-translate-y-0.5" />
      </span>
    </>
  );

  if (!social.href) {
    return (
      <span
        aria-disabled="true"
        title="Coming soon"
        className={cn(cardClass, "cursor-default opacity-75")}
      >
        {cardContent}
      </span>
    );
  }

  return (
    <a
      href={social.href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        cardClass,
        "hover:border-leaf-400/30 hover:bg-forest-800 focus-visible:ring-leaf-300 focus-visible:ring-2 focus-visible:outline-none",
      )}
    >
      {cardContent}
    </a>
  );
}

export function StayConnectedSection({
  socialLinks,
}: {
  socialLinks: readonly SiteSocialLink[];
}) {
  const socialCards = buildSocialCards(socialLinks);
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="bg-forest-950 relative overflow-hidden rounded-xl px-5 py-12 text-center sm:px-8 sm:py-14 lg:px-16 lg:py-20">
          <DashedDecorativeRing className={darkPanelDashedRingClass} />

          <div className="relative mx-auto max-w-full">
            <MotionFade>
              <EyebrowBadge className="justify-center">
                {homeContent.stayConnected.eyebrow}
              </EyebrowBadge>
              <h2 className="mt-3 font-serif text-3xl leading-tight font-semibold tracking-[-0.01em] text-white sm:text-4xl sm:leading-[48px]">
                {homeContent.stayConnected.title}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-6 text-white/70">
                {homeContent.stayConnected.description}
              </p>
            </MotionFade>

            <MotionStagger className="relative mt-9 grid gap-4 text-left sm:grid-cols-2 sm:gap-5 lg:mt-12 lg:grid-cols-3 lg:gap-6">
              {socialCards.map((social) => (
                <SocialCard key={social.platform} social={social} />
              ))}
            </MotionStagger>
          </div>
        </div>
      </div>
    </section>
  );
}
