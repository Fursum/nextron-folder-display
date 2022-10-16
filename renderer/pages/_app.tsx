import Head from "next/head";
import type { AppProps } from "next/app";

import "@styles/globals.scss";
import GlobalLayout from "@components/GlobalLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Title From _app.tsx</title>
      </Head>
      <GlobalLayout>
        <Component {...pageProps} />
      </GlobalLayout>
    </>
  );
}

export default MyApp;
