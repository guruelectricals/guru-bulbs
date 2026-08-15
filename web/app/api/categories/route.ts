import { getCategories } from "@/services/category.service";
import { ApiResponse } from "@/lib/api-response";

export async function GET() {
  try {
    const categories = await getCategories();

    return ApiResponse.success(
      categories,
      "Categories fetched successfully."
    );
  } catch (error) {
    console.error(error);

    return ApiResponse.error(
      "Failed to fetch categories."
    );
  }
}