import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

// Initialize Upstash Redis if environment variables are provided
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

const COUNTER_KEY = "visitor_count";

async function readCount(): Promise<number> {
  if (!redis) return 0;
  try {
    const count = await redis.get<number>(COUNTER_KEY);
    return count ?? 0;
  } catch (error) {
    console.error("Redis get count error:", error);
    return 0;
  }
}

async function incrementCount(): Promise<number> {
  if (!redis) return 0;
  try {
    return await redis.incr(COUNTER_KEY);
  } catch (error) {
    console.error("Redis incr count error:", error);
    return 0;
  }
}

// GET – returns current count (read-only)
export async function GET() {
  const count = await readCount();
  return NextResponse.json({ count });
}

// POST – increments count by 1 and returns updated count
export async function POST() {
  const count = await incrementCount();
  return NextResponse.json({ count });
}


