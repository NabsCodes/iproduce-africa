import type { Image } from "sanity";

import { sanityFetch } from "@/lib/sanity/client";
import { resolveImageUrl } from "@/lib/sanity/image";
import { partnersQuery } from "@/lib/sanity/queries";
import type { Partner } from "@/types/partners";

type SanityImageField = Image & { alt?: string };

type RawPartnerDoc = {
  slug: string;
  name: string;
  logo: SanityImageField | null;
  website?: string | null;
  showInMarquee: boolean;
  showInVoices: boolean;
  order?: number | null;
};

export type PartnerCatalogue = {
  marquee: readonly Partner[];
  voices: readonly Partner[];
};

function normalizePartner(raw: RawPartnerDoc): Partner {
  return {
    id: raw.slug,
    name: raw.name,
    logo: resolveImageUrl(raw.logo) ?? "",
    logoAlt: raw.logo?.alt,
    href: raw.website ?? undefined,
    order: raw.order ?? undefined,
  };
}

/**
 * Single fetch, split into the two surfaces that read it — matches the
 * fetch-once/derive-multiple-views pattern used elsewhere (e.g. the Academy
 * hub deriving its bands and count labels from one listing fetch) rather
 * than issuing a `showInMarquee`/`showInVoices`-filtered query twice.
 */
export async function fetchPartners(): Promise<PartnerCatalogue> {
  const raw = await sanityFetch<RawPartnerDoc[]>(partnersQuery);

  const marquee: Partner[] = [];
  const voices: Partner[] = [];

  for (const doc of raw) {
    const partner = normalizePartner(doc);
    if (doc.showInMarquee) marquee.push(partner);
    if (doc.showInVoices) voices.push(partner);
  }

  return { marquee, voices };
}
