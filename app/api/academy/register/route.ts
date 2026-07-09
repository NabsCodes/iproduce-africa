import { handlePublicFormPost } from "@/lib/api/public-form-post";
import { academyRegistrationSubmitSchemaWithSecurity } from "@/schemas/academy-registration";

export async function POST(request: Request) {
  return handlePublicFormPost({
    request,
    schema: academyRegistrationSubmitSchemaWithSecurity,
    toEmailEnv: "ACADEMY_TO_EMAIL",
    rateLimitRoute: "academy-register",
    handler: async (data) => {
      const { resolveAcademySession, sendAcademyRegistrationEmails } =
        await import("@/lib/email/academy-registration");

      const session = await resolveAcademySession(data.kind, data.slug);
      if (session.status === "not_found") {
        throw new Error("session_not_found");
      }
      if (session.status === "closed") {
        throw new Error("registration_closed");
      }
      if (session.status === "external") {
        throw new Error("registration_external");
      }

      const result = await sendAcademyRegistrationEmails({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        organisation: data.organisation,
        kind: data.kind,
        slug: data.slug,
        sessionTitle: session.title,
        submittedAt: new Date(),
        sourcePath: `/academy/${data.kind}s/${data.slug}`,
      });

      if (!result.sent) {
        throw new Error("delivery_failed");
      }
    },
  });
}
