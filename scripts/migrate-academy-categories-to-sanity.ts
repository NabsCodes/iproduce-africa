import { createClient, type SanityClient } from "next-sanity";

import {
  ACADEMY_CATEGORY_SEEDS,
  type AcademyCategorySeed,
  categorySeedForLegacyArticle,
  categorySeedForLegacyWebinar,
} from "@/lib/academy-categories";
import { apiVersion, projectId as configuredProjectId } from "@/sanity/env";

/**
 * Creates the shared Academy category catalogue and backfills strong
 * `categoryRef` references on Article and Webinar/Event documents.
 *
 * Modes:
 *   (no flags)                    read-only dry-run
 *   --execute                     perform writes
 *   --dataset development         target Development (default)
 *   --dataset production          target Production
 *   --allow-production            required with --execute in Production
 *
 * Legacy `category` / `type` values are never removed.
 */

type Dataset = "development" | "production";
type Flags = {
  dataset: Dataset;
  execute: boolean;
  allowProduction: boolean;
};

type CategoryDocument = {
  _id: string;
  _type: "academyCategory";
  name: string;
  slug: { _type: "slug"; current: string };
  appliesToArticles: boolean;
  appliesToWebinars: boolean;
  tone: AcademyCategorySeed["tone"];
  order: number;
};

type ExistingCategory = {
  _id: string;
  name?: string | null;
  slug?: string | null;
  appliesToArticles?: boolean | null;
  appliesToWebinars?: boolean | null;
  tone?: string | null;
  order?: number | null;
};

type CatalogueDocument = {
  _id: string;
  _type: "academyArticle" | "academyWebinar";
  category?: string | null;
  type?: string | null;
  categoryRefId?: string | null;
};

type PlannedPatch = {
  document: CatalogueDocument;
  seed: AcademyCategorySeed;
};

type Manifest = {
  create: string[];
  match: string[];
  patch: string[];
  skip: string[];
  warn: string[];
  error: string[];
};

function parseArgs(argv: string[]): Flags {
  const datasetIndex = argv.indexOf("--dataset");
  const rawDataset =
    datasetIndex === -1 ? "development" : argv[datasetIndex + 1];
  if (rawDataset !== "development" && rawDataset !== "production") {
    throw new Error(
      `--dataset must be "development" or "production" (received "${rawDataset ?? ""}").`,
    );
  }

  const execute = argv.includes("--execute");
  const allowProduction = argv.includes("--allow-production");
  if (execute && rawDataset === "production" && !allowProduction) {
    throw new Error(
      'Refusing Production writes without the explicit "--allow-production" flag.',
    );
  }

  return { dataset: rawDataset, execute, allowProduction };
}

function createManifest(): Manifest {
  return {
    create: [],
    match: [],
    patch: [],
    skip: [],
    warn: [],
    error: [],
  };
}

function report(manifest: Manifest, kind: keyof Manifest, message: string) {
  manifest[kind].push(message);
  console.log(`${kind.toUpperCase()} ${message}`);
}

function categoryDocument(seed: AcademyCategorySeed): CategoryDocument {
  return {
    _id: seed.id,
    _type: "academyCategory",
    name: seed.name,
    slug: { _type: "slug", current: seed.slug },
    appliesToArticles: seed.appliesToArticles,
    appliesToWebinars: seed.appliesToWebinars,
    tone: seed.tone,
    order: seed.order,
  };
}

function categoryMatchesSeed(
  existing: ExistingCategory,
  seed: AcademyCategorySeed,
) {
  return (
    existing.name === seed.name &&
    existing.slug === seed.slug &&
    existing.appliesToArticles === seed.appliesToArticles &&
    existing.appliesToWebinars === seed.appliesToWebinars &&
    existing.tone === seed.tone &&
    existing.order === seed.order
  );
}

function seedForDocument(
  document: CatalogueDocument,
): AcademyCategorySeed | undefined {
  return document._type === "academyArticle"
    ? categorySeedForLegacyArticle(document.category)
    : categorySeedForLegacyWebinar(document.type);
}

function isAvailableForDocument(
  category: ExistingCategory,
  document: CatalogueDocument,
) {
  return document._type === "academyArticle"
    ? category.appliesToArticles === true
    : category.appliesToWebinars === true;
}

function summarize(manifest: Manifest, flags: Flags) {
  console.log("\nAcademy category migration summary");
  console.log(`dataset: ${flags.dataset}`);
  console.log(`mode: ${flags.execute ? "execute" : "dry-run"}`);
  for (const key of Object.keys(manifest) as (keyof Manifest)[]) {
    console.log(`${key}: ${manifest[key].length}`);
  }
}

async function inspect(client: SanityClient, flags: Flags, manifest: Manifest) {
  const [categories, documents] = await Promise.all([
    client.fetch<ExistingCategory[]>(
      `*[_type == "academyCategory" && !(_id in path("drafts.**"))]{
        _id,
        name,
        "slug": slug.current,
        appliesToArticles,
        appliesToWebinars,
        tone,
        order
      }`,
    ),
    client.fetch<CatalogueDocument[]>(
      `*[_type in ["academyArticle", "academyWebinar"]]{
        _id,
        _type,
        category,
        type,
        "categoryRefId": categoryRef._ref
      }`,
    ),
  ]);

  const categoriesById = new Map(
    categories.map((category) => [category._id, category]),
  );
  const categoriesBySlug = new Map<string, ExistingCategory[]>();
  for (const category of categories) {
    if (!category.slug) {
      report(
        manifest,
        "warn",
        `${category._id} has no slug and is not used by this migration`,
      );
      continue;
    }
    const matches = categoriesBySlug.get(category.slug) ?? [];
    matches.push(category);
    categoriesBySlug.set(category.slug, matches);
  }

  for (const [slug, matches] of categoriesBySlug) {
    if (matches.length > 1) {
      report(
        manifest,
        "error",
        `duplicate category slug "${slug}" is used by ${matches.map((item) => item._id).join(", ")}`,
      );
    }
  }

  const categoriesToCreate: CategoryDocument[] = [];
  for (const seed of ACADEMY_CATEGORY_SEEDS) {
    const existing = categoriesById.get(seed.id);
    const sameSlug = categoriesBySlug.get(seed.slug) ?? [];

    if (existing) {
      if (categoryMatchesSeed(existing, seed)) {
        report(manifest, "match", seed.id);
      } else {
        report(
          manifest,
          "error",
          `${seed.id} exists but does not match the approved seed contract`,
        );
      }
      continue;
    }

    if (sameSlug.length > 0) {
      report(
        manifest,
        "error",
        `${seed.id} cannot be created because slug "${seed.slug}" already belongs to ${sameSlug.map((item) => item._id).join(", ")}`,
      );
      continue;
    }

    categoriesToCreate.push(categoryDocument(seed));
    report(manifest, "create", seed.id);
  }

  const plannedPatches: PlannedPatch[] = [];
  for (const document of documents) {
    if (document.categoryRefId) {
      const referenced = categoriesById.get(document.categoryRefId);
      if (!referenced) {
        report(
          manifest,
          "error",
          `${document._id} has dangling categoryRef ${document.categoryRefId}`,
        );
      } else if (
        isAvailableForDocument(referenced, document) ||
        (referenced.appliesToArticles !== true &&
          referenced.appliesToWebinars !== true)
      ) {
        report(manifest, "skip", `${document._id} already has categoryRef`);
      } else {
        report(
          manifest,
          "error",
          `${document._id} references ${document.categoryRefId}, which is unavailable for ${document._type}`,
        );
      }
      continue;
    }

    const seed = seedForDocument(document);
    if (!seed) {
      const legacyValue =
        document._type === "academyArticle" ? document.category : document.type;
      report(
        manifest,
        "error",
        `${document._id} has missing or unknown legacy value "${legacyValue ?? ""}"`,
      );
      continue;
    }

    plannedPatches.push({ document, seed });
    report(manifest, "patch", `${document._id} -> ${seed.id} (${seed.name})`);
  }

  if (!flags.execute || manifest.error.length > 0) {
    return { categoriesToCreate, plannedPatches };
  }

  for (const category of categoriesToCreate) {
    await client.createIfNotExists(category);
  }

  for (const { document, seed } of plannedPatches) {
    await client
      .patch(document._id)
      .setIfMissing({
        categoryRef: { _type: "reference", _ref: seed.id },
      })
      .commit();
  }

  return { categoriesToCreate, plannedPatches };
}

async function main() {
  const flags = parseArgs(process.argv.slice(2));
  const manifest = createManifest();
  const token = flags.execute
    ? process.env.SANITY_API_WRITE_TOKEN
    : (process.env.SANITY_API_READ_TOKEN ?? process.env.SANITY_API_WRITE_TOKEN);

  if (!configuredProjectId) {
    throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is required.");
  }
  if (!token) {
    throw new Error(
      flags.execute
        ? "SANITY_API_WRITE_TOKEN is required for --execute."
        : "SANITY_API_READ_TOKEN or SANITY_API_WRITE_TOKEN is required for a dry-run.",
    );
  }

  console.log(
    `${flags.execute ? "EXECUTE" : "DRY-RUN"} Academy category migration on ${flags.dataset}`,
  );
  if (flags.dataset === "production") {
    console.log(
      `Production approval: ${flags.allowProduction ? "explicitly allowed" : "read-only dry-run"}`,
    );
  }

  const client = createClient({
    projectId: configuredProjectId,
    dataset: flags.dataset,
    apiVersion,
    token,
    useCdn: false,
    perspective: "raw",
  });

  await inspect(client, flags, manifest);
  summarize(manifest, flags);

  if (manifest.error.length > 0) {
    throw new Error(
      `Migration stopped with ${manifest.error.length} blocking issue(s).`,
    );
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
