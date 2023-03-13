import type { AppProps } from "next/app";
import "../styles/normalize.css";
import "../styles/global.scss";
import { Layout } from "../src/components/layout.component";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
