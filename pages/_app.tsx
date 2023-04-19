import type { AppProps } from "next/app";
import "../styles/normalize.css";
import globalStyles from "../styles/global.module.scss";
import { Layout } from "../src/components/layout/layout.component";
import { Quicksand } from "@next/font/google";
import { wrapper } from "../src/features/store";
import { Provider } from "react-redux";
import { getCookie } from "cookies-next";
import { signin } from "../src/features/slices/auth.slice";
import App from "next/app";
import { redirect } from "../src/common/utils/redirect";
import { api, getActiveList } from "../src/features/api";

const quicksand = Quicksand({
  weight: ["500", "700"],
  subsets: ["latin"],
});

export default function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Layout className={`${quicksand.className} ${globalStyles.app}`}>
        <Component {...props.pageProps} />
      </Layout>
    </Provider>
  );
}

MyApp.getInitialProps = wrapper.getInitialAppProps(
  (store) => async (context) => {
    const { req, res, pathname } = context.ctx;

    const stringifiedUser = getCookie("user", { req });
    const accessToken = getCookie("AccessToken", { req });
    const refreshToken = getCookie("RefreshToken", { req });

    if (!accessToken && !refreshToken && !pathname.includes("/auth/")) {
      redirect("/auth/login", res);
    }

    if (
      typeof stringifiedUser === "string" &&
      (accessToken || refreshToken) &&
      pathname !== "/logout"
    ) {
      const user = JSON.parse(stringifiedUser);

      try {
        store.dispatch(getActiveList.initiate());

        await Promise.all(store.dispatch(api.util.getRunningQueriesThunk()));
      } catch {}

      store.dispatch(signin(user));

      if (pathname.includes("/auth/")) {
        redirect("/", res);
      }
    }

    const { pageProps } = await App.getInitialProps(context);
    return {
      pageProps,
    };
  }
);
