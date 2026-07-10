"use client";

import { CatalogueImage } from "@/components/shared/catalogue-image";

type ArticleBodyImageProps = {
  src?: string;
  alt: string;
  caption?: string;
};

export function ArticleBodyImage({ src, alt, caption }: ArticleBodyImageProps) {
  return (
    <figure className="overflow-hidden rounded-xl">
      <CatalogueImage
        src={src}
        alt={alt}
        sizes="(max-width: 1024px) 100vw, 768px"
        className="bg-muted aspect-16/10 w-full"
      />
      {caption ? (
        <figcaption className="text-fg-subtle mt-2 text-sm">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
