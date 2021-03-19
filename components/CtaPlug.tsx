import * as React from "react";
import { Heading, Link, Flex, Stack, Box } from "@chakra-ui/react";
import type { SanityKeyed } from "sanity-codegen";
import { CtaPlug } from "../lib/schema";

export interface CtaPlugBlockProps {
  block: SanityKeyed<CtaPlug>;
}

export const CtaPlugBlock = (props: CtaPlugBlockProps) => {
  // console.log("CtaPlugBlock", props);
  return <Flex key={props.block._key}>CtaPlug</Flex>;
};

export default CtaPlugBlock;
