"use client";

import { UsersRound } from "lucide-react";
import type { ReactNode } from "react";

import { SiteCtaButton } from "@/components/shared/site-cta-button";

type CommunityJoinButtonProps = {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg" | "default" | "xs" | "icon" | "icon-sm";
  onActivate?: () => void;
};

/** Header/mobile nav join trigger — thin alias over SiteCtaButton. */
export function CommunityJoinButton({
  children,
  className,
  fullWidth,
  showIcon = false,
  size,
  onActivate,
}: CommunityJoinButtonProps) {
  return (
    <SiteCtaButton
      action="membership-dialog"
      variant="green"
      size={size}
      fullWidth={fullWidth}
      className={className}
      onActivate={onActivate}
    >
      {showIcon ? <UsersRound className="size-4" /> : null}
      {children}
    </SiteCtaButton>
  );
}
