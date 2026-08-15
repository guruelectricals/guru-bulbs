"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Lightbulb, Video as VideoIcon, X, Video } from "lucide-react";
import { useLanguage } from "@/providers/language-provider";
import type { Video as VideoType } from "@/types/video";

function getTikTokEmbedUrl(url?: string) {
  if (!url) return null;
  const match = url.match(/\/video\/(\d+)/);
  if (match && match[1]) {
    return `https://www.tiktok.com/embed/v2/${match[1]}`;
  }
  return null;
}

interface VideosPageClientProps {
  videos: VideoType[];
}

function getPlainText(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(getPlainText).filter(Boolean).join(" ");
  }

  if (value && typeof value === "object") {
    if ("text" in value && typeof (value as { text?: unknown }).text === "string") {
      return (value as { text: string }).text;
    }

    if ("children" in value && Array.isArray((value as { children?: unknown }).children)) {
      return getPlainText((value as { children: unknown[] }).children);
    }

    return Object.values(value as Record<string, unknown>)
      .map(getPlainText)
      .filter(Boolean)
      .join(" ");
  }

  return "";
}

export function VideosPageClient({
  videos,
}: VideosPageClientProps) {
  const { language, t } = useLanguage();
  const [selectedVideo, setSelectedVideo] = useState<VideoType | null>(null);

  const categories = [
    { name: language === "ne" ? "जडान निर्देशिका" : "Installation", count: 12 },
    { name: language === "ne" ? "ट्युटोरियलहरू" : "Tutorials", count: 18 },
    { name: language === "ne" ? "उत्पादन समीक्षाहरू" : "Product Reviews", count: 14 },
    { name: language === "ne" ? "टिप्स र ट्रिक्स" : "Tips & Tricks", count: 10 },
  ];




  return (
    <main className="relative min-h-screen bg-neutral-950 text-neutral-100 pt-28 pb-16 sm:pt-32 px-4 sm:px-6 lg:px-6 xl:px-10 overflow-hidden">
      {/* GLOWING AMBER RADIAL BACKGROUND AURA */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[650px] rounded-full bg-amber-500/10 blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-[1440px] space-y-16">
        {/* HERO SECTION */}
        <div className="mx-auto max-w-3xl text-center space-y-4 pt-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1 text-xs font-bold tracking-[0.2em] text-amber-400 uppercase backdrop-blur-md">
            <VideoIcon className="size-3.5 text-amber-400" />
            {t("videosTitle")}
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            {language === "ne" ? "भिडियो " : "Video "}
            <span className="gold-gradient-text">{language === "ne" ? "निर्देशिका" : "Guides"}</span>
            {language === "ne" ? " तथा ट्युटोरियलहरू" : " & Tutorials"}
          </h1>
          <p className="text-sm leading-relaxed text-neutral-300 sm:text-base max-w-2xl mx-auto">
            {t("videosDesc")}
          </p>
        </div>

        {/* VIDEOS GRID */}
        <section className="space-y-6">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {videos.map((video, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedVideo(video)}
                className="group relative overflow-hidden rounded-3xl border border-amber-500/20 bg-neutral-900/60 p-4 backdrop-blur-xl transition-all duration-300 hover:border-amber-400/60 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(240,188,25,0.15)] cursor-pointer break-inside-avoid"
              >
                <div className={`relative w-full overflow-hidden rounded-2xl border border-amber-500/20 bg-neutral-950 flex items-center justify-center ${video.videoSource === "tiktok" ? "aspect-[9/16]" : "aspect-video"}`}>
                  
                  {/* THUMBNAIL OR PLACEHOLDER */}
                  {video.thumbnail?.asset?.url ? (
                    <Image
                      src={video.thumbnail.asset.url}
                      alt={video.thumbnail.alt || video.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <Lightbulb className="size-14 text-amber-500/40 transition-transform duration-500 group-hover:scale-110 absolute" />
                  )}

                  {/* BOTTOM DARK GRADIENT */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-neutral-950/90 via-neutral-950/40 to-transparent opacity-80" />

                  {/* PLAY BUTTON OVERLAY */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex size-14 items-center justify-center rounded-full bg-amber-500/90 text-neutral-950 shadow-xl backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                      <Play className="size-6 ml-1" fill="currentColor" />
                    </div>
                  </div>

                  {/* CATEGORY BADGE */}
                  <span className="absolute top-3 left-3 rounded-full bg-neutral-950/85 border border-amber-500/30 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-400 backdrop-blur-md">
                    {video.category?.title || (language === "ne" ? "अन्य" : "Other")}
                  </span>

                  {/* PLATFORM INDICATOR */}
                  <span className="absolute top-3 right-3 rounded-full bg-neutral-950/80 border border-amber-500/30 px-2 py-1 backdrop-blur-md shadow-sm">
                    {video.videoSource === "tiktok" ? (
                      <span className="text-[10px] font-bold text-white tracking-wider flex items-center gap-1"><Video className="size-3 text-amber-400" /> TIKTOK</span>
                    ) : (
                      <span className="text-[10px] font-bold text-white tracking-wider flex items-center gap-1"><Play className="size-3 text-amber-400" /> VIDEO</span>
                    )}
                  </span>

                  {/* DURATION BADGE PLACEHOLDER */}
                  <span className="absolute bottom-3 right-3 rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-white backdrop-blur-md">
                    00:00
                  </span>
                </div>

                <div className="pt-4 px-1 space-y-2">
                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    {getPlainText(video.description) || (language === "ne" ? "विवरण उपलब्ध छैन" : "No description available")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* LIGHTBOX MODAL */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6 lg:p-8">
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[110] flex items-center gap-2 rounded-full bg-neutral-900/80 px-4 py-2 text-white hover:bg-neutral-800 transition-colors border border-white/20 backdrop-blur-md shadow-xl"
          >
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest">Close</span>
            <X className="size-5" />
          </button>
          
          <div className={`relative w-full shadow-2xl rounded-2xl overflow-hidden bg-black flex items-center justify-center ${selectedVideo.videoSource === "tiktok" ? "max-w-md aspect-[9/16]" : "max-w-5xl aspect-video"}`}>
            {selectedVideo.videoSource === "upload" && selectedVideo.videoFile?.asset?.url ? (
              <video src={selectedVideo.videoFile.asset.url} controls autoPlay className="w-full h-full object-contain" />
            ) : selectedVideo.videoSource === "tiktok" && selectedVideo.tiktokUrl ? (
              <iframe
                src={getTikTokEmbedUrl(selectedVideo.tiktokUrl) || selectedVideo.tiktokUrl}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-amber-500/50">
                <VideoIcon className="size-16 mb-4" />
                <p>Video unavailable</p>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
