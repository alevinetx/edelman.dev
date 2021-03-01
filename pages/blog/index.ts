import { GetStaticProps, GetStaticPaths } from "next";
import { getDataHooksProps } from "next-data-hooks";
import BlogIndex from "../../routes/blog/components/blog-index";

// export const getStaticPaths: GetStaticPaths = async (context) => {
//   return {
//     paths: [],
//     fallback: false,
//   };
// };

export const getStaticProps: GetStaticProps = async (context) => {
  const dataHooksProps = await getDataHooksProps({
    context,
    dataHooks: BlogIndex.dataHooks,
  });
  return { props: dataHooksProps };
};

export default BlogIndex;
