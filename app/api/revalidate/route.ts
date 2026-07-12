import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Sanity webhook → `revalidatePath`. `academyArticle` (blog track),
 * `academyWebinar` (webinars track), `academyCourse` (courses track),
 * `testimonial`, `faq`, `partner`, `teamMember`, and `memberStory` are all
 * wired now — see docs/cms-migration-spec.md's revalidation table.
 *
 * Studio-side webhook setup (manual, sanity.io dashboard): **one combined
 * webhook per dataset** (one for `development`, one for `production` once
 * that dataset exists) — not one webhook per `_type`. Trigger on
 * create/update/delete, filter on every revalidatable type at once:
 * `_type in ["academyArticle", "academyWebinar", "academyCourse", "testimonial", "faq", "partner", "teamMember", "memberStory"]`,
 * and set the payload projection to
 * `{"_type": _type, "slug": slug.current, "previousSlug": before().slug.current}`
 * — `before()` holds the pre-mutation document, so this also carries the old
 * slug through a slug change. `slug` is absent on types without a slug
 * field (`testimonial`/`faq`/`teamMember`/`memberStory`); GROQ resolves
 * that to `null` rather than erroring. `partner` does have a `slug`, but
 * only as a stable internal id — there's no public `/partners/<slug>`
 * route, so it still has no `DETAIL_PATH_PREFIX_BY_TYPE` entry below.
 */

type SanityWebhookPayload = {
  _type?: string;
  slug?: string;
  previousSlug?: string;
};

const STATIC_PATHS_BY_TYPE: Record<string, readonly string[]> = {
  academyArticle: ["/academy/blog", "/academy", "/", "/academy/search"],
  academyWebinar: ["/academy/webinars", "/academy", "/", "/academy/search"],
  academyCourse: ["/academy/courses", "/academy", "/", "/academy/search"],
  testimonial: ["/", "/academy", "/partners"],
  faq: ["/", "/academy", "/community", "/partners", "/contact"],
  partner: ["/", "/partners"],
  teamMember: ["/about"],
  memberStory: ["/community"],
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
