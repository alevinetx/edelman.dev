import type { AppProps, AppContext } from "next/app";
import sanity from "../lib/sanity-client";
import { studioTheme, ThemeProvider } from "@sanity/ui";
import Amplify, { Analytics } from "aws-amplify";
import awsExports from "../src/aws-exports";
import { useEffect } from "react";
import { NextDataHooksProvider } from "next-data-hooks";
import "../styles/globals.css";

// Amplify.configure({ ...awsExports, ssr: true });

function MyApp({ Component, pageProps }: AppProps) {
  const { children, ...rest } = pageProps;

  return (
    <ThemeProvider theme={studioTheme}>
      <NextDataHooksProvider {...rest}>
        <Component {...rest}>{children}</Component>
      </NextDataHooksProvider>
    </ThemeProvider>
  );
}

export default MyApp;
