import { ArrowUpRight, Smartphone } from "lucide-react";
import Image from "next/image";

import { CatalogueImage } from "@/components/shared/catalogue-image";
import { MotionFade } from "@/components/shared/motion/motion-fade";
import { DecorativeRing } from "@/components/ui/decorative-ring";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import {
  resolveMobileAppPlatforms,
  storeBadgeAssets,
} from "@/lib/mobile-app-promotion";
import type { MobileAppPromotion } from "@/lib/sanity/fetch/site-settings";

export function MobileAppPromotionSection({
  promotion,
}: {
  promotion: MobileAppPromotion;
}) {
  const platforms = resolveMobileAppPlatforms(promotion);

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="border-default bg-subtle grid gap-8 rounded-xl border p-6 sm:p-8 lg:grid-cols-2 lg:items-center lg:gap-14 lg:p-12">
          <MotionFade className="flex flex-col">
            <EyebrowBadge>Mobile app</EyebrowBadge>
            <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-12">
              {promotion.title}
            </h2>
            <p className="text-fg-muted mt-4 max-w-md text-base leading-7">
              {promotion.description}
            </p>

            <ul className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8">
              {platforms.map((platform) => {
                if (platform.status !== "live") {
                  return (
                    <li
                      key={platform.platform}
                      className="border-default text-fg-muted flex items-center gap-2 rounded-xl border border-dashed bg-white/60 px-4 py-3 text-sm font-medium"
                    >
                      <Smartphone className="size-4 shrink-0" aria-hidden />
                      {platform.label} · Coming soon
                    </li>
                  );
                }

                const badge = storeBadgeAssets[platform.platform];

                return (
                  <li key={platform.platform}>
                    <a
                      href={platform.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${badge?.label ?? `Get the iProduce app on the ${platform.storeLabel}`} (opens in a new tab)`}
                      className={
                        badge
                          ? "focus-visible:ring-leaf-400 inline-flex rounded-xl focus-visible:ring-2 focus-visible:outline-none"
                          : "border-default text-foreground hover:border-leaf-600 hover:text-leaf-700 focus-visible:ring-leaf-400 flex items-center gap-2 rounded-xl border bg-white px-4 py-3 text-sm font-semibold transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                      }
                    >
                      {badge ? (
                        // Official artwork, rendered unmodified at Apple's 40px
                        // minimum on-screen height. No filters or recoloring.
                        <Image
                          src={badge.src}
                          alt=""
                          width={badge.width}
                          height={badge.height}
                          aria-hidden
                          className="h-10 w-auto"
                        />
                      ) : (
                        // Text-only until official badge artwork is registered.
                        // No store glyph stands in for an unapproved badge.
                        <>
                          <span>
                            {platform.label} · {platform.storeLabel}
                          </span>
                          <ArrowUpRight
                            className="size-4 shrink-0"
                            aria-hidden
                          />
                        </>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </MotionFade>

          <MotionFade delay={0.12}>
            {promotion.preview ? (
              <CatalogueImage
                src={promotion.preview.image}
                alt={promotion.preview.alt}
                fit="contain"
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="border-default bg-leaf-subtle aspect-4/3 w-full rounded-xl border"
              />
            ) : (
              <MobileAppPlaceholder />
            )}
          </MotionFade>
        </div>
      </div>
    </section>
  );
}

/**
 * Branded, code-native stand-in for an unbuilt app. Deliberately abstract:
 * silhouettes and brand shapes only, never invented app screens, features, or
 * store proof. It shares the media area's aspect ratio with the uploaded
 * preview so swapping in an approved mockup needs no layout change.
 */
function MobileAppPlaceholder() {
  return (
    <div
      aria-hidden
      className="border-default bg-leaf-subtle relative aspect-4/3 w-full overflow-hidden rounded-xl border"
    >
      <span className="bg-leaf-200/70 absolute -top-12 -left-12 size-40 rounded-full sm:size-52" />
      <span className="bg-tangerine-200/60 absolute -right-12 -bottom-14 size-44 rounded-full sm:size-56" />
      <DecorativeRing
        strokeWidth={2}
        className="text-tangerine-500/50 -top-16 -right-12 size-52 sm:size-72"
      />

      <span className="bg-tangerine-400 text-grey-950 absolute top-4 left-4 rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.08em] uppercase sm:top-5 sm:left-5">
        Coming soon
      </span>

      <div className="absolute inset-0 flex items-end justify-center gap-3 sm:gap-4">
        <div className="bg-forest-900/80 h-[54%] w-[24%] max-w-26 translate-y-6 -rotate-6 rounded-xl" />
        <div className="bg-forest-950 flex h-[72%] w-[34%] max-w-36 translate-y-7 flex-col items-center justify-center gap-4 rounded-xl">
          <span className="h-1 w-8 rounded-full bg-white/20" />
          <span className="flex size-11 items-center justify-center rounded-full bg-white sm:size-14">
            <Image
              src="/images/shared/logo-mark.webp"
              alt=""
              width={56}
              height={56}
              className="size-7 object-contain sm:size-9"
            />
          </span>
        </div>
      </div>
    </div>
  );
}
