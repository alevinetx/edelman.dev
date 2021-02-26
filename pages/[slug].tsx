import { Container, Card, Grid, Heading, Stack, Text } from "@sanity/ui";
import { Route } from "../lib/schema";
import sanity from "../lib/sanity-client";
import { useRouter } from "next/router";
import { getAllPostsWithSlug } from "../lib/api";

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>["props"];

function RouteContainer(props: Props) {
  const router = useRouter();
  console.log("PROPS: ", props);
  const { slug } = router.query;

  return (
    <Container width={3}>
      <Card margin={3} padding={4}>
        <Stack space={3}>
          <Heading as="h1" size={5}>
            {props.page.title}
          </Heading>
          <Text as="p"></Text>
        </Stack>
      </Card>
    </Container>
  );
}

export async function getStaticPaths() {
  const allRoutes = await sanity.getAll("route");
  console.log("all routes", allRoutes);
  return {
    paths:
      allRoutes?.map((route) => ({
        params: {
          slug: route.slug.current,
        },
      })) || [],
    fallback: false,
  };
}

export async function getStaticProps({ params, preview = false }) {
  const [route] = await sanity.getAll(
    "route",
    `slug.current == "${params.slug}"`
  );
  const page = await sanity.get("page", route.page._ref);
  return {
    props: { route, preview, page },
    revalidate: 1,
  };
}

export default RouteContainer;
