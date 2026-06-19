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

function resolveOptionLabel(
  options: readonly PartnerInquiryOption[],
  value: string,
  otherValue: string,
  otherDetail?: string,
) {
  if (value === otherValue && otherDetail?.trim()) {
    return otherDetail.trim();
  }
  return options.find((option) => option.value === value)?.label ?? value;
}

function getInitials(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "??";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

type MembershipApplicationReviewStepProps = {
  reviewFields: readonly MembershipApplicationDialogReviewField[];
  whyJoinLabel: string;
  defaultBadge: string;
  countries: readonly PartnerInquiryOption[];
  sectors: readonly PartnerInquiryOption[];
  otherOptionValue: string;
};

export function MembershipApplicationReviewStep({
  reviewFields,
  whyJoinLabel,
  defaultBadge,
  countries,
  sectors,
  otherOptionValue,
}: MembershipApplicationReviewStepProps) {
  const { control } = useFormContext<MembershipApplicationDialogValues>();
  const values = useWatch({ control });

  const fullName = values.fullName?.trim() ?? "";
  const organisation = values.organisation?.trim() ?? "";
  const sectorLabel = resolveOptionLabel(
    sectors,
    values.sector ?? "",
    otherOptionValue,
    values.sectorOther,
  );
  const countryLabel = resolveOptionLabel(
    countries,
    values.country ?? "",
    otherOptionValue,
    values.countryOther,
  );

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
    <div className="bg-leaf-50 border-leaf-100 rounded-xl border p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <span className="bg-leaf-100 text-leaf-700 flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
            {getInitials(fullName)}
          </span>
          <div className="min-w-0">
            <p className="text-foreground truncate font-serif text-lg font-semibold">
              {fullName || "Your name"}
            </p>
            <p className="text-fg-muted mt-0.5 truncate text-sm">
              {[organisation, sectorLabel].filter(Boolean).join(" · ") ||
                "Your organisation · Sector"}
            </p>
          </div>
        </div>
        <span className="bg-tangerine-100 text-tangerine-800 shrink-0 rounded-full px-3 py-1 text-xs font-semibold">
          {defaultBadge}
        </span>
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
        <p className="text-foreground mt-2 text-sm leading-6">
          {values.reason?.trim() || "—"}
        </p>
      </div>
    </div>
  );
}
