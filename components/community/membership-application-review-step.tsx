"use client";

import {
  Building2,
  Mail,
  MapPin,
  Phone,
  Quote,
  Tag,
  User,
  type LucideIcon,
} from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";

import type { MembershipApplicationDialogReviewField } from "@/types/community";
import type { MembershipApplicationDialogValues } from "@/schemas/community";
import {
  getCountryLabel,
  resolveSelectOptionLabel,
} from "@/lib/form-option-labels";
import type { PartnerInquiryOption } from "@/types/partners";

const fieldIcons: Record<
  MembershipApplicationDialogReviewField["key"],
  LucideIcon
> = {
  fullName: User,
  country: MapPin,
  email: Mail,
  phone: Phone,
  organisation: Building2,
  sector: Tag,
};

function getInitials(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "??";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

type MembershipApplicationReviewStepProps = {
  reviewFields: readonly MembershipApplicationDialogReviewField[];
  whyJoinLabel: string;
  sectors: readonly PartnerInquiryOption[];
  otherOptionValue: string;
};

export function MembershipApplicationReviewStep({
  reviewFields,
  whyJoinLabel,
  sectors,
  otherOptionValue,
}: MembershipApplicationReviewStepProps) {
  const { control } = useFormContext<MembershipApplicationDialogValues>();
  const values = useWatch({ control });

  const fullName = values.fullName?.trim() ?? "";
  const organisation = values.organisation?.trim() ?? "";
  const sectorLabel = resolveSelectOptionLabel(
    sectors,
    values.sector ?? "",
    otherOptionValue,
    values.sectorOther,
  );
  const countryLabel = getCountryLabel(values.country ?? "");

  const displayValues: Record<
    MembershipApplicationDialogReviewField["key"],
    string
  > = {
    fullName,
    country: countryLabel,
    email: values.email ?? "",
    phone: values.phone ?? "",
    organisation,
    sector: sectorLabel,
  };

  return (
    <div className="bg-leaf-50 border-leaf-100 rounded-xl border p-4 pb-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <span className="bg-leaf-100 text-leaf-700 flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
            {getInitials(fullName)}
          </span>
          <div className="min-w-0">
            <p className="text-foreground font-serif text-lg font-semibold wrap-break-word">
              {fullName || "Your name"}
            </p>
            <p className="text-fg-muted mt-0.5 text-sm leading-6 wrap-break-word">
              {organisation || "Your organisation"}
            </p>
          </div>
        </div>
        {sectorLabel ? (
          <span className="bg-tangerine-100 text-tangerine-800 max-w-[44%] shrink-0 rounded-full px-3 py-1 text-right text-xs leading-5 font-semibold wrap-break-word sm:max-w-44">
            {sectorLabel}
          </span>
        ) : null}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {reviewFields.map((field) => {
          const Icon = fieldIcons[field.key];
          return (
            <div key={field.key} className="flex gap-3">
              <Icon
                className="text-fg-subtle mt-0.5 size-4 shrink-0"
                aria-hidden
              />
              <div className="min-w-0">
                <p className="text-fg-subtle text-xs font-medium">
                  {field.label}
                </p>
                <p className="text-foreground mt-0.5 text-sm font-semibold wrap-break-word">
                  {displayValues[field.key] || "—"}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-leaf-100/80 mt-5 rounded-xl p-4">
        <div className="text-leaf-700 flex items-center gap-2">
          <Quote className="size-4 shrink-0" aria-hidden />
          <span className="text-[11px] font-semibold tracking-[0.12em] uppercase">
            {whyJoinLabel}
          </span>
        </div>
        <p className="text-foreground mt-2 text-sm leading-6 wrap-break-word">
          {values.reason?.trim() || "—"}
        </p>
      </div>
    </div>
  );
}
