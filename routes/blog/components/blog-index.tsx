import { createDataHook } from "next-data-hooks";
import sanity from "../../../lib/sanity-client";

const useBlogIndexData = createDataHook("BlogIndex", async (context) => {
  const allPosts = await sanity.getAll("post");

  return {
    msg: "hi",
    posts: allPosts,
  };
});

function BlogIndex() {
  const { posts } = useBlogIndexData();

  return <div>hmm</div>;
}

BlogIndex.dataHooks = [useBlogIndexData];

export default BlogIndex;
