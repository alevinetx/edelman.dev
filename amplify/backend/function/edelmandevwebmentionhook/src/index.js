"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
aws_sdk_1.default.config.update({ region: process.env.TABLE_REGION });
const dynamodb = new aws_sdk_1.default.DynamoDB.DocumentClient();
let tableName = "edelmandevdynostore";
if (process.env.ENV && process.env.ENV !== "NONE") {
    tableName = tableName + "-" + process.env.ENV;
}
const handler = async (event) => {
    console.log(event);
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "OK",
        }),
    };
};
exports.handler = handler;
