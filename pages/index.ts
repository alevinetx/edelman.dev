import { GetStaticProps, GetStaticPaths } from "next";
import { getDataHooksProps } from "next-data-hooks";

import Home from "../routes/main/components/home";

export const getStaticProps: GetStaticProps = async (context) => {
  const dataHookProps = await getDataHooksProps({
    context,
    dataHooks: Home.dataHooks,
  });
  return { props: dataHookProps, revalidate: 1 };
};

export default Home;
