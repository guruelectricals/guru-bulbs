import { sanityFetch } from "@/lib/fetch";
import { videosQuery } from "@/lib/queries";
import { Video } from "@/types/video";

export async function getVideos() {
  return sanityFetch<Video[]>(videosQuery);
}

export async function getFeaturedVideos() {
  const videos = await sanityFetch<Video[]>(videosQuery);

  return videos.filter((video) => video.featured);
}