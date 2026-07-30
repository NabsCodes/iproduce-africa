import { cache } from "react";
import type { Image } from "sanity";

import { sanityFetch } from "@/lib/sanity/client";
import { resolveImageUrl } from "@/lib/sanity/image";
import { siteSettingsQuery } from "@/lib/sanity/queries";
import type { SiteSocialLink } from "@/types/site";

/**
 * Public app-promotion state. `hidden`, missing fields, and incomplete copy
 * all normalize away, so every consumer only ever sees a renderable promotion.
 */
export type MobileAppPromotion = {
  status: "comingSoon" | "live";
  title: string;
  description: string;
  preview?: {
    image: string;
    alt: string;
  };
  iosUrl?: string;
  androidUrl?: string;
};

export type PublicSiteSettings = {
  email: string;
  phone: string;
  secondaryPhone?: string;
  address: string;
  socialLinks: readonly SiteSocialLink[];
  communityChannels: {
    telegram?: string;
    whatsapp?: string;
  };
  mobileAppPromotion?: MobileAppPromotion;
};

type RawSiteSettings = {
  email?: string | null;
  phone?: string | null;
  secondaryPhone?: string | null;
  address?: string | null;
  instagramUrl?: string | null;
  linkedinUrl?: string | null;
  facebookUrl?: string | null;
  youtubeUrl?: string | null;
  telegramUrl?: string | null;
  whatsappUrl?: string | null;
  mobileAppStatus?: string | null;
  mobileAppTitle?: string | null;
  mobileAppDescription?: string | null;
  mobileAppPreview?: { image?: Image | null; alt?: string | null } | null;
  iosAppUrl?: string | null;
  androidAppUrl?: string | null;
};

const SOCIAL_PLATFORM_FIELDS = [
  { platform: "instagram", label: "Instagram", field: "instagramUrl" },
  { platform: "linkedin", label: "LinkedIn", field: "linkedinUrl" },
  { platform: "facebook", label: "Facebook", field: "facebookUrl" },
  { platform: "youtube", label: "YouTube", field: "youtubeUrl" },
] as const;

function requireSingletonField<T>(
  value: T | null | undefined,
  docId: string,
  field: string,
): T {
  if (value === null || value === undefined || value === "") {
    throw new Error(`Missing required field "${field}" on ${docId}.`);
  }
  return value;
}

/**
 * Existing `siteSettings` documents predate these fields, so anything missing,
 * hidden, or incompletely filled in degrades to no promotion at all. A `live`
 * status with no usable store URL degrades to `comingSoon` rather than
 * rendering dead store buttons. The optional preview uses the non-throwing
 * image resolver so an absent mockup can never fail the public layout.
 */
export function normalizeMobileAppPromotion(
  raw: RawSiteSettings,
): MobileAppPromotion | undefined {
  const status = raw.mobileAppStatus;
  if (status !== "comingSoon" && status !== "live") return undefined;

  const title = raw.mobileAppTitle?.trim();
  const description = raw.mobileAppDescription?.trim();
  if (!title || !description) return undefined;

  const previewImage = resolveImageUrl(raw.mobileAppPreview?.image ?? null);
  const previewAlt = raw.mobileAppPreview?.alt?.trim();

  const iosUrl = status === "live" ? raw.iosAppUrl?.trim() : undefined;
  const androidUrl = status === "live" ? raw.androidAppUrl?.trim() : undefined;

  return {
    status: iosUrl || androidUrl ? status : "comingSoon",
    title,
    description,
    preview:
      previewImage && previewAlt
        ? { image: previewImage, alt: previewAlt }
        : undefined,
    iosUrl: iosUrl || undefined,
    androidUrl: androidUrl || undefined,
  };
}

function normalizeSiteSettings(
  raw: RawSiteSettings | null,
): PublicSiteSettings {
  if (!raw) {
    throw new Error('Missing required singleton "siteSettings".');
  }

  return {
    email: requireSingletonField(raw.email, "siteSettings", "email"),
    phone: requireSingletonField(raw.phone, "siteSettings", "phone"),
    secondaryPhone: raw.secondaryPhone?.trim() || undefined,
    address: requireSingletonField(raw.address, "siteSettings", "address"),
    socialLinks: SOCIAL_PLATFORM_FIELDS.map(({ platform, label, field }) => {
      const href = raw[field]?.trim() || undefined;
      return {
        label,
        platform,
        href,
      };
    }),
    communityChannels: {
      telegram: raw.telegramUrl?.trim() || undefined,
      whatsapp: raw.whatsappUrl?.trim() || undefined,
    },
    mobileAppPromotion: normalizeMobileAppPromotion(raw),
  };
}

export const fetchSiteSettings = cache(
  async (): Promise<PublicSiteSettings> => {
    const raw = await sanityFetch<RawSiteSettings | null>(siteSettingsQuery);
    return normalizeSiteSettings(raw);
  },
);

export function resolveImageWithAlt(
  value:
    | {
        image?: Image | null;
        alt?: string | null;
      }
    | null
    | undefined,
  docId: string,
  field: string,
): { image: string; alt: string } {
  const image = resolveImageUrl(value?.image ?? null);
  const alt = value?.alt?.trim();
  if (!image || !alt) {
    throw new Error(`Missing required image or alt on ${docId}.${field}.`);
  }
  return { image, alt };
}
