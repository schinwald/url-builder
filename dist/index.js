// src/index.ts
function URLBuilder(url) {
  if (url.endpoint !== undefined && url.endpoint.length > 0) {
    url.endpoint = url.endpoint[0] === "/" ? url.endpoint.slice(1) : url.endpoint;
  }
  if (url.scheme === "http" && url.port === 80)
    url.port = undefined;
  if (url.scheme === "https" && url.port === 443)
    url.port = undefined;
  let build = "";
  if (url.scheme !== undefined)
    build += url.scheme + "://";
  if (url.username !== undefined && url.password !== undefined)
    build += url.username + ":" + url.password + "@";
  build += url.hostname;
  if (url.port !== undefined)
    build += ":" + url.port.toString();
  if (url.endpoint !== undefined)
    build += "/" + url.endpoint;
  return build;
}
export {
  URLBuilder
};
