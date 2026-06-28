import { OTHER_OPTION_VALUE } from "@/schemas/constants";

type Option = { value: string; label: string };

export function resolveOptionLabel(
  options: readonly Option[],
  value: string,
  otherDetail?: string,
): string {
  if (value === OTHER_OPTION_VALUE && otherDetail?.trim()) {
    return otherDetail.trim();
  }

  return options.find((item) => item.value === value)?.label ?? value;
}

export function resolveOptionLabels(
  options: readonly Option[],
  values: string[],
  otherDetail?: string,
): string {
  return values
    .map((value) => resolveOptionLabel(options, value, otherDetail))
    .join(", ");
}

export function resolveCountryLabel(
  countries: readonly Option[],
  value: string,
): string {
  return countries.find((item) => item.value === value)?.label ?? value;
}
