import { SanityImageAssetDocument } from "@sanity/client";

export type Product = {
  title: string;
  sku: string;
  mainImage: {
    asset: SanityImageAssetDocument;
  };
};
