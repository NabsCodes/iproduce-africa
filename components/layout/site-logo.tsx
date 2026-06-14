import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
  imageClassName?: string;
  panel?: boolean;
  priority?: boolean;
};

export function SiteLogo({
  className,
  imageClassName,
  panel = false,
  priority = false,
}: SiteLogoProps) {
  return (
    <Link
      href="/"
      aria-label={siteConfig.name}
      className={cn(
        "inline-flex items-center",
        panel && "rounded-[20px] bg-white px-4 py-3 shadow-sm",
        className,
      )}
    >
      <Image
        src="/images/shared/iproduce-logo.webp"
        alt={`${siteConfig.name} logo`}
        width={2595}
        height={1164}
        priority={priority}
        sizes="(min-width: 1280px) 172px, (min-width: 1024px) 156px, (min-width: 640px) 152px, 140px"
        className={cn(
          "h-auto w-[140px] sm:w-[152px] lg:w-[156px] xl:w-[172px]",
          imageClassName,
        )}
      />
    </Link>
  );
}
