import type { ReactNode } from "react";

import { EyebrowBadge } from "@/components/ui/eyebrow-badge";

type AcademyDetailMetadataProps = {
  eyebrow: string;
  title: string;
  badges: ReactNode;
};

export function AcademyDetailMetadata({
  eyebrow,
  title,
  badges,
}: AcademyDetailMetadataProps) {
  return (
    <div className="flex flex-col gap-4">
      <EyebrowBadge>{eyebrow}</EyebrowBadge>
      <div className="flex flex-wrap items-center gap-2">{badges}</div>
      <h1 className="text-foreground font-serif text-3xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px] lg:text-[40px] lg:leading-[52px]">
        {title}
      </h1>
    </div>
  );
}
