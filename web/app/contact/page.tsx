import type { Settings } from "@/types/settings";
import { getSettings } from "@/services/settings.service";
import { ContactPageClient } from "@/components/pages/contact-page";

export const metadata = {
  title: "Contact Us | Guru Bulbs",
  description:
    "Get in touch with Guru Bulbs for lighting inquiries, wholesale catalog requests, or dealership support.",
};

export default async function ContactPage() {
  const settings: Settings | null = await getSettings().catch(() => null);

  return <ContactPageClient settings={settings} />;
}
