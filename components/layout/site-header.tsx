import { Header } from "@/components/layout/header";
import { fetchSiteSettings } from "@/lib/sanity/fetch/site-settings";

export async function SiteHeader() {
  const settings = await fetchSiteSettings();
  return <Header contact={settings} />;
}
