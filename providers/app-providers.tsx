"use client";

import type { ReactNode } from "react";

import { MembershipApplicationProvider } from "@/components/community/membership-application-provider";

/**
 * Composition root for app-wide client providers.
 *
 * Wrap any future cross-cutting integration here (theme, TanStack Query,
 * auth/session, feature flags, analytics context) so the root layout stays a
 * single wrapper and provider order lives in one place. Domain-specific
 * providers keep their implementation in their own folder (e.g. the membership
 * application provider lives under `components/community/`) and are only
 * composed here.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <MembershipApplicationProvider>{children}</MembershipApplicationProvider>
  );
}
