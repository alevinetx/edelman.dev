import AWS from "aws-sdk";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "edelmandevdynostore";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV;
}

type WebMentionType =
  | "repost-of"
  | "in-reply-to"
  | "like-of"
  | "rsvp"
  | "bookmark-of";

type WebHookPostPayload = {
  type: string;
  author: {
    name: string;
  };
};

type WebHookPayload = {
  secret: string;
  source: string;
  target: string;
  post?: WebHookPostPayload;
  url?: string;
  published?: string;
  name?: string;
  "wm-property"?: WebMentionType;
};

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  console.log(event);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "OK",
    }),
  };
};
