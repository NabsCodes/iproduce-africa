import type { CtaSectionContent, FaqSectionContent } from "@/types/content";

export type ContactSocialPlatform =
  | "whatsapp"
  | "instagram"
  | "linkedin"
  | "telegram";

export type ContactSocialLink = {
  label: string;
  platform: ContactSocialPlatform;
  href?: string;
};

export type ContactHeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  socialLinks: readonly ContactSocialLink[];
};

export type ContactReachOutContent = {
  title: string;
  availabilityIntro: string;
  secondaryPhone: string;
};

export type ContactFormOption = {
  value: string;
  label: string;
};

export type ContactFormContent = {
  title: string;
  description: string;
  otherOptionValue: string;
  placeholders: {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    subjectOther: string;
    message: string;
  };
  options: {
    subjects: readonly ContactFormOption[];
  };
  submitLabel: string;
  successTitle: string;
  successDescription: string;
  sendAnotherLabel: string;
};

export type ContactMapContent = {
  hubTitle: string;
  embedUrl: string;
  directionsUrl: string;
  viewLargerUrl: string;
};

export type ContactPageContent = {
  hero: ContactHeroContent;
  reachOut: ContactReachOutContent;
  form: ContactFormContent;
  map: ContactMapContent;
  faqs: FaqSectionContent;
  cta: CtaSectionContent;
};
