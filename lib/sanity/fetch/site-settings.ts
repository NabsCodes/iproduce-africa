import { cache } from "react";
import type { Image } from "sanity";

import { sanityFetch } from "@/lib/sanity/client";
import { resolveImageUrl } from "@/lib/sanity/image";
import { siteSettingsQuery } from "@/lib/sanity/queries";
import type { SiteSocialLink } from "@/types/site";

export type PublicSiteSettings = {
  email: string;
  phone: string;
  address: string;
  socialLinks: readonly SiteSocialLink[];
  communityChannels: {
    telegram?: string;
    whatsapp?: string;
  };
};

type RawSiteSettings = {
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  instagramUrl?: string | null;
  linkedinUrl?: string | null;
  facebookUrl?: string | null;
  youtubeUrl?: string | null;
  telegramUrl?: string | null;
  whatsappUrl?: string | null;
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

function normalizeSiteSettings(
  raw: RawSiteSettings | null,
): PublicSiteSettings {
  if (!raw) {
    throw new Error('Missing required singleton "siteSettings".');
  }

  return {
    email: requireSingletonField(raw.email, "siteSettings", "email"),
    phone: requireSingletonField(raw.phone, "siteSettings", "phone"),
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
