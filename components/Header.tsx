import * as React from "react";
import { Flex } from "@sanity/ui";
import { SiteConfig, NavigationMenu } from "../lib/schema";

export interface HeaderProps {
  navItems: SiteConfig["mainNavigation"];
  title: String;
}

export function Header(props: HeaderProps) {
  return <HeaderContainer></HeaderContainer>;
}

function HeaderContainer(props) {
  return (
    <Flex as={"header"} direction={"row"} justify={"space-between"}>
      {props.children}
    </Flex>
  );
}
