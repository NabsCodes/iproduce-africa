import { createHash } from "node:crypto";

import { createClient, type SanityClient } from "next-sanity";

import { authors, blogArticles } from "@/content/blog-articles";
import { coursesContent } from "@/content/courses";
import { webinarsContent } from "@/content/webinars";
import { placeholderImages } from "@/lib/placeholder-images";
import { apiVersion, projectId as configuredProjectId } from "@/sanity/env";
import {
  blocksToPortableText,
  type PortableTextEntry,
} from "@/scripts/lib/blocks-to-portable-text";
import type { AcademyWebinar } from "@/types/academy";
import type { BlogArticleBlock, BlogAuthor } from "@/types/blog";

/**
 * Seeds development-dataset placeholders from static content/* so editors
 * never see an empty Studio. Modes:
 *   (no flags)          read-only dry-run — reports CREATE/SKIP against Sanity
 *   --offline           zero network calls — pure local content validation
 *   --execute           performs real writes
 *   --dataset <name>    always "development" this slice — any other value throws
 *
 * Deliberately never writes to production in this slice — see the plan doc
 * for why (docs/cms-migration-spec.md's production path is a later slice).
 */

type Flags = { offline: boolean; execute: boolean; dataset: string };

function parseArgs(argv: string[]): Flags {
  const offline = argv.includes("--offline");
  const execute = argv.includes("--execute");
  const datasetIndex = argv.indexOf("--dataset");
  const dataset = datasetIndex !== -1 ? argv[datasetIndex + 1] : "development";

  if (offline && execute) {
    throw new Error("--offline and --execute are mutually exclusive.");
  }
  if (dataset !== "development") {
    throw new Error(
      `Refusing --dataset "${dataset}" — this slice only ever writes to "development". ` +
        `Production support is a deliberate later slice, gated on client sign-off.`,
    );
  }

  return { offline, execute, dataset };
}

const manifest = {
  create: [] as string[],
  skip: [] as string[],
  warn: [] as string[],
  error: [] as string[],
};

function logCreate(id: string) {
  manifest.create.push(id);
  console.log(`CREATE ${id}`);
}
function logSkip(id: string) {
  manifest.skip.push(id);
  console.log(`SKIP ${id}`);
}
function logWarn(message: string) {
  manifest.warn.push(message);
  console.log(`WARN ${message}`);
}
function logError(message: string) {
  manifest.error.push(message);
  console.log(`ERROR ${message}`);
}
function logWouldUpload(url: string, filename: string) {
  console.log(`WOULD_UPLOAD ${url} as ${filename}`);
}

// ─── Image asset flattening + resolution ───────────────────────────────────

function flattenImagePaths(
  value: unknown,
  prefix = "",
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof val === "string") {
      out[path] = val;
    } else if (val && typeof val === "object") {
      Object.assign(out, flattenImagePaths(val, path));
    }
  }
  return out;
}

const dottedPathByUrl = new Map<string, string>();
for (const [path, url] of Object.entries(
  flattenImagePaths(placeholderImages),
)) {
  if (!dottedPathByUrl.has(url)) dottedPathByUrl.set(url, path);
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function filenameForUrl(url: string): string {
  const dottedPath = dottedPathByUrl.get(url);
  const base = dottedPath
    ? slugify(dottedPath.replace(/\./g, "-"))
    : createHash("sha1").update(url).digest("hex").slice(0, 12);
  return `${base}.jpg`;
}

type AssetRef = { _type: "reference"; _ref: string };

function placeholderRef(filename: string): AssetRef {
  return { _type: "reference", _ref: `image-would-upload-${filename}` };
}

function createAssetResolver(client: SanityClient | null, flags: Flags) {
  const cache = new Map<string, AssetRef>();

  return async function resolveImageAsset(url: string): Promise<AssetRef> {
    const cached = cache.get(url);
    if (cached) return cached;

    const filename = filenameForUrl(url);

    if (flags.offline) {
      logWouldUpload(url, filename);
      const ref = placeholderRef(filename);
      cache.set(url, ref);
      return ref;
    }

    let existingAssetId: string | null = null;
    try {
      existingAssetId = await client!.fetch(
        `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
        { filename },
      );
    } catch (err) {
      logWarn(
        `could not check for existing asset "${filename}" — check token/dataset visibility (${(err as Error).message})`,
      );
    }

    if (existingAssetId) {
      const ref: AssetRef = { _type: "reference", _ref: existingAssetId };
      cache.set(url, ref);
      return ref;
    }

    if (!flags.execute) {
      logWouldUpload(url, filename);
      const ref = placeholderRef(filename);
      cache.set(url, ref);
      return ref;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to download ${url}: HTTP ${response.status}`);
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    const asset = await client!.assets.upload("image", buffer, { filename });
    const ref: AssetRef = { _type: "reference", _ref: asset._id };
    cache.set(url, ref);
    return ref;
  };
}

async function buildBody(
  blocks: readonly BlogArticleBlock[],
  resolveImageAsset: (url: string) => Promise<AssetRef>,
): Promise<PortableTextEntry[]> {
  const imageBlocks = blocks.filter((b) => b.kind === "image");
  const resolved = new Map<string, AssetRef>();
  for (const block of imageBlocks) {
    resolved.set(block.src, await resolveImageAsset(block.src));
  }
  return blocksToPortableText(blocks, (src) => {
    const ref = resolved.get(src);
    if (!ref) throw new Error(`No resolved asset for body image ${src}`);
    return ref;
  });
}

// ─── Existence planning ─────────────────────────────────────────────────────

type ExistingDoc = {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  [key: string]: unknown;
};

type Plan = "offline" | "create" | "unknown" | { skip: ExistingDoc };

async function planUpsert(
  client: SanityClient | null,
  flags: Flags,
  id: string,
): Promise<Plan> {
  if (flags.offline) return "offline";

  try {
    const existing = (await client!.getDocument(id)) as ExistingDoc | undefined;
    return existing ? { skip: existing } : "create";
  } catch (err) {
    logWarn(
      `could not verify existing doc "${id}" — check token/dataset visibility (${(err as Error).message})`,
    );
    return "unknown";
  }
}

/** Recovery patch: only backfill a missing required image on a doc that has never been edited since creation. */
async function maybeRecoverImage(
  client: SanityClient | null,
  flags: Flags,
  existing: ExistingDoc,
  imageField: string,
  resolveImage: () => Promise<Record<string, unknown>>,
) {
  if (existing[imageField]) return;

  if (existing._createdAt !== existing._updatedAt) {
    logWarn(
      `skip: ${existing._id} missing "${imageField}" but has been edited since creation, not auto-patching`,
    );
    return;
  }

  if (!flags.execute) {
    logWarn(`would patch missing "${imageField}" on ${existing._id} (dry-run)`);
    return;
  }

  const image = await resolveImage();
  await client!
    .patch(existing._id)
    .set({ [imageField]: image })
    .commit();
  logWarn(`patched missing "${imageField}" on ${existing._id}`);
}

const BUILDING_EXPORT_QA_DATE = "2026-07-13T10:05:00.000Z";

/**
 * Narrow development-data repairs for this migration revision. Never replace
 * an editor-supplied end time, and only restore the exact timestamp left by
 * rollover QA rather than treating every date difference as stale seed data.
 */
async function maybeRepairWebinarTiming(
  client: SanityClient | null,
  flags: Flags,
  existing: ExistingDoc,
  webinar: AcademyWebinar,
) {
  const patch: Record<string, string> = {};

  if (webinar.endDate && !existing.endDate) {
    patch.endDate = new Date(webinar.endDate).toISOString();
  }

  if (
    webinar.slug === "building-export-ready-business" &&
    existing.date === BUILDING_EXPORT_QA_DATE
  ) {
    patch.date = new Date(webinar.date).toISOString();
  }

  if (Object.keys(patch).length === 0) return;

  if (!flags.execute) {
    logWarn(
      `would patch webinar timing on ${existing._id}: ${Object.keys(patch).join(", ")}`,
    );
    return;
  }

  await client!.patch(existing._id).set(patch).commit();
  logWarn(
    `patched webinar timing on ${existing._id}: ${Object.keys(patch).join(", ")}`,
  );
}

// ─── Migrations per catalogue ───────────────────────────────────────────────

function authorKey(author: BlogAuthor): string {
  for (const [key, value] of Object.entries(authors)) {
    if (value === author) return key;
  }
  throw new Error(
    `Unknown author: ${author.name} — not in content/blog-articles.ts authors map`,
  );
}

async function migrateAuthors(client: SanityClient | null, flags: Flags) {
  for (const [key, author] of Object.entries(authors)) {
    const id = `author.${key}`;
    const plan = await planUpsert(client, flags, id);

    if (plan === "offline") {
      logCreate(`[offline-plan] ${id}`);
      continue;
    }
    if (plan === "unknown") continue;
    if (plan !== "create") {
      logSkip(id);
      continue;
    }
    if (!flags.execute) {
      logCreate(`[would-create] ${id}`);
      continue;
    }

    try {
      await client!.createIfNotExists({
        _id: id,
        _type: "author",
        name: author.name,
        slug: { _type: "slug", current: key },
        role: author.role,
      });
      logCreate(id);
    } catch (err) {
      logError(`failed to create ${id}: ${(err as Error).message}`);
    }
  }
}

type ImageResolver = ReturnType<typeof createAssetResolver>;

async function migrateArticles(
  client: SanityClient | null,
  flags: Flags,
  resolveImageAsset: ImageResolver,
) {
  for (const article of blogArticles) {
    const id = `academyArticle.${article.slug}`;
    const plan = await planUpsert(client, flags, id);

    if (plan === "unknown") continue;

    if (plan !== "create" && plan !== "offline") {
      await maybeRecoverImage(
        client,
        flags,
        plan.skip,
        "cardImage",
        async () => ({
          _type: "image",
          asset: await resolveImageAsset(article.cardImage),
          alt: article.cardImageAlt,
        }),
      );
      logSkip(id);
      continue;
    }

    // plan is "create" or "offline" — build the full payload (validating
    // shapes and reporting WOULD_UPLOAD via resolveImageAsset) even when not
    // executing; only the final write below is execute-gated.
    try {
      const cardImageAsset = await resolveImageAsset(article.cardImage);
      const heroImageAsset = article.heroImage
        ? await resolveImageAsset(article.heroImage)
        : undefined;
      const body = await buildBody(article.body, resolveImageAsset);

      if (!flags.execute) {
        logCreate(
          `${plan === "offline" ? "[offline-plan]" : "[would-create]"} ${id}`,
        );
        continue;
      }

      await client!.createIfNotExists({
        _id: id,
        _type: "academyArticle",
        title: article.title,
        slug: { _type: "slug", current: article.slug },
        excerpt: article.excerpt,
        category: article.category,
        author: {
          _type: "reference",
          _ref: `author.${authorKey(article.author)}`,
        },
        readTimeMinutes: article.readTimeMinutes,
        publishedAt: new Date(article.publishedAt).toISOString(),
        cardImage: {
          _type: "image",
          asset: cardImageAsset,
          alt: article.cardImageAlt,
        },
        ...(heroImageAsset && {
          heroImage: {
            _type: "image",
            asset: heroImageAsset,
            alt: article.heroImageAlt,
          },
        }),
        body,
      });
      logCreate(id);
    } catch (err) {
      logError(`failed to create ${id}: ${(err as Error).message}`);
    }
  }
}

async function migrateWebinars(
  client: SanityClient | null,
  flags: Flags,
  resolveImageAsset: ImageResolver,
) {
  for (const webinar of webinarsContent.webinars) {
    const id = `academyWebinar.${webinar.slug}`;

    if (!webinar.date.includes("T")) {
      logWarn(
        `${id} still uses a date-only placeholder; set its real start time in Studio before production cutover`,
      );
    }

    const plan = await planUpsert(client, flags, id);

    if (plan === "unknown") continue;

    if (plan !== "create" && plan !== "offline") {
      await maybeRecoverImage(client, flags, plan.skip, "image", async () => ({
        _type: "image",
        asset: await resolveImageAsset(webinar.image),
        alt: webinar.imageAlt ?? webinar.title,
      }));
      await maybeRepairWebinarTiming(client, flags, plan.skip, webinar);
      logSkip(id);
      continue;
    }

    try {
      const imageAsset = await resolveImageAsset(webinar.image);

      if (!flags.execute) {
        logCreate(
          `${plan === "offline" ? "[offline-plan]" : "[would-create]"} ${id}`,
        );
        continue;
      }

      await client!.createIfNotExists({
        _id: id,
        _type: "academyWebinar",
        title: webinar.title,
        slug: { _type: "slug", current: webinar.slug },
        type: webinar.type,
        date: new Date(webinar.date).toISOString(),
        ...(webinar.endDate && {
          endDate: new Date(webinar.endDate).toISOString(),
        }),
        description: webinar.description,
        excerpt: webinar.excerpt,
        image: {
          _type: "image",
          asset: imageAsset,
          alt: webinar.imageAlt ?? webinar.title,
        },
        body: [...webinar.body],
        ...(webinar.dateLabel && { dateLabel: webinar.dateLabel }),
        ...(webinar.location && { location: webinar.location }),
        ...(webinar.format && { format: webinar.format }),
        ...(webinar.speakers && { speakers: webinar.speakers }),
        ...(webinar.registration && {
          registration: {
            _type: "registrationConfig",
            ...webinar.registration,
          },
        }),
      });
      logCreate(id);
    } catch (err) {
      logError(`failed to create ${id}: ${(err as Error).message}`);
    }
  }
}

async function migrateCourses(
  client: SanityClient | null,
  flags: Flags,
  resolveImageAsset: ImageResolver,
) {
  for (const course of coursesContent.courses) {
    const id = `academyCourse.${course.slug}`;
    const plan = await planUpsert(client, flags, id);

    if (plan === "unknown") continue;

    if (plan !== "create" && plan !== "offline") {
      await maybeRecoverImage(client, flags, plan.skip, "image", async () => ({
        _type: "image",
        asset: await resolveImageAsset(course.image),
        alt: course.title,
      }));
      logSkip(id);
      continue;
    }

    try {
      const imageAsset = await resolveImageAsset(course.image);

      if (!flags.execute) {
        logCreate(
          `${plan === "offline" ? "[offline-plan]" : "[would-create]"} ${id}`,
        );
        continue;
      }

      await client!.createIfNotExists({
        _id: id,
        _type: "academyCourse",
        title: course.title,
        slug: { _type: "slug", current: course.slug },
        level: course.level,
        duration: course.duration,
        description: course.description,
        excerpt: course.excerpt,
        image: { _type: "image", asset: imageAsset, alt: course.title },
        body: [...course.body],
        modules: [...course.modules],
        ...(course.registration && {
          registration: { _type: "registrationConfig", ...course.registration },
        }),
      });
      logCreate(id);
    } catch (err) {
      logError(`failed to create ${id}: ${(err as Error).message}`);
    }
  }
}

// ─── Entry point ────────────────────────────────────────────────────────────

async function main() {
  const flags = parseArgs(process.argv.slice(2));

  let client: SanityClient | null = null;

  if (!flags.offline) {
    if (!configuredProjectId) {
      throw new Error(
        "Set NEXT_PUBLIC_SANITY_PROJECT_ID before running (or pass --offline for a network-free preview).",
      );
    }

    const writeToken = process.env.SANITY_API_WRITE_TOKEN?.trim() || undefined;

    if (flags.execute && !writeToken) {
      throw new Error("Set SANITY_API_WRITE_TOKEN before running --execute.");
    }

    client = createClient({
      projectId: configuredProjectId,
      dataset: flags.dataset,
      apiVersion,
      token: writeToken,
      useCdn: false,
    });
  }

  console.log(
    `Migrating Academy catalogues — dataset="${flags.dataset}" offline=${flags.offline} execute=${flags.execute}\n`,
  );

  // One shared resolver/cache for the whole run — several source images are
  // reused across catalogues (e.g. the same placeholder photo backs an
  // article, two webinars, and a course), so this is what actually makes
  // upload dedup work across catalogue boundaries, not just within one.
  const resolveImageAsset = createAssetResolver(client, flags);

  await migrateAuthors(client, flags);
  await migrateArticles(client, flags, resolveImageAsset);
  await migrateWebinars(client, flags, resolveImageAsset);
  await migrateCourses(client, flags, resolveImageAsset);

  console.log("\n─── Summary ───────────────────────────────");
  console.log(`Created: ${manifest.create.length}`);
  console.log(`Skipped: ${manifest.skip.length}`);
  console.log(`Warnings: ${manifest.warn.length}`);
  console.log(`Errors: ${manifest.error.length}`);

  if (manifest.error.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(`ERROR ${(err as Error).message}`);
  process.exitCode = 1;
});
