import { handlePublicFormPost } from "@/lib/api/public-form-post";
import { contactFormSubmitSchema } from "@/schemas/contact";

export async function POST(request: Request) {
  return handlePublicFormPost({
    request,
    schema: contactFormSubmitSchema,
    requiredEnvNames: ["RESEND_API_KEY", "EMAIL_FROM", "CONTACT_TO_EMAIL"],
    rateLimitRoute: "contact",
    handler: async (data) => {
      const { sendContactEmails } = await import("@/lib/email/contact");
      await sendContactEmails({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        subject: data.subject,
        subjectOther: data.subjectOther,
        message: data.message,
        submittedAt: new Date(),
        sourcePath: "/contact",
      });
    },
  });
}
