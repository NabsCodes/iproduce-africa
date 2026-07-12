import { BlogListingBody } from "@/components/academy/blog/blog-listing-body";
import { FeaturedArticleSection } from "@/components/academy/blog/featured-article-section";
import { AcademyListingHeroSection } from "@/components/academy/listings/listing-hero-section";
import { CtaSection } from "@/components/shared/cta-section";
import { blogCategories, blogContent } from "@/content/blog";
import { pageSeo } from "@/content/seo";
import { createPageMetadata } from "@/lib/metadata";
import {
  fetchArticlesListing,
  fetchFeaturedArticle,
} from "@/lib/sanity/fetch/articles";

export const metadata = createPageMetadata(pageSeo.blog);
export const revalidate = 3600;

export default async function BlogIndexPage() {
  const [articles, featured] = await Promise.all([
    fetchArticlesListing(),
    fetchFeaturedArticle(blogContent.featuredArticleSlug),
  ]);

  return (
    <>
      <AcademyListingHeroSection content={blogContent.hero} />
      {featured ? <FeaturedArticleSection article={featured} /> : null}
      <BlogListingBody categories={blogCategories} articles={articles} />
      <CtaSection overlapNext={false} content={blogContent.cta} />
    </>
  );
}
