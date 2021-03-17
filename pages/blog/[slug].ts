import { GetStaticProps, GetStaticPaths } from "next";
import { getDataHooksProps } from "next-data-hooks";
import BlogPost from "../../routes/blog/components/blog-post";
import sanity from "../../lib/sanity-client";

export const getStaticPaths: GetStaticPaths = async (context) => {
  const allPosts = await sanity.getAll("post");
  // console.log("allposts", allPosts, context);
  return {
    paths:
      allPosts.map((post) => ({
        params: {
          slug: post.slug.current,
        },
      })) || [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const dataHooksProps = await getDataHooksProps({
    context,
    dataHooks: BlogPost.dataHooks,
  });
  return { props: dataHooksProps, revalidate: 1 };
};

export default BlogPost;
