export type SiteNavigationChild = {
  label: string;
  href: string;
  description?: string;
};

export type SiteNavigationItem = {
  label: string;
  href: string;
  children?: readonly SiteNavigationChild[];
};
