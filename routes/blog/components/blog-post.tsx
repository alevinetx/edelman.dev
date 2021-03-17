import { createDataHook } from "next-data-hooks";
import sanity from "../../../lib/sanity-client";
import { Layout } from "../../../components/Layout";
import { Stack } from "@chakra-ui/react";
import { serializers } from "../serializers";
// import Head from "next/head";
import imageUrlBuilder from "@sanity/image-url";
import simg from "../../../lib/sanity";
import { NextSeo, ArticleJsonLd } from "next-seo";
import { blockContentToPlainText } from "react-portable-text";
import { Category } from "../../../lib/schema";
import dynamic from "next/dynamic";

const PostHeader = dynamic(() => import("./post-header"));

const SimpleBlockContent = dynamic(
  () => import("../../../components/SimpleBlockContent")
);

const builder = imageUrlBuilder(simg);

const useBlogPostData = createDataHook("BlogPost", async (context) => {
  const settings = await sanity.get("site-config", "siteSettings");
  const [post] = await sanity.getAll(
    "post",
    `slug.current == "${context.params.slug}"`
  );
  const author = await sanity.expand(post.author);

  let cats: Category[] = [];

  for (const cat of post.categories) {
    const expCat = await sanity.expand(cat);
    cats.push(expCat);
  }

  // console.log("props", settings, post, author, cats);

  const ogImage = {
    url: builder.image(post.mainImage).width(800).height(600).url(),
    height: 600,
    width: 800,
    alt: post.mainImage.alt || "",
  };

  const seo = {
    title: post.title,
    description:
      // @ts-ignore
      post.excerpt.length > 0 ? blockContentToPlainText(post.excerpt) : "",
    ogImages: [ogImage],
    canonical: `https://edelman.dev/blog/${post.slug.current}/`,
    tags: cats.map((cat) => cat.title),
    publishedAt: post._createdAt,
    updatedAt: post._updatedAt,
  };

  return {
    post,
    settings,
    author,
    seo,
  };
});

function getPostTitle() {}

function BlogPost() {
  const data = useBlogPostData();

  // console.log("data", data);

  return (
    <Layout config={data.settings || {}}>
      <ArticleJsonLd
        url={data.seo.canonical}
        title={data.seo.title}
        images={data.seo.ogImages.map((img) => img.url)}
        datePublished={data.seo.publishedAt}
        authorName={["Michael Edelman"]}
        description={data.seo.description}
        publisherName={"EdelmanDev"}
        publisherLogo={"https://edelman.dev/android-chrome-512x512.png"}
      />
      <NextSeo
        title={data.seo.title}
        titleTemplate={"Edelman | %s"}
        description={data.seo.description}
        canonical={data.seo.canonical}
        twitter={{
          site: "@edelman215",
          cardType: "summary",
          handle: "@edelman215",
        }}
        openGraph={{
          profile: {
            firstName: "Michael",
            lastName: "Edelman",
          },
          url: data.seo.canonical,
          title: data.post.title,
          site_name: "Edelman.Dev",
          type: "article",
          article: {
            authors: ["https://edelman.dev/"],
            tags: data.seo.tags,
          },
          images: data.seo.ogImages,
        }}
      />
      <Stack space={[3, 3, 4, 5]}>
        <PostHeader post={data.post} author={data.author} />
        <SimpleBlockContent blocks={data.post.body} serializers={serializers} />
      </Stack>
    </Layout>
  );
}

BlogPost.dataHooks = [useBlogPostData];

export default BlogPost;
