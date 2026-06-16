import Image from "next/image";

import type { Partner } from "@/content/partners";
import { cn } from "@/lib/utils";

type PartnerLogoProps = {
  partner: Partner;
  className?: string;
};

export function PartnerLogo({ partner, className }: PartnerLogoProps) {
  const image = (
    <Image
      src={partner.logo}
      alt={partner.name}
      width={200}
      height={64}
      style={{ width: "auto" }}
      className={cn(
        "h-9 object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 sm:h-10 lg:h-12",
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
