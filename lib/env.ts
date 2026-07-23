export function readTrimmedEnv(name: string): string | undefined {
  const raw = process.env[name];
  if (!raw) return undefined;

  const trimmed = raw.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export function getMissingEnvNames(names: readonly string[]): string[] {
  return names.filter((name) => !readTrimmedEnv(name));
}
