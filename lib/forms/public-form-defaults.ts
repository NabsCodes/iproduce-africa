import { publicFormSecurityDefaultValues } from "@/schemas/public-form";

export function withPublicFormSecurity<T extends Record<string, unknown>>(
  values: T,
) {
  return {
    ...values,
    ...publicFormSecurityDefaultValues,
  };
}
