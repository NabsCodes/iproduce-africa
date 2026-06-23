export type CountryOption = {
  value: string;
  label: string;
  searchKeywords?: string;
};

const africanCountries: CountryOption[] = [
  { value: "DZ", label: "Algeria" },
  { value: "AO", label: "Angola" },
  { value: "BJ", label: "Benin" },
  { value: "BW", label: "Botswana" },
  { value: "BF", label: "Burkina Faso" },
  { value: "BI", label: "Burundi" },
  { value: "CV", label: "Cabo Verde", searchKeywords: "Cape Verde" },
  { value: "CM", label: "Cameroon" },
  { value: "CF", label: "Central African Republic" },
  { value: "TD", label: "Chad" },
  { value: "KM", label: "Comoros" },
  {
    value: "CG",
    label: "Congo",
    searchKeywords: "Republic of Congo Brazzaville",
  },
  {
    value: "CD",
    label: "Congo (DRC)",
    searchKeywords: "Democratic Republic Kinshasa DRC",
  },
  {
    value: "CI",
    label: "Côte d'Ivoire",
    searchKeywords: "Ivory Coast Cote d Ivoire",
  },
  { value: "DJ", label: "Djibouti" },
  { value: "EG", label: "Egypt" },
  { value: "GQ", label: "Equatorial Guinea" },
  { value: "ER", label: "Eritrea" },
  { value: "SZ", label: "Eswatini", searchKeywords: "Swaziland" },
  { value: "ET", label: "Ethiopia" },
  { value: "GA", label: "Gabon" },
  { value: "GM", label: "Gambia" },
  { value: "GH", label: "Ghana" },
  { value: "GN", label: "Guinea" },
  { value: "GW", label: "Guinea-Bissau" },
  { value: "KE", label: "Kenya" },
  { value: "LS", label: "Lesotho" },
  { value: "LR", label: "Liberia" },
  { value: "LY", label: "Libya" },
  { value: "MG", label: "Madagascar" },
  { value: "MW", label: "Malawi" },
  { value: "ML", label: "Mali" },
  { value: "MR", label: "Mauritania" },
  { value: "MU", label: "Mauritius" },
  { value: "MA", label: "Morocco" },
  { value: "MZ", label: "Mozambique" },
  { value: "NA", label: "Namibia" },
  { value: "NE", label: "Niger" },
  { value: "NG", label: "Nigeria" },
  { value: "RW", label: "Rwanda" },
  { value: "ST", label: "São Tomé and Príncipe" },
  { value: "SN", label: "Senegal" },
  { value: "SC", label: "Seychelles" },
  { value: "SL", label: "Sierra Leone" },
  { value: "SO", label: "Somalia" },
  { value: "ZA", label: "South Africa" },
  { value: "SS", label: "South Sudan" },
  { value: "SD", label: "Sudan" },
  { value: "TZ", label: "Tanzania" },
  { value: "TG", label: "Togo" },
  { value: "TN", label: "Tunisia" },
  { value: "UG", label: "Uganda" },
  { value: "ZM", label: "Zambia" },
  { value: "ZW", label: "Zimbabwe" },
];

const restOfWorldCountries: CountryOption[] = [
  { value: "AR", label: "Argentina" },
  { value: "AU", label: "Australia" },
  { value: "AT", label: "Austria" },
  { value: "BE", label: "Belgium" },
  { value: "BR", label: "Brazil" },
  { value: "CA", label: "Canada" },
  { value: "CN", label: "China" },
  { value: "DK", label: "Denmark" },
  { value: "FI", label: "Finland" },
  { value: "FR", label: "France" },
  { value: "DE", label: "Germany" },
  { value: "IN", label: "India" },
  { value: "ID", label: "Indonesia" },
  { value: "IE", label: "Ireland" },
  { value: "IL", label: "Israel" },
  { value: "IT", label: "Italy" },
  { value: "JP", label: "Japan" },
  { value: "LU", label: "Luxembourg" },
  { value: "NL", label: "Netherlands" },
  { value: "NO", label: "Norway" },
  { value: "PT", label: "Portugal" },
  { value: "SA", label: "Saudi Arabia" },
  { value: "ES", label: "Spain" },
  { value: "SE", label: "Sweden" },
  { value: "CH", label: "Switzerland" },
  { value: "TR", label: "Türkiye", searchKeywords: "Turkey Turkiye" },
  {
    value: "AE",
    label: "United Arab Emirates",
    searchKeywords: "UAE Emirates Dubai",
  },
  {
    value: "GB",
    label: "United Kingdom",
    searchKeywords: "UK Britain England Scotland Wales",
  },
  { value: "US", label: "United States", searchKeywords: "USA America US" },
];

export const countryComboboxGroups = [
  { heading: "Africa", options: africanCountries },
  { heading: "Rest of world", options: restOfWorldCountries },
] as const;

export const countryOptions: readonly CountryOption[] = [
  ...africanCountries,
  ...restOfWorldCountries,
];

const countryLabelByValue = new Map(
  countryOptions.map((country) => [country.value, country.label]),
);

export function getCountryLabel(value: string) {
  return countryLabelByValue.get(value) ?? value;
}

export const countryComboboxCopy = {
  searchPlaceholder: "Search countries...",
  emptyMessage: "No country found.",
  emptyHint: "Try a different spelling or an alternate name (e.g. Nigeria).",
} as const;
