import type { LegalNavContent } from "@/types/legal";

/** Presentation chrome for legal routes — page bodies live in Sanity / archive. */
export const legalContent = {
  nav: [
    { key: "privacy", label: "Privacy Policy", href: "/privacy" },
    { key: "terms", label: "Terms of Use", href: "/terms" },
    { key: "cookies", label: "Cookie Policy", href: "/cookies" },
    {
      key: "accessibility",
      label: "Accessibility Statement",
      href: "/accessibility",
    },
  ],
} as const satisfies LegalNavContent;
