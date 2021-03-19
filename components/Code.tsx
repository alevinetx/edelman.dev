import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";

import { Heading, Text, Box } from "@chakra-ui/react";

export function Code({ node }) {
  if (!node || !node.code) {
    return null;
  }
  const { language, code } = node;

  return (
    <Box mx={[0, 0, "-1rem"]} mt={8} mb={8}>
      <SyntaxHighlighter language={language || "text"}>
        {code}
      </SyntaxHighlighter>
    </Box>
  );
}

export default Code;
