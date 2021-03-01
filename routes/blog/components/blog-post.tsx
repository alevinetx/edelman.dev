import { createDataHook } from "next-data-hooks";
import sanity from "../../../lib/sanity-client";
import { Layout } from "../../../components/Layout";
import { Stack } from "@sanity/ui";
import { serializers } from "../serializers";
import { SimpleBlockContent } from "../../../components/SimpleBlockContent";
import PostHeader from "./post-header";

const useBlogPostData = createDataHook("BlogPost", async (context) => {
  const settings = await sanity.get("site-config", "siteSettings");
  const [post] = await sanity.getAll(
    "post",
    `slug.current == "${context.params.slug}"`
  );
  const author = await sanity.expand(post.author);

  return {
    post,
    settings,
    author,
  };
});

function BlogPost() {
  const data = useBlogPostData();

  return (
    <Layout config={data.settings || {}}>
      <Stack space={[3, 3, 4, 5]}>
        <PostHeader post={data.post} author={data.author} />
        <SimpleBlockContent blocks={data.post.body} serializers={serializers} />
      </Stack>
    </Layout>
  );
}

BlogPost.dataHooks = [useBlogPostData];

export default BlogPost;
