import { AcademyListingHeroSection } from "@/components/academy/listings/listing-hero-section";
import { FeaturedWebinarSection } from "@/components/academy/webinars/featured-webinar-section";
import { WebinarsListingBody } from "@/components/academy/webinars/webinars-listing-body";
import { CtaSection } from "@/components/shared/cta-section";
import { pageSeo } from "@/content/seo";
import { webinarsContent, webinarsListing } from "@/content/webinars";
import { createPageMetadata } from "@/lib/metadata";
import {
  fetchFeaturedWebinar,
  fetchWebinarsListing,
} from "@/lib/sanity/fetch/webinars";

export const metadata = createPageMetadata(pageSeo.webinars);
export const revalidate = 3600;

export default async function WebinarsIndexPage() {
  const [webinars, featured] = await Promise.all([
    fetchWebinarsListing(),
    fetchFeaturedWebinar(webinarsListing.featuredSlug),
  ]);

  return (
    <>
      <AcademyListingHeroSection content={webinarsListing.hero} />
      {featured ? <FeaturedWebinarSection webinar={featured} /> : null}
      <WebinarsListingBody
        webinars={webinars}
        filterTypes={webinarsListing.filterTypes}
      />
      <CtaSection overlapNext={false} content={webinarsContent.cta} />
    </>
  );
}
