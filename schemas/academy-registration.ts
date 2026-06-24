import { z } from "zod";

import {
  emailSchema,
  internationalPhoneSchema,
  requiredTrimmedText,
} from "@/schemas/fields";

export const academyRegistrationSchema = z.object({
  fullName: requiredTrimmedText(2, "Please share your full name"),
  email: emailSchema,
  phone: internationalPhoneSchema,
  organisation: z.string().optional(),
});

export const academyRegistrationSubmitSchema = academyRegistrationSchema.extend(
  {
    kind: z.enum(["webinar", "course"]),
    slug: z.string().min(1),
  },
);

export type AcademyRegistrationValues = z.infer<
  typeof academyRegistrationSchema
>;

export type AcademyRegistrationSubmitPayload = z.infer<
  typeof academyRegistrationSubmitSchema
>;

export const academyRegistrationDefaultValues: AcademyRegistrationValues = {
  fullName: "",
  email: "",
  phone: "",
  organisation: "",
};
