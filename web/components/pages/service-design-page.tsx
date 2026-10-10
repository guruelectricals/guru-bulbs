import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

type ServiceDesignPageProps = {
  title: string;
  description: string;
};

export function ServiceDesignPage({ title, description }: ServiceDesignPageProps) {
  return (
    <main className="min-h-screen bg-neutral-950 px-4 py-24 text-neutral-100 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-8 rounded-[32px] border border-amber-500/20 bg-neutral-900/70 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-12 lg:p-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-[11px] font-bold tracking-[0.24em] text-amber-400 uppercase">
          <Sparkles className="size-3.5" />
          Services
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            This is the {title} page
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg">
            {description}
          </p>
        </div>

        <div className="rounded-2xl border border-amber-500/20 bg-neutral-950/70 p-6 text-sm leading-relaxed text-neutral-300">
          This page is part of the new Services section in the navigation and is ready for your content and design details.
        </div>

        <Link
          href="/contact"
          className={buttonVariants({ variant: "brand", size: "cta" })}
        >
          Contact us <ArrowRight className="size-4" />
        </Link>
      </div>
    </main>
  );
}
