import type { NextApiRequest, NextApiResponse } from "next";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../src/graphql/mutations";
import sanity from "../../lib/sanity-client";
import Cors from "cors";
import * as Sentry from "@sentry/node";

import cfg from "../../src/aws-exports";
import { WebMentionType, CreateWebMentionEventInput } from "../../src/API";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  // enabled: process.env.NODE_ENV !== "development",
  enabled: true,
  release: process.env.NEXT_PUBLIC_COMMIT_SHA,
  tracesSampleRate: 1.0,
  integrations: [new Sentry.Integrations.Http({ tracing: true })],
});

Amplify.configure(cfg);

type WebMentionProperty =
  | "repost-of"
  | "in-reply-to"
  | "like-of"
  | "bookmark-of"
  | "mention-of"
  | "rsvp";

export type WebMentionEvent = {
  secret: string;
  source: string;
  target: string;
  post: {
    type: string;
    author: {
      name: string;
      photo: string;
      url: string;
    };
    url: string;
    published: string;
    name: string;
    "wm-property": WebMentionProperty;
  };
};

type NextApiRequestWithWebMentionEvent = NextApiRequest & WebMentionEvent;

const cors = Cors({
  methods: ["POST"],
});

function runMiddleware(
  req: NextApiRequestWithWebMentionEvent,
  res: NextApiResponse,
  fn: any
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

function getWebMentionType(t: WebMentionProperty): WebMentionType {
  switch (t) {
    case "bookmark-of":
      return WebMentionType.BookmarkOf;
    case "in-reply-to":
      return WebMentionType.InReplyTo;
    case "like-of":
      return WebMentionType.LikeOf;
    case "mention-of":
      return WebMentionType.MentionOf;
    case "repost-of":
      return WebMentionType.RepostOf;
    case "rsvp":
      return WebMentionType.RSVP;
    default:
      throw new Error(`No WebMention type for type ${t}`);
  }
}

async function handleBlogPostWebMention(event: WebMentionEvent, slug: string) {
  const [res] = await sanity.query(
    `*[slug.current == "${slug}"]{_id, title, _type}`
  );
  if (!res) throw new Error(`Could not find sanity resource for slug ${slug}`);

  const sanityId = res._id as string;

  const input: CreateWebMentionEventInput & { targetType: string } = {
    targetId: sanityId,
    targetName: res.title,
    targetSlug: slug,
    targetType: res._type,
    type: getWebMentionType(event.post["wm-property"]),
    secret: event.secret,
    source: event.source,
    target: event.target,
    postType: event.post.type,
    postUrl: event.post.url,
    authorName: event.post.author.name,
    authorPhoto: event.post.author.photo,
    authorUrl: event.post.author.url,
    published: event.post.published,
    name: event.post.name,
  };
  await API.graphql(
    graphqlOperation(mutations.createWebMentionEvent, { input })
  );
}

async function persistEvent(
  req: NextApiRequestWithWebMentionEvent,
  res: NextApiResponse
) {
  const { body } = req;
  // console.log(body);

  const targetUrl = new URL(body.target);

  const pathnameParts = targetUrl.pathname
    .slice(1, targetUrl.pathname.length)
    .split("/");

  if (pathnameParts[0] === "blog") {
    await handleBlogPostWebMention(body, pathnameParts[1]);
  }
}

export default async (
  req: NextApiRequestWithWebMentionEvent,
  res: NextApiResponse
) => {
  try {
    console.log("Incoming Request", req);
    await runMiddleware(req, res, Sentry.Handlers.requestHandler());
    await runMiddleware(req, res, Sentry.Handlers.tracingHandler());
    await runMiddleware(req, res, cors);

    await persistEvent(req, res);

    return res.json({ result: "Webmention was successful" });
    // await Sentry.flush(2000);
  } catch (err) {
    Sentry.captureException(err);
    await Sentry.flush(2000);
    throw err;
  }
};
