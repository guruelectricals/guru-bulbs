import {createImageUrlBuilder} from "@sanity/image-url";
import type { Image } from "sanity";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

// Extract just the asset reference to bypass crop/hotspot metadata
// export function urlFor(source: Image) {
//   if (!source) return builder.image("");
  
//   // If the source has an asset object with a _ref, use that. Otherwise, use the source itself.
//   const assetRef = source.asset?._ref || source.asset || source;
//   console.log("urlFor called with source:", source);

//   const srcSet = buildSrcSet({
//   id: "image-79f37b3f070b144d45455d514ff4e9fc43035649-1000x1000-png",
//   width: 500,
//   baseUrl: `https://cdn.sanity.io/images/<project-id>/<dataset>`,
// })
  
//   return builder.image(assetRef);
// }

export function urlFor(source: any) {
  if (!source) return builder.image("");

  // Handle custom imageWithAlt object wrapper (e.g. source.image.asset)
  const imageSource = source?.image?.asset
    ? source.image
    : source?.asset
    ? source
    : source?.image || source;

  try {
    return builder.image(imageSource);
  } catch {
    return builder.image("");
  }
}