import {
  Calendar,
  GraduationCap,
  Newspaper,
  type LucideIcon,
} from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CatalogueEmptyIconKey } from "@/types/content";

const catalogueEmptyIcons = {
  calendar: Calendar,
  "graduation-cap": GraduationCap,
  newspaper: Newspaper,
} satisfies Record<CatalogueEmptyIconKey, LucideIcon>;

type CatalogueEmptyStateProps = {
  icon: CatalogueEmptyIconKey;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  className?: string;
};

/**
 * Quiet, on-brand fallback for a catalogue band or preview slot with zero
 * items — reuses the leaf-tinted circle badge language from
 * `PeopleRosterEmpty`. Section chrome (eyebrow/heading/anchor) stays put
 * around this; only the card grid area swaps for this panel.
 */
export function CatalogueEmptyState({
  icon,
  title,
  description,
  ctaLabel,
  ctaHref,
  onCtaClick,
  className,
}: CatalogueEmptyStateProps) {
  const Icon = catalogueEmptyIcons[icon];

  return (
    <div
      role="status"
      className={cn(
        "border-default bg-subtle flex flex-col items-center rounded-xl border px-6 py-10 text-center sm:py-12",
        className,
      )}
    >
      <span className="bg-leaf-50 text-leaf-600 border-leaf-100 flex size-14 items-center justify-center rounded-full border">
        <Icon className="size-6" aria-hidden />
      </span>
      <h3 className="text-foreground mt-4 font-serif text-xl font-semibold">
        {title}
      </h3>
      <p className="text-fg-muted mt-2 max-w-sm text-[15px] leading-6">
        {description}
      </p>
      {onCtaClick ? (
        <Button
          type="button"
          variant="green"
          size="md"
          className="mt-6"
          onClick={onCtaClick}
        >
          {ctaLabel}
        </Button>
      ) : ctaHref ? (
        <ButtonLink href={ctaHref} variant="green" size="md" className="mt-6">
          {ctaLabel}
        </ButtonLink>
      ) : null}
    </div>
  );
}
