/**
 * Pre-Sanity legal page body seed snapshot.
 * Runtime must not import this file — use content/legal.ts for nav chrome.
 */
import { siteConfig } from "@/content/site";
import type { LegalPagesContent } from "@/types/legal";

const BASELINE_NOTICE =
  "This document describes how the iProduce Africa website operates today. We may update it from time to time. iProduce Africa may replace or refine this text following formal legal review.";

const ENTITY_NOTE =
  "iProduce Africa is the platform operator and data controller for this website. iProduce Africa is an initiative associated with Inara Foundation; the registered entity name referenced in this document may be updated once confirmed by counsel.";

export const legalContent: LegalPagesContent = {
  lastUpdated: "2026-07-07",
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
  privacy: {
    eyebrow: "Privacy",
    title: "Privacy Policy",
    subtitle: "How we collect, use, and protect your information.",
    baselineNotice: { text: BASELINE_NOTICE, position: "top" },
    sections: [
      {
        id: "introduction",
        title: "Introduction",
        paragraphs: [
          `This Privacy Policy explains how ${siteConfig.name} ("we", "us", "our") collects, uses, and protects information when you visit ${siteConfig.siteUrl} or submit information through one of our forms.`,
          "By using this website, you agree to the practices described here. This policy should be read alongside our Terms of Use.",
          ENTITY_NOTE,
        ],
      },
      {
        id: "information-we-collect",
        title: "Information we collect",
        paragraphs: [
          "We collect information in two ways: what you provide directly, and what is generated automatically as you browse.",
        ],
        bullets: [
          "Contact form: first name, last name, email address, subject (and an optional detail when you select “Other”), and your message.",
          "Partner inquiry form: full name, organisation, role, country, sector, email, phone number, area of interest, and your reason for reaching out.",
          "Become a partner form: organisation profile, partnership interests, goals, and contact details (name, job title, email, phone).",
          "Community application: membership and profile details you submit in that form.",
          "Academy registration: name, email, phone, organisation, and the programme or event you are registering for.",
          "Newsletter signup: your email address.",
          "Automatic data: IP address, browser and device type, referring page, timestamps, and pages viewed, collected in aggregate through hosting and analytics infrastructure.",
        ],
      },
      {
        id: "how-we-use",
        title: "How we use information",
        paragraphs: ["We use the information above to:"],
        bullets: [
          "Respond to enquiries submitted through the contact form.",
          "Process partnership inquiries, partner applications, community applications, and Academy registrations.",
          "Send transactional emails, such as confirmations and receipts for your own submission.",
          "Send newsletter updates to subscribers who sign up.",
          "Protect the site against spam, abuse, and automated attacks.",
          "Understand aggregate site usage so we can improve content and navigation.",
          "Comply with legal obligations where applicable.",
        ],
      },
      {
        id: "legal-bases",
        title: "Legal bases",
        paragraphs: [
          "Where applicable data protection law requires a legal basis, we rely on: taking steps you request when you submit a form (contract or pre-contract steps); our legitimate interests in operating a secure, reliable website and understanding aggregate usage; and your consent where you opt in, such as subscribing to the newsletter.",
        ],
      },
      {
        id: "sharing",
        title: "How we share information",
        paragraphs: [
          "We do not sell or rent your personal information. We share information with a small number of service providers who help us operate the site, each acting under their own privacy terms:",
        ],
        bullets: [
          "Resend — delivers transactional email notifications and receipts.",
          "Cloudflare (Turnstile) — provides bot and spam protection on our forms.",
          "Upstash — provides rate-limiting infrastructure that helps prevent abuse of our forms.",
          "Vercel — hosts the website and provides aggregate, anonymized analytics.",
          "Sanity — powers the content management system used by our editorial team at /admin; this is an internal tool, not a public-facing data flow.",
        ],
      },
      {
        id: "international-transfers",
        title: "International transfers",
        paragraphs: [
          "Our service providers may process information on servers located outside Nigeria. Where this happens, we expect our providers to maintain reasonable safeguards appropriate to the nature of the information involved.",
        ],
      },
      {
        id: "retention",
        title: "Data retention",
        paragraphs: [
          "We retain information for as long as needed to respond to your enquiry or fulfil the purpose you submitted it for, and afterwards only as long as reasonably necessary for record-keeping or legal obligations. You may request deletion of your information at any time — see Your rights below.",
        ],
      },
      {
        id: "security",
        title: "Security",
        paragraphs: [
          "We use industry-standard measures to protect information in transit and at rest, including TLS encryption, access controls, and rate limiting on public forms. No method of transmission over the internet is completely secure, and we cannot guarantee absolute security.",
        ],
      },
      {
        id: "your-rights",
        title: "Your rights",
        paragraphs: [
          "Depending on applicable law, you may have the right to access, correct, or request deletion of your personal information, object to certain processing, or withdraw consent where processing is based on consent. To exercise any of these rights, contact us using the details below.",
        ],
      },
      {
        id: "children",
        title: "Children's privacy",
        paragraphs: [
          "This website is not directed at children, and we do not knowingly collect personal information from anyone under 18. If you believe a child has provided us with personal information, please contact us so we can remove it.",
        ],
      },
      {
        id: "changes",
        title: "Changes to this policy",
        paragraphs: [
          "We may update this policy from time to time to reflect changes to the website or applicable law. We will post updates on this page and revise the last-updated date above.",
        ],
      },
      {
        id: "contact",
        title: "Contact us",
        paragraphs: [
          `If you have questions about this policy or want to exercise your rights, contact us at ${siteConfig.email}, call ${siteConfig.phone}, or write to us at ${siteConfig.address}.`,
        ],
      },
    ],
  },
  terms: {
    eyebrow: "Terms",
    title: "Terms of Use",
    subtitle: "Rules for using the iProduce Africa website.",
    baselineNotice: { text: BASELINE_NOTICE, position: "top" },
    sections: [
      {
        id: "acceptance",
        title: "Acceptance of terms",
        paragraphs: [
          `By accessing or using ${siteConfig.siteUrl}, you agree to these Terms of Use. If you do not agree, please do not use this website. These terms should be read alongside our Privacy Policy.`,
        ],
      },
      {
        id: "about-the-site",
        title: "About the site",
        paragraphs: [
          `${siteConfig.name} is an informational marketing website for Africa's agribusiness ecosystem. It provides pathways to explore the Academy, join the Community, and connect with Partners. This website does not offer user accounts, logins, or a portal — all interactions happen through the public forms described in our Privacy Policy.`,
        ],
      },
      {
        id: "form-submissions",
        title: "Form submissions",
        paragraphs: [
          "When you submit a form on this site — contact, partner inquiry, become a partner, community application, Academy registration, or newsletter — you agree to provide accurate information and give us permission to contact you about your submission.",
          "Submitting a form does not guarantee acceptance into a programme, partnership, or community membership. We review submissions and follow up at our discretion.",
        ],
      },
      {
        id: "acceptable-use",
        title: "Acceptable use",
        paragraphs: ["When using this website, you agree not to:"],
        bullets: [
          "Use the site for any unlawful purpose.",
          "Attempt to scrape, harvest, or abusively automate requests against the site.",
          "Introduce malware, viruses, or other harmful code.",
          "Impersonate any person or organisation, or misrepresent your affiliation with one.",
          "Harass, abuse, or harm another person through the site.",
        ],
      },
      {
        id: "intellectual-property",
        title: "Intellectual property",
        paragraphs: [
          `Content on this website — including text, graphics, logos, and images — is owned by ${siteConfig.name} or its licensors, unless otherwise noted. You may view and share content for personal, non-commercial purposes. Reuse for commercial purposes requires our prior written permission.`,
        ],
      },
      {
        id: "third-party-links",
        title: "Third-party links",
        paragraphs: [
          "This website may link to partner websites, social media platforms, or map services operated by third parties. We are not responsible for the content, policies, or practices of those third-party sites.",
        ],
      },
      {
        id: "disclaimers",
        title: "Disclaimers",
        paragraphs: [
          "Content on this website, including Academy materials, is provided for general informational purposes and does not constitute professional, legal, or financial advice. You should seek independent advice before making decisions based on content found here.",
        ],
      },
      {
        id: "limitation-of-liability",
        title: "Limitation of liability",
        paragraphs: [
          `To the fullest extent permitted by law, ${siteConfig.name} is not liable for any indirect, incidental, or consequential damages arising from your use of this website. Our total liability for any claim relating to the website is limited to the greatest extent permitted by applicable law.`,
        ],
      },
      {
        id: "governing-law",
        title: "Governing law",
        paragraphs: [
          "These terms are governed by the laws of the Federal Republic of Nigeria, as applicable. Any disputes arising from these terms are subject to the jurisdiction of the courts in Abuja, Nigeria. This wording is a draft baseline and may be refined once confirmed by counsel.",
        ],
      },
      {
        id: "changes",
        title: "Changes",
        paragraphs: [
          "We may update these terms from time to time. Updates will be posted on this page and the last-updated date above will be revised.",
        ],
      },
      {
        id: "contact",
        title: "Contact",
        paragraphs: [
          `Questions about these terms can be sent to ${siteConfig.email}.`,
        ],
      },
    ],
  },
  cookies: {
    eyebrow: "Cookies",
    title: "Cookie Policy",
    subtitle: "How this website uses cookies and similar technologies.",
    baselineNotice: { text: BASELINE_NOTICE, position: "bottom" },
    sections: [
      {
        id: "what-are-cookies",
        title: "What are cookies?",
        paragraphs: [
          "Cookies are small text files placed on your device by websites you visit. Sites also use related technologies — such as local storage and security signals — that work similarly. This page describes the cookies and similar technologies used on this website.",
        ],
      },
      {
        id: "how-we-use",
        title: "How we use cookies",
        paragraphs: [
          "We keep cookie use to a minimum. Cloudflare Turnstile, our bot-protection service on public forms, may use strictly necessary security signals or cookies to verify that a form submission is coming from a real person. Vercel Web Analytics, which we use to understand aggregate page views, collects anonymized usage data and, per current Vercel documentation, does not use analytics cookies on this site. We do not use advertising or marketing cookies.",
        ],
      },
      {
        id: "cookies-we-use",
        title: "Cookies & similar technologies we use",
        paragraphs: [
          "The table below is an honest summary rather than an exhaustive technical list — some entries are provider-dependent and may vary based on Cloudflare's own configuration.",
        ],
        table: {
          headers: ["Category", "Purpose", "Provider"],
          rows: [
            [
              "Essential / security",
              "Bot and spam protection on public forms (may set strictly necessary cookies or security signals during challenge verification).",
              "Cloudflare Turnstile",
            ],
            [
              "Analytics",
              "Aggregate, anonymized page-view analytics — no analytics cookies used.",
              "Vercel Web Analytics",
            ],
            ["Preferences / marketing", "Not used on this website.", "—"],
          ],
        },
      },
      {
        id: "managing-cookies",
        title: "Managing cookies",
        paragraphs: [
          "You can control or block cookies through your browser settings. Because Turnstile relies on security signals to verify form submissions, blocking it may prevent our forms from working correctly. This website does not currently show a cookie consent banner, as we do not set analytics or marketing cookies on this website.",
        ],
      },
      {
        id: "third-party-policies",
        title: "Third-party policies",
        paragraphs: [
          "For more detail on how our providers handle data, see their own policies: Cloudflare Turnstile's privacy policy at cloudflare.com/turnstile-privacy-policy, and Vercel's analytics documentation at vercel.com/docs/analytics.",
        ],
      },
      {
        id: "changes",
        title: "Changes",
        paragraphs: [
          "We may update this policy as our use of cookies and similar technologies changes. Updates will be posted on this page and the last-updated date above will be revised.",
        ],
      },
      {
        id: "contact",
        title: "Contact",
        paragraphs: [
          `Questions about this policy can be sent to ${siteConfig.email}.`,
        ],
      },
    ],
  },
  accessibility: {
    eyebrow: "Accessibility",
    title: "Accessibility Statement",
    subtitle: "Our commitment to an accessible experience.",
    baselineNotice: { text: BASELINE_NOTICE, position: "bottom" },
    sections: [
      {
        id: "commitment",
        title: "Our commitment",
        paragraphs: [
          `${siteConfig.name} aims to provide an accessible experience for agripreneurs, partners, and institutions across our audience, regardless of device or ability. We continue to work on improving accessibility as the site evolves.`,
        ],
      },
      {
        id: "measures",
        title: "Measures we take",
        paragraphs: ["Practices we follow across the site include:"],
        bullets: [
          "Semantic HTML for page structure and headings.",
          "Visible keyboard focus states on interactive controls.",
          "Labelled form fields across all public forms.",
          "Accessible component primitives (Radix / shadcn) for menus, dialogs, tabs, and accordions.",
          "Support for reduced-motion preferences.",
          "Responsive layouts that work across phone, tablet, and desktop screens.",
        ],
      },
      {
        id: "known-limitations",
        title: "Known limitations",
        paragraphs: [
          "This website has not yet undergone a formal third-party accessibility audit. Some third-party embeds — such as map views and Turnstile's verification widget — are outside our direct control. Content and layout continue to evolve, and some pages may lag behind others in accessibility polish.",
        ],
      },
      {
        id: "feedback",
        title: "Feedback and assistance",
        paragraphs: [
          `If you encounter an accessibility barrier on this website, let us know through our Contact page or by emailing ${siteConfig.email}. We aim to respond within a reasonable timeframe and address issues as we're able to.`,
        ],
      },
      {
        id: "continuous-improvement",
        title: "Continuous improvement",
        paragraphs: [
          "We treat accessibility as ongoing work rather than a one-time fix, and we update this statement as we ship improvements.",
        ],
      },
    ],
  },
};
