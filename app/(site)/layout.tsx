import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { fetchSiteSettings } from "@/lib/sanity/fetch/site-settings";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await fetchSiteSettings();

  return (
    <div className="flex min-h-full flex-col">
      <Header contact={settings} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </div>
  );
}
