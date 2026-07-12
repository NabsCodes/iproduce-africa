"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

import { MembershipApplicationDialog } from "@/components/community/membership-application-dialog";

type MembershipApplicationContextValue = {
  openApplication: () => void;
};

const MembershipApplicationContext =
  createContext<MembershipApplicationContextValue | null>(null);

/**
 * Owns the single membership application dialog for the whole site. Every
 * "Join our community" CTA opens this one instance so progress is preserved
 * across triggers. Hash links to #membership-application scroll to the inline
 * form on /community instead — see HashScrollHandler.
 */
export function MembershipApplicationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const openApplication = useCallback(() => {
    setMounted(true);
    setOpen(true);
  }, []);

  return (
    <MembershipApplicationContext.Provider value={{ openApplication }}>
      {children}
      {mounted ? (
        <MembershipApplicationDialog open={open} onOpenChange={setOpen} />
      ) : null}
    </MembershipApplicationContext.Provider>
  );
}

export function useMembershipApplication() {
  const context = useContext(MembershipApplicationContext);
  if (!context) {
    throw new Error(
      "useMembershipApplication must be used within a MembershipApplicationProvider",
    );
  }
  return context;
}
