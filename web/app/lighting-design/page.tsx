import { constructMetadata } from "@/lib/seo";
import { ServiceDesignPage } from "@/components/pages/service-design-page";

export const metadata = constructMetadata({
  title: "Lighting Design",
  description:
    "Explore our lighting design services for beautiful, functional, and energy-efficient spaces.",
  canonical: "https://guruelectricals.com.np/lighting-design",
});

export default function LightingDesignPage() {
  return (
    <ServiceDesignPage
      title="Lighting Design"
      description="We create lighting design solutions tailored for residential, commercial, and architectural environments."
    />
  );
}
