import "../styles/globals.scss";
import "react-image-lightbox/style.css";
import "ress";
import "swiper/css";
import "swiper/css/pagination";
import "typeface-black-ops-one";
import "typeface-caveat";
import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import Layout from "components/Layout";
import "@djthoms/pretty-checkbox";

if (process.env.NODE_ENV === "development") {
  require("../styles/show-breakpoints.scss");
}

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <meta
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
          name="viewport"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
