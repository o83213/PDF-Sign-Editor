import "../styles/globals.css";
import React from "react";
import Head from "next/head";
import Layout from "../components/layout/Layout";
import { PdfProvider } from "../context/pdfContext";
function MyApp({ Component, pageProps }) {
  return (
    <PdfProvider>
      <Layout>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          ></meta>
        </Head>
        <Component {...pageProps} />
      </Layout>
    </PdfProvider>
  );
}

export default MyApp;
