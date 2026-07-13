import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { createClient, type SanityClient } from "next-sanity";

import { aboutPageContent } from "@/content/about";
import { homeContent } from "@/content/home";
import { legalContent } from "@/content/legal";
import { siteConfig } from "@/content/site";
import {
  HOME_SERVICE_SLOT_LAYOUT,
  HOME_VALUE_CHAIN_SLOT_LAYOUT,
} from "@/lib/sanity/page-slot-layout";
import { apiVersion, projectId as configuredProjectId } from "@/sanity/env";
import type { LegalDocKey, LegalSection } from "@/types/legal";

/**
 * Seeds development-dataset Phase 3 singletons from static content/*.
 * Modes:
 *   (no flags)          read-only dry-run — reports CREATE/MATCH/DIFF
 *   --offline           zero network calls — pure local payload validation
 *   --execute           performs real writes
 *   --dataset <name>    always "development" — any other value throws
 */

type Flags = { offline: boolean; execute: boolean; dataset: string };

type AssetRef = { _type: "reference"; _ref: string };
type SanityImage = { _type: "image"; asset: AssetRef };

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
      `Refusing --dataset "${dataset}" — this slice only ever writes to "development".`,
    );
  }

  return { offline, execute, dataset };
}

const manifest = {
  create: [] as string[],
  match: [] as string[],
  diff: [] as string[],
  warn: [] as string[],
  error: [] as string[],
};

function logCreate(id: string) {
  manifest.create.push(id);
  console.log(`CREATE ${id}`);
}
function logMatch(id: string) {
  manifest.match.push(id);
  console.log(`MATCH ${id}`);
}
function logDiff(id: string, detail: string) {
  manifest.diff.push(id);
  console.log(`DIFF ${id} — ${detail}`);
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

function extensionForUrl(url: string): string {
  const match = /\.([a-zA-Z0-9]+)(?:\?.*)?$/.exec(url);
  return match ? match[1].toLowerCase() : "jpg";
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function filenameForUrl(url: string): string {
  const base = slugify(url.replace(/^https?:\/\//, "").replace(/\//g, "-"));
  return `${base}.${extensionForUrl(url)}`;
}

function placeholderRef(filename: string): AssetRef {
  return { _type: "reference", _ref: `image-would-upload-${filename}` };
}

function createAssetResolver(client: SanityClient | null, flags: Flags) {
  const cache = new Map<string, AssetRef>();

  return async function resolveImageAsset(url: string): Promise<AssetRef> {
    const cached = cache.get(url);
    if (cached) return cached;

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
        `could not check for existing asset "${filename}" (${(err as Error).message})`,
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

function toSanityImage(asset: AssetRef): SanityImage {
  return { _type: "image", asset };
}

function normalizeForCompare(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(normalizeForCompare);
  }
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const out: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(obj)) {
      if (
        key.startsWith("_") &&
        key !== "_id" &&
        key !== "_type" &&
        key !== "_ref"
      ) {
        continue;
      }
      out[key] = normalizeForCompare(val);
    }
    return out;
  }
  return value;
}

function projectToPlannedShape(planned: unknown, existing: unknown): unknown {
  if (Array.isArray(planned)) {
    if (!Array.isArray(existing)) return existing;
    return planned.map((item, index) =>
      projectToPlannedShape(item, existing[index]),
    );
  }

  if (planned && typeof planned === "object") {
    if (!existing || typeof existing !== "object") return existing;
    const plannedObject = planned as Record<string, unknown>;
    const existingObject = existing as Record<string, unknown>;
    return Object.fromEntries(
      Object.keys(plannedObject).map((key) => [
        key,
        projectToPlannedShape(plannedObject[key], existingObject[key]),
      ]),
    );
  }

  return existing;
}

function comparePayloads(
  planned: Record<string, unknown>,
  existing: Record<string, unknown> | null,
): "create" | "match" | "diff" {
  if (!existing) return "create";
  const plannedNorm = JSON.stringify(normalizeForCompare(planned));
  const existingNorm = JSON.stringify(
    normalizeForCompare(projectToPlannedShape(planned, existing)),
  );
  return plannedNorm === existingNorm ? "match" : "diff";
}

async function planDocument(
  client: SanityClient | null,
  flags: Flags,
  id: string,
  planned: Record<string, unknown>,
): Promise<"create" | "match" | "diff" | "unknown"> {
  if (flags.offline) return "create";

  try {
    const existing = await client!.getDocument(id);
    return comparePayloads(planned, existing as Record<string, unknown> | null);
  } catch (err) {
    logWarn(
      `could not verify existing doc "${id}" (${(err as Error).message})`,
    );
    return "unknown";
  }
}

function mapLegalSections(sections: readonly LegalSection[]) {
  return sections.map((section) => ({
    _key: section.id,
    _type: "legalSection",
    id: section.id,
    title: section.title,
    paragraphs: [...section.paragraphs],
    ...(section.bullets ? { bullets: [...section.bullets] } : {}),
    ...(section.table
      ? {
          table: {
            headers: [...section.table.headers],
            rows: section.table.rows.map((cells, index) => ({
              _key: `row-${index}`,
              _type: "legalTableRow",
              cells: [...cells],
            })),
          },
        }
      : {}),
  }));
}

async function buildSiteSettingsPayload() {
  const socialByPlatform = Object.fromEntries(
    siteConfig.socialLinks.map((link) => [link.platform, link.href]),
  );

  return {
    _id: "siteSettings",
    _type: "siteSettings",
    email: siteConfig.email,
    phone: siteConfig.phone,
    address: siteConfig.address,
    instagramUrl: socialByPlatform.instagram ?? undefined,
    linkedinUrl: socialByPlatform.linkedin ?? undefined,
    facebookUrl: socialByPlatform.facebook ?? undefined,
    youtubeUrl: socialByPlatform.youtube ?? undefined,
  };
}

async function buildHomePagePayload(resolveImageAsset: ImageResolver) {
  const posterAsset = await resolveImageAsset(homeContent.about.image);

  const services: Record<string, unknown> = {};
  for (const [index, layout] of HOME_SERVICE_SLOT_LAYOUT.entries()) {
    const item = homeContent.whyJoinUs.items[index];
    const asset = await resolveImageAsset(item.image);
    services[layout.key] = {
      title: item.title,
      description: item.description,
      image: toSanityImage(asset),
      alt: item.imageAlt,
    };
  }

  const valueChains: Record<string, unknown> = {};
  for (const [index, layout] of HOME_VALUE_CHAIN_SLOT_LAYOUT.entries()) {
    const item = homeContent.valueChains[index];
    const asset = await resolveImageAsset(item.image);
    valueChains[layout.key] = {
      title: item.title,
      description: item.description,
      image: toSanityImage(asset),
      alt: item.title,
    };
  }

  return {
    _id: "homePage",
    _type: "homePage",
    heroMessage: {
      title: homeContent.hero.title,
      description: homeContent.hero.description,
    },
    whatWeDoPoster: {
      image: toSanityImage(posterAsset),
      alt: homeContent.about.imageAlt,
    },
    services,
    valueChains,
  };
}

async function buildAboutPagePayload(resolveImageAsset: ImageResolver) {
  const storyAsset = await resolveImageAsset(aboutPageContent.story.image);
  return {
    _id: "aboutPage",
    _type: "aboutPage",
    story: {
      paragraphs: [...aboutPageContent.story.paragraphs],
      image: toSanityImage(storyAsset),
      imageAlt: "Our story",
    },
    missionVisionObjective: {
      mission: aboutPageContent.missionVisionObjective.mission.body,
      vision: aboutPageContent.missionVisionObjective.vision.body,
      objective: aboutPageContent.missionVisionObjective.objective.body,
    },
  };
}

function buildLegalPagePayload(key: LegalDocKey) {
  const doc = legalContent[key];
  return {
    _id: `legalPage.${key}`,
    _type: "legalPage",
    key,
    lastUpdated: legalContent.lastUpdated,
    title: doc.title,
    subtitle: doc.subtitle,
    baselineNotice: {
      text: doc.baselineNotice.text,
      position: doc.baselineNotice.position,
    },
    sections: mapLegalSections(doc.sections),
  };
}

async function upsertSingleton(
  client: SanityClient | null,
  flags: Flags,
  payload: Record<string, unknown>,
) {
  const id = payload._id as string;
  const plan = await planDocument(client, flags, id, payload);

  if (plan === "unknown") return;
  if (plan === "match") {
    logMatch(id);
    return;
  }
  if (plan === "diff") {
    logDiff(id, "existing document differs from planned seed payload");
    return;
  }

  if (!flags.execute) {
    logCreate(flags.offline ? `[offline-plan] ${id}` : `[would-create] ${id}`);
    return;
  }

  try {
    await client!.createIfNotExists(
      payload as { _id: string; _type: string } & Record<string, unknown>,
    );
    logCreate(id);
  } catch (err) {
    logError(`failed to create ${id}: ${(err as Error).message}`);
  }
}

async function main() {
  const flags = parseArgs(process.argv.slice(2));

  let client: SanityClient | null = null;

  if (!flags.offline) {
    if (!configuredProjectId) {
      throw new Error(
        "Set NEXT_PUBLIC_SANITY_PROJECT_ID before running (or pass --offline).",
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
    `Migrating Phase 3 singletons — dataset="${flags.dataset}" offline=${flags.offline} execute=${flags.execute}\n`,
  );

  const resolveImageAsset = createAssetResolver(client, flags);

  const payloads = [
    await buildSiteSettingsPayload(),
    await buildHomePagePayload(resolveImageAsset),
    await buildAboutPagePayload(resolveImageAsset),
    buildLegalPagePayload("privacy"),
    buildLegalPagePayload("terms"),
    buildLegalPagePayload("cookies"),
    buildLegalPagePayload("accessibility"),
  ];

  for (const payload of payloads) {
    await upsertSingleton(client, flags, payload);
  }

  console.log("\n─── Summary ───────────────────────────────");
  console.log(`Created: ${manifest.create.length}`);
  console.log(`Matched: ${manifest.match.length}`);
  console.log(`Diff: ${manifest.diff.length}`);
  console.log(`Warnings: ${manifest.warn.length}`);
  console.log(`Errors: ${manifest.error.length}`);

  if (manifest.error.length > 0 || manifest.diff.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(`ERROR ${(err as Error).message}`);
  process.exitCode = 1;
});
