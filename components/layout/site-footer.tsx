import { Footer } from "@/components/layout/footer";
import { fetchSiteSettings } from "@/lib/sanity/fetch/site-settings";

export async function SiteFooter() {
  const settings = await fetchSiteSettings();
  return <Footer settings={settings} />;
}
