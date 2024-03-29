import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { authenticate } from "@commercelayer/js-auth";

const clientId = process.env.NEXT_PUBLIC_CL_CLIENT_ID;
const scope = `market:${process.env.NEXT_PUBLIC_CL_MARKET_ID}`;

export const useGetToken = () => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const getCookieToken = Cookies.get(`clAccessToken`);
    if (
      (!getCookieToken || getCookieToken === "undefined") &&
      clientId &&
      scope
    ) {
      const getToken = async () => {
        const auth = await authenticate("client_credentials", {
          clientId,
          scope: `market:${scope}`,
        });
        setToken(auth?.accessToken);
        Cookies.set(`clAccessToken`, auth?.accessToken, {
          // @ts-ignore
          expires: auth?.expires,
        });
      };
      getToken();
    } else {
      setToken(getCookieToken || "");
    }
  }, []);
  return token;
};
