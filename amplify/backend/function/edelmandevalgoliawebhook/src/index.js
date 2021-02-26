"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const algoliasearch_1 = __importDefault(require("algoliasearch"));
const client_1 = __importDefault(require("@sanity/client"));
const sanity_algolia_1 = __importStar(require("sanity-algolia"));
const algolia = algoliasearch_1.default((_a = process.env.ALGOLIA_APP_ID) !== null && _a !== void 0 ? _a : "", (_b = process.env.ALGOLIA_API_KEY) !== null && _b !== void 0 ? _b : "");
const sanity = client_1.default({
    projectId: (_c = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) !== null && _c !== void 0 ? _c : "",
    dataset: (_d = process.env.NEXT_PUBLIC_SANITY_DATASET) !== null && _d !== void 0 ? _d : "",
    // If your dataset is private you need to add a read token.
    // You can mint one at https://manage.sanity.io
    token: (_e = process.env.SANITY_ALGOLIA_TOKEN) !== null && _e !== void 0 ? _e : "",
    useCdn: false,
});
const handler = async (event) => {
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
    const sanityAlgolia = sanity_algolia_1.default(
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
    (document) => {
        switch (document._type) {
            case "post":
                return {
                    title: document.title,
                    path: document.slug.current,
                    body: sanity_algolia_1.flattenBlocks(document.body),
                };
            case "article":
                return {
                    title: document.heading,
                    body: sanity_algolia_1.flattenBlocks(document.body),
                    authorNames: document.authors.map((a) => a.name),
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
    (document) => {
        if (document.hasOwnProperty("isHidden")) {
            return !document.isHidden;
        }
        return true;
    });
    return await sanityAlgolia
        .webhookSync(sanity, JSON.parse(event.body))
        .then(() => ({
        statusCode: 200,
        body: JSON.stringify({ message: "OK" }),
    }));
};
exports.handler = handler;
