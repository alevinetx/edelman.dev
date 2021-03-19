import * as React from "react";
import { SiteConfig } from "../lib/schema";
import { Flex } from "@chakra-ui/react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Content } from "./Content";
import { useGlobalNavigation, useSiteSettings } from "../hooks/siteSettings";

export interface LayoutProps {
  config?: SiteConfig;
  children: React.ReactNode;
  headerTitle?: string;
}

function getHeaderTitle(site: string, page?: string) {
  if (page) {
    return `${site}`;
  }
  return site;
}

export function Layout(props: LayoutProps) {
  const globalNavigation = useGlobalNavigation();
  const settings = useSiteSettings();

  const [doShowMobileNavigationMenu, setMobileNavigationMenu] = React.useState(
    false
  );

  const toggleMobileNavigationMenu = (e: React.SyntheticEvent) => {
    setMobileNavigationMenu(() => !doShowMobileNavigationMenu);
  };

  return (
    <>
      <SiteContainer>
        <Header
          navItems={globalNavigation}
          doShowMobileNavigationMenu={doShowMobileNavigationMenu}
          toggleMobileNavigationMenu={toggleMobileNavigationMenu}
          titleText={getHeaderTitle(settings.title, props.headerTitle)}
        />
        <Content>{props.children}</Content>

        <Footer
          navItems={settings.footerNavigation}
          text={settings.footerText}
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
      m="0 auto"
      minHeight={"100vh"}
      {...props}
    >
      {props.children}
    </Flex>
  );
}
