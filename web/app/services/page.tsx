import Link from "next/link";
import {
  Box,
  CircuitBoard,
  Lightbulb,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { constructMetadata, SITE_URL } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Lighting, Electrical & 3D Design Services",
  description:
    "Explore Guru Bulbs lighting design, electrical design, and 3D visualisation services for residential and commercial projects in Nepal.",
  canonical: `${SITE_URL}/services`,
});

const services: {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}[] = [
  {
    title: "Electrical Design",
    description:
      "We provide electrical design support for efficient, safe, and high-performance lighting projects.",
    icon: CircuitBoard,
    href: "/electrical-design",
  },
  {
    title: "Lighting Design",
    description:
      "Plan the quality, spread, and warmth of light for homes, retail spaces, and commercial interiors.",
    icon: Lightbulb,
    href: "/lighting-design",
  },
  {
    title: "3D Design",
    description:
      "Visualise proportions, materials, and construction before production with presentation-ready 3D studies.",
    icon: Box,
    href: "/3d-design",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-neutral-950 px-4 py-24 text-neutral-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        {/* Header */}
        <div className="mb-16 flex flex-col items-center text-center gap-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-[11px] font-bold tracking-[0.24em] text-amber-400 uppercase">
            <Sparkles className="size-3.5" />
            Our Services
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl max-w-3xl">
            Guru <span className="text-amber-500">Services</span>
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg">
            From circuit to render to fixture — pick a discipline below to see
            how each engagement runs.
          </p>
        </div>

        {/* 3-Column Grid for Cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.title}
                href={service.href}
                className="group flex flex-col items-start gap-6 rounded-[32px] border border-amber-500/20 bg-neutral-900/70 p-8 shadow-2xl shadow-black/10 backdrop-blur-xl transition-all hover:border-amber-500/40 hover:-translate-y-2 hover:shadow-amber-500/10 hover:shadow-2xl sm:p-10 cursor-pointer"
              >
                <div className="inline-flex items-center justify-center size-14 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all">
                  <Icon className="size-6" />
                </div>

                <h2 className="text-3xl font-extrabold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  {service.title}
                </h2>

                <p className="flex-grow text-base leading-relaxed text-neutral-300">
                  {service.description}
                </p>

                <div className="mt-2 w-full flex items-center justify-between border-t border-amber-500/10 pt-5">
                  <span className="text-xs font-bold tracking-widest text-amber-400/90 uppercase transition-colors group-hover:text-amber-400">
                    View Details
                  </span>
                  <div className="flex size-8 items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 transition-all duration-300 group-hover:bg-amber-500 group-hover:text-neutral-950 group-hover:scale-110">
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
