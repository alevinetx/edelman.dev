import BlockContent from "@sanity/block-content-to-react";
import { Heading, Text } from "@sanity/ui";
import { Code } from "../../components/Code";
import { Figure } from "../../components/Figure";

export const BlockRenderer = (props) => {
  switch (props.node.style) {
    case "h1":
      return (
        <Heading as={"h1"} size={4}>
          {props.children}
        </Heading>
      );
    case "h2":
      return (
        <Heading as={"h2"} size={3}>
          {props.children}
        </Heading>
      );
    case "normal":
      return (
        <Text size={2}>
          <p>{props.children}</p>
        </Text>
      );
    default:
      return BlockContent.defaultSerializers.types.block(props);
  }
};

const highlight = (props) => {
  return <span style={{ backgroundColor: "yellow" }}>{props.children}</span>;
};

export const serializers = {
  types: { block: BlockRenderer, code: Code, mainImage: Figure },
  marks: { highlight },
};
