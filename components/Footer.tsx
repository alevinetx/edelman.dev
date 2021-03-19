import * as React from "react";
import { Flex } from "@chakra-ui/react";
import { SiteConfig, NavigationMenu } from "../lib/schema";

export interface FooterProps {
  navItems: SiteConfig["footerNavigation"];
  text: SiteConfig["footerText"];
}

export function Footer(props: FooterProps) {
  return <FooterContainer> </FooterContainer>;
}

function FooterContainer(props) {
  return (
    <Flex
      as={"footer"}
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={3}
      bg={["gray.500", "gray.500", "transparent", "transparent"]}
      color={["white", "white", "primary.700", "primary.700"]}
      {...props}
    >
      {props.children}
    </Flex>
  );
}
