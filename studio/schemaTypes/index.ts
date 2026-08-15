import { settingsType } from "./documents/settings";
import { categoryType } from "./documents/category";
import { seoType } from "./objects/seo";
import { imageWithAltType } from "./objects/imageWithAlt";
import { fileDownloadType } from "./objects/fileDownload";
import { productVariantType } from "./objects/productVariant";
import { blockContentType } from "./objects/blockContent";
import { specificationType } from "./objects/specification";
import { productType } from "./documents/product";
import { faqType } from "./objects/faq";
import { privacyPolicyType } from "./documents/privacyPolicy";
import { authorType } from "./documents/author";
import { postType } from "./documents/post";
import { cctMatrixRowType } from "./objects/cctMatrixRow";
import { testimonialType } from "./documents/testimonial";
import video from './documents/video'
import videoCategory from './documents/videoCategory'

export const schemaTypes = [
  settingsType,
  categoryType,
  seoType,
  blockContentType,
  fileDownloadType,
  productType,
  imageWithAltType,
  specificationType,
  productVariantType,
  cctMatrixRowType,
  faqType,
  privacyPolicyType,
  authorType,
  postType,
  testimonialType,
  video,
  videoCategory,
];