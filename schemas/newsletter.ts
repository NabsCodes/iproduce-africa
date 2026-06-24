import { z } from "zod";

import { emailSchema } from "@/schemas/fields";

export const newsletterSchema = z.object({
  email: emailSchema,
});

export type NewsletterValues = z.infer<typeof newsletterSchema>;

export const newsletterDefaultValues: NewsletterValues = {
  email: "",
};
