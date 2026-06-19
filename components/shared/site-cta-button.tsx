"use client";

import type { ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";

import { useMembershipApplication } from "@/components/community/membership-application-provider";
import {
  Button,
  ButtonLink,
  type buttonVariants,
} from "@/components/ui/button";
import { isCommunityMembershipHref } from "@/lib/routes";
import type { SiteCtaAction } from "@/types/content";

type SiteCtaButtonProps = {
  href?: string;
  action?: SiteCtaAction;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  fullWidth?: boolean;
  className?: string;
  onActivate?: () => void;
  children: ReactNode;
};

function resolveAction(action: SiteCtaAction | undefined, href?: string) {
  if (action) return action;
  if (href && isCommunityMembershipHref(href)) return "membership-dialog";
  return "link";
}

/**
 * Renders a marketing CTA as either a link or the membership dialog trigger.
 * Content (and later CMS) sets `action` explicitly; href-based inference is a
 * static-MVP fallback only.
 */
export function SiteCtaButton({
  href,
  action,
  variant = "green",
  size,
  fullWidth,
  className,
  onActivate,
  children,
}: SiteCtaButtonProps) {
  const { openApplication } = useMembershipApplication();
  const resolved = resolveAction(action, href);

  if (resolved === "membership-dialog") {
    return (
      <Button
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        className={className}
        onClick={() => {
          onActivate?.();
          openApplication();
        }}
      >
        {children}
      </Button>
    );
  }

  if (!href) {
    throw new Error("SiteCtaButton: link CTAs require an href.");
  }

  return (
    <ButtonLink
      href={href}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      className={className}
      onClick={onActivate}
    >
      {children}
    </ButtonLink>
  );
}
