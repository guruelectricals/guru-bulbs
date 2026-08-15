import { constructMetadata } from "@/lib/seo";
import { VideosPageClient } from "@/components/pages/videos-page";
import { getVideos } from "@/services/video.service";

export const metadata = constructMetadata({
  title: "Video Guides & Product Demos",
  description:
    "Watch Guru Bulbs video guides, installation tutorials, and LED technology product walkthroughs.",
  canonical: "https://guruelectricals.com.np/videos",
});

export default async function VideosPage() {
  const videos = await getVideos();

  return <VideosPageClient videos={videos} />;
}
