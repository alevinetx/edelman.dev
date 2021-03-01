import * as React from "react";
import { createDataHook } from "next-data-hooks";

const usePageData = createDataHook("Page", async (context) => {
  return {
    msg: "page data",
  };
});

function Page() {
  return <div>Page</div>;
}

Page.dataHooks = [usePageData];

export default Page;
