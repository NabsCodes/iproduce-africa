import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

export function requiredTrimmedText(min: number, message: string) {
  return z.string().trim().min(min, message);
}

export const emailSchema = z.email("Use a valid email");

export const optionalUrlSchema = z
  .union([z.url("Use a valid URL"), z.literal("")])
  .optional();

export const internationalPhoneSchema = z
  .string()
  .min(1, "Phone is required")
  .refine((value) => isValidPhoneNumber(value), "Use a valid phone number");

export function requireOtherDetail(
  ctx: z.RefinementCtx,
  {
    selectedValue,
    otherValue,
    detailValue,
    path,
    message,
  }: {
    selectedValue: unknown;
    otherValue: string;
    detailValue: unknown;
    path: string;
    message: string;
  },
) {
  if (selectedValue !== otherValue) return;

  if (typeof detailValue !== "string" || detailValue.trim().length < 2) {
    ctx.addIssue({ code: "custom", path: [path], message });
  }
}

export function requireOtherArrayDetail(
  ctx: z.RefinementCtx,
  {
    selectedValues,
    otherValue,
    detailValue,
    path,
    message,
  }: {
    selectedValues: readonly string[] | undefined;
    otherValue: string;
    detailValue: unknown;
    path: string;
    message: string;
  },
) {
  if (!selectedValues?.includes(otherValue)) return;

  if (typeof detailValue !== "string" || detailValue.trim().length < 2) {
    ctx.addIssue({ code: "custom", path: [path], message });
  }
}
