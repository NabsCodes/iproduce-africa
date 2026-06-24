import type { ReactNode } from "react";

import { AcademyRegistrationProvider } from "@/components/academy/registration/academy-registration-provider";

export default function AcademyLayout({ children }: { children: ReactNode }) {
  return <AcademyRegistrationProvider>{children}</AcademyRegistrationProvider>;
}
