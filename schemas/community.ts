import { z } from "zod";

import { OTHER_OPTION_VALUE } from "@/schemas/constants";
import {
  emailSchema,
  internationalPhoneSchema,
  requiredTrimmedText,
  requireOtherDetail,
} from "@/schemas/fields";

const membershipAboutShape = {
  fullName: requiredTrimmedText(2, "Please share your full name"),
  country: z.string().min(1, "Pick your country"),
  email: emailSchema,
  phone: internationalPhoneSchema,
};

const membershipWorkShape = {
  organisation: requiredTrimmedText(2, "Organisation is required"),
  sector: z.string().min(1, "Pick a sector"),
  sectorOther: z.string().optional(),
  reason: requiredTrimmedText(10, "Tell us briefly why you want to join"),
};

const membershipRoleShape = {
  role: z.string().min(1, "Pick a role"),
  roleOther: z.string().optional(),
};

function refineSectorOther(
  data: { sector: string; sectorOther?: string },
  ctx: z.RefinementCtx,
) {
  requireOtherDetail(ctx, {
    selectedValue: data.sector,
    otherValue: OTHER_OPTION_VALUE,
    detailValue: data.sectorOther,
    path: "sectorOther",
    message: "Please specify your sector",
  });
}

function refineRoleOther(
  data: { role: string; roleOther?: string },
  ctx: z.RefinementCtx,
) {
  requireOtherDetail(ctx, {
    selectedValue: data.role,
    otherValue: OTHER_OPTION_VALUE,
    detailValue: data.roleOther,
    path: "roleOther",
    message: "Please specify your role",
  });
}

/** Inline page form — includes role. */
export const membershipApplicationSchema = z
  .object({
    ...membershipAboutShape,
    ...membershipWorkShape,
    ...membershipRoleShape,
  })
  .superRefine((data, ctx) => {
    refineSectorOther(data, ctx);
    refineRoleOther(data, ctx);
  });

/** Dialog wizard — About you + Your work (no role field). */
export const membershipApplicationDialogSchema = z
  .object({
    ...membershipAboutShape,
    ...membershipWorkShape,
  })
  .superRefine((data, ctx) => {
    refineSectorOther(data, ctx);
  });

export type MembershipApplicationValues = z.infer<
  typeof membershipApplicationSchema
>;

export type MembershipApplicationDialogValues = z.infer<
  typeof membershipApplicationDialogSchema
>;

export const membershipApplicationDefaultValues: MembershipApplicationValues = {
  fullName: "",
  organisation: "",
  role: "",
  roleOther: "",
  country: "",
  sector: "",
  sectorOther: "",
  email: "",
  phone: "",
  reason: "",
};

export const membershipApplicationDialogDefaultValues: MembershipApplicationDialogValues =
  {
    fullName: "",
    organisation: "",
    country: "",
    sector: "",
    sectorOther: "",
    email: "",
    phone: "",
    reason: "",
  };

export const membershipApplicationDialogStepKeys = [
  "about",
  "work",
  "review",
] as const;

export type MembershipApplicationDialogStepKey =
  (typeof membershipApplicationDialogStepKeys)[number];

const membershipAboutStepSchema = z.object(membershipAboutShape);

const membershipWorkStepSchema = z
  .object(membershipWorkShape)
  .superRefine(refineSectorOther);

export const membershipApplicationDialogStepSchemas: Record<
  MembershipApplicationDialogStepKey,
  z.ZodTypeAny
> = {
  about: membershipAboutStepSchema,
  work: membershipWorkStepSchema,
  review: membershipApplicationDialogSchema,
};

export const membershipApplicationDialogStepFields: Record<
  MembershipApplicationDialogStepKey,
  (keyof MembershipApplicationDialogValues)[]
> = {
  about: ["fullName", "country", "email", "phone"],
  work: ["organisation", "sector", "sectorOther", "reason"],
  review: [
    "fullName",
    "country",
    "email",
    "phone",
    "organisation",
    "sector",
    "sectorOther",
    "reason",
  ],
};
