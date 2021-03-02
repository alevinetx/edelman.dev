import * as React from "react";
import { Author, Post } from "../../../lib/schema";
import BlogAuthor from "./post-author";
import { Stack, Heading, Box } from "@sanity/ui";
import { Figure } from "../../../components/Figure";
export interface BlogPostHeaderProps {
  post: Post;
  author: Author;
}

function BlogPostTitle(props) {
  return (
    <Box>
      <Heading size={5}>{props.title}</Heading>
    </Box>
  );
}

function BlogPostHeader(props: BlogPostHeaderProps) {
  console.log("props.post", props.post);
  return (
    <Stack space={[3, 3, 4, 5]}>
      <BlogPostTitle title={props.post.title} />
      <Figure node={props.post.mainImage} />
      <BlogAuthor author={props.author} />
    </Stack>
  );
}

export default BlogPostHeader;
