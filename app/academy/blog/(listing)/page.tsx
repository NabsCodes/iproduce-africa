import { AcademyListingHeroSection } from "@/components/academy/listings/listing-hero-section";
import { BlogListingBody } from "@/components/academy/blog/blog-listing-body";
import { FeaturedArticleSection } from "@/components/academy/blog/featured-article-section";
import { CtaSection } from "@/components/shared/cta-section";
import { blogCategories, blogContent } from "@/content/blog";
import { pageSeo } from "@/content/seo";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(pageSeo.blog);

function resolveFeaturedArticle() {
  const sorted = [...blogContent.articles].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );

  if (blogContent.featuredArticleSlug) {
    const match = sorted.find(
      (article) => article.slug === blogContent.featuredArticleSlug,
    );
    if (match) return match;
  }

  return sorted[0];
}

export default function BlogIndexPage() {
  const featured = resolveFeaturedArticle();

  return (
    <>
      <AcademyListingHeroSection content={blogContent.hero} />
      {featured ? <FeaturedArticleSection article={featured} /> : null}
      <BlogListingBody
        categories={blogCategories}
        articles={blogContent.articles}
      />
      <CtaSection overlapNext={false} content={blogContent.cta} />
    </>
  );
}
