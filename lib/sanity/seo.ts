import type { Image } from "sanity";

import { resolveImageUrl } from "@/lib/sanity/image";
import type { SeoMetadata } from "@/types/seo";

export type RawSeoMetadata = {
  title?: string | null;
  description?: string | null;
  image?: Image | null;
};

export function normalizeSeoMetadata(
  value?: RawSeoMetadata | null,
): SeoMetadata | undefined {
  if (!value) return undefined;
  const title = value.title?.trim() || undefined;
  const description = value.description?.trim() || undefined;
  const image = resolveImageUrl(value.image ?? null);
  if (!title && !description && !image) return undefined;
  return { title, description, image };
}
