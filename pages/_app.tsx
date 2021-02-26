import { studioTheme, ThemeProvider } from "@sanity/ui";
import Amplify, { Analytics } from "aws-amplify";

import awsExports from "../src/aws-exports";
import { useEffect } from "react";

Amplify.configure({ ...awsExports, ssr: true });

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    Analytics.record({ name: "pageView" });
  }, []);

  return (
    <ThemeProvider theme={studioTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
