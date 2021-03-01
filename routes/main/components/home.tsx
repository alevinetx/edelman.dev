import { createDataHook } from "next-data-hooks";
import sanity from "../../../lib/sanity-client";
import { Layout } from "../../../components/Layout";

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
      <div>
        {posts.map((post) => (
          <BlogPostCard post={post} key={post._id} />
        ))}
      </div>
    </Layout>
  );
}

Home.dataHooks = [useHomePageData];

export default Home;
