import { createClient } from "sanity-codegen";
import { Documents } from "./schema";
import fetch from "node-fetch";
export default createClient<Documents>({
  // Note: these are useful to pull from environment variables
  // (required) your sanity project id
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  // (required) your sanity dataset
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  // (required) the fetch implementation to use
  fetch: fetch,
  //
  // (optional) if true, the client will prefer drafts over the published versions
  previewMode: false,
  // (optional) only required if your dataset is private or if you want to use preview mode
  token: process.env.SANITY_API_TOKEN,
  //
  // (optional) enables the usage of `apicdn.sanity.io`. this is recommended
  // if you plan on using this in browsers. don't use this with preview mode
  // see here: https://www.sanity.io/docs/api-cdn
  // useCdn: true,
});
