import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleAuthor } from "@/components/academy/blog/article-author";
import { ArticleBody } from "@/components/academy/blog/article-body";
import { ArticleMetaBadges } from "@/components/academy/blog/article-meta-badges";
import { BlogArticleSidebar } from "@/components/academy/blog/blog-article-sidebar";
import { AcademyDetailMetadata } from "@/components/academy/listings/academy-detail-metadata";
import { AcademyDetailShell } from "@/components/academy/listings/academy-detail-shell";
import { AcademyRelatedSection } from "@/components/academy/listings/academy-related-section";
import { AcademyDetailHeroImage } from "@/components/academy/listings/detail-hero-image";
import { CtaSection } from "@/components/shared/cta-section";
import { StructuredData } from "@/components/shared/structured-data";
import { blogContent, getBlogHeroImage } from "@/content/blog";
import { createArticleMetadata, createPageMetadata } from "@/lib/metadata";
import {
  fetchArticleBySlug,
  fetchArticleSlugs,
  fetchRelatedArticles,
} from "@/lib/sanity/fetch/articles";
import { createBlogPostingStructuredData } from "@/lib/structured-data";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await fetchArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    return createPageMetadata({
      title: "Article not found",
      description: "The article you're looking for isn't available.",
      path: `/academy/blog/${slug}`,
    });
  }

  return createArticleMetadata({
    title: article.seo?.title ?? article.title,
    description: article.seo?.description ?? article.excerpt,
    path: `/academy/blog/${article.slug}`,
    publishedAt: article.publishedAt,
    modifiedAt: article.updatedAt,
    image: article.seo?.image ?? getBlogHeroImage(article).src,
  });
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) notFound();

  const hero = getBlogHeroImage(article);
  const relatedArticles = await fetchRelatedArticles(
    slug,
    article.category.slug,
  );

  return (
    <>
      <StructuredData data={createBlogPostingStructuredData(article)} />
      <AcademyDetailShell
        hero={<AcademyDetailHeroImage src={hero.src} alt={hero.alt} priority />}
        metadata={
          <AcademyDetailMetadata
            eyebrow={blogContent.hero.eyebrow}
            title={article.title}
            badges={
              <ArticleMetaBadges
                category={article.category.name}
                readTimeMinutes={article.readTimeMinutes}
                categoryTone={article.category.tone}
              />
            }
            meta={
              <ArticleAuthor
                author={article.author}
                publishedAt={dateFormatter.format(
                  new Date(article.publishedAt),
                )}
                publishedAtIso={article.publishedAt}
              />
            }
          />
        }
        main={<ArticleBody blocks={article.body} />}
        sidebar={
          <BlogArticleSidebar
            title={article.title}
            newsletter={blogContent.newsletter}
            shareControls={blogContent.shareControls}
          />
        }
        related={
          <AcademyRelatedSection
            content={blogContent.relatedSection}
            items={relatedArticles}
          />
        }
        cta={<CtaSection overlapNext={false} content={blogContent.cta} />}
      />
    </>
  );
}
