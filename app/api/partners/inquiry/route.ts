import { handlePublicFormPost } from "@/lib/api/public-form-post";
import { partnerInquirySubmitSchema } from "@/schemas/partners";

export async function POST(request: Request) {
  return handlePublicFormPost({
    request,
    schema: partnerInquirySubmitSchema,
    requiredEnvNames: ["RESEND_API_KEY", "EMAIL_FROM", "PARTNERS_TO_EMAIL"],
    rateLimitRoute: "partners-inquiry",
    handler: async (data) => {
      const { sendPartnerInquiryEmails } = await import("@/lib/email/partners");
      await sendPartnerInquiryEmails({
        fullName: data.fullName,
        organisation: data.organisation,
        role: data.role,
        roleOther: data.roleOther,
        country: data.country,
        sector: data.sector,
        sectorOther: data.sectorOther,
        email: data.email,
        phone: data.phone,
        areaOfInterest: data.areaOfInterest,
        areaOfInterestOther: data.areaOfInterestOther,
        reason: data.reason,
        submittedAt: new Date(),
        sourcePath: "/partners#partnership-enquiry",
      });
    },
  });
}
