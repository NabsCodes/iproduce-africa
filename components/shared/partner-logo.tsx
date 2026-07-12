"use client";

import Image from "next/image";
import { useState } from "react";

import type { Partner } from "@/content/partners";
import { cn } from "@/lib/utils";

type PartnerLogoProps = {
  partner: Partner;
  className?: string;
};

export function PartnerLogo({ partner, className }: PartnerLogoProps) {
  const [failed, setFailed] = useState(false);
  const showFallback = !partner.logo?.trim() || failed;

  const image = showFallback ? (
    <span
      className={cn(
        "text-fg-subtle inline-flex h-9 max-w-[12rem] items-center text-xs font-semibold tracking-wide uppercase sm:h-10 lg:h-12",
        className,
      )}
    >
      {partner.name}
    </span>
  ) : (
    <Image
      src={partner.logo}
      alt={partner.name}
      width={200}
      height={64}
      style={{ width: "auto" }}
      onError={() => setFailed(true)}
      className={cn(
        "h-9 object-contain opacity-70 transition hover:opacity-100 sm:h-10 lg:h-12",
        className,
      )}
    />
  );

  if (partner.href) {
    return (
      <a
        href={partner.href}
        target="_blank"
        rel="noreferrer"
        aria-label={partner.name}
        className="inline-flex"
      >
        {image}
      </a>
    );
  }

  return image;
}
