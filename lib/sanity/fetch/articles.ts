import type { Image } from "sanity";
import { articleToRelatedItem } from "@/content/blog";
import { sanityFetch } from "@/lib/sanity/client";
import { resolveImageUrl } from "@/lib/sanity/image";
import {
  portableTextToBlogArticleBlocks,
  type PortableTextBlock,
} from "@/lib/sanity/portable-text";
import {
  articleBySlugQuery,
  articlesListingQuery,
  articleSlugsQuery,
  featuredArticleQuery,
  relatedArticlesQuery,
} from "@/lib/sanity/queries";
import type { AcademyRelatedItem } from "@/types/academy";
import type { BlogArticle, BlogCategory } from "@/types/blog";

type SanityImageField = Image & { alt?: string };

type RawArticleDoc = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  readTimeMinutes: number | null;
  publishedAt: string;
  cardImage: SanityImageField | null;
  heroImage: SanityImageField | null;
  body: PortableTextBlock[];
  author: { name: string; role?: string } | null;
};

const WORDS_PER_MINUTE = 200;

/** Only used when a Studio editor hasn't set an explicit override. */
function estimateReadTimeMinutes(body: readonly PortableTextBlock[]): number {
  const wordCount = body
    .filter((block) => block._type === "block")
    .flatMap((block) => (block.children ?? []).map((span) => span.text ?? ""))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
}

function normalizeArticle(raw: RawArticleDoc): BlogArticle {
  return {
    slug: raw.slug,
    title: raw.title,
    category: raw.category,
    author: raw.author ?? { name: "iProduce Africa" },
    readTimeMinutes: raw.readTimeMinutes ?? estimateReadTimeMinutes(raw.body),
    publishedAt: raw.publishedAt,
    cardImage: resolveImageUrl(raw.cardImage) ?? "",
    cardImageAlt: raw.cardImage?.alt ?? raw.title,
    heroImage: resolveImageUrl(raw.heroImage),
    heroImageAlt: raw.heroImage?.alt,
    excerpt: raw.excerpt,
    body: portableTextToBlogArticleBlocks(raw.body),
  };
}

export async function fetchArticleSlugs(): Promise<string[]> {
  return sanityFetch<string[]>(articleSlugsQuery);
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
