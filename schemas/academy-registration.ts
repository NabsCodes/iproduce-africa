import { z } from "zod";

import {
  emailSchema,
  internationalPhoneSchema,
  requiredTrimmedText,
} from "@/schemas/fields";
import {
  withPublicFormClientEnvelope,
  withPublicFormEnvelope,
} from "@/schemas/public-form";

export const academyRegistrationSchema = z.object({
  fullName: requiredTrimmedText(2, "Please share your full name"),
  email: emailSchema,
  phone: internationalPhoneSchema,
  organisation: z.string().optional(),
});

export const academyRegistrationSubmitSchema = academyRegistrationSchema.and(
  z.object({
    kind: z.enum(["webinar", "course"]),
    slug: z.string().min(1),
  }),
);

export const academyRegistrationSubmitSchemaWithSecurity =
  withPublicFormEnvelope(academyRegistrationSubmitSchema);

export const academyRegistrationClientSchema = withPublicFormClientEnvelope(
  academyRegistrationSchema,
);

export type AcademyRegistrationClientValues = z.infer<
  typeof academyRegistrationClientSchema
>;

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
