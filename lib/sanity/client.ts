import "server-only";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

/**
 * Read directly via `process.env`, not `sanity/env.ts` — that file is also
 * imported by the browser-bundled Studio config and must stay secret-free.
 * `lib/sanity/client.ts` is server-only (never imported by `sanity.config.ts`).
 */
function readTrimmedEnv(name: string): string | undefined {
  const value = process.env[name];
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

/**
 * The `development` dataset is private (confirmed empirically — unauthenticated
 * queries return an empty result set, not a 403, which silently produces zero
 * pages instead of an error). Prefer a scoped read token; a write token can
 * read too, so fall back to it rather than force a second token to exist.
 */
const token =
  readTrimmedEnv("SANITY_API_READ_TOKEN") ??
  readTrimmedEnv("SANITY_API_WRITE_TOKEN");

/**
 * This module is only imported by `lib/sanity/fetch/*` (and, transitively,
 * only by the public routes that call those functions) — never by
 * `sanity.config.ts`/Studio. So it's safe, and correct, to fail loudly at
 * module-eval time rather than deferring the check: any route that reaches
 * this import genuinely requires real Sanity content. `next-sanity`'s own
 * `createClient` throws on an empty `projectId` anyway ("Configuration must
 * contain `projectId`") — this replaces that vague, unlabelled error with
 * one that names the exact env var to set.
 */
if (!projectId) {
  throw new Error(
    "Sanity is not configured: set NEXT_PUBLIC_SANITY_PROJECT_ID (and NEXT_PUBLIC_SANITY_DATASET) before any public route can fetch content.",
  );
}
if (!token) {
  throw new Error(
    "Sanity is not configured: set SANITY_API_READ_TOKEN (or SANITY_API_WRITE_TOKEN as a fallback) — the dataset is private, so an unauthenticated fetch would silently return zero results instead of erroring.",
  );
}

/**
 * App-side read client. `useCdn: false` matches the locked decision to rely
 * on path-based revalidation rather than the CDN cache.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T> {
  return client.fetch<T>(query, params);
}
