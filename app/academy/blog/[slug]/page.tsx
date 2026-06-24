import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { AcademyDetailShell } from "@/components/academy/detail-shell/academy-detail-shell";
import { ArticleBody } from "@/components/academy/blog/article-body";
import { ArticleMetaBadges } from "@/components/academy/blog/article-meta-badges";
import { BlogArticleSidebar } from "@/components/academy/blog/blog-article-sidebar";
import { ContinueLearningSection } from "@/components/academy/blog/continue-learning-section";
import { CtaSection } from "@/components/shared/cta-section";
import { academyBlogRelatedCourses } from "@/content/academy";
import { blogContent } from "@/content/blog";
import { createArticleMetadata, createPageMetadata } from "@/lib/metadata";
import { getBlogHeroImage, type BlogArticle } from "@/types/blog";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function getArticle(slug: string): BlogArticle | undefined {
  return blogContent.articles.find((article) => article.slug === slug);
}

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

  return (
    <AcademyDetailShell
      hero={
        <div className="relative aspect-video w-full overflow-hidden rounded-xl lg:aspect-21/9">
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 90vw"
            className="object-cover"
          />
        </div>
      }
      metadata={
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <ArticleMetaBadges
              category={article.category}
              readTimeMinutes={article.readTimeMinutes}
            />
            <span className="text-fg-subtle text-xs sm:text-sm">
              {dateFormatter.format(new Date(article.publishedAt))}
            </span>
          </div>
          <h1 className="text-foreground font-serif text-3xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px] lg:text-[40px] lg:leading-[52px]">
            {article.title}
          </h1>
        </div>
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
        <ContinueLearningSection
          content={blogContent.continueLearning}
          courses={academyBlogRelatedCourses}
        />
      }
      cta={<CtaSection overlapNext={false} content={blogContent.cta} />}
    />
  );
}
