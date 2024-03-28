import { CommerceLayer, CommerceLayerClient, Sku } from "@commercelayer/sdk";
import { authenticate } from "@commercelayer/js-auth";

type Store = {
  allProducts: Map<string, Sku> | null;
  client: CommerceLayerClient | null;
};

const store: Store = {
  allProducts: null,
  client: null,
};

export const getCommerceLayer = async () => {
  const auth = await authenticate("client_credentials", {
    clientId: "AJQSq54Q7Fz7rBDjTRP_mYTHLa4S7brH-hJPYGRxvqE",
    scope: `market:18062`,
  });

  if (!auth) return;
  store.client = CommerceLayer({
    organization: "mwritter",
    accessToken: auth.accessToken,
  });
  return store.client;
};

export const getAllProductsFromCL = async () => {
  // Create the client if we dont have one
  if (!store.client) await getCommerceLayer();

  // Get and set the Products if we dont have them
  if (!store.allProducts && store.client) {
    store.allProducts = new Map();
    const products = await store.client.skus.list({ include: ["prices"] });
    for (const product of products) {
      store.allProducts.set(product.code, product);
    }
  }
  return store.allProducts;
};
