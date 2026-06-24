import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { AcademyDetailMetadata } from "@/components/academy/listings/academy-detail-metadata";
import { AcademyDetailHeroImage } from "@/components/academy/listings/detail-hero-image";
import { AcademyRelatedSection } from "@/components/academy/listings/academy-related-section";
import { AcademyDetailShell } from "@/components/academy/listings/academy-detail-shell";
import { ArticleBody } from "@/components/academy/blog/article-body";
import { ArticleAuthor } from "@/components/academy/blog/article-author";
import { ArticleMetaBadges } from "@/components/academy/blog/article-meta-badges";
import { BlogArticleSidebar } from "@/components/academy/blog/blog-article-sidebar";
import { CtaSection } from "@/components/shared/cta-section";
import { blogContent, getArticle, getRelatedArticles } from "@/content/blog";
import { createArticleMetadata, createPageMetadata } from "@/lib/metadata";
import { getBlogHeroImage } from "@/content/blog";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function generateStaticParams() {
  return blogContent.articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return createPageMetadata({
      title: "Article not found",
      description: "The article you're looking for isn't available.",
      path: `/academy/blog/${slug}`,
    });
  }

  return createArticleMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/academy/blog/${article.slug}`,
    publishedAt: article.publishedAt,
    image: getBlogHeroImage(article).src,
  });
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) notFound();

  const hero = getBlogHeroImage(article);
  const relatedArticles = getRelatedArticles(slug);

  return (
    <AcademyDetailShell
      showScrollToTop
      hero={<AcademyDetailHeroImage src={hero.src} alt={hero.alt} priority />}
      metadata={
        <AcademyDetailMetadata
          eyebrow={blogContent.hero.eyebrow}
          title={article.title}
          badges={
            <ArticleMetaBadges
              category={article.category}
              readTimeMinutes={article.readTimeMinutes}
            />
          }
          meta={
            <ArticleAuthor
              author={article.author}
              publishedAt={dateFormatter.format(new Date(article.publishedAt))}
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
  );
}
