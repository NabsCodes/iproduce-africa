import { handlePublicFormPost } from "@/lib/api/public-form-post";
import { newsletterSubmitSchema } from "@/schemas/newsletter";

export async function POST(request: Request) {
  return handlePublicFormPost({
    request,
    schema: newsletterSubmitSchema,
    toEmailEnv: "NEWSLETTER_TO_EMAIL",
    handler: async (data) => {
      const { sendNewsletterEmails } = await import("@/lib/email/newsletter");
      await sendNewsletterEmails({
        email: data.email,
        submittedAt: new Date(),
        sourcePath: data.sourcePath?.trim() || "/",
      });
    },
  });
}
