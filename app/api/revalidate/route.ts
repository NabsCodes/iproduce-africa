import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

import { sanityFetch } from "@/lib/sanity/client";
import { articleSlugsByAuthorIdQuery } from "@/lib/sanity/queries";

/**
 * Sanity webhook → `revalidatePath`. Phase 1/2 catalogue types plus the
 * durable Phase 3 singletons (`siteSettings`, `legalPage`, `homePage`, and
 * `aboutPage`) — see
 * docs/cms-migration-spec.md's revalidation table.
 */

type SanityWebhookPayload = {
  id?: string;
  _type?: string;
  key?: string;
  slug?: string;
  previousSlug?: string;
};

const STATIC_PATHS_BY_TYPE: Record<string, readonly string[]> = {
  academyArticle: [
    "/academy/blog",
    "/academy",
    "/",
    "/academy/search",
    "/sitemap.xml",
  ],
  academyWebinar: [
    "/academy/webinars",
    "/academy",
    "/",
    "/academy/search",
    "/sitemap.xml",
  ],
  academyCourse: [
    "/academy/courses",
    "/academy",
    "/",
    "/academy/search",
    "/sitemap.xml",
  ],
  academyCategory: ["/", "/academy", "/academy/search"],
  author: ["/academy/blog", "/academy", "/", "/academy/search"],
  testimonial: ["/", "/academy", "/partners"],
  faq: ["/", "/academy", "/community", "/partners", "/contact"],
  partner: ["/", "/partners"],
  teamMember: ["/about"],
  memberStory: ["/community"],
  siteSettings: ["/"],
  legalPage: ["/privacy", "/terms", "/cookies", "/accessibility"],
  homePage: ["/"],
  aboutPage: ["/about"],
};

const LEGAL_PATH_BY_KEY: Record<string, string> = {
  privacy: "/privacy",
  terms: "/terms",
  cookies: "/cookies",
  accessibility: "/accessibility",
};

/** Detail route prefix per `_type`, for old/new slug revalidation on change. */
const DETAIL_PATH_PREFIX_BY_TYPE: Record<string, string> = {
  academyArticle: "/academy/blog",
  academyWebinar: "/academy/webinars",
  academyCourse: "/academy/courses",
};

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const { body, isValidSignature } = await parseBody<SanityWebhookPayload>(
    request,
    secret,
  );

  if (!isValidSignature) {
    return NextResponse.json({ error: "invalid_signature" }, { status: 401 });
  }

  const type = body?._type;
  const staticPaths = type ? STATIC_PATHS_BY_TYPE[type] : undefined;

  if (!type || !staticPaths) {
    return NextResponse.json(
      { revalidated: false, reason: "unhandled_type" },
      { status: 200 },
    );
  }

  const paths = new Set(staticPaths);

  if (type === "author" && body.id) {
    const slugs = await sanityFetch<string[]>(articleSlugsByAuthorIdQuery, {
      id: body.id,
    });
    for (const slug of slugs) paths.add(`/academy/blog/${slug}`);
  }

  if (type === "legalPage") {
    paths.clear();
    const key = body.key;
    if (key && LEGAL_PATH_BY_KEY[key]) {
      paths.add(LEGAL_PATH_BY_KEY[key]);
    } else {
      for (const path of Object.values(LEGAL_PATH_BY_KEY)) {
        paths.add(path);
      }
    }
  }

  if (type === "siteSettings") {
    // Contact details live in the public layout, so invalidate every route
    // beneath it rather than maintaining an incomplete list of page paths.
    revalidatePath("/", "layout");
  } else {
    for (const path of paths) {
      revalidatePath(path);
    }
  }

  if (type === "author" && !body.id) {
    // Safe fallback until both dataset webhooks include `"id": _id` in
    // their projection: invalidate the blog subtree instead of leaving
    // author copy stale on detail pages.
    revalidatePath("/academy/blog", "layout");
  }

  if (type === "academyCategory") {
    // A category rename, ordering change, or tone change can affect every
    // listing and detail page in both category-backed catalogues.
    revalidatePath("/academy/blog", "layout");
    revalidatePath("/academy/webinars", "layout");
  }

  const detailPrefix = DETAIL_PATH_PREFIX_BY_TYPE[type];
  if (detailPrefix) {
    if (body.slug) revalidatePath(`${detailPrefix}/${body.slug}`);
    if (body.previousSlug)
      revalidatePath(`${detailPrefix}/${body.previousSlug}`);
  }

  return NextResponse.json({ revalidated: true, type });
}
