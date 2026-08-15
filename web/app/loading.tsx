import { Lightbulb } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-105 w-105 rounded-full bg-amber-500/10 blur-[100px]" />
      </div>
      <div className="relative z-10 flex flex-col items-center gap-3">
        <Spinner className="size-6 text-amber-500" />
      </div>
    </div>
  );
}