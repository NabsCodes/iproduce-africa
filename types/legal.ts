export type LegalTable = {
  headers: readonly string[];
  rows: readonly (readonly string[])[];
};

export type LegalSection = {
  id: string;
  title: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
  table?: LegalTable;
};

export type LegalBaselineNotice = {
  text: string;
  position: "top" | "bottom";
};

export type LegalDocKey = "privacy" | "terms" | "cookies" | "accessibility";

export type LegalNavItem = {
  key: LegalDocKey;
  label: string;
  href: string;
};

export type LegalPageContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  baselineNotice: LegalBaselineNotice;
  sections: readonly LegalSection[];
};

export type LegalPagesContent = {
  lastUpdated: string;
  nav: readonly LegalNavItem[];
  privacy: LegalPageContent;
  terms: LegalPageContent;
  cookies: LegalPageContent;
  accessibility: LegalPageContent;
};

/** Chrome-only legal nav for runtime routes; full bodies live in archive/CMS. */
export type LegalNavContent = {
  nav: readonly LegalNavItem[];
};
