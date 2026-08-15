import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { getSettings } from "@/services/settings.service";
import { AboutPageClient } from "@/components/pages/about-page";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings().catch(() => null);
  const companyName = settings?.companyName || "Guru Bulbs";

  return constructMetadata({
    title: `About Us | ${companyName} Engineering & Lighting Legacy`,
    description:
      settings?.footerDescription ||
      `Learn about ${companyName} — Nepal's premier LED lighting brand committed to precision thermal engineering, 85% energy savings, and certified safety standards.`,
    canonical: "https://gurubulbs.com/about",
  });
}

export default async function AboutPage() {
  const settings = await getSettings().catch(() => null);

  return <AboutPageClient settings={settings} />;
}
