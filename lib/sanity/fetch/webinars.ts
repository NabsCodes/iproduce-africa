import { client } from "@/lib/sanity/client";
import {
  featuredWebinarQuery,
  hubScheduledWebinarsQuery,
  relatedWebinarsQuery,
  webinarBySlugQuery,
  webinarSlugsQuery,
  webinarsListingQuery,
} from "@/lib/sanity/queries";
import type { AcademyWebinar } from "@/types/academy";

/**
 * Scaffolding for the fetch-layer slice — not imported by any route yet.
 * Return shapes are provisional; the real GROQ projection wiring happens
 * when Academy routes actually cut over to Sanity.
 */

export async function fetchWebinarSlugs(): Promise<string[]> {
  return client.fetch(webinarSlugsQuery);
}

export async function fetchWebinarBySlug(
  slug: string,
): Promise<AcademyWebinar | null> {
  return client.fetch(webinarBySlugQuery, { slug });
}

export async function fetchWebinarsListing(): Promise<AcademyWebinar[]> {
  return client.fetch(webinarsListingQuery);
}

export async function fetchFeaturedWebinar(
  featuredSlug: string | null,
): Promise<AcademyWebinar | null> {
  return client.fetch(featuredWebinarQuery, { featuredSlug });
}

export async function fetchHubScheduledWebinars(
  limit: number,
): Promise<AcademyWebinar[]> {
  return client.fetch(hubScheduledWebinarsQuery, { limit });
}

export async function fetchRelatedWebinars(
  slug: string,
  limit = 3,
): Promise<AcademyWebinar[]> {
  return client.fetch(relatedWebinarsQuery, { slug, limit });
}
