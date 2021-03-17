import * as React from "react";
import { Flex } from "@chakra-ui/react";
import { SiteConfig, NavigationMenu } from "../lib/schema";

export interface ContentProps {
  children: React.ReactNode;
}

export function Content(props: ContentProps) {
  return <ContentContainer>{props.children}</ContentContainer>;
}

function ContentContainer(props) {
  return (
    <Flex
      paddingY={[3]}
      as={"main"}
      direction={"column"}
      style={{
        maxWidth: "800px",
        alignSelf: "center",

        width: "100%",
      }}
      paddingX={[1, 3]}
    >
      {props.children}
    </Flex>
  );
}
