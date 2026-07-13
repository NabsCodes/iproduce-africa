import { ContactIntroSection } from "@/components/contact/intro-section";
import { ContactMapSection } from "@/components/contact/map-section";
import { CtaSection } from "@/components/shared/cta-section";
import { FaqSection } from "@/components/shared/faq-section";
import { contactPageContent } from "@/content/contact";
import { pageSeo } from "@/content/seo";
import { createPageMetadata } from "@/lib/metadata";
import { fetchFaqs } from "@/lib/sanity/fetch/faqs";
import { fetchSiteSettings } from "@/lib/sanity/fetch/site-settings";

export const metadata = createPageMetadata(pageSeo.contact);
export const revalidate = 3600;

export default async function ContactPage() {
  const [settings, faqs] = await Promise.all([
    fetchSiteSettings(),
    fetchFaqs("home"),
  ]);

  return (
    <>
      <ContactIntroSection settings={settings} />
      <ContactMapSection settings={settings} />
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
