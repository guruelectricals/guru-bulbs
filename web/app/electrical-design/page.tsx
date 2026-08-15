import { constructMetadata } from "@/lib/seo";
import { ServiceDesignPage } from "@/components/pages/service-design-page";

export const metadata = constructMetadata({
  title: "Electrical Design",
  description: "Explore our electrical design services for reliable and efficient lighting solutions.",
  canonical: "https://gurubulbs.com/electrical-design",
});

export default function ElectricalDesignPage() {
  return (
    <ServiceDesignPage
      title="Electrical Design"
      description="We provide electrical design support for efficient, safe, and high-performance lighting projects."
    />
  );
}
