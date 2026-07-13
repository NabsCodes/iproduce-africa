import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";

import { HashScrollHandler } from "@/components/layout/hash-scroll-handler";
import { ScrollToTop } from "@/components/shared/scroll-to-top";
import { createSiteMetadata, viewport } from "@/lib/metadata";
import { AppProviders } from "@/providers/app-providers";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata = createSiteMetadata();
export { viewport };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${plusJakarta.variable} h-full scroll-smooth antialiased`}
    >
      <body className="bg-background text-foreground flex min-h-full flex-col font-sans">
        <AppProviders>{children}</AppProviders>
        <ScrollToTop />
        <Analytics />
        <HashScrollHandler />
      </body>
    </html>
  );
}
