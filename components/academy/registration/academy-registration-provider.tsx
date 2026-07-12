"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { AcademyRegistrationDialog } from "@/components/academy/registration/academy-registration-dialog";

export type AcademyRegistrationTarget = {
  kind: "webinar" | "course";
  slug: string;
  title: string;
};

type AcademyRegistrationContextValue = {
  openRegistration: (target: AcademyRegistrationTarget) => void;
};

const AcademyRegistrationContext =
  createContext<AcademyRegistrationContextValue | null>(null);

export function AcademyRegistrationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState<AcademyRegistrationTarget | null>(null);

  const openRegistration = useCallback((next: AcademyRegistrationTarget) => {
    setTarget(next);
    setOpen(true);
  }, []);

  const value = useMemo(
    () => ({
      openRegistration,
    }),
    [openRegistration],
  );

  return (
    <AcademyRegistrationContext.Provider value={value}>
      {children}
      <AcademyRegistrationDialog
        open={open}
        onOpenChange={setOpen}
        target={target}
      />
    </AcademyRegistrationContext.Provider>
  );
}

export function useAcademyRegistration() {
  const context = useContext(AcademyRegistrationContext);
  if (!context) {
    throw new Error(
      "useAcademyRegistration must be used within AcademyRegistrationProvider",
    );
  }
  return context;
}
