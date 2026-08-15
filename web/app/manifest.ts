import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Guru Bulbs | Premium LED Lighting",
    short_name: "Guru Bulbs",
    description:
      "Certified, energy-efficient LED lighting solutions for homes and businesses in Nepal.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#f59e0b",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
