import type { AppProps } from "next/app";
import "../styles/normalize.css";
import "../styles/global.scss";
import { Layout } from "../src/components/layout/layout.component";
import { Quicksand } from "@next/font/google";
import { wrapper } from "../src/features/store";
import { Provider } from "react-redux";

const quicksand = Quicksand({
  weight: ["500", "700"],
  subsets: ["latin"],
});

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Layout className={quicksand.className}>
        <Component {...props.pageProps} />
      </Layout>
    </Provider>
  );
}
