import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "@react-email/components",
    "@react-email/render",
    "resend",
    // Sanity's bundled code assumes `swr`'s default (non-"react-server")
    // export unconditionally; Turbopack's RSC module graph resolves `swr`
    // via the "react-server" condition instead, which has no default
    // export, and the build fails resolving it. Marking these external
    // skips Turbopack's bundling for them entirely — Node resolves them
    // normally at runtime instead.
    "sanity",
    "next-sanity",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
