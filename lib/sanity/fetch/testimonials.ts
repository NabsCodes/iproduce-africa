import type { Image } from "sanity";

import { sanityFetch } from "@/lib/sanity/client";
import { resolveImageUrl } from "@/lib/sanity/image";
import { initialsFromName } from "@/lib/sanity/initials";
import { testimonialsByPlacementQuery } from "@/lib/sanity/queries";
import type { TestimonialItem } from "@/types/content";

export type TestimonialPlacement = "home" | "academy" | "partners-voices";

type RawTestimonialDoc = {
  id: string;
  quote: string;
  name: string;
  role: string;
  image: Image | null;
  initials?: string | null;
};

function normalizeTestimonial(raw: RawTestimonialDoc): TestimonialItem {
  return {
    id: raw.id,
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
