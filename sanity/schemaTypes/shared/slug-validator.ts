import type { SlugValidationContext } from "sanity";
import { apiVersion } from "@/sanity/env";

/** Slug uniqueness scoped to a single document `_type` (standard Sanity docs pattern). */
export function createSlugIsUnique(type: string) {
  return async function isUnique(slug: string, context: SlugValidationContext) {
    const { document, getClient } = context;
    const client = getClient({ apiVersion });
    const id = (document?._id ?? "").replace(/^drafts\./, "");
    const params = { draft: `drafts.${id}`, published: id, slug, type };
    const query = `*[_type == $type && !(_id in [$draft, $published]) && slug.current == $slug]`;
    const result = await client.fetch(query, params);
    return result.length === 0;
  };
}
