import { handlePublicFormPost } from "@/lib/api/public-form-post";
import { newsletterSubmitSchema } from "@/schemas/newsletter";

export async function POST(request: Request) {
  return handlePublicFormPost({
    request,
    schema: newsletterSubmitSchema,
    requiredEnvNames: [
      "MAILCHIMP_API_KEY",
      "MAILCHIMP_SERVER_PREFIX",
      "MAILCHIMP_AUDIENCE_ID",
    ],
    rateLimitRoute: "newsletter",
    handler: async (data) => {
      const { subscribeNewsletterEmail } =
        await import("@/lib/mailchimp/newsletter");
      await subscribeNewsletterEmail(data.email);
    },
  });
}
