import Link from "next/link";
import { Lightbulb, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";

export default function NotFound() {
  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-background px-4">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-105 w-105 rounded-full bg-amber-500/10 blur-[100px]" />
      </div>

      <Empty className="relative z-10 max-w-md rounded-2xl border border-border bg-card/60 py-12 shadow-2xl backdrop-blur-sm">
        <EmptyHeader>
          <EmptyMedia
            variant="icon"
            className="mb-3 size-16 border border-amber-500/20 bg-amber-500/10"
          >
            <Lightbulb className="size-7 text-amber-500 drop-shadow-[0_0_12px_rgba(245,158,11,0.6)]" />
          </EmptyMedia>
          <p className="mb-1 text-6xl font-bold tracking-tight text-amber-500">
            404
          </p>
          <EmptyTitle className="text-xl">Page not found</EmptyTitle>
          <EmptyDescription className="max-w-xs">
            Looks like this bulb burned out. The page you&apos;re looking for
            doesn&apos;t exist or may have been moved.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              nativeButton={false}
              render={<Link href="/" />}
              className="bg-amber-500 text-black hover:bg-amber-600"
            >
              <ArrowLeft className="size-4" />
              Back to Home
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="/products" />}
              variant="outline"
            >
              <Search className="size-4" />
              Browse Products
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  );
}
