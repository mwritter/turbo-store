import { CommerceLayer } from "@commercelayer/sdk";
import { authenticate } from "@commercelayer/js-auth";

const client_credentials = {
  clientId: process.env.CL_CLIENT_ID!,
  scope: `market:${process.env.CL_MARKET_ID!}`,
};

export const getCommerceLayer = async () => {
  const token = await getAuthToken();

  const client = CommerceLayer({
    organization: process.env.CL_ORGANIZATION!,
    accessToken: token,
  });
  try {
    const skus = await client.skus.list();
    console.log({ skus });
  } catch (e) {
    console.log("ERROR: " + e);
  }
  return client;
};

export const getAuthToken = async () => {
  const auth = await authenticate("client_credentials", client_credentials);
  return auth.accessToken;
};
