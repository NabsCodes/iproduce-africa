"use client";

import { useState } from "react";
import Image from "next/image";

import { CmsFallbackImage } from "@/components/shared/cms-fallback-image";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

function isCatalogueImageAvailable(src?: string): boolean {
  return Boolean(src?.trim());
}

type CatalogueImageProps = {
  src?: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  fit?: "cover" | "contain";
  className?: string;
  imageClassName?: string;
  showLoadingSkeleton?: boolean;
};

export function CatalogueImage({
  src,
  alt,
  sizes,
  priority = false,
  fit = "cover",
  className,
  imageClassName,
  showLoadingSkeleton = false,
}: CatalogueImageProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const showFallback = !isCatalogueImageAvailable(src) || failed;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {showFallback ? (
        <CmsFallbackImage alt={alt} className="absolute inset-0 rounded-xl" />
      ) : (
        <>
          {showLoadingSkeleton && !loaded ? (
            <Skeleton className="absolute inset-0 rounded-xl" aria-hidden />
          ) : null}
          <Image
            src={src!}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={cn(
              fit === "contain" ? "object-contain" : "object-cover",
              imageClassName,
              showLoadingSkeleton &&
                cn(
                  "transition-opacity duration-300",
                  loaded ? "opacity-100" : "opacity-0",
                ),
            )}
          />
        </>
      )}
    </div>
  );
}
