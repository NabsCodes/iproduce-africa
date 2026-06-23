import { getCountryLabel } from "@/content/countries";

export { getCountryLabel };

export type FormSelectOption = {
  value: string;
  label: string;
};

export function resolveSelectOptionLabel(
  options: readonly FormSelectOption[],
  value: string,
  otherValue: string,
  otherDetail?: string,
) {
  if (value === otherValue && otherDetail?.trim()) {
    return otherDetail.trim();
  }

  return options.find((option) => option.value === value)?.label ?? value;
}
