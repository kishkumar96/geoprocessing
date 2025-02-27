import fetch, {
  Headers,
  Request,
  Response,
  RequestInit,
  RequestInfo,
} from "node-fetch";
import https from "node:https";
import http from "node:http";

// Custom agents that force connection to be closed after request complete (no reuse)
// Overcomes Node 19+ change to set keepalive to true and reuse connections
const httpAgent = new http.Agent({ keepAlive: false, maxSockets: Infinity });
const httpsAgent = new https.Agent({ keepAlive: false, maxSockets: Infinity });
const customFetch = async (
  url: URL | RequestInfo,
  init?: RequestInit,
): Promise<Response> => {
  const options = {
    ...init,
    agent: function (_parsedURL) {
      if (_parsedURL.protocol == "http:") {
        return httpAgent;
      } else {
        return httpsAgent;
      }
    },
  };
  return fetch(url, options);
};

// Always polyfill, because of issue with native Node v20 fetch API causing request timeout.  Node v21 and up should be stable, and this polyfill can be removed in the future
if (globalThis) {
  //@ts-expect-error type incompatibility
  globalThis.fetch = customFetch;
  //@ts-expect-error type incompatibility
  globalThis.Headers = Headers;
  //@ts-expect-error type incompatibility
  globalThis.Request = Request;
  //@ts-expect-error type incompatibility
  globalThis.Response = Response;
}

import "abortcontroller-polyfill/dist/polyfill-patch-fetch.js";
