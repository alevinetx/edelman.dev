import { GetStaticProps, GetStaticPaths } from "next";
import { getDataHooksProps } from "next-data-hooks";

import Page from "../routes/main/components/page";
import sanity from "../lib/sanity-client";

export const getStaticPaths: GetStaticPaths = async (context) => {
  const allRoutes = await sanity.getAll("route");
  return {
    paths:
      allRoutes.map((route) => ({
        params: {
          slug: route.slug.current,
        },
      })) || [],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const dataHookProps = await getDataHooksProps({
    context,
    dataHooks: Page.dataHooks,
  });
  return { props: dataHookProps };
};

export default Page;
