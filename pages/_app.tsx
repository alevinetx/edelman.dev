import "../styles/globals.css";
import Amplify, { Analytics } from "aws-amplify";
import awsExports from "../src/aws-exports";
import { useEffect } from "react";

Amplify.configure({ ...awsExports, ssr: true });

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    Analytics.record({ name: "pageView" });
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
