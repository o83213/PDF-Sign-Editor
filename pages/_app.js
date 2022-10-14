import "../styles/globals.css";
import React from "react";
import Head from "next/head";
import Layout from "../components/layout/Layout";
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
