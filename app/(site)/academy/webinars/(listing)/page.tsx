import { AcademyListingHeroSection } from "@/components/academy/listings/listing-hero-section";
import { FeaturedWebinarSection } from "@/components/academy/webinars/featured-webinar-section";
import { WebinarsListingBody } from "@/components/academy/webinars/webinars-listing-body";
import { CtaSection } from "@/components/shared/cta-section";
import { pageSeo } from "@/content/seo";
import { webinarsContent, webinarsListing } from "@/content/webinars";
import { categoriesUsedBy } from "@/lib/academy-categories";
import { selectPromotableWebinars } from "@/lib/academy-webinars";
import { createPageMetadata } from "@/lib/metadata";
import { fetchWebinarsListing } from "@/lib/sanity/fetch/webinars";

export const metadata = createPageMetadata(pageSeo.webinars);
// Promotion is time-driven, so this route must refresh without a CMS webhook.
export const revalidate = 300;

export default async function WebinarsIndexPage() {
  const webinars = await fetchWebinarsListing();
  const promoted = selectPromotableWebinars(webinars, { limit: 1 })[0] ?? null;

  return (
    <>
      <AcademyListingHeroSection content={webinarsListing.hero} />
      {promoted ? <FeaturedWebinarSection webinar={promoted} /> : null}
      <WebinarsListingBody
        webinars={webinars}
        categories={categoriesUsedBy(webinars, (webinar) => webinar.category)}
      />
      <CtaSection overlapNext={false} content={webinarsContent.cta} />
    </>
  );
}
