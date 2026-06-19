import { ContactIntroSection } from "@/components/contact/intro-section";
import { ContactMapSection } from "@/components/contact/map-section";
import { CtaSection } from "@/components/shared/cta-section";
import { FaqSection } from "@/components/shared/faq-section";
import { contactPageContent } from "@/content/contact";
import { pageSeo } from "@/content/seo";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(pageSeo.contact);

export default function ContactPage() {
  return (
    <>
      <ContactIntroSection />
      <ContactMapSection />
      <FaqSection
        content={contactPageContent.faqs}
        supportCardHref="#contact-form"
      />
      <CtaSection overlapNext={false} content={contactPageContent.cta} />
    </>
  );
}
