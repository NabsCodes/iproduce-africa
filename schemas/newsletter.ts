import { z } from "zod";

import { emailSchema } from "@/schemas/fields";
import {
  withPublicFormClientEnvelope,
  withPublicFormEnvelope,
} from "@/schemas/public-form";

export const newsletterSchema = z.object({
  email: emailSchema,
});

export const newsletterSubmitSchema = withPublicFormEnvelope(
  newsletterSchema.and(
    z.object({
      sourcePath: z.string().trim().max(200).optional(),
    }),
  ),
);

export const newsletterClientSchema =
  withPublicFormClientEnvelope(newsletterSchema);

export type NewsletterClientValues = z.infer<typeof newsletterClientSchema>;

export type NewsletterValues = z.infer<typeof newsletterSchema>;

export const newsletterDefaultValues: NewsletterValues = {
  email: "",
};
