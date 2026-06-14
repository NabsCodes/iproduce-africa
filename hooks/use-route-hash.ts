"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function useRouteHash() {
  const pathname = usePathname();
  const activePath = pathname || "/";
  const [hash, setHash] = useState("");

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);

    syncHash();
    window.addEventListener("hashchange", syncHash);

    return () => window.removeEventListener("hashchange", syncHash);
  }, [activePath]);

  return `${activePath}${hash}`;
}
