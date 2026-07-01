"use client";

import {
  Building2,
  Briefcase,
  Globe2,
  Mail,
  MapPin,
  Phone,
  Quote,
  User,
  type LucideIcon,
} from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";

import type { BecomePartnerReviewField } from "@/types/partners";
import type { BecomePartnerValues } from "@/schemas/partners";
import {
  getCountryLabel,
  resolveSelectOptionLabel,
} from "@/lib/form-option-labels";
import type { PartnerInquiryOption } from "@/types/partners";

const fieldIcons: Record<BecomePartnerReviewField["key"], LucideIcon> = {
  organisationName: Building2,
  organisationType: Briefcase,
  country: MapPin,
  fullName: User,
  jobTitle: Briefcase,
  email: Mail,
  phone: Phone,
};

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "??";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

function getInterestLabels(
  options: readonly PartnerInquiryOption[],
  selected: readonly string[] | undefined,
  otherValue: string,
  otherDetail?: string,
) {
  const labels = (selected ?? [])
    .map((value) => {
      if (value === otherValue && otherDetail?.trim()) {
        return otherDetail.trim();
      }
      return options.find((option) => option.value === value)?.label ?? value;
    })
    .filter(Boolean);

  return labels;
}

type BecomePartnerReviewStepProps = {
  reviewFields: readonly BecomePartnerReviewField[];
  goalsLabel: string;
  defaultBadge: string;
  organisationTypes: readonly PartnerInquiryOption[];
  partnershipInterests: readonly PartnerInquiryOption[];
  otherOptionValue: string;
};

export function BecomePartnerReviewStep({
  reviewFields,
  goalsLabel,
  defaultBadge,
  organisationTypes,
  partnershipInterests,
  otherOptionValue,
}: BecomePartnerReviewStepProps) {
  const { control } = useFormContext<BecomePartnerValues>();
  const values = useWatch({ control });

  const organisationName = values.organisationName?.trim() ?? "";
  const organisationTypeLabel = resolveSelectOptionLabel(
    organisationTypes,
    values.organisationType ?? "",
    otherOptionValue,
    values.organisationTypeOther,
  );
  const countryLabel = getCountryLabel(values.country ?? "");
  const interestLabels = getInterestLabels(
    partnershipInterests,
    values.partnershipInterests,
    otherOptionValue,
    values.partnershipInterestsOther,
  );

  const displayValues: Record<BecomePartnerReviewField["key"], string> = {
    organisationName,
    organisationType: organisationTypeLabel,
    country: countryLabel,
    fullName: values.fullName?.trim() ?? "",
    jobTitle: values.jobTitle?.trim() ?? "",
    email: values.email ?? "",
    phone: values.phone ?? "",
  };

  return (
    <div className="bg-leaf-50 border-leaf-100 rounded-xl border p-4 pb-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <span className="bg-leaf-100 text-leaf-700 flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
            {getInitials(organisationName)}
          </span>
          <div className="min-w-0">
            <p className="text-foreground font-serif text-lg font-semibold wrap-break-word">
              {organisationName || "Your organisation"}
            </p>
            <p className="text-fg-muted mt-0.5 text-sm leading-6 wrap-break-word">
              {[organisationTypeLabel, countryLabel]
                .filter(Boolean)
                .join(" · ") || "Organisation type · Country"}
            </p>
          </div>
        </div>
        <span className="bg-tangerine-100 text-tangerine-800 shrink-0 rounded-full px-3 py-1 text-xs font-semibold">
          {defaultBadge}
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <p className="text-fg-subtle flex items-center gap-1.5 text-xs font-medium">
          <Globe2 className="size-3.5 shrink-0" aria-hidden />
          Partnership interests
        </p>
        {interestLabels.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {interestLabels.map((label, index) => (
              <li key={`${label}-${index}`}>
                <span className="bg-leaf-100 text-leaf-800 inline-flex rounded-full px-2.5 py-1 text-xs font-medium">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-fg-muted text-sm">—</p>
        )}
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
            {goalsLabel}
          </span>
        </div>
        <p className="text-foreground mt-2 text-sm leading-6 wrap-break-word">
          {values.goals?.trim() || "—"}
        </p>
      </div>
    </div>
  );
}
