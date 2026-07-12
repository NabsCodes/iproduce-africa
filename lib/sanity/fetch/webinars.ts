import type { Image } from "sanity";

import { webinarToRelatedItem } from "@/content/webinars";
import { sanityFetch } from "@/lib/sanity/client";
import { resolveImageUrl } from "@/lib/sanity/image";
import {
  featuredWebinarQuery,
  hubScheduledWebinarsQuery,
  relatedWebinarsQuery,
  webinarBySlugQuery,
  webinarsListingQuery,
  webinarSlugsQuery,
} from "@/lib/sanity/queries";
import type {
  AcademyRegistrationConfig,
  AcademyRelatedItem,
  AcademyScheduledType,
  AcademyWebinar,
} from "@/types/academy";

type SanityImageField = Image & { alt?: string };

type RawWebinarDoc = {
  slug: string;
  title: string;
  type: AcademyScheduledType;
  date: string;
  description: string;
  excerpt: string;
  image: SanityImageField | null;
  body: string[];
  dateLabel?: string | null;
  location?: string | null;
  format?: string | null;
  speakers?: string | null;
  registration?: AcademyRegistrationConfig | null;
};

/** Date-only, matching `content/webinars.ts`'s `sessionDateKey` — see the
 * comment on `hubScheduledWebinarsQuery`/`relatedWebinarsQuery`. */
function todayDateKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function normalizeWebinar(raw: RawWebinarDoc): AcademyWebinar {
  return {
    slug: raw.slug,
    type: raw.type,
    date: raw.date,
    title: raw.title,
    description: raw.description,
    image: resolveImageUrl(raw.image) ?? "",
    imageAlt: raw.image?.alt,
    excerpt: raw.excerpt,
    body: raw.body,
    dateLabel: raw.dateLabel ?? undefined,
    location: raw.location ?? undefined,
    format: raw.format ?? undefined,
    speakers: raw.speakers ?? undefined,
    registration: raw.registration ?? undefined,
  };
}

export async function fetchWebinarSlugs(): Promise<string[]> {
  return sanityFetch<string[]>(webinarSlugsQuery);
}

export async function fetchWebinarBySlug(
  slug: string,
): Promise<AcademyWebinar | null> {
  const raw = await sanityFetch<RawWebinarDoc | null>(webinarBySlugQuery, {
    slug,
  });
  return raw ? normalizeWebinar(raw) : null;
}

export async function fetchWebinarsListing(): Promise<AcademyWebinar[]> {
  const raw = await sanityFetch<RawWebinarDoc[]>(webinarsListingQuery);
  return raw.map(normalizeWebinar);
}

export async function fetchFeaturedWebinar(
  featuredSlug: string | null,
): Promise<AcademyWebinar | null> {
  const raw = await sanityFetch<RawWebinarDoc | null>(featuredWebinarQuery, {
    featuredSlug,
  });
  return raw ? normalizeWebinar(raw) : null;
}

/**
 * Used by the Home spotlight preview (`fetchHomeAcademyPreview`), which has
 * no other reason to fetch the full webinar listing. The `/academy` hub
 * page derives its own upcoming-webinars slice from `fetchWebinarsListing()`
 * instead, since it fetches that listing anyway for its total-count label —
 * calling this too would be a redundant, near-duplicate request.
 */
export async function fetchHubScheduledWebinars(
  limit: number,
): Promise<AcademyWebinar[]> {
  const raw = await sanityFetch<RawWebinarDoc[]>(hubScheduledWebinarsQuery, {
    limit,
    today: todayDateKey(),
  });
  return raw.map(normalizeWebinar);
}

export async function fetchRelatedWebinars(
  slug: string,
  limit = 3,
): Promise<AcademyRelatedItem[]> {
  const raw = await sanityFetch<RawWebinarDoc[]>(relatedWebinarsQuery, {
    slug,
    limit,
    today: todayDateKey(),
  });
  return raw.map(normalizeWebinar).map(webinarToRelatedItem);
}
