import { ContactIntroSection } from "@/components/contact/intro-section";
import { ContactMapSection } from "@/components/contact/map-section";
import { CtaSection } from "@/components/shared/cta-section";
import { FaqSection } from "@/components/shared/faq-section";
import { contactPageContent } from "@/content/contact";
import { pageSeo } from "@/content/seo";
import { createPageMetadata } from "@/lib/metadata";
import { fetchFaqs } from "@/lib/sanity/fetch/faqs";

export const metadata = createPageMetadata(pageSeo.contact);
export const revalidate = 3600;

export default async function ContactPage() {
  // Reuses the "home" placement, same as contactPageContent.faqs already
  // reuses homeContent.faqs today.
  const faqs = await fetchFaqs("home");

  return (
    <>
      <ContactIntroSection />
      <ContactMapSection />
      {faqs.length > 0 ? (
        <FaqSection
          content={{ ...contactPageContent.faqs, items: faqs }}
          supportCardHref="#contact-form"
        />
      ) : null}
      <CtaSection overlapNext={false} content={contactPageContent.cta} />
    </>
  );
}
