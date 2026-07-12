import type { Image } from "sanity";

import { sanityFetch } from "@/lib/sanity/client";
import { resolveImageUrl } from "@/lib/sanity/image";
import { testimonialsByPlacementQuery } from "@/lib/sanity/queries";
import type { TestimonialItem } from "@/types/content";

export type TestimonialPlacement = "home" | "academy" | "partners-voices";

type RawTestimonialDoc = {
  quote: string;
  name: string;
  role: string;
  image: Image | null;
  initials?: string | null;
};

/** First + last word initials (e.g. "Aïssatou Diallo" → "AD"); single-word
 * names fall back to their first two letters. */
function initialsFromName(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}

function normalizeTestimonial(raw: RawTestimonialDoc): TestimonialItem {
  return {
    quote: raw.quote,
    name: raw.name,
    role: raw.role,
    image: resolveImageUrl(raw.image),
    // A doc with neither `image` nor `initials` would otherwise render an
    // empty AvatarFallback circle — derive from `name` when blank, but keep
    // an editor-supplied value if one was given.
    initials: raw.initials?.trim() || initialsFromName(raw.name),
  };
}

export async function fetchTestimonials(
  placement: TestimonialPlacement,
): Promise<TestimonialItem[]> {
  const raw = await sanityFetch<RawTestimonialDoc[]>(
    testimonialsByPlacementQuery,
    { placement },
  );
  return raw.map(normalizeTestimonial);
}
