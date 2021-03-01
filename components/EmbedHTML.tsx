import * as React from "react";

export function EmbedHTML({ node }) {
  const { html } = node;
  if (!html) {
    return null;
  }
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
