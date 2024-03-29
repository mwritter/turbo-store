import { getAllProductsFromSanity } from "../sanity/client";

import { getAuthToken } from "../commerce/server";
import Menu from "../components/Menu";

const Page = async () => {
  // Get all the Products content
  const products = await getAllProductsFromSanity();
  const token = await getAuthToken();

  return <Menu token={token} products={products} />;
};

export default Page;
