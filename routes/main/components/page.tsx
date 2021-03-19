import * as React from "react";
import { createDataHook } from "next-data-hooks";
import * as Sentry from "@sentry/react";
import { Layout } from "../../../components/Layout";
import { Heading, Link, Flex } from "@chakra-ui/react";

import * as DataHooks from "../../../hooks";
import { useRouter } from "next/router";

function Page(props) {
  const router = useRouter();

  // console.log("data", data);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const { page } = DataHooks.usePageData();
  return (
    <Layout headerTitle={page.title}>
      <Flex style={{ width: "100%" }}>
        {" "}
        <Heading as={"h1"} size="lg" letterSpacing={"-.1rem"}>
          {page.title}
        </Heading>{" "}
      </Flex>
    </Layout>
  );
}

Page.dataHooks = [
  DataHooks.usePageData,
  DataHooks.useGlobalNavigation,
  DataHooks.useSiteSettings,
];

export default Page;
