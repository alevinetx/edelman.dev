import * as React from "react";
import {
  Container,
  Card,
  Grid,
  Heading,
  Stack,
  Text,
  Inline,
  Flex,
} from "@sanity/ui";
import { Figure } from "../../../components/Figure";
import { Post } from "../../../lib/schema";
import sanity from "../../../lib/sanity";
import Img from "next/image";

import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import { blockContentToPlainText } from "react-portable-text";
import { useNextSanityImage } from "next-sanity-image";

const builder = imageUrlBuilder(sanity);

function Image() {}

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
    <Card radius={2} shadow={1} padding={[3, 3, 4]} flex={1} width={"100%"}>
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
        <Stack flex={2} style={{ minWidth: "300px" }} paddingX={[0, 0, 3]}>
          <Link href={`/blog/${props.post.slug.current}`}>
            <a>
              <Heading as={"h1"} size={5}>
                {props.post.title}
              </Heading>
            </a>
          </Link>
          <Text size={2}>
            <p>{getExcerpt()}</p>
          </Text>
        </Stack>
      </Flex>
    </Card>
  );
}

export default BlogPostCard;
