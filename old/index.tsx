import { Container, Card, Grid, Heading, Stack, Text } from "@sanity/ui";
import { Post } from "../lib/schema";
import sanity from "../lib/sanity-client";
import {
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from "next";

import { Layout } from "../components/Layout";

import { getAllPostsForHome } from "../lib/api";
import { useAmp } from "next/amp";

export const getStaticProps = async ({
  preview = false,
}: GetStaticPropsContext) => {
  const allPosts = await sanity.getAll("post");
  const routes = await sanity.getAll("route");
  const [siteConfig] = await sanity.getAll("site-config");
  return {
    props: { allPosts, preview, siteConfig, routes },
    revalidate: 1,
  };
};

export const config = { amp: false };

function PostListicle({ post }: { post: Post }) {
  return (
    <Card margin={3} padding={4}>
      <Stack space={3}>
        <Heading as="h2" size={4}>
          {post.title}
        </Heading>
        <Text as="p"></Text>
      </Stack>
    </Card>
  );
}

function renderPostList(posts: Post[]) {
  return posts.map((post) => <PostListicle key={post._id} post={post} />);
}

export default function Home({
  allPosts,
  siteConfig,
  preview,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout siteConfig={siteConfig}>
      <Container width={3}>
        <Card margin={3} padding={4}>
          <Stack space={3}>
            <Heading as="h1" size={5}>
              Michael Edelman
            </Heading>
            <Text as="p">Cloud Event Planner; Message Bus Driver</Text>
            <a href="https://github.com/medelman17" rel="me">
              github.com/medelman17
            </a>
          </Stack>
        </Card>
        {renderPostList(allPosts)}
      </Container>
    </Layout>
  );
}
