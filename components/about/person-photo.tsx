"use client";

import { useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

function PersonPhotoFallback({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-forest-subtle flex flex-col items-center justify-center gap-3 px-4",
        className,
      )}
    >
      <span
        aria-hidden
        className="bg-leaf-100 flex size-14 items-center justify-center rounded-xl sm:size-16"
      >
        <Image
          src="/images/shared/logo-mark.webp"
          alt=""
          width={40}
          height={40}
          className="size-8 object-contain opacity-80 sm:size-9"
        />
      </span>
      <p className="text-fg-subtle text-center text-[11px] font-medium tracking-[0.08em] uppercase">
        Photo coming soon
      </p>
    </div>
  );
}

type PersonPhotoProps = {
  src?: string;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
};

export function isAboutPersonPhotoAvailable(photo?: string): boolean {
  return Boolean(photo?.trim());
}

export function PersonPhoto({
  src,
  alt,
  sizes,
  className,
  imageClassName,
}: PersonPhotoProps) {
  const [failed, setFailed] = useState(false);
  const showFallback = !isAboutPersonPhotoAvailable(src) || failed;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {showFallback ? (
        <PersonPhotoFallback className="absolute inset-0" />
      ) : (
        <Image
          src={src!}
          alt={alt}
          fill
          sizes={sizes}
          className={cn("object-cover", imageClassName)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
