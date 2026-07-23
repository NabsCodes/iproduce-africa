import { handlePublicFormPost } from "@/lib/api/public-form-post";
import { communityApplicationSubmitSchema } from "@/schemas/community";

export async function POST(request: Request) {
  return handlePublicFormPost({
    request,
    schema: communityApplicationSubmitSchema,
    requiredEnvNames: ["RESEND_API_KEY", "EMAIL_FROM", "COMMUNITY_TO_EMAIL"],
    rateLimitRoute: "community-application",
    handler: async (data) => {
      const { sendCommunityApplicationEmails } =
        await import("@/lib/email/community");
      const sourcePath =
        data.source === "page"
          ? "/community#membership-application"
          : "/community (membership dialog)";

      await sendCommunityApplicationEmails({
        ...data,
        submittedAt: new Date(),
        sourcePath,
      });
    },
  });
}
