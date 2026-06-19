import type { ComponentType } from "react";
import {
  FaInstagram,
  FaLinkedinIn,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa6";

import { cn } from "@/lib/utils";
import type { ContactSocialPlatform } from "@/types/contact";

const contactSocialIconMap = {
  whatsapp: FaWhatsapp,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  telegram: FaTelegram,
} as const satisfies Record<
  ContactSocialPlatform,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
>;

type ContactSocialIconProps = {
  platform: ContactSocialPlatform;
  className?: string;
};

export function ContactSocialIcon({
  platform,
  className,
}: ContactSocialIconProps) {
  const Icon = contactSocialIconMap[platform];

  return <Icon aria-hidden className={cn("size-[18px]", className)} />;
}
