import { z } from "zod";

import { OTHER_OPTION_VALUE } from "@/schemas/constants";
import {
  emailSchema,
  internationalPhoneSchema,
  optionalUrlSchema,
  requiredTrimmedText,
  requireOtherArrayDetail,
  requireOtherDetail,
} from "@/schemas/fields";

const partnerInquiryShape = {
  fullName: requiredTrimmedText(2, "Please share your full name"),
  organisation: requiredTrimmedText(2, "Organisation is required"),
  role: z.string().min(1, "Pick a role"),
  roleOther: z.string().optional(),
  country: requiredTrimmedText(2, "Pick your country"),
  countryOther: z.string().optional(),
  sector: z.string().min(1, "Pick a sector"),
  sectorOther: z.string().optional(),
  email: emailSchema,
  phone: internationalPhoneSchema,
  areaOfInterest: z.string().min(1, "Pick an area of interest"),
  areaOfInterestOther: z.string().optional(),
  reason: requiredTrimmedText(10, "A short reason helps us route your inquiry"),
};

export const partnerInquirySchema = z
  .object(partnerInquiryShape)
  .superRefine((data, ctx) => {
    requireOtherDetail(ctx, {
      selectedValue: data.role,
      otherValue: OTHER_OPTION_VALUE,
      detailValue: data.roleOther,
      path: "roleOther",
      message: "Please specify your role",
    });
    requireOtherDetail(ctx, {
      selectedValue: data.country,
      otherValue: OTHER_OPTION_VALUE,
      detailValue: data.countryOther,
      path: "countryOther",
      message: "Please specify your country",
    });
    requireOtherDetail(ctx, {
      selectedValue: data.sector,
      otherValue: OTHER_OPTION_VALUE,
      detailValue: data.sectorOther,
      path: "sectorOther",
      message: "Please specify your sector",
    });
    requireOtherDetail(ctx, {
      selectedValue: data.areaOfInterest,
      otherValue: OTHER_OPTION_VALUE,
      detailValue: data.areaOfInterestOther,
      path: "areaOfInterestOther",
      message: "Please specify your area of interest",
    });
  });

export type PartnerInquiryValues = z.infer<typeof partnerInquirySchema>;

export const partnerInquiryDefaultValues: PartnerInquiryValues = {
  fullName: "",
  organisation: "",
  role: "",
  roleOther: "",
  country: "",
  countryOther: "",
  sector: "",
  sectorOther: "",
  email: "",
  phone: "",
  areaOfInterest: "",
  areaOfInterestOther: "",
  reason: "",
};

const becomePartnerOrganisationShape = {
  organisationName: requiredTrimmedText(2, "Organisation name is required"),
  organisationType: z.string().min(1, "Pick an organisation type"),
  organisationTypeOther: z.string().optional(),
  country: z.string().min(1, "Pick a country"),
  countryOther: z.string().optional(),
  website: optionalUrlSchema,
  organisationDescription: requiredTrimmedText(
    10,
    "A short description helps us route your inquiry",
  ),
};

const becomePartnerInterestsShape = {
  partnershipInterests: z
    .array(z.string())
    .min(1, "Pick at least one area of interest"),
  partnershipInterestsOther: z.string().optional(),
  goals: requiredTrimmedText(20, "Tell us a bit about your goals"),
};

const becomePartnerContactShape = {
  fullName: requiredTrimmedText(2, "Please share your full name"),
  jobTitle: requiredTrimmedText(2, "Job title is required"),
  email: emailSchema,
  phone: internationalPhoneSchema,
};

function refineBecomePartnerOrganisation(
  data: {
    organisationType: string;
    organisationTypeOther?: string;
    country: string;
    countryOther?: string;
  },
  ctx: z.RefinementCtx,
) {
  requireOtherDetail(ctx, {
    selectedValue: data.organisationType,
    otherValue: OTHER_OPTION_VALUE,
    detailValue: data.organisationTypeOther,
    path: "organisationTypeOther",
    message: "Please specify your organisation type",
  });
  requireOtherDetail(ctx, {
    selectedValue: data.country,
    otherValue: OTHER_OPTION_VALUE,
    detailValue: data.countryOther,
    path: "countryOther",
    message: "Please specify your country",
  });
}

function refineBecomePartnerInterests(
  data: {
    partnershipInterests: string[];
    partnershipInterestsOther?: string;
  },
  ctx: z.RefinementCtx,
) {
  requireOtherArrayDetail(ctx, {
    selectedValues: data.partnershipInterests,
    otherValue: OTHER_OPTION_VALUE,
    detailValue: data.partnershipInterestsOther,
    path: "partnershipInterestsOther",
    message: "Please specify your other interest",
  });
}

const becomePartnerOrganisationStepSchema = z
  .object(becomePartnerOrganisationShape)
  .superRefine(refineBecomePartnerOrganisation);
const becomePartnerInterestsStepSchema = z
  .object(becomePartnerInterestsShape)
  .superRefine(refineBecomePartnerInterests);
const becomePartnerContactStepSchema = z.object(becomePartnerContactShape);

export const becomePartnerSchema = z
  .object({
    ...becomePartnerOrganisationShape,
    ...becomePartnerInterestsShape,
    ...becomePartnerContactShape,
  })
  .superRefine((data, ctx) => {
    refineBecomePartnerOrganisation(data, ctx);
    refineBecomePartnerInterests(data, ctx);
  });

export type BecomePartnerValues = z.infer<typeof becomePartnerSchema>;

export const becomePartnerStepKeys = [
  "organisation",
  "interests",
  "contact",
] as const;

export type BecomePartnerStepKey = (typeof becomePartnerStepKeys)[number];

export const becomePartnerStepSchemas: Record<
  BecomePartnerStepKey,
  z.ZodTypeAny
> = {
  organisation: becomePartnerOrganisationStepSchema,
  interests: becomePartnerInterestsStepSchema,
  contact: becomePartnerContactStepSchema,
};

export const becomePartnerStepFields: Record<
  BecomePartnerStepKey,
  (keyof BecomePartnerValues)[]
> = {
  organisation: [
    "organisationName",
    "organisationType",
    "organisationTypeOther",
    "country",
    "countryOther",
    "website",
    "organisationDescription",
  ],
  interests: ["partnershipInterests", "partnershipInterestsOther", "goals"],
  contact: ["fullName", "jobTitle", "email", "phone"],
};

export const becomePartnerDefaultValues: BecomePartnerValues = {
  organisationName: "",
  organisationType: "",
  organisationTypeOther: "",
  country: "",
  countryOther: "",
  website: "",
  organisationDescription: "",
  partnershipInterests: [],
  partnershipInterestsOther: "",
  goals: "",
  fullName: "",
  jobTitle: "",
  email: "",
  phone: "",
};
