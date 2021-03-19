import * as React from "react";
import { Flex } from "@chakra-ui/react";
import { SiteConfig, NavigationMenu } from "../lib/schema";

export interface FooterProps {
  navItems: SiteConfig["footerNavigation"];
  text: SiteConfig["footerText"];
}

export function Footer(props: FooterProps) {
  return (
    <FooterContainer>
      {" "}
      <div className="h-card" style={{ display: "none" }}>
        <span className="p-name">Michael Edelman</span>
        <span className="p-honorific-prefix">Mr.</span>
        <span className="p-given-name">Michael</span>
        <abbr className="p-additional-name">J.</abbr>
        <span className="p-family-name">Edelman</span>
        <span className="p-honorific-suffix">J.D.</span>,
        <span className="p-nickname">edelman215</span> (IRC)
        <img
          className="u-photo"
          src="https://cdn.sanity.io/images/1os98t11/production/2fd39fcc1934da93bdd53b23e27634bb2696ee47-400x400.jpg?w=400&fit=clip&auto=format&w=1920"
        />
        <a className="u-url" href="https://edel.monster">
          w
        </a>
        ,
        <a className="u-email" href="mailto:michael@fabulas.io">
          e
        </a>
        <span className="p-locality">Philadelphia</span>,
        <abbr className="p-region" title="Pennsylvania">
          CA
        </abbr>
        ,<span className="p-postal-code">19106</span>
        <div className="p-country-name">U.S.A</div>
        <time className="dt-bday">1982-09-11</time>
        birthday
        {/*<div className="p-category">physicist</div>*/}
        {/*<div className="p-note">First American woman in space.</div>*/}
      </div>
      <a
        href="https://github.com/medelman17"
        rel="me"
        style={{ display: "none" }}
      >
        github.com/medelman17
      </a>
    </FooterContainer>
  );
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
