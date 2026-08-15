"use client";

import { FaWhatsapp } from "react-icons/fa6";
import { useSite } from "@/providers/site-provider";

export function WhatsAppButton() {
  const { branding } = useSite();
  const phone = (
    branding.whatsapp ||
    branding.phone ||
    "9779812345678"
  ).replace(/\D/g, "");

  return (
    <div className="pointer-events-none fixed inset-x-4 bottom-5 z-50 sm:inset-x-8 sm:bottom-6 lg:inset-x-6 xl:inset-x-10">
      <div className="mx-auto flex max-w-[1440px] justify-end">
        <a
          href={`https://wa.me/${phone}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          title="Chat with us on WhatsApp"
          className="pointer-events-auto flex size-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
        >
          <FaWhatsapp className="size-6" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
