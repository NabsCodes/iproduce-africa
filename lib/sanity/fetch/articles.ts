import type { Image } from "sanity";

import { articleToRelatedItem, toHubArticleCategory } from "@/content/blog";
import { sanityFetch } from "@/lib/sanity/client";
import { resolveImageUrl } from "@/lib/sanity/image";
import {
  type PortableTextBlock,
  portableTextToBlogArticleBlocks,
} from "@/lib/sanity/portable-text";
import {
  articleBySlugQuery,
  articleSitemapEntriesQuery,
  articlesListingQuery,
  articleSlugsQuery,
  featuredArticleQuery,
  relatedArticlesQuery,
} from "@/lib/sanity/queries";
import { normalizeSeoMetadata, type RawSeoMetadata } from "@/lib/sanity/seo";
import type { AcademyArticle, AcademyRelatedItem } from "@/types/academy";
import type { BlogArticle, BlogCategory } from "@/types/blog";

type SanityImageField = Image & { alt?: string };

type RawArticleDoc = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  readTimeMinutes: number | null;
  publishedAt: string;
  _updatedAt: string;
  cardImage: SanityImageField | null;
  heroImage: SanityImageField | null;
  body: PortableTextBlock[];
  author: { name: string; role?: string } | null;
  seo?: RawSeoMetadata | null;
};

const WORDS_PER_MINUTE = 200;

/** All the text a reader actually sees, across every block kind `ArticleBody` renders. */
function blockText(block: PortableTextBlock): string {
  switch (block._type) {
    case "block":
      return (block.children ?? []).map((span) => span.text ?? "").join(" ");
    case "callout":
      return [block.title, block.text].filter(Boolean).join(" ");
    case "table":
      return [
        block.caption,
        ...((block.headers as string[] | undefined) ?? []),
        ...((block.rows as { cells: string[] }[] | undefined) ?? []).flatMap(
          (row) => row.cells,
        ),
      ]
        .filter(Boolean)
        .join(" ");
    case "codeBlock":
      return (block.code as string | undefined) ?? "";
    case "bodyImage":
      return (block.caption as string | undefined) ?? "";
    case "orderedStep":
      return [block.title, block.body].filter(Boolean).join(" ");
    default:
      return "";
  }
}

/** Auto-calculated by default; the Studio field is an optional override. */
function estimateReadTimeMinutes(body: readonly PortableTextBlock[]): number {
  const wordCount = body
    .map(blockText)
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

function normalizeArticle(raw: RawArticleDoc): BlogArticle {
  return {
    slug: raw.slug,
    title: raw.title,
    category: raw.category,
    author: raw.author ?? { name: "iProduce Africa" },
    readTimeMinutes: raw.readTimeMinutes ?? estimateReadTimeMinutes(raw.body),
    publishedAt: raw.publishedAt,
    updatedAt: raw._updatedAt,
    cardImage: resolveImageUrl(raw.cardImage) ?? "",
    cardImageAlt: raw.cardImage?.alt ?? raw.title,
    heroImage: resolveImageUrl(raw.heroImage),
    heroImageAlt: raw.heroImage?.alt,
    excerpt: raw.excerpt,
    body: portableTextToBlogArticleBlocks(raw.body),
    seo: normalizeSeoMetadata(raw.seo),
  };
}

export async function fetchArticleSlugs(): Promise<string[]> {
  return sanityFetch<string[]>(articleSlugsQuery);
}

/** Narrow shape for `app/sitemap.ts` — see `articleSitemapEntriesQuery`. */
export async function fetchArticleSitemapEntries(): Promise<
  { slug: string; publishedAt: string }[]
> {
  return sanityFetch(articleSitemapEntriesQuery);
}

export async function fetchArticleBySlug(
  slug: string,
): Promise<BlogArticle | null> {
  const raw = await sanityFetch<RawArticleDoc | null>(articleBySlugQuery, {
    slug,
  });
  return raw ? normalizeArticle(raw) : null;
}

export async function fetchArticlesListing(): Promise<BlogArticle[]> {
  const raw = await sanityFetch<RawArticleDoc[]>(articlesListingQuery);
  return raw.map(normalizeArticle);
}

/**
 * Applies the spec-locked 8→3 category collapse via the shared
 * `toHubArticleCategory()` from `content/blog.ts`. Exported so callers that
 * already have a `BlogArticle[]` listing in hand (e.g. the `/academy` hub
 * page, which fetches the full listing anyway for its total-count label)
 * can derive hub cards without a second `fetchArticlesListing()` round trip.
 */
export function articleToHubShape(article: BlogArticle): AcademyArticle {
  return {
    category: toHubArticleCategory(article.category),
    readTime: `${article.readTimeMinutes} min read`,
    title: article.title,
    description: article.excerpt,
    image: article.cardImage,
    imageAlt: article.cardImageAlt,
    slug: article.slug,
  };
}

/**
 * Hub/home preview shape — reuses `fetchArticlesListing()` (already ordered
 * by `publishedAt desc`) rather than a separate GROQ query. Only for callers
 * that don't already have the full listing (e.g. Home) — see
 * `articleToHubShape` above for callers that do.
 */
export async function fetchHubArticles(
  limit: number,
): Promise<AcademyArticle[]> {
  const articles = await fetchArticlesListing();
  return articles.slice(0, limit).map(articleToHubShape);
}

export async function fetchFeaturedArticle(
  featuredSlug: string | null,
): Promise<BlogArticle | null> {
  const raw = await sanityFetch<RawArticleDoc | null>(featuredArticleQuery, {
    featuredSlug,
  });
  return raw ? normalizeArticle(raw) : null;
}

/**
 * Mirrors `getRelatedArticles` in `content/blog.ts`: same category first,
 * then the rest, newest first — `relatedArticlesQuery` only excludes the
 * current slug and sorts by `publishedAt desc`, so the category-priority
 * ordering happens here in JS. Reuses the existing `articleToRelatedItem`
 * mapper rather than duplicating it.
 */
export async function fetchRelatedArticles(
  excludeSlug: string,
  category: BlogCategory,
  limit = 3,
): Promise<AcademyRelatedItem[]> {
  const raw = await sanityFetch<RawArticleDoc[]>(relatedArticlesQuery, {
    slug: excludeSlug,
  });
  const articles = raw.map(normalizeArticle);
  const sameCategory = articles.filter(
    (article) => article.category === category,
  );
  const rest = articles.filter((article) => article.category !== category);

  return [...sameCategory, ...rest].slice(0, limit).map(articleToRelatedItem);
}
