import { DealershipPageClient } from "@/components/pages/dealership-page";
import { constructMetadata, SITE_URL } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "B2B LED Dealership Program",
  description:
    "Become an authorized Guru Bulbs distributor or retail dealer in Nepal. Enjoy high-margin wholesale rates and dedicated trade support.",
  canonical: `${SITE_URL}/dealership`,
});

export default function DealershipPage() {
  return <DealershipPageClient />;
}
