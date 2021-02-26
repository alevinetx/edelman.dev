import { Container, Card, Grid, Heading, Stack, Text } from "@sanity/ui";
import { Post } from "../lib/schema";
import sanity from "../lib/sanity-client";
import { getAllPostsForHome } from "../lib/api";
import { useAmp } from "next/amp";

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

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>["props"];

export default function Home({ allPosts, preview }: Props) {
  console.log(allPosts);

  return (
    <Container width={3}>
      <Card margin={3} padding={4}>
        <Stack space={3}>
          <Heading as="h1" size={5}>
            Michael Edelman
          </Heading>
          <Text as="p">Cloud Event Planner; Message Bus Driver</Text>
        </Stack>
      </Card>
      {renderPostList(allPosts)}
    </Container>
  );
}

export async function getStaticProps({ preview = false }) {
  const allPosts = await sanity.getAll("post");
  return {
    props: { allPosts, preview },
    revalidate: 1,
  };
}
