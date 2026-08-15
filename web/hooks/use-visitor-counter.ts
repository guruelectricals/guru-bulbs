"use client";

import { useEffect, useState } from "react";

const VISITED_KEY = "guru_bulbs_visited";

/**
 * Tracks UNIQUE visitors (increments count once per unique browser/device using localStorage)
 * and polls for live count updates every 10s.
 */
export function useVisitorCounter(): number | null {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    // 1. Fetch current count (GET) read-only
    async function fetchCount() {
      try {
        const res = await fetch("/api/visitors", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && typeof data.count === "number") {
          setCount(data.count);
        }
      } catch {
        // Silently ignore errors
      }
    }

    // 2. Only increment count (POST) if this is a NEW unique visitor
    async function checkAndIncrement() {
      const hasVisited = typeof window !== "undefined" && localStorage.getItem(VISITED_KEY);

      if (!hasVisited) {
        try {
          const res = await fetch("/api/visitors", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
          });
          if (res.ok) {
            localStorage.setItem(VISITED_KEY, "true");
            const data = await res.json();
            if (!cancelled && typeof data.count === "number") {
              setCount(data.count);
              return;
            }
          }
        } catch {
          // Fall through to fetch read-only count
        }
      }

      // If already visited or POST failed, just fetch the current count
      fetchCount();
    }

    checkAndIncrement();

    // 3. Poll every 10 seconds to keep live count updated dynamically across active users
    const interval = setInterval(() => {
      fetchCount();
    }, 10000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return count;
}


