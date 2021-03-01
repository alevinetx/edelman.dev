import * as React from "react";
import sanity from "../lib/sanity";
import BlockContent from "@sanity/block-content-to-react";

const { projectId, dataset } = sanity.config();

export function SimpleBlockContent(props) {
  const { blocks, serializers } = props;

  if (!blocks) {
    console.error("Missing blocks");
    return null;
  }

  return (
    <BlockContent
      blocks={blocks}
      serializers={serializers}
      projectId={projectId}
      dataset={dataset}
    />
  );
}
