import * as React from "react";
import { SiteConfig, NavigationMenu } from "../lib/schema";
import { Heading, Link, Flex } from "@chakra-ui/react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Content } from "./Content";
import Head from "next/head";

export interface LayoutProps {
  config: SiteConfig;
  children: React.ReactNode;
}

export function Layout(props: LayoutProps) {
  const [doShowMobileNavigationMenu, setMobileNavigationMenu] = React.useState(
    false
  );

  const toggleMobileNavigationMenu = (e: React.SyntheticEvent) => {
    setMobileNavigationMenu(() => !doShowMobileNavigationMenu);
  };

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, viewport-fit=cover"
        />
      </Head>

      <SiteContainer>
        <Header
          navItems={props.config.mainNavigation}
          doShowMobileNavigationMenu={doShowMobileNavigationMenu}
          toggleMobileNavigationMenu={toggleMobileNavigationMenu}
          titleText={props.config.title}
        />
        <Content>{props.children}</Content>

        <Footer
          navItems={props.config.footerNavigation}
          text={props.config.footerText}
        />
      </SiteContainer>
    </>
  );
}

function SiteContainer(props) {
  return (
    <Flex
      direction="column"
      align="center"
      maxW={{ xl: "1200px" }}
      m="0 auto"
      {...props}
    >
      {props.children}
    </Flex>
  );
}
