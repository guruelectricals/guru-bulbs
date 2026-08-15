"use client";

import { useEffect, useRef, useState } from "react";
// bulb haru display garney component
interface BulbProps {
  sources?: string[];
  fadeDuration?: number;
  className?: string;
}

const DEFAULT_SOURCES = [
  "/videos/bulb1.mp4",
  "/videos/bulb2.mp4",
  "/videos/bulb3.mp4",
  "/videos/bulb4.mp4",
];

export function Bulb({
  sources = DEFAULT_SOURCES,
  fadeDuration = 1200,
  className = "",
}: BulbProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const current = videoRefs.current[activeIndex];
    if (current) {
      current.currentTime = 0;
      current.play().catch(() => {
        // auto block garna milxa
      });
    }
  }, [activeIndex]);

  const handleEnded = () => {
    setActiveIndex((prev) => (prev + 1) % sources.length);
  };

  return (
    <div className={`relative ${className}`}>
      {/* video ko card  */}
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl border border-gray-200 shadow-2xl">
        {sources.map((src, index) => (
          <video
            key={src}
            ref={(el) => {
              videoRefs.current[index] = el;
            }}
            muted
            playsInline
            preload="auto"
            onEnded={index === activeIndex ? handleEnded : undefined}
            className="absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out"
            style={{
              opacity: index === activeIndex ? 1 : 0,
              transitionDuration: `${fadeDuration}ms`,
            }}
          >
            <source src={src} type="video/mp4" />
          </video>
        ))}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />
      </div>
    </div>
  );
}
