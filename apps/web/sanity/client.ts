// client.ts
import { createClient } from "@sanity/client";
import groq from "groq";
import { Product } from "../app/types/sanity";
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,
});

export const getAllProductsFromSanity = async (): Promise<Product[]> => {
  return await client.fetch(
    groq`*[_type == "product"] {
    title,
    sku,
    mainImage { asset-> }
  }`
  );
};
