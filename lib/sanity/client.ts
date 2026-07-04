import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

/**
 * App-side read client — not imported by any route yet. Scaffolding for the
 * fetch-layer slice. `useCdn: false` matches the locked decision to rely on
 * path-based revalidation rather than the CDN cache.
 */
export const client = createClient({
  projectId: projectId ?? "",
  dataset,
  apiVersion,
  useCdn: false,
});
