import "../styles/globals.scss";
import "react-image-lightbox/style.css";
import "ress";
import "typeface-black-ops-one";
import "typeface-caveat";
import type { AppProps } from "next/app";
import React from "react";
import Layout from "components/Layout";

if (process.env.NODE_ENV === "development") {
  require("../styles/show-breakpoints.scss");
}

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
