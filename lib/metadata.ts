import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/content/site";

const FALLBACK_SITE_URL = siteConfig.siteUrl;

type OpenGraphMetadata = NonNullable<Metadata["openGraph"]>;
type TwitterMetadata = NonNullable<Metadata["twitter"]>;

type OpenGraphInput = Omit<
  OpenGraphMetadata,
  "title" | "description" | "url"
> & {
  title: OpenGraphMetadata["title"];
  description?: string;
  path?: string;
};

type TwitterInput = Omit<TwitterMetadata, "title" | "description"> & {
  title: TwitterMetadata["title"];
  description?: string;
};

type PageMetadataInput = {
  title?: string;
  description: string;
  path?: string;
  keywords?: string[];
};

function normalizeSiteUrl(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function buildAbsoluteUrl(path: string): string {
  return new URL(path, getMetadataBase()).toString();
}

function resolveTitle(title?: string): string {
  return title ? `${title} | ${siteConfig.name}` : siteConfig.name;
}

export function getSiteUrl(): string {
  // 1. Explicit override always wins (useful for staging, custom domains
  //    that aren't on Vercel, or local OG testing via ngrok).
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
  }
  // 2. On Vercel, prefer the auto-injected URL so OG, canonical, and
  //    absolute links always point at the domain that's actually serving
  //    the page. VERCEL_PROJECT_PRODUCTION_URL resolves to the configured
  //    production domain (custom domain if set, otherwise *.vercel.app);
  //    VERCEL_URL is the per-deployment URL for previews/branch deploys.
  //    This means once `iproduceafrica.com` is cut over to Vercel, the
  //    meta tags will automatically follow without any code change.
  const vercelUrl =
    (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL) ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL;
  if (vercelUrl) {
    return normalizeSiteUrl(`https://${vercelUrl}`);
  }
  // 3. Local dev fallback — the configured canonical domain.
  return normalizeSiteUrl(FALLBACK_SITE_URL);
}

export function getMetadataBase(): URL {
  return new URL(getSiteUrl());
}

export function createDefaultOpenGraph({
  title,
  description,
  path = "/",
  ...rest
}: OpenGraphInput): OpenGraphMetadata {
  // Share images come from the file convention:
  //   app/opengraph-image.png  → opengraph
  //   app/twitter-image.png    → twitter
  // Next.js auto-injects them into every page's <head>. Override per route
  // by dropping the same filename inside that route's folder.
  return {
    type: "website",
    siteName: siteConfig.name,
    url: buildAbsoluteUrl(path),
    title,
    description,
    ...rest,
  };
}

export function createDefaultTwitter({
  title,
  description,
  ...rest
}: TwitterInput): TwitterMetadata {
  return {
    card: "summary_large_image",
    title,
    description,
    ...rest,
  };
}

export function createSiteMetadata(): Metadata {
  return {
    metadataBase: getMetadataBase(),
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    applicationName: siteConfig.name,
    keywords: siteConfig.keywords,
    category: "Agriculture",
    alternates: {
      canonical: "/",
    },
    openGraph: createDefaultOpenGraph({
      title: siteConfig.name,
      description: siteConfig.description,
    }),
    twitter: createDefaultTwitter({
      title: siteConfig.name,
      description: siteConfig.description,
    }),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function createPageMetadata({
  title,
  description,
  path = "/",
  keywords,
}: PageMetadataInput): Metadata {
  const resolvedTitle = resolveTitle(title);

  return {
    title: {
      absolute: resolvedTitle,
    },
    description,
    ...(keywords ? { keywords } : {}),
    alternates: {
      canonical: path,
    },
    openGraph: createDefaultOpenGraph({
      title: resolvedTitle,
      description,
      path,
    }),
    twitter: createDefaultTwitter({
      title: resolvedTitle,
      description,
    }),
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f9f5",
};
