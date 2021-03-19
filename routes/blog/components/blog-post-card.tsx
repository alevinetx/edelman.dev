import * as React from "react";
import { Box as Card, Heading, Stack, Text, Flex } from "@chakra-ui/react";
import { Post } from "../../../lib/schema";
import sanity from "../../../lib/sanity";
import Img from "next/image";
import Link from "next/link";
import { blockContentToPlainText } from "react-portable-text";
import { useNextSanityImage } from "next-sanity-image";

export interface BlogPostCardProps {
  post: Post;
}

function BlogPostCard(props: BlogPostCardProps) {
  const getExcerpt = () => {
    if (props.post.excerpt.length > 0) {
      //@ts-ignore
      return blockContentToPlainText(props.post.excerpt);
    } else {
      return "";
    }
  };

  const imgProps = useNextSanityImage(sanity, props.post.mainImage);

  return (
    <Card
      radius={2}
      shadow={1}
      flex={1}
      width={"100%"}
      borderRadius={"base"}
      mr={[0, 0, 3]}
      my={[2, 2, 0]}
      // maxW={"400px"}
      boxShadow={
        "rgb(0 0 0 / 20%) 0px 1px 5px 0px, rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 3px 1px -2px"
      }
    >
      <Flex wrap={"wrap"} flex={1} width={"100%"}>
        <div
          style={{
            width: "100%",
            flex: 1,
            minWidth: "300px",
            marginBottom: "1rem",
          }}
        >
          <Img {...imgProps} />
        </div>
        <Stack
          flex={2}
          style={{ minWidth: "300px" }}
          // paddingX={[0, 0, 3]}
          p={2}
        >
          <Link href={`/blog/${props.post.slug.current}`}>
            <a>
              <Heading
                as={"h1"}
                size="xl"
                letterSpacing={"-.05rem"}
                color={["primary.700"]}
                fontSize={["24px", "24px", "30px", "30px"]}
              >
                {props.post.title}
              </Heading>
            </a>
          </Link>
          <Text
            fontSize={["md", "lg"]}
            mb={[2, 3]}
            lineHeight={["base", "sm"]}
            color={["gray.800"]}
          >
            {getExcerpt()}
          </Text>
        </Stack>
      </Flex>
    </Card>
  );
}

export default BlogPostCard;
