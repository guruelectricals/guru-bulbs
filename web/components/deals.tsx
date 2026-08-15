"use client";

import { Flame } from "lucide-react";

const deals = [
  "20% OFF LED BULBS",
  "FREE SHIPPING OVER $50",
  "BUY 2 GET 1 FREE",
  "NEW CUSTOMER? GET 15% OFF",
  "SAME DAY DELIVERY",
  "VINTAGE COLLECTION 25% OFF",
];

export function DealsTicker() {
  return (
    // infinite marquee huney wala deals
    <div className="group relative overflow-hidden bg-amber-600 py-3">
      <div className="flex w-max items-center animate-marquee group-hover:[animation-play-state:paused]">
        {[...deals, ...deals].map((deal, i) => (
          <span
            key={i}
            className="flex flex-shrink-0 items-center gap-3 whitespace-nowrap px-4"
          >
            <span className="italic font-black uppercase tracking-tight text-primary-foreground text-lg sm:text-xl -skew-x-6">
              {deal}
            </span>
            <Flame
              className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground -rotate-12 flex-shrink-0"
              fill="currentColor"
            />
          </span>
        ))}
      </div>
    </div>
  );
}
