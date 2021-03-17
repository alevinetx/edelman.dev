import { createDataHook } from "next-data-hooks";
import sanity from "../../../lib/sanity-client";
import { Layout } from "../../../components/Layout";

import { Flex, Stack, Heading } from "@chakra-ui/react";

import BlogPostCard, {
  BlogPostCardProps,
} from "../../blog/components/blog-post-card";

const useHomePageData = createDataHook("HomePage", async (context) => {
  const settings = await sanity.get("site-config", "siteSettings");
  const allPosts = await sanity.getAll("post");
  return {
    msg: "home",
    settings,
    posts: allPosts,
  };
});

function Home() {
  const { settings, posts } = useHomePageData();

  return (
    <Layout config={settings}>
      <Flex style={{ width: "100%" }}>
        <Stack space={[4]}>
          <Heading as={"h1"} size={"lg"}>
            Recent Posts
          </Heading>
          {posts.map((post) => (
            <BlogPostCard post={post} key={post._id} />
          ))}
        </Stack>
      </Flex>
      <div></div>
    </Layout>
  );
}

Home.dataHooks = [useHomePageData];

export default Home;
