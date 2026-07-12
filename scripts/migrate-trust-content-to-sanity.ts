import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { createClient, type SanityClient } from "next-sanity";

import { academyContent } from "@/content/academy";
import { communityPageContent } from "@/content/community";
import { homeContent } from "@/content/home";
import { partnersList, partnersPageContent } from "@/content/partners";
import { placeholderImages } from "@/lib/placeholder-images";
import type { FaqPage } from "@/lib/sanity/faq-categories";
import { apiVersion, projectId as configuredProjectId } from "@/sanity/env";
import type { FaqItem, TestimonialItem } from "@/types/content";
import type { Partner } from "@/types/partners";

/**
 * Seeds development-dataset placeholders for testimonials, FAQs, and
 * partners from static content/* — mirrors
 * scripts/migrate-academy-to-sanity.ts's exact flag/dataset-guard shape.
 * Modes:
 *   (no flags)          read-only dry-run — reports CREATE/SKIP against Sanity
 *   --offline           zero network calls — pure local content validation
 *   --execute           performs real writes
 *   --dataset <name>    always "development" — any other value throws
 *
 * Run order matters: the routes reading these types have no runtime static
 * fallback, so this script must be run with --execute against "development"
 * and verified in Studio *before* the route changes deploy.
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
//
// Two source kinds: remote URLs (testimonial avatars, all Unsplash so far)
// and local `/public`-relative paths (every partner logo). `fetch()` only
// works for the former — local paths are read straight off disk instead.

function isLocalPublicPath(url: string): boolean {
  return url.startsWith("/");
}

function resolveLocalPath(url: string): string {
  return path.join(process.cwd(), "public", url);
}

async function readSourceBytes(url: string): Promise<Buffer> {
  if (isLocalPublicPath(url)) {
    return readFile(resolveLocalPath(url));
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download ${url}: HTTP ${response.status}`);
  }
  return Buffer.from(await response.arrayBuffer());
}

/** Real extension from the source path/URL — every uploaded filename was
 * silently hardcoded to `.jpg` before this, which would have mislabeled
 * every `.webp`/`.png` partner logo. */
function extensionForUrl(url: string): string {
  const match = /\.([a-zA-Z0-9]+)(?:\?.*)?$/.exec(url);
  return match ? match[1].toLowerCase() : "jpg";
}

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
  return `${base}.${extensionForUrl(url)}`;
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

    // Checked unconditionally, before the offline/execute branches below,
    // so a missing local file is caught during dry-run/--offline too, not
    // just discovered when --execute tries to read it.
    if (isLocalPublicPath(url) && !existsSync(resolveLocalPath(url))) {
      throw new Error(
        `Local asset not found: ${resolveLocalPath(url)} (referenced by ${url})`,
      );
    }

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

    const buffer = await readSourceBytes(url);
    const asset = await client!.assets.upload("image", buffer, { filename });
    const ref: AssetRef = { _type: "reference", _ref: asset._id };
    cache.set(url, ref);
    return ref;
  };
}

type ImageResolver = ReturnType<typeof createAssetResolver>;

// ─── Existence planning ─────────────────────────────────────────────────────

async function planUpsert(
  client: SanityClient | null,
  flags: Flags,
  id: string,
): Promise<"offline" | "create" | "skip" | "unknown"> {
  if (flags.offline) return "offline";

  try {
    const existing = await client!.getDocument(id);
    return existing ? "skip" : "create";
  } catch (err) {
    logWarn(
      `could not verify existing doc "${id}" — check token/dataset visibility (${(err as Error).message})`,
    );
    return "unknown";
  }
}

// ─── Migrations ──────────────────────────────────────────────────────────

type TestimonialPlacement = "home" | "academy" | "partners-voices";

async function migrateTestimonials(
  client: SanityClient | null,
  flags: Flags,
  resolveImageAsset: ImageResolver,
  items: readonly TestimonialItem[],
  placement: TestimonialPlacement,
) {
  for (const [index, item] of items.entries()) {
    const id = `testimonial.${placement}.${index}`;
    const plan = await planUpsert(client, flags, id);

    if (plan === "unknown") continue;
    if (plan === "skip") {
      logSkip(id);
      continue;
    }

    try {
      const imageAsset = item.image
        ? await resolveImageAsset(item.image)
        : undefined;

      if (!flags.execute) {
        logCreate(
          `${plan === "offline" ? "[offline-plan]" : "[would-create]"} ${id}`,
        );
        continue;
      }

      await client!.createIfNotExists({
        _id: id,
        _type: "testimonial",
        quote: item.quote,
        name: item.name,
        role: item.role,
        ...(imageAsset && { image: { _type: "image", asset: imageAsset } }),
        ...(item.initials && { initials: item.initials }),
        placement,
        order: index,
      });
      logCreate(id);
    } catch (err) {
      logError(`failed to create ${id}: ${(err as Error).message}`);
    }
  }
}

async function migrateFaqs(
  client: SanityClient | null,
  flags: Flags,
  items: readonly FaqItem[],
  page: FaqPage,
) {
  for (const [index, item] of items.entries()) {
    const id = `faq.${page}.${index}`;
    const plan = await planUpsert(client, flags, id);

    if (plan === "unknown") continue;
    if (plan === "skip") {
      logSkip(id);
      continue;
    }

    if (!flags.execute) {
      logCreate(
        `${plan === "offline" ? "[offline-plan]" : "[would-create]"} ${id}`,
      );
      continue;
    }

    try {
      await client!.createIfNotExists({
        _id: id,
        _type: "faq",
        question: item.question,
        answer: item.answer,
        category: item.category,
        page,
        order: index,
      });
      logCreate(id);
    } catch (err) {
      logError(`failed to create ${id}: ${(err as Error).message}`);
    }
  }
}

async function migratePartners(
  client: SanityClient | null,
  flags: Flags,
  resolveImageAsset: ImageResolver,
  items: readonly Partner[],
) {
  for (const partner of items) {
    const id = `partner.${partner.id}`;
    const plan = await planUpsert(client, flags, id);

    if (plan === "unknown") continue;
    if (plan === "skip") {
      logSkip(id);
      continue;
    }

    try {
      const logoAsset = await resolveImageAsset(partner.logo);

      if (!flags.execute) {
        logCreate(
          `${plan === "offline" ? "[offline-plan]" : "[would-create]"} ${id}`,
        );
        continue;
      }

      await client!.createIfNotExists({
        _id: id,
        _type: "partner",
        slug: { _type: "slug", current: partner.id },
        name: partner.name,
        logo: { _type: "image", asset: logoAsset, alt: partner.name },
        ...(partner.href && { website: partner.href }),
        showInMarquee: true,
        showInVoices: true,
        ...(partner.order !== undefined && { order: partner.order }),
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
    `Migrating testimonials + FAQs + partners — dataset="${flags.dataset}" offline=${flags.offline} execute=${flags.execute}\n`,
  );

  const resolveImageAsset = createAssetResolver(client, flags);

  await migrateTestimonials(
    client,
    flags,
    resolveImageAsset,
    homeContent.testimonials,
    "home",
  );
  await migrateTestimonials(
    client,
    flags,
    resolveImageAsset,
    academyContent.testimonials.items,
    "academy",
  );
  await migrateTestimonials(
    client,
    flags,
    resolveImageAsset,
    partnersPageContent.voices.items,
    "partners-voices",
  );

  await migrateFaqs(client, flags, homeContent.faqs, "home");
  await migrateFaqs(client, flags, academyContent.faqs.items, "academy");
  await migrateFaqs(
    client,
    flags,
    communityPageContent.faqs.items,
    "community",
  );
  await migrateFaqs(client, flags, partnersPageContent.faqs.items, "partners");

  await migratePartners(client, flags, resolveImageAsset, partnersList);

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
