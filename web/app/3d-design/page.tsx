import { constructMetadata } from "@/lib/seo";
import { ServiceDesignPage } from "@/components/pages/service-design-page";

export const metadata = constructMetadata({
  title: "3D Design",
  description:
    "Explore our 3D design services for visualising lighting concepts before implementation.",
  canonical: "https://guruelectricals.com.np/3d-design",
});

export default function ThreeDDesignPage() {
  return (
    <ServiceDesignPage
      title="3D Design"
      description="Our 3D design services help bring lighting concepts to life with clear visual planning and presentation-ready outputs."
    />
  );
}
