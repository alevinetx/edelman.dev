import * as React from "react";
import { Flex, Heading } from "@sanity/ui";
import { SiteConfig, NavigationMenu } from "../lib/schema";
import { GoMarkGithub } from "react-icons/go";
import { blockContentToPlainText } from "react-portable-text";

export interface HeaderProps {
  navItems: SiteConfig["mainNavigation"];
  title: String;
}

export function Header(props: HeaderProps) {
  return (
    <HeaderContainer>
      <Flex>
        <Heading>Michael Edelman</Heading>
      </Flex>
      <Flex></Flex>
      <Flex>
        <a href="https://github.com/medelman17" rel={"me"}>
          <GoMarkGithub />
        </a>
      </Flex>
    </HeaderContainer>
  );
}

function HeaderContainer(props) {
  return (
    <Flex
      as={"header"}
      direction={"row"}
      justify={"space-between"}
      paddingY={2}
      paddingX={[1, 3]}
    >
      {props.children}
    </Flex>
  );
}
