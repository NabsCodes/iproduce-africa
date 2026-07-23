import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.iproduceafrica.com" }],
        destination: "https://iproduceafrica.com/:path*",
        permanent: true,
      },
    ];
  },
  serverExternalPackages: [
    "@react-email/components",
    "@react-email/render",
    "resend",
  ],
  // `sanity` / `next-sanity` need Next's own bundler pass (not full
  // externalization) so "use client" boundaries inside next-sanity/studio
  // are respected — otherwise the Studio's lazily-loaded client component
  // runs against a detached React module instance ("Invalid hook call").
  // `transpilePackages` keeps them in Next's controlled compilation pass
  // instead of raw external Node resolution.
  transpilePackages: ["sanity", "next-sanity"],
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
