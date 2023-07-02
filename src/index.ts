export interface URL {
  scheme?: string
  username?: string
  password?: string
  hostname: string
  port?: number
  endpoint?: string
}

/**
 * Builds a URL string from a URL object
 * @param url an object of URL parameters
 * @returns a URL string
 */
export function URLBuilder (url: URL): string {
  // Remove beginning forward slash from endpoint if there is one
  if (url.endpoint !== undefined && url.endpoint.length > 0) {
    url.endpoint = url.endpoint[0] === '/' ? url.endpoint.slice(1) : url.endpoint
  }

  // Remove port if scheme is http and port is 80
  if (url.scheme === 'http' && url.port === 80) url.port = undefined

  // Remove port if scheme is https and port is 443
  if (url.scheme === 'https' && url.port === 443) url.port = undefined

  let build = ''

  // Build URL string
  if (url.scheme !== undefined) build += url.scheme + '://'
  if (url.username !== undefined && url.password !== undefined) build += url.username + ':' + url.password + '@'
  build += url.hostname
  if (url.port !== undefined) build += ':' + url.port.toString()
  if (url.endpoint !== undefined) build += '/' + url.endpoint

  return build
}

