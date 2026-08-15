import { client } from "./client";

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T> {
  try {
    const data = await client.fetch<T>(query, params);

    return data;
  } catch (error) {
    console.error("Sanity fetch error:", error);

    throw new Error("Failed to fetch data from Sanity");
  }
}