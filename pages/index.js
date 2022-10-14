import React, { Fragment } from "react";
import Head from "next/head";
// import Link from "next/link";
import AllFunctions from "../components/AllFunctions";
export default function HomePage() {
  return (
    <Fragment>
      <Head>
        <title>PDF Signing Demo</title>
        <meta name="description" content="Lion PDF signing demo" />
      </Head>
      <AllFunctions />
    </Fragment>
  );
}
