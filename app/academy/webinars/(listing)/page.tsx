import { AcademyListingHeroSection } from "@/components/academy/listings/listing-hero-section";
import { FeaturedWebinarSection } from "@/components/academy/webinars/featured-webinar-section";
import { WebinarsListingBody } from "@/components/academy/webinars/webinars-listing-body";
import { CtaSection } from "@/components/shared/cta-section";
import {
  getWebinar,
  webinarsContent,
  webinarsListing,
} from "@/content/webinars";
import { pageSeo } from "@/content/seo";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(pageSeo.webinars);

export default function WebinarsIndexPage() {
  const featured = getWebinar(webinarsListing.featuredSlug);

  return (
    <>
      <AcademyListingHeroSection content={webinarsListing.hero} />
      {featured ? <FeaturedWebinarSection webinar={featured} /> : null}
      <WebinarsListingBody
        webinars={webinarsContent.webinars}
        filterTypes={webinarsListing.filterTypes}
      />
      <CtaSection overlapNext={false} content={webinarsContent.cta} />
    </>
  );
}
