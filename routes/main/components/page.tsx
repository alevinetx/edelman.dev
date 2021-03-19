import * as React from "react";
import { createDataHook } from "next-data-hooks";
import * as Sentry from "@sentry/react";
import { Layout } from "../../../components/Layout";
import { Heading, Link, Flex, Stack } from "@chakra-ui/react";

import * as DataHooks from "../../../hooks";
import { useRouter } from "next/router";
import { renderPageContent } from "../renderPageContent";

function Page(props) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const { page } = DataHooks.usePageData();

  return (
    <Layout headerTitle={page.title}>
      <Flex
        direction={"column"}
        width={"100%"}
        maxW={{ lg: "800px" }}
        m={" 0 auto"}
      >
        {/*{" "}*/}
        {/*<Heading as={"h1"} size="lg" letterSpacing={"-.1rem"}>*/}
        {/*  {page.title}*/}
        {/*</Heading>{" "}*/}
        <Stack spacing={8}>{page.content.map(renderPageContent)}</Stack>
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
