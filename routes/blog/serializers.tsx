import BlockContent from "@sanity/block-content-to-react";
import { Heading, Text, Box } from "@chakra-ui/react";
// import { Code } from "../../components/Code";
// import { Figure } from "../../components/Figure";
import dynamic from "next/dynamic";
import * as React from "react";

const Code = dynamic(() => import("../../components/Code"));
const Figure = dynamic(() => import("../../components/Figure"));

export const BlockRenderer = (props) => {
  switch (props.node.style) {
    case "h1":
      return (
        <Heading
          as={"h1"}
          size={"3xl"}
          fontSize={["30px", "30px", "36px", "36px"]}
          mb={[2, 3]}
          color={["primary.700", "primary.700", "primary.700", "primary.700"]}
          // lineHeight={1}
        >
          {props.children}
        </Heading>
      );
    case "h2":
      return (
        <Heading
          as={"h2"}
          size={"2xl"}
          mb={[2, 3]}
          color={["primary.700", "primary.700", "primary.700", "primary.700"]}
          fontSize={["24px", "24px", "30px", "30px"]}
        >
          {props.children}
        </Heading>
      );
    case "normal":
      return (
        <Text
          fontSize={["md", "lg"]}
          mb={[3, 3, 3]}
          lineHeight={["base", "base", "base"]}
          color={["gray.700"]}
        >
          {props.children}
        </Text>
      );
    default:
      return BlockContent.defaultSerializers.types.block(props);
  }
};

const highlight = (props) => {
  return <Text as={"mark"}>{props.children}</Text>;
};

const Img = (props) => {
  return (
    <Box
      mt={8}
      mb={8}
      mx={[0, 0, "-1rem"]}
      boxShadow={
        "rgb(0 0 0 / 20%) 0px 1px 5px 0px, rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 3px 1px -2px"
      }
    >
      <Figure node={props.node} />
    </Box>
  );
};

export const serializers = {
  types: { block: BlockRenderer, code: Code, mainImage: Img },
  marks: { highlight },
};
