import { searchProducts } from "@/services/product.service";
import { ApiResponse } from "@/lib/api-response";

/**
 * GET /api/products/search?q=led
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("q") ?? "";

    const products = await searchProducts(query);

    return ApiResponse.success(
      products,
      "Search completed successfully."
    );
  } catch (error) {
    console.error(error);

    return ApiResponse.error(
      "Search failed."
    );
  }
}