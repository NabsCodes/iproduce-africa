import { handlePublicFormPost } from "@/lib/api/public-form-post";
import { academyRegistrationSubmitSchemaWithSecurity } from "@/schemas/academy-registration";

export async function POST(request: Request) {
  return handlePublicFormPost({
    request,
    schema: academyRegistrationSubmitSchemaWithSecurity,
    toEmailEnv: "ACADEMY_TO_EMAIL",
    handler: async (data) => {
      const { resolveAcademySessionTitle, sendAcademyRegistrationEmails } =
        await import("@/lib/email/academy-registration");

      const sessionTitle = resolveAcademySessionTitle(data.kind, data.slug);
      if (!sessionTitle) {
        throw new Error("session_not_found");
      }

      const result = await sendAcademyRegistrationEmails({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        organisation: data.organisation,
        kind: data.kind,
        slug: data.slug,
        submittedAt: new Date(),
        sourcePath: `/academy/${data.kind}s/${data.slug}`,
      });

      if (!result.sent) {
        throw new Error("delivery_failed");
      }
    },
  });
}
