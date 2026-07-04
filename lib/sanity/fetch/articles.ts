import { client } from "@/lib/sanity/client";
import {
  articleBySlugQuery,
  articlesListingQuery,
  articleSlugsQuery,
  featuredArticleQuery,
  relatedArticlesQuery,
} from "@/lib/sanity/queries";
import type { BlogArticle } from "@/types/blog";

/**
 * Scaffolding for the fetch-layer slice — not imported by any route yet.
 * Return shapes are provisional; the real GROQ projection + PT adapter wiring
 * happens when Academy routes actually cut over to Sanity.
 */

export async function fetchArticleSlugs(): Promise<string[]> {
  return client.fetch(articleSlugsQuery);
}

export async function fetchArticleBySlug(
  slug: string,
): Promise<BlogArticle | null> {
  return client.fetch(articleBySlugQuery, { slug });
}

export async function fetchArticlesListing(): Promise<BlogArticle[]> {
  return client.fetch(articlesListingQuery);
}

export async function fetchFeaturedArticle(
  featuredSlug: string | null,
): Promise<BlogArticle | null> {
  return client.fetch(featuredArticleQuery, { featuredSlug });
}

export async function fetchRelatedArticles(
  slug: string,
): Promise<BlogArticle[]> {
  return client.fetch(relatedArticlesQuery, { slug });
}
