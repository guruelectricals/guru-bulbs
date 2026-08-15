"use client";

import * as React from "react";
import { Share2, Check, Link as LinkIcon } from "lucide-react";
import { FaFacebook, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

export function ShareButtons({
  title,
  url,
}: {
  title: string;
  url?: string;
}) {
  const [copied, setCopied] = React.useState(false);
  const [shareUrl, setShareUrl] = React.useState(url || "");

  React.useEffect(() => {
    if (!url && typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, [url]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl || (typeof window !== "undefined" ? window.location.href : ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const whatsappShare = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;
  const twitterShare = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;

  return (
    <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-amber-500/15">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mr-2">
        <Share2 className="size-4" /> Share Article:
      </div>

      {/* COPY LINK BUTTON */}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleCopy}
        className="h-8 rounded-full border-amber-500/30 bg-neutral-900/80 text-xs font-bold text-neutral-200 hover:border-amber-400 hover:text-white transition-all gap-1.5"
      >
        {copied ? (
          <>
            <Check className="size-3.5 text-emerald-400" />
            <span className="text-emerald-400">Copied!</span>
          </>
        ) : (
          <>
            <LinkIcon className="size-3.5" />
            <span>Copy Link</span>
          </>
        )}
      </Button>

      {/* WHATSAPP */}
      <a href={whatsappShare} target="_blank" rel="noopener noreferrer">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 rounded-full border-amber-500/30 bg-neutral-900/80 text-xs font-bold text-neutral-200 hover:border-amber-400 hover:text-emerald-400 transition-all gap-1.5"
        >
          <FaWhatsapp className="size-3.5 text-emerald-400" />
          <span>WhatsApp</span>
        </Button>
      </a>

      {/* FACEBOOK */}
      <a href={facebookShare} target="_blank" rel="noopener noreferrer">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 rounded-full border-amber-500/30 bg-neutral-900/80 text-xs font-bold text-neutral-200 hover:border-amber-400 hover:text-blue-400 transition-all gap-1.5"
        >
          <FaFacebook className="size-3.5 text-blue-400" />
          <span>Facebook</span>
        </Button>
      </a>

      {/* TWITTER / X */}
      <a href={twitterShare} target="_blank" rel="noopener noreferrer">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 rounded-full border-amber-500/30 bg-neutral-900/80 text-xs font-bold text-neutral-200 hover:border-amber-400 hover:text-sky-400 transition-all gap-1.5"
        >
          <FaXTwitter className="size-3.5 text-sky-400" />
          <span>X / Twitter</span>
        </Button>
      </a>
    </div>
  );
}
