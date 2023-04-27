import { CookieValueTypes } from "cookies-next";
import { isString } from "lodash";

const TOKEN_SEPARATOR = ".";

type Selector<R> = (data: Record<string, any>) => R | null;
type GetTokenData = <R>(
  token: CookieValueTypes,
  selector: Selector<R>
) => R | null;

export const getTokenData: GetTokenData = (tokenCookie, select) => {
  if (!isString(tokenCookie)) {
    return null;
  }

  try {
    const [_, data] = tokenCookie.split(TOKEN_SEPARATOR);
    const decodedData = Buffer.from(data, "base64").toString();

    return select(JSON.parse(decodedData));
  } catch {
    return null;
  }
};
