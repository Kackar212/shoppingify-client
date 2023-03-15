import type { AppProps } from "next/app";
import "../styles/normalize.css";
import "../styles/global.scss";
import { Layout } from "../src/components/layout/layout.component";
import { Quicksand } from "@next/font/google";

const quicksand = Quicksand({
  weight: ["500", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout className={quicksand.className}>
      <Component {...pageProps} />
    </Layout>
  );
}
