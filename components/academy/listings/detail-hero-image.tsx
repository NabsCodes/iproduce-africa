"use client";

import { useState } from "react";
import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

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
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl lg:aspect-21/9">
      {!loaded ? (
        <Skeleton className="absolute inset-0 rounded-xl" aria-hidden />
      ) : null}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 90vw"
        onLoad={() => setLoaded(true)}
        className={cn(
          "object-cover transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}
