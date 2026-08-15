import { getProducts } from "@/services/product.service";
import { ApiResponse } from "@/lib/api-response";

export async function GET() {
  try {
    const products = await getProducts();

    return ApiResponse.success(
      products,
      "Products fetched successfully."
    );
  } catch (error) {
    console.error(error);

    return ApiResponse.error(
      "Failed to fetch products."
    );
  }
}