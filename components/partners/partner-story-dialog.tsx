"use client";

import { ArrowRight, ExternalLink } from "lucide-react";

import { CatalogueImage } from "@/components/shared/catalogue-image";
import { ButtonLink } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { PartnerSpotlightItem } from "@/types/partners";

type PartnerStoryDialogProps = {
  partner: PartnerSpotlightItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  readMoreLabel: string;
  websiteLabel: string;
};

export function PartnerStoryDialog({
  partner,
  open,
  onOpenChange,
  readMoreLabel,
  websiteLabel,
}: PartnerStoryDialogProps) {
  const paragraphs = partner?.story ?? (partner ? [partner.description] : []);
  const isLogo = partner?.imageVariant === "logo";
  const hasFooterLinks = Boolean(partner?.readMore || partner?.website);

  return (
    <Dialog open={open && partner !== null} onOpenChange={onOpenChange}>
      {partner ? (
        <DialogContent className="max-h-[calc(100vh-1rem)] max-w-[calc(100vw-0.75rem)] gap-0 overflow-hidden p-0 sm:max-w-3xl">
          <div className="flex max-h-[calc(100vh-1rem)] flex-col overflow-hidden sm:h-128 sm:max-h-[min(32rem,calc(100vh-2rem))] sm:flex-row">
            <div
              className={cn(
                "border-grey-200 bg-subtle relative flex shrink-0 items-center justify-center border-r",
                isLogo
                  ? "aspect-square max-h-64 w-full py-10 sm:aspect-auto sm:max-h-none sm:w-64 sm:self-stretch sm:py-14 lg:w-72 lg:py-16"
                  : "aspect-4/3 w-full overflow-hidden sm:aspect-auto sm:h-full sm:w-2/5",
              )}
            >
              {isLogo ? (
                <CatalogueImage
                  src={partner.image}
                  alt={partner.imageAlt}
                  fit="contain"
                  sizes="(max-width: 640px) 58vw, 192px"
                  className="aspect-square w-[min(58vw,13rem)] sm:w-[min(100%,11rem)] lg:w-48"
                  imageClassName="p-2"
                />
              ) : (
                <CatalogueImage
                  src={partner.image}
                  alt={partner.imageAlt}
                  sizes="(max-width: 640px) 100vw, 40vw"
                  className="absolute inset-0"
                />
              )}
            </div>

            <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-white">
              <div className="border-grey-200 bg-subtle shrink-0 border-b px-5 pt-5 pr-14 pb-4 sm:px-6 sm:pt-6 sm:pb-5">
                <DialogTitle className="font-serif text-xl sm:text-2xl">
                  {partner.name}
                </DialogTitle>
                <DialogDescription className="text-fg-subtle mt-1 text-sm">
                  {partner.descriptor}
                </DialogDescription>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-5 sm:px-6">
                <div className="flex flex-col gap-4 py-5 sm:gap-5 sm:py-6">
                  {paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-fg-muted text-sm leading-7 sm:text-[15px]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {hasFooterLinks ? (
                <div className="border-grey-200 bg-subtle flex shrink-0 flex-wrap gap-x-5 gap-y-2 border-t px-5 py-4 sm:px-6">
                  {partner.website ? (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(
                        "text-leaf-700 hover:text-leaf-800 decoration-leaf-700/50 hover:decoration-leaf-700 inline-flex items-center gap-1.5 text-sm font-semibold underline underline-offset-4 transition-colors",
                      )}
                    >
                      {websiteLabel}
                      <ExternalLink className="size-3.5 shrink-0" aria-hidden />
                    </a>
                  ) : null}
                  {partner.readMore ? (
                    <ButtonLink
                      href={partner.readMore.href}
                      variant="green-link"
                      size="sm"
                      className="decoration-leaf-700/50 hover:decoration-leaf-700 h-auto p-0 text-sm font-semibold underline underline-offset-4"
                    >
                      {partner.readMore.label ?? readMoreLabel}
                      <ArrowRight className="size-4" aria-hidden />
                    </ButtonLink>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </DialogContent>
      ) : null}
    </Dialog>
  );
}
