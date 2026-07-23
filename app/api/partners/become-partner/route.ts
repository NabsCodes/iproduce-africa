import { handlePublicFormPost } from "@/lib/api/public-form-post";
import { becomePartnerSubmitSchema } from "@/schemas/partners";

export async function POST(request: Request) {
  return handlePublicFormPost({
    request,
    schema: becomePartnerSubmitSchema,
    requiredEnvNames: ["RESEND_API_KEY", "EMAIL_FROM", "PARTNERS_TO_EMAIL"],
    rateLimitRoute: "partners-become",
    handler: async (data) => {
      const { sendBecomePartnerEmails } = await import("@/lib/email/partners");
      await sendBecomePartnerEmails({
        organisationName: data.organisationName,
        organisationType: data.organisationType,
        organisationTypeOther: data.organisationTypeOther,
        country: data.country,
        website: data.website,
        organisationDescription: data.organisationDescription,
        partnershipInterests: data.partnershipInterests,
        partnershipInterestsOther: data.partnershipInterestsOther,
        goals: data.goals,
        fullName: data.fullName,
        jobTitle: data.jobTitle,
        email: data.email,
        phone: data.phone,
        submittedAt: new Date(),
        sourcePath: "/partners (become-a-partner dialog)",
      });
    },
  });
}
