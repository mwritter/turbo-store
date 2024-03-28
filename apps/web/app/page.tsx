import React from "react";
import { getAllProductsFromSanity } from "../sanity/client";
import { getAllProductsFromCL } from "../commerce";
import Image from "next/image";

const Page = async () => {
  // Get all the Products content
  const products = await getAllProductsFromSanity();

  // Get all the Products Commerce info
  const clProducts = await getAllProductsFromCL();

  return (
    <main>
      <h1>Turbo Store</h1>
      <div>
        {products.map((product) => {
          return (
            <>
              <h2>{product.title}</h2>
              <Image
                src={product.mainImage.asset.url}
                width={300}
                height={300}
                alt="image"
              />
              <p>
                {clProducts?.get(product.sku)?.prices?.[0]?.formatted_amount}
              </p>
            </>
          );
        })}
      </div>
    </main>
  );
};

export default Page;
