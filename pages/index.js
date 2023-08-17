import React, { Fragment } from "react";
import Head from "next/head";
import AllFunctions from "../components/AllFunctions";
export default function HomePage() {
  return (
    <Fragment>
      <Head>
        <title>PDF Signing</title>
        <meta name="description" content="PDF Sign" />
      </Head>
      <AllFunctions />
    </Fragment>
  );
}
