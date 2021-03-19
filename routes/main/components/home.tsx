import * as React from "react";

import { Layout } from "../../../components/Layout";
import { SEO } from "../../../components/SEO";
import { Flex, Stack, Heading, Text } from "@chakra-ui/react";

import {
  useGlobalNavigation,
  useSiteSettings,
  useBlogPosts,
  usePageData,
} from "../../../hooks/siteSettings";

import BlogPostCard, {
  BlogPostCardProps,
} from "../../blog/components/blog-post-card";

function Home(props) {
  const posts = useBlogPosts();
  const settings = useSiteSettings();

  return (
    <>
      <SEO
        title={"Michael Edelman"}
        description={settings.openGraph.description}
        tags={[]}
        pageAuthor={["Michael Edelman"]}
        twitter={{
          site: "Michael Edelman",
          handle: "@edelman215",
          cardType: "summary",
        }}
        datePublished={settings._createdAt}
        images={[settings.openGraph.image]}
        og={{ description: settings.openGraph.description, type: "website" }}
      />
      <Layout>
        <Flex
          direction={"column"}
          width={"100%"}
          maxW={{ lg: "800px" }}
          m={" 0 auto"}
        >
          <Heading
            as={"h1"}
            size={"3xl"}
            mt={[4, 4, 8]}
            mb={[4, 4, 8]}
            letterSpacing={"-.1rem"}
          >
            Home
          </Heading>
          <Text fontSize="lg" mb={[4, 4, 8]}>
            que accumsan lectus, nec dignissim est interdum at. Quisque rhoncus
            nulla lacinia imperdiet consectetur. Quisque gravida lacus a orci
            maximus ornare vel a risus. Nunc id ex neque. Nulla quis turpis
            tellus. Sed posuere blandit eros, vita
          </Text>
          <Stack space={[4]}>
            <Heading
              as={"h2"}
              size={"2xl"}
              pb={2}
              mb={4}
              borderBottom={"1px solid black"}
              borderBottomColor={"gray.300"}
              letterSpacing={"-.1rem"}
            >
              Recent Posts
            </Heading>
            {posts.map((post) => (
              <BlogPostCard post={post} key={post._id} />
            ))}
          </Stack>
        </Flex>
        <div></div>
      </Layout>
    </>
  );
}

Home.dataHooks = [useBlogPosts, useGlobalNavigation, useSiteSettings];

export default Home;
