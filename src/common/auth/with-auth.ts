import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  PreviewData,
} from "next/types";
import { AppStore } from "../../features/store";
import { getUser } from "./get-user";
import { deleteCookie, getCookies, setCookie } from "cookies-next";
import { signin, signout } from "../../features/slices/auth.slice";
import { getActiveList, refreshToken } from "../../features/api";
import { ParsedUrlQuery } from "querystring";
import { User } from "../interfaces/user.interface";
import { LOGIN_ROUTE } from "../constants";

type GetServerSideProps = <
  S extends AppStore,
  C extends GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
>({
  store,
  context,
}: {
  store: S;
  context: C;
  user: User;
}) => Promise<GetServerSidePropsResult<any>>;

export const withAuth =
  (getServerSideProps?: GetServerSideProps) =>
  <S extends AppStore>(store: S) =>
  async <C extends GetServerSidePropsContext<ParsedUrlQuery, PreviewData>>(
    context: C
  ) => {
    const { req, res } = context;
    const cookies = getCookies({ req });
    const user = getUser(cookies);

    if (!user) {
      return {
        redirect: {
          destination: LOGIN_ROUTE,
          permanent: false,
        },
      };
    }

    try {
      if (cookies.RefreshToken) {
        await store.dispatch(refreshToken.initiate()).unwrap();
      }

      setCookie("user", user, { req, res });
      store.dispatch(signin(user));

      store.dispatch(getActiveList.initiate());
    } catch (e) {
      deleteCookie("AccessToken", { req, res });
      deleteCookie("RefreshToken", { req, res });
      deleteCookie("user", { req, res });

      store.dispatch(signout());

      return {
        redirect: {
          destination: LOGIN_ROUTE,
          permanent: false,
        },
      };
    }

    if (getServerSideProps) {
      return await getServerSideProps({ store, context, user });
    }

    return {
      props: {},
    };
  };
