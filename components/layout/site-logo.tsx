import Image from "next/image";
import Link from "next/link";
import type { ComponentProps } from "react";

import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

type SiteLogoProps = Omit<ComponentProps<typeof Link>, "href" | "children"> & {
  imageClassName?: string;
  panel?: boolean;
  priority?: boolean;
};

export function SiteLogo({
  className,
  imageClassName,
  panel = false,
  priority = false,
  ...rest
}: SiteLogoProps) {
  return (
    <Link
      href="/"
      aria-label={siteConfig.name}
      className={cn(
        "inline-flex items-center",
        panel && "rounded-xl bg-white px-4 py-3 shadow-sm",
        className,
      )}
      {...rest}
    >
      <Image
        src="/images/shared/iproduce-logo.webp"
        alt={`${siteConfig.name} logo`}
        width={2595}
        height={1164}
        priority={priority}
        sizes="(min-width: 1280px) 172px, (min-width: 1024px) 156px, (min-width: 640px) 152px, 140px"
        className={cn(
          "h-auto w-[140px] sm:w-[152px] lg:w-[156px] xl:w-[180px]",
          imageClassName,
        )}
      />
    </Link>
  );
}
