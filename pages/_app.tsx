import type { AppProps, AppContext } from "next/app";
import sanity from "../lib/sanity-client";
import { ChakraProvider } from "@chakra-ui/react";
import Amplify, { Analytics } from "aws-amplify";
import awsExports from "../src/aws-exports";
import { useEffect } from "react";
import { NextDataHooksProvider } from "next-data-hooks";
import "../styles/globals.css";
import { init } from "../lib/sentry";
import theme from "../lib/theme";
// Amplify.configure({ ...awsExports, ssr: true });

init();

function MyApp({ Component, pageProps }: AppProps) {
  const { children, ...rest } = pageProps;

  return (
    <NextDataHooksProvider {...rest}>
      <ChakraProvider theme={theme}>
        <Component {...rest}>{children}</Component>
      </ChakraProvider>
    </NextDataHooksProvider>
  );
}

export default MyApp;
