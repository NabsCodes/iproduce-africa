import { z } from "zod";

import { emailSchema, requiredTrimmedText } from "@/schemas/fields";

export const contactFormSchema = z.object({
  firstName: requiredTrimmedText(2, "Please share your first name"),
  lastName: requiredTrimmedText(2, "Please share your last name"),
  email: emailSchema,
  message: requiredTrimmedText(
    10,
    "A short message helps us route your enquiry",
  ),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const contactFormDefaultValues: ContactFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
};
