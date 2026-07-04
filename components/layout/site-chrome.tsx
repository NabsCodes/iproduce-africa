"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Gates the marketing Header/Footer + main wrapper by pathname so the
 * embedded Sanity Studio at /admin gets a clean, full-viewport shell.
 * Header/Footer are passed in as already-rendered ReactNode props from the
 * server-component root layout, so Footer never enters the client bundle.
 */
export function SiteChrome({
  header,
  footer,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-full flex-col">
      {header}
      <main className="flex-1">{children}</main>
      {footer}
    </div>
  );
}
