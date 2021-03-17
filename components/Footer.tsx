import * as React from "react";
import { Flex } from "@chakra-ui/react";
import { SiteConfig, NavigationMenu } from "../lib/schema";
import { Button } from "@sanity/ui";

import { GoMarkGithub } from "react-icons/go";

export interface FooterProps {
  navItems: SiteConfig["footerNavigation"];
  text: SiteConfig["footerText"];
}

export function Footer(props: FooterProps) {
  return <FooterContainer></FooterContainer>;
}

function FooterContainer(props) {
  return (
    <Flex as={"footer"} direction={"row"} justify={"space-between"}>
      {props.children}
    </Flex>
  );
}
