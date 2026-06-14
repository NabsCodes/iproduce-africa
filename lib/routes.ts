export function isInternalRoute(href: string) {
  return (
    href.startsWith("/") &&
    !href.startsWith("//") &&
    !href.startsWith("mailto:") &&
    !href.startsWith("tel:")
  );
}
