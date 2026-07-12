"use client";

import { NextStudio } from "next-sanity/studio";

import config from "@/sanity.config";

// `sanity.config`'s schema (validation rules, structure resolvers, i18n
// resources) is full of functions. With `next-sanity` no longer in
// `serverExternalPackages` (see next.config.ts), Turbopack correctly treats
// `next-sanity/studio`'s inner component as a real RSC client boundary —
// which means a Server Component rendering `<NextStudio config={config} />`
// would have to serialize `config` across that boundary, and functions
// aren't serializable. Marking this page itself a Client Component keeps
// `config` and `<NextStudio>` in the same client module graph, so no
// server→client prop serialization ever happens.
export const dynamic = "force-static";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
