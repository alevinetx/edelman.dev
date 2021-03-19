import { createDataHook } from "next-data-hooks";
import sanity from "../../../lib/sanity-client";

import {
  useGlobalNavigation,
  useSiteSettings,
} from "../../../hooks/siteSettings";
import * as DataHooks from "../../../hooks";

function BlogIndex() {
  const posts = DataHooks.useBlogPosts();

  return <div>hmm blogs</div>;
}

BlogIndex.dataHooks = [
  DataHooks.useBlogPosts,
  DataHooks.useGlobalNavigation,
  DataHooks.useSiteSettings,
  DataHooks.usePageData,
];

export default BlogIndex;
