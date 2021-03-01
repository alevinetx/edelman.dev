import * as React from "react";
import { Container, Card, Grid, Heading, Stack, Text } from "@sanity/ui";
import { Post } from "../../../lib/schema";
import Link from "next/link";

export interface BlogPostCardProps {
  post: Post;
}

function BlogPostCard(props: BlogPostCardProps) {
  return (
    <Card margin={3} padding={4}>
      <Stack space={3}>
        <Link href={`/blog/${props.post.slug.current}`}>
          <a>
            <Heading>{props.post.title}</Heading>
          </a>
        </Link>
      </Stack>
    </Card>
  );
}

export default BlogPostCard;
