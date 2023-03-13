import type { AppProps } from "next/app";
import "../styles/normalize.css";
import "../styles/global.scss";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
