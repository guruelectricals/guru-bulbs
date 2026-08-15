import { getProductBySlug } from "@/services/product.service";
import { ApiResponse } from "@/lib/api-response";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const product = await getProductBySlug(slug);

    if (!product) {
      return ApiResponse.error(
        "Product not found.",
        404
      );
    }

    return ApiResponse.success(
      product,
      "Product fetched successfully."
    );
  } catch (error) {
    console.error(error);

    return ApiResponse.error(
      "Failed to fetch product."
    );
  }
}