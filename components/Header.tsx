import * as React from "react";
import { Heading, Flex, Box, Text } from "@chakra-ui/react";
import { SiteConfig, NavigationMenu, Route } from "../lib/schema";
import { CloseIcon as CI, MenuIcon as OI } from "./Icons";
import { blockContentToPlainText } from "react-portable-text";
import type { SanityKeyedReference } from "sanity-codegen";
import Link from "next/link";

export interface HeaderProps {
  navItems: SiteConfig["mainNavigation"];
  toggleMobileNavigationMenu: (e: React.SyntheticEvent) => void;
  doShowMobileNavigationMenu: boolean;
  titleText: string;
}

const MenuItem = ({ children, to = "/", ...rest }) => {
  return (
    <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
      {children}
    </Text>
  );
};

const HeaderTitleBlock = (props: { title }) => {
  return (
    <Flex align="center" mr={5}>
      <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
        <Link href={"/"}>
          <a> {props.title}</a>
        </Link>
      </Heading>
    </Flex>
  );
};

const HeaderNavigationMenuToggle = (props: {
  onClick: (e: React.SyntheticEvent) => void;
  isToggled: boolean;
  OpenIcon: React.ReactNode;
  CloseIcon: React.ReactNode;
}) => {
  const { onClick, isToggled, OpenIcon, CloseIcon } = props;
  return (
    <Box display={{ base: "block", md: "none" }} onClick={onClick}>
      {isToggled ? CloseIcon : OpenIcon}
    </Box>
  );
};

const HeaderNavigationMenuItemList = (props: {
  isMobile: boolean;
  navItems: SiteConfig["mainNavigation"];
}) => {
  function renderMenuItem(
    item: SanityKeyedReference<Route>,
    index: number,
    list: SiteConfig["mainNavigation"]
  ) {
    return <MenuItem key={item._key}>{`Test Item ${index + 1}`}</MenuItem>;
  }

  return (
    <Box
      display={{
        base: props.isMobile ? "block" : "none",
        md: "flex",
      }}
      width={{ base: "full", md: "auto" }}
      alignItems="center"
      flexGrow={1}
    >
      {props.navItems.map(renderMenuItem)}
    </Box>
  );
};

const HeaderNavigationBlock = (props: {
  doShowMobileNavigation: boolean;
  navItems: SiteConfig["mainNavigation"];
  toggleMobileNavigationMenu: (e: React.SyntheticEvent) => void;
}) => {
  const {
    doShowMobileNavigation,
    toggleMobileNavigationMenu,
    navItems,
  } = props;
  return (
    <>
      <HeaderNavigationMenuToggle
        onClick={toggleMobileNavigationMenu}
        isToggled={doShowMobileNavigation}
        OpenIcon={<OI />}
        CloseIcon={<CI />}
      />
      <HeaderNavigationMenuItemList
        isMobile={doShowMobileNavigation}
        navItems={navItems}
      />
    </>
  );
};

export function Header(props: HeaderProps) {
  const {
    toggleMobileNavigationMenu,
    doShowMobileNavigationMenu,
    titleText,
    navItems,
  } = props;

  return (
    <HeaderContainer>
      <HeaderTitleBlock title={titleText} />
      <HeaderNavigationBlock
        toggleMobileNavigationMenu={toggleMobileNavigationMenu}
        doShowMobileNavigation={doShowMobileNavigationMenu}
        navItems={navItems}
      />
    </HeaderContainer>
  );
}

function HeaderContainer(props) {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={3}
      bg={["primary.500", "primary.500", "transparent", "transparent"]}
      color={["white", "white", "primary.700", "primary.700"]}
      {...props}
    />
  );
}
