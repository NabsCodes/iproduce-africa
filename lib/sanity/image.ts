import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image } from "sanity";

import { client } from "@/lib/sanity/client";

const builder = createImageUrlBuilder(client);

export function urlFor(source: Image) {
  return builder.image(source);
}

/**
 * Flattens a Sanity image field to a plain URL string — every existing
 * content type (`AcademyWebinar.image`, `BlogArticle.cardImage`, etc.) is a
 * `string`, not a Sanity image object, so every fetch-layer projection needs
 * this at the boundary. `@sanity/image-url` only needs the asset reference
 * (not a dereferenced asset document) to build the CDN URL.
 */
export function resolveImageUrl(
  image: Image | null | undefined,
): string | undefined {
  if (!image?.asset) return undefined;
  return urlFor(image).url();
}

/**
 * Build a URL cropped to an exact `width`×`height`. Passing both dimensions
 * makes `@sanity/image-url` compute a crop rectangle that honors the editor's
 * Studio crop *and* hotspot for that target aspect ratio, so the delivered
 * image already matches the target shape — no CSS crop guessing. Used for the
 * About team/advisor cards and dialog, where one photo appears at several
 * fixed aspect ratios.
 */
export function buildCroppedImageUrl(
  image: Image | null | undefined,
  width: number,
  height: number,
): string | undefined {
  if (!image?.asset) return undefined;
  return urlFor(image).width(width).height(height).auto("format").url();
}
