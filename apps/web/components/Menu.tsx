import {
  CommerceLayer,
  Price,
  PricesContainer,
  Skus,
  SkusContainer,
} from "@commercelayer/react-components";
import Image from "next/image";
import React from "react";
import { Product } from "../app/types/sanity";

export type MenuProps = {
  token: string;
  products: Product[];
};

const Menu = ({ token, products }: MenuProps) => {
  return (
    <CommerceLayer accessToken={token}>
      <main>
        <h1>Turbo Store</h1>
        <div className="grid">
          {products.map((product) => {
            return (
              <div key={product.sku}>
                <Image
                  src={product.mainImage.asset.url}
                  width={300}
                  height={300}
                  alt={product.title}
                />
                <SkusContainer skus={[product.sku]}>
                  <Skus>
                    <PricesContainer>
                      <Price className="font-bold" />
                    </PricesContainer>
                  </Skus>
                </SkusContainer>
              </div>
            );
          })}
        </div>
      </main>
    </CommerceLayer>
  );
};

export default Menu;
