import { sanityFetch } from "@/lib/fetch";
import { settingsQuery } from "@/lib/queries";
import type { Settings } from "@/types/settings";

export async function getSettings(): Promise<Settings> {

  return await sanityFetch<Settings>(
    settingsQuery
  );

}