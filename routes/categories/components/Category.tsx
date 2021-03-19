import * as React from "react";
import { Layout } from "../../../components/Layout";
import { Flex, Heading, Box, Text } from "@chakra-ui/react";
// import { serializers } from "../serializers";
// import { Category, MainImage } from "../../../lib/schema";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import * as DataHooks from "../../../hooks";
import { SEO } from "../../../components/SEO";
import BlogPostCard from "../../blog/components/blog-post-card";

function Category() {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const [cat] = DataHooks.useContentCategory();
  // console.log("cat", cat, cat.content);

  // console.log("data", data);

  return (
    <>
      <SEO
        title={cat.title}
        description={cat.description}
        tags={[]}
        pageAuthor={["Michael Edelman"]}
        datePublished={cat._createdAt}
        dateModified={cat._updatedAt}
        twitter={{
          site: "Michael Edelman",
          handle: "@edelman215",
          cardType: "summary",
        }}
        images={[]}
        og={{
          type: "website",
        }}
      />
      <Layout>
        <Flex
          direction={"column"}
          width={"100%"}
          maxW={{ lg: "800px" }}
          m={" 0 auto"}
        >
          <Flex
            borderBottom={"1px solid black"}
            borderBottomColor={"gray.300"}
            direction={"column"}
            width={"100%"}
            pb={2}
            mb={[4, 4, 6]}
          >
            <Heading
              as={"h2"}
              size={"xl"}
              letterSpacing={"-.05rem"}
              color={["primary.700"]}
              fontSize={["24px", "24px", "30px", "30px"]}
            >
              {cat.title}
            </Heading>
            <Box>
              <Text>{cat.description}</Text>
            </Box>
          </Flex>

          <Flex
            justifyContent={"space-between"}
            wrap={"wrap"}
            flex={1}
            width={"100%"}
          >
            {cat.content.map((p) => {
              return <BlogPostCard post={p} key={p._id} />;
            })}
          </Flex>
        </Flex>
      </Layout>
    </>
  );
}

Category.dataHooks = [
  DataHooks.useContentCategory,
  DataHooks.useGlobalNavigation,
  DataHooks.useSiteSettings,
];

export default Category;
