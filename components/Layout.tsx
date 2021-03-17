import * as React from "react";
import { SiteConfig, NavigationMenu } from "../lib/schema";
import { Heading, Link, Flex } from "@chakra-ui/react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Content } from "./Content";
import Head from "next/head";

export interface LayoutProps {
  config: SiteConfig;
}

export function Layout(props) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, viewport-fit=cover"
        />
      </Head>

      <SiteContainer>
        <Header title={props.config.title} navItems={props.config.navItems} />
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
