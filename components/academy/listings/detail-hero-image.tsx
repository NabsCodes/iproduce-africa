"use client";

import { CatalogueImage } from "@/components/shared/catalogue-image";

type AcademyDetailHeroImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

export function AcademyDetailHeroImage({
  src,
  alt,
  priority = true,
}: AcademyDetailHeroImageProps) {
  return (
    <CatalogueImage
      src={src}
      alt={alt}
      priority={priority}
      sizes="(max-width: 1024px) 100vw, 90vw"
      className="aspect-video w-full rounded-xl lg:aspect-21/9"
      showLoadingSkeleton
    />
  );
}
