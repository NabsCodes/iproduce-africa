"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function useRouteHash() {
  const pathname = usePathname();
  const activePath = pathname || "/";
  const [routeHash, setRouteHash] = useState({
    path: activePath,
    hash: "",
  });

  useEffect(() => {
    const syncHash = () => {
      setRouteHash({
        path: activePath,
        hash: window.location.hash,
      });
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);

    return () => window.removeEventListener("hashchange", syncHash);
  }, [activePath]);

  const hash = routeHash.path === activePath ? routeHash.hash : "";

  return `${activePath}${hash}`;
}
