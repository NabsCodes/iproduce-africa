import { z } from "zod";

export const PUBLIC_FORM_HONEYPOT_FIELD = "hpField" as const;

export const honeypotSchema = z
  .string()
  .transform((value) => value.trim())
  .pipe(z.string().max(200, "Invalid value"));

export const turnstileTokenSchema = z
  .string()
  .transform((value) => value.trim())
  .pipe(z.string().max(2048, "Invalid verification token"));

export const communitySourceSchema = z.enum(["page", "dialog"]);

export const publicFormEnvelopeShape = {
  [PUBLIC_FORM_HONEYPOT_FIELD]: honeypotSchema,
  turnstileToken: turnstileTokenSchema,
};

export const publicFormClientEnvelopeShape = {
  [PUBLIC_FORM_HONEYPOT_FIELD]: z.string().max(200).default(""),
  turnstileToken: z.string().max(2048).default(""),
};

export const publicFormEnvelopeSchema = z.object(publicFormEnvelopeShape);

export type PublicFormEnvelope = z.infer<typeof publicFormEnvelopeSchema>;

export const publicFormClientEnvelopeSchema = z.object(
  publicFormClientEnvelopeShape,
);

export function withPublicFormEnvelope<T extends z.ZodTypeAny>(schema: T) {
  return schema.and(publicFormEnvelopeSchema);
}

export function withPublicFormClientEnvelope<T extends z.ZodTypeAny>(
  schema: T,
) {
  return schema.and(publicFormClientEnvelopeSchema);
}

export const publicFormSecurityDefaultValues: PublicFormEnvelope = {
  hpField: "",
  turnstileToken: "",
};
