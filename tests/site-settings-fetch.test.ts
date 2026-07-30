import { describe, expect, it, vi } from "vitest";

const { resolveImageUrl, sanityFetch } = vi.hoisted(() => ({
  resolveImageUrl: vi.fn(),
  sanityFetch: vi.fn(),
}));

vi.mock("@/lib/sanity/client", () => ({ sanityFetch }));
vi.mock("@/lib/sanity/image", () => ({ resolveImageUrl }));

import { resolveMobileAppPlatforms } from "@/lib/mobile-app-promotion";
import { normalizeMobileAppPromotion } from "@/lib/sanity/fetch/site-settings";

type RawSettings = Parameters<typeof normalizeMobileAppPromotion>[0];

const COMING_SOON: RawSettings = {
  mobileAppStatus: "comingSoon",
  mobileAppTitle: "iProduce on mobile, coming soon.",
  mobileAppDescription:
    "We're building a new way to access iProduce on mobile.",
};

describe("normalizeMobileAppPromotion", () => {
  it("hides the promotion when the fields are missing or hidden", () => {
    expect(normalizeMobileAppPromotion({})).toBeUndefined();
    expect(
      normalizeMobileAppPromotion({ mobileAppStatus: "hidden" }),
    ).toBeUndefined();
    expect(
      normalizeMobileAppPromotion({ mobileAppStatus: "somethingElse" }),
    ).toBeUndefined();
  });

  it("hides the promotion when visible copy is incomplete", () => {
    expect(
      normalizeMobileAppPromotion({ ...COMING_SOON, mobileAppTitle: "  " }),
    ).toBeUndefined();
    expect(
      normalizeMobileAppPromotion({
        ...COMING_SOON,
        mobileAppDescription: null,
      }),
    ).toBeUndefined();
  });

  it("exposes a complete coming-soon promotion without store URLs", () => {
    resolveImageUrl.mockReturnValue(undefined);

    expect(
      normalizeMobileAppPromotion({
        ...COMING_SOON,
        iosAppUrl: "https://apps.apple.com/app/id0",
        androidAppUrl: "https://play.google.com/store/apps/details?id=x",
      }),
    ).toEqual({
      status: "comingSoon",
      title: "iProduce on mobile, coming soon.",
      description: "We're building a new way to access iProduce on mobile.",
      preview: undefined,
      iosUrl: undefined,
      androidUrl: undefined,
    });
  });

  it("omits the preview when the image or alt text is absent", () => {
    resolveImageUrl.mockReturnValue(undefined);
    expect(normalizeMobileAppPromotion(COMING_SOON)?.preview).toBeUndefined();

    resolveImageUrl.mockReturnValue("https://cdn.sanity.io/app-preview.png");
    expect(
      normalizeMobileAppPromotion({
        ...COMING_SOON,
        mobileAppPreview: { alt: "   " },
      })?.preview,
    ).toBeUndefined();
  });

  it("exposes an uploaded preview with its alt text", () => {
    resolveImageUrl.mockReturnValue("https://cdn.sanity.io/app-preview.png");

    expect(
      normalizeMobileAppPromotion({
        ...COMING_SOON,
        mobileAppPreview: { alt: "Approved app mockup" },
      })?.preview,
    ).toEqual({
      image: "https://cdn.sanity.io/app-preview.png",
      alt: "Approved app mockup",
    });
  });

  it("keeps a live promotion partial when only one store URL exists", () => {
    resolveImageUrl.mockReturnValue(undefined);

    const ios = normalizeMobileAppPromotion({
      ...COMING_SOON,
      mobileAppStatus: "live",
      iosAppUrl: "https://apps.apple.com/app/id0",
    });
    expect(ios).toMatchObject({
      status: "live",
      iosUrl: "https://apps.apple.com/app/id0",
      androidUrl: undefined,
    });

    const android = normalizeMobileAppPromotion({
      ...COMING_SOON,
      mobileAppStatus: "live",
      androidAppUrl: "https://play.google.com/store/apps/details?id=x",
    });
    expect(android).toMatchObject({
      status: "live",
      iosUrl: undefined,
      androidUrl: "https://play.google.com/store/apps/details?id=x",
    });
  });

  it("exposes both store URLs when live", () => {
    resolveImageUrl.mockReturnValue(undefined);

    expect(
      normalizeMobileAppPromotion({
        ...COMING_SOON,
        mobileAppStatus: "live",
        iosAppUrl: "https://apps.apple.com/app/id0",
        androidAppUrl: "https://play.google.com/store/apps/details?id=x",
      }),
    ).toMatchObject({
      status: "live",
      iosUrl: "https://apps.apple.com/app/id0",
      androidUrl: "https://play.google.com/store/apps/details?id=x",
    });
  });

  it("degrades an invalid live state to coming soon instead of dead buttons", () => {
    resolveImageUrl.mockReturnValue(undefined);

    expect(
      normalizeMobileAppPromotion({
        ...COMING_SOON,
        mobileAppStatus: "live",
        iosAppUrl: "   ",
      }),
    ).toMatchObject({
      status: "comingSoon",
      iosUrl: undefined,
      androidUrl: undefined,
    });
  });
});

describe("resolveMobileAppPlatforms", () => {
  const promotion = {
    status: "comingSoon" as const,
    title: "Title",
    description: "Description",
  };

  it("marks both platforms coming soon when no store URL exists", () => {
    expect(resolveMobileAppPlatforms(promotion)).toEqual([
      {
        platform: "ios",
        label: "iOS",
        storeLabel: "App Store",
        status: "comingSoon",
      },
      {
        platform: "android",
        label: "Android",
        storeLabel: "Google Play",
        status: "comingSoon",
      },
    ]);
  });

  it("links only the platform that has a listing", () => {
    const platforms = resolveMobileAppPlatforms({
      ...promotion,
      status: "live",
      iosUrl: "https://apps.apple.com/app/id0",
    });

    expect(platforms[0]).toMatchObject({
      platform: "ios",
      status: "live",
      href: "https://apps.apple.com/app/id0",
    });
    expect(platforms[1]).toMatchObject({
      platform: "android",
      status: "comingSoon",
    });
  });
});
