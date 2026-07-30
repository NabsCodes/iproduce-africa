import type { MobileAppPromotion } from "@/lib/sanity/fetch/site-settings";

export type MobileAppPlatform = "ios" | "android";

export type StoreBadgeAsset = {
  /** Unmodified artwork from Apple Marketing Tools / Google Play Console. */
  src: string;
  width: number;
  height: number;
  /** Wording baked into the official badge, e.g. "Download on the App Store". */
  label: string;
};

/**
 * Official store badges are the platform owners' sanctioned promotional asset,
 * and each variant requires a matching real store state (live, pre-order, or
 * pre-registration). Both entries are intentionally empty: no listing exists
 * yet. At launch, drop the downloaded artwork into `public/images/shared/` and
 * add the entry here — never recreate, recolor, animate, or imitate a badge.
 * Until then the live branch falls back to a plain text link.
 */
export const storeBadgeAssets: Partial<
  Record<MobileAppPlatform, StoreBadgeAsset>
> = {};

export type MobileAppPlatformState = {
  platform: MobileAppPlatform;
  /** Short platform name, e.g. "iOS". */
  label: string;
  /** Store name used in link copy, e.g. "App Store". */
  storeLabel: string;
} & ({ status: "live"; href: string } | { status: "comingSoon" });

/**
 * Per-platform state shared by the Community section and the footer status, so
 * a partially-live release renders the same way on both surfaces: the platform
 * with a real store URL links out, the other stays a display-only coming-soon
 * indicator instead of a dead button.
 */
export function resolveMobileAppPlatforms(
  promotion: MobileAppPromotion,
): MobileAppPlatformState[] {
  return (
    [
      {
        platform: "ios",
        label: "iOS",
        storeLabel: "App Store",
        href: promotion.iosUrl,
      },
      {
        platform: "android",
        label: "Android",
        storeLabel: "Google Play",
        href: promotion.androidUrl,
      },
    ] as const
  ).map(({ href, ...platform }) =>
    href
      ? { ...platform, status: "live" as const, href }
      : { ...platform, status: "comingSoon" as const },
  );
}
