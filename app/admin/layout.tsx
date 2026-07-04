import type { Metadata } from "next";
import {
  metadata as studioMetadata,
  viewport as studioViewport,
} from "next-sanity/studio";

export const metadata: Metadata = {
  ...studioMetadata,
  title: "Studio",
};

// Not typed as `Viewport` — next-sanity@13.1.1 declares `viewportFit` as a
// bare `string` instead of the literal union, which fails against Next's
// `Viewport` type even though the runtime value ("cover") is valid. Next
// reads this export structurally, so the inferred type is sufficient.
export const viewport = {
  ...studioViewport,
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
