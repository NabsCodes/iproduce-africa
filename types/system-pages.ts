export type SystemPageExitCtaVariant =
  | "green"
  | "green-soft"
  | "green-outline"
  | "tangerine";

export type SystemPageExitCta = {
  label: string;
  href: string;
  variant: SystemPageExitCtaVariant;
};

export type SystemPagePopularLink = {
  label: string;
  href: string;
};

export type NotFoundContent = {
  eyebrow: string;
  title: string;
  description: string;
  ctas: readonly SystemPageExitCta[];
  popularEyebrow: string;
  popularLinks: readonly SystemPagePopularLink[];
};

export type ErrorPageContent = {
  eyebrow: string;
  title: string;
  description: string;
  retryLabel: string;
  homeLabel: string;
  supportLabel: string;
  supportHref: string;
  referenceLabel: string;
  referenceFallback: string;
};

export type GlobalErrorContent = {
  eyebrow: string;
  title: string;
  body: string;
  supportEmail: string;
  retryLabel: string;
  homeLabel: string;
};

export type SystemPagesContent = {
  notFound: NotFoundContent;
  error: ErrorPageContent;
  globalError: GlobalErrorContent;
};
