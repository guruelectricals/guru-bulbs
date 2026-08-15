import { getSettings } from "@/services/settings.service";
import { ApiResponse } from "@/lib/api-response";

export async function GET() {
  try {
    const settings = await getSettings();

    return ApiResponse.success(
      settings,
      "Settings fetched successfully."
    );
  } catch (error) {
    console.error(error);

    return ApiResponse.error(
      "Failed to fetch settings."
    );
  }
}