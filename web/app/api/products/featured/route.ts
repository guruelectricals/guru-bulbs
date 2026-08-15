import { getFeaturedProducts } from "@/services/product.service";
import { ApiResponse } from "@/lib/api-response";

export async function GET() {
  try {
    const products = await getFeaturedProducts();

    return ApiResponse.success(
      products,
      "Featured products fetched successfully."
    );
  } catch (error) {
    console.error(error);

    return ApiResponse.error(
      "Failed to fetch featured products."
    );
  }
}