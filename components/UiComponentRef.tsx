import * as React from "react";
import { Heading, Link, Flex, Stack, Box } from "@chakra-ui/react";
import type { SanityKeyed } from "sanity-codegen";
import { UiComponentRef } from "../lib/schema";

export interface UiComponentRefBlockProps {
  block: SanityKeyed<UiComponentRef>;
}

export const UiComponentRefBlock = (props: UiComponentRefBlockProps) => {
  console.log("UiComponentRefBlock", props);
  return <Flex key={props.block._key}>UiComponentRef</Flex>;
};

export default UiComponentRefBlock;
