import type { ComponentType, MouseEvent } from "react";
import Link from "next/link";
import { Globe, Mail, Phone } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTelegram,
  FaXTwitter,
} from "react-icons/fa6";

import {
  getAboutPersonSocialAriaLabel,
  getAboutPersonSocialHref,
} from "@/lib/about-person-socials";
import { cn } from "@/lib/utils";
import type {
  AboutPersonSocial,
  AboutPersonSocialPlatform,
} from "@/types/about";

const socialIconMap = {
  linkedin: FaLinkedinIn,
  facebook: FaFacebookF,
  x: FaXTwitter,
  instagram: FaInstagram,
  telegram: FaTelegram,
  website: Globe,
  email: Mail,
  phone: Phone,
} as const satisfies Record<
  AboutPersonSocialPlatform,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
>;

type PersonSocialLinksProps = {
  socials: readonly AboutPersonSocial[];
  personName: string;
  size?: "sm" | "md";
  showValueOnHover?: boolean;
  className?: string;
  onLinkClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

function PersonSocialLink({
  social,
  personName,
  size,
  showValueOnHover,
  onLinkClick,
}: {
  social: AboutPersonSocial;
  personName: string;
  size: "sm" | "md";
  showValueOnHover?: boolean;
  onLinkClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  const href = getAboutPersonSocialHref(social);
  const ariaLabel = getAboutPersonSocialAriaLabel(social, personName);
  const Icon = socialIconMap[social.platform];
  const isExternal = social.platform !== "email" && social.platform !== "phone";
  const buttonClassName = cn(
    "border-default text-fg-muted hover:bg-muted inline-flex shrink-0 items-center justify-center rounded-md border transition",
    size === "sm" ? "size-8" : "size-9",
  );
  const title = showValueOnHover ? social.value : undefined;

  if (isExternal) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        title={title}
        className={buttonClassName}
        onClick={onLinkClick}
      >
        <Icon className="size-3.5" aria-hidden />
      </Link>
    );
  }

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      title={title}
      className={buttonClassName}
      onClick={onLinkClick}
    >
      <Icon className="size-3.5" aria-hidden />
    </a>
  );
}

export function PersonSocialLinks({
  socials,
  personName,
  size = "sm",
  showValueOnHover = false,
  className,
  onLinkClick,
}: PersonSocialLinksProps) {
  if (!socials.length) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {socials.map((social) => (
        <PersonSocialLink
          key={`${social.platform}-${social.value}`}
          social={social}
          personName={personName}
          size={size}
          showValueOnHover={showValueOnHover}
          onLinkClick={onLinkClick}
        />
      ))}
    </div>
  );
}
