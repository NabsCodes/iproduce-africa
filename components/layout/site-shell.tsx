import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

type SiteShellProps = {
  activePath: string;
  children: React.ReactNode;
};

export function SiteShell({ activePath, children }: SiteShellProps) {
  return (
    <>
      <Header activePath={activePath} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
