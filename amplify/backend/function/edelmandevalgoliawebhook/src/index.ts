import algoliasearch from "algoliasearch";
import sanityClient, { SanityDocumentStub } from "@sanity/client";
import indexer, { flattenBlocks } from "sanity-algolia";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { WebhookBody } from "sanity-algolia/dist/types";

const algolia = algoliasearch(
  process.env.ALGOLIA_APP_ID ?? "",
  process.env.ALGOLIA_API_KEY ?? ""
);
const sanity = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "",
  // If your dataset is private you need to add a read token.
  // You can mint one at https://manage.sanity.io
  token: process.env.SANITY_ALGOLIA_TOKEN ?? "",
  useCdn: false,
});

export const handler: APIGatewayProxyHandlerV2<any> = async (event) => {
  console.log(event);

  if (event.headers["content-type"] !== "application/json") {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Bad Request",
      }),
    };
  }

  const algoliaIndex = algolia.initIndex("edelmandev");

  const sanityAlgolia = indexer(
    // The first parameter maps a Sanity document type to its respective Algolia
    // search index. In this example both `post` and `article` Sanity types live
    // in the same Algolia index. Optionally you can also customize how the
    // document is fetched from Sanity by specifying a GROQ projection.
    {
      post: { index: algoliaIndex },
      // For the article document in this example we want to resolve a list of
      // references to authors. We can do this by customizing the projection for
      // the article type. Here we fetch heading, body and a resolved array of
      // author documents.
      article: {
        index: algoliaIndex,
        projection: "{heading, body, authors[]->}",
      },
    },

    // The second parameter is a function that maps from a fetched Sanity document
    // to an Algolia Record. Notice the flattenBlocks method used for extracting the
    // raw string values from portable text in this example.
    (document: SanityDocumentStub) => {
      switch (document._type) {
        case "post":
          return {
            title: document.title,
            path: document.slug.current,
            body: flattenBlocks(document.body),
          };
        case "article":
          return {
            title: document.heading,
            body: flattenBlocks(document.body),
            authorNames: document.authors.map((a: { name: any }) => a.name),
          };
        default:
          throw new Error("You didnt handle a type you declared interest in");
      }
    },
    // Visibility function (optional).
    //
    // The third parameter is an optional visibility function. Returning `true`
    // for a given document here specifies that it should be indexed for search
    // in Algolia. This is handy if for instance a field value on the document
    // decides if it should be indexed or not. This would also be the place to
    // implement any `publishedAt` datetime visibility rules or other custom
    // visibility scheme you may be using.
    (document: SanityDocumentStub) => {
      if (document.hasOwnProperty("isHidden")) {
        return !document.isHidden;
      }
      return true;
    }
  );

  return await sanityAlgolia
    .webhookSync(sanity, JSON.parse(event.body!))
    .then(() => ({
      statusCode: 200,
      body: JSON.stringify({ message: "OK" }),
    }));
};
