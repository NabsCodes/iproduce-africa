"use client";

import type { ComponentType } from "react";
import { useSyncExternalStore } from "react";
import { Link as LinkIcon, Share2 } from "lucide-react";
import { FaLinkedinIn, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { NewsletterSignupForm } from "@/components/shared/newsletter-signup-form";
import type {
  BlogNewsletterContent,
  BlogShareControlsContent,
} from "@/types/blog";

type ShareIcon = ComponentType<{
  className?: string;
  "aria-hidden"?: boolean;
}>;

type ShareTarget = {
  id: "whatsapp" | "linkedin" | "x";
  label: string;
  icon: ShareIcon;
  build: (encodedUrl: string, encodedTitle: string) => string;
};

const SHARE_TARGETS: readonly ShareTarget[] = [
  {
    id: "whatsapp",
    label: "Share on WhatsApp",
    icon: FaWhatsapp,
    build: (encodedUrl, encodedTitle) =>
      `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
  },
  {
    id: "linkedin",
    label: "Share on LinkedIn",
    icon: FaLinkedinIn,
    build: (encodedUrl) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  },
  {
    id: "x",
    label: "Share on X",
    icon: FaXTwitter,
    build: (encodedUrl, encodedTitle) =>
      `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
  },
];

function subscribe() {
  return () => {};
}

function getClientNativeShareSnapshot() {
  return (
    typeof navigator !== "undefined" && typeof navigator.share === "function"
  );
}

function getServerNativeShareSnapshot() {
  return false;
}

type BlogArticleSidebarProps = {
  title: string;
  newsletter: BlogNewsletterContent;
  shareControls: BlogShareControlsContent;
};

/**
 * Single sidebar card: newsletter signup + share controls. Keeps related
 * secondary actions in one surface instead of two stacked boxes.
 */
export function BlogArticleSidebar({
  title,
  newsletter,
  shareControls,
}: BlogArticleSidebarProps) {
  const canNativeShare = useSyncExternalStore(
    subscribe,
    getClientNativeShareSnapshot,
    getServerNativeShareSnapshot,
  );

  function getCurrentUrl(): string {
    if (typeof window === "undefined") return "";
    return window.location.href;
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(getCurrentUrl());
      toast.success(shareControls.copyConfirmation);
    } catch {
      toast.error("Could not copy link");
    }
  }

  async function handleNativeShare() {
    try {
      await navigator.share({ title, url: getCurrentUrl() });
    } catch {
      // User cancelled or share failed silently.
    }
  }

  function handleIntentShare(target: ShareTarget) {
    const url = getCurrentUrl();
    if (!url) return;
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    window.open(target.build(encodedUrl, encodedTitle), "_blank", "noopener");
  }

  const intentTargets = canNativeShare
    ? SHARE_TARGETS.filter((target) => target.id !== "x")
    : SHARE_TARGETS;

  return (
    <Card className="border-border bg-subtle gap-0 rounded-xl border py-0 shadow-none">
      <CardContent className="p-5 sm:p-6">
        <p className="text-foreground text-sm font-semibold">
          {newsletter.eyebrow}
        </p>
        <p className="text-fg-muted mt-2 text-sm leading-6">
          {newsletter.description}
        </p>

        <NewsletterSignupForm
          variant="compact"
          copy={{
            inputId: "blog-sidebar-newsletter-email",
            inputLabel: newsletter.inputLabel,
            placeholder: newsletter.inputPlaceholder,
            submitLabel: newsletter.submitLabel,
            successMessage: newsletter.comingSoonMessage,
            formAriaLabel: newsletter.eyebrow,
          }}
        />

        <Separator className="my-6" />

        <p className="text-foreground text-sm font-semibold">
          {shareControls.heading}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {canNativeShare ? (
            <Button
              type="button"
              variant="green-soft"
              size="icon-sm"
              aria-label="Share"
              title="Share"
              className="rounded-full"
              onClick={handleNativeShare}
            >
              <Share2 className="size-4" />
            </Button>
          ) : null}

          {intentTargets.map((target) => (
            <Button
              key={target.id}
              type="button"
              variant="green-soft"
              size="icon-sm"
              aria-label={target.label}
              title={target.label}
              className="rounded-full"
              onClick={() => handleIntentShare(target)}
            >
              <target.icon className="size-4" />
            </Button>
          ))}

          <Button
            type="button"
            variant="green-soft"
            size="icon-sm"
            aria-label="Copy link"
            title="Copy link"
            className="rounded-full"
            onClick={handleCopyLink}
          >
            <LinkIcon className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
