/**
 * `sanity.config.ts` (and therefore this file) gets bundled for the browser
 * since Studio runs client-side. Next only inlines `NEXT_PUBLIC_*` vars it
 * can statically see as `process.env.NEXT_PUBLIC_FOO` expressions — a
 * dynamic `process.env[name]` lookup is invisible to that replacement and
 * would read `undefined` on the client even when the var is set. Every read
 * below must stay a direct static member access.
 */
function readTrimmed(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export const apiVersion =
  readTrimmed(process.env.NEXT_PUBLIC_SANITY_API_VERSION) ?? "2026-01-01";

export const dataset =
  readTrimmed(process.env.NEXT_PUBLIC_SANITY_DATASET) ?? "development";

export const projectId = readTrimmed(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
