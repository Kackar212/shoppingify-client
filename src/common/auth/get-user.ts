import { getTokenData } from "./get-token-data";
import { TmpCookiesObj } from "cookies-next/lib/types";

export function getUser(cookies: TmpCookiesObj) {
  if (!cookies.RefreshToken && !cookies.AccessToken) {
    return null;
  }

  if (cookies.user) {
    return JSON.parse(cookies.user);
  }

  return getTokenData(
    cookies.AccessToken || cookies.RefreshToken,
    ({ name, id }) => ({
      name,
      id,
    })
  );
}
