import type { ComponentType } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";

import { cn } from "@/lib/utils";
import type { SiteSocialLink } from "@/types/site";

const socialIconMap = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
} as const satisfies Record<
  SiteSocialLink["platform"],
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
>;

type SocialIconProps = {
  platform: SiteSocialLink["platform"];
  className?: string;
};

export function SocialIcon({ platform, className }: SocialIconProps) {
  const Icon = socialIconMap[platform];

  return <Icon aria-hidden className={cn("size-3.5", className)} />;
}
