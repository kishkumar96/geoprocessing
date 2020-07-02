//@ts-nocheck
// Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License
//import { DynamoDB, ApiGatewayManagementApi } from "aws-sdk";
//import { AWS } from "aws-sdk";
exports.sendHandler = async function (event, context) {
  console.warn("trying to send a message...");
  let AWS = require("aws-sdk");
  let connectionData;
  console.info("trying to send now!!!! ", event.body);
  if (process.env.SOCKETS_TABLE) {
    try {
      //@ts-ignore
      ddb = new AWS.DynamoDB.DocumentClient({
        apiVersion: "2012-08-10",
        region: process.env.AWS_REGION,
      });
      //@ts-ignore
      connectionData = await ddb
        .scan({
          TableName: process.env.SOCKETS_TABLE,
          ProjectionExpression: "connectionId",
        })
        .promise();
    } catch (e) {
      return { statusCode: 500, body: "PROBLEM::::::" + e.stack };
    }
    console.info("opening gateway management");
    const apigwManagementApi = new AWS.ApiGatewayManagementApi({
      apiVersion: "2018-11-29",

      endpoint:
        event.requestContext.domainName + "/" + event.requestContext.stage,
    });
    if (event.body) {
      console.info("parsing body data...>>>> ", event.body);
      const postData = JSON.parse(event.body).data;
      console.info("sending message now:::: ", postData);
      //@ts-ignore
      const postCalls = connectionData?.Items?.map(async ({ connectionId }) => {
        try {
          await apigwManagementApi
            .postToConnection({ ConnectionId: connectionId, Data: postData })
            .promise();
        } catch (e) {
          if (e.statusCode === 410) {
            console.log(`Found stale connection, deleting ${connectionId}`);
            //@ts-ignore
            await ddb
              .delete({
                //@ts-ignore
                TableName: process.env.SOCKETS_TABLE,
                Key: { connectionId },
              })
              .promise();
          } else {
            throw e;
          }
        }
      });
      if (postCalls) {
        try {
          //@ts-ignore
          //TODO: check this, why is it unhappy with postCalls
          await Promise.all(postCalls);
        } catch (e) {
          return { statusCode: 500, body: e.stack };
        }
      }
    }

    return {
      statusCode: 200,
      body: "Data sent: " + JSON.parse(event.body).data,
    };
  } else {
    console.info("no table name in env for send... ");
    return { statusCode: 500, body: "No table name in env" };
  }
};
