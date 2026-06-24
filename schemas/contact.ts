import { z } from "zod";

import { OTHER_OPTION_VALUE } from "@/schemas/constants";
import {
  emailSchema,
  requiredTrimmedText,
  requireOtherDetail,
} from "@/schemas/fields";

const contactFormShape = {
  firstName: requiredTrimmedText(2, "Please share your first name"),
  lastName: requiredTrimmedText(2, "Please share your last name"),
  email: emailSchema,
  subject: z.string().min(1, "Pick a subject"),
  subjectOther: z.string().optional(),
  message: requiredTrimmedText(
    10,
    "A short message helps us route your enquiry",
  ),
};

export const contactFormSchema = z
  .object(contactFormShape)
  .superRefine((data, ctx) => {
    requireOtherDetail(ctx, {
      selectedValue: data.subject,
      otherValue: OTHER_OPTION_VALUE,
      detailValue: data.subjectOther,
      path: "subjectOther",
      message: "Please tell us what this is about",
    });
  });

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const contactFormDefaultValues: ContactFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  subjectOther: "",
  message: "",
};
