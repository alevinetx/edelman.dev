import * as React from "react";
import { Flex } from "@sanity/ui";
import { SiteConfig, NavigationMenu } from "../lib/schema";

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
