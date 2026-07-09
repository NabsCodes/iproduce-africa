import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Sanity webhook → `revalidatePath`. `academyArticle` (blog track) and
 * `academyWebinar` (webinars track) are wired — the `academyCourse` row
 * gets added when that track cuts over, per
 * docs/sanity-academy-spec.md's revalidation table.
 *
 * Studio-side webhook setup (manual, sanity.io dashboard, one per `_type`):
 * trigger on create/update/delete, filter e.g. `_type == "academyWebinar"`,
 * and set the payload projection to
 * `{"_type": _type, "slug": slug.current, "previousSlug": before().slug.current}`
 * so old-slug detail paths can be revalidated on a slug change — this route
 * only revalidates `previousSlug` when the projection actually supplies it.
 */

type SanityWebhookPayload = {
  _type?: string;
  slug?: string;
  previousSlug?: string;
};

const STATIC_PATHS_BY_TYPE: Record<string, readonly string[]> = {
  academyArticle: ["/academy/blog", "/academy", "/", "/academy/search"],
  academyWebinar: ["/academy/webinars", "/academy", "/", "/academy/search"],
};

/** Detail route prefix per `_type`, for old/new slug revalidation on change. */
const DETAIL_PATH_PREFIX_BY_TYPE: Record<string, string> = {
  academyArticle: "/academy/blog",
  academyWebinar: "/academy/webinars",
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

  for (const path of staticPaths) {
    revalidatePath(path);
  }

  const detailPrefix = DETAIL_PATH_PREFIX_BY_TYPE[type];
  if (detailPrefix) {
    if (body.slug) revalidatePath(`${detailPrefix}/${body.slug}`);
    if (body.previousSlug)
      revalidatePath(`${detailPrefix}/${body.previousSlug}`);
  }

  return NextResponse.json({ revalidated: true, type });
}
