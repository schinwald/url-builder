export type URLBuilderOptions = {
  /**
   * @description The base of the URL
   * @example 'https://www.example.com'
   */
  base: string | {
    /**
     * @description The authentication credential(s) https://authentication@www.example.com
     */
    authentication?: {
      /**
       * @description The username to authenticate the user https://username@password@www.example.com
       * @example 'username'
       */
      username: string

      /**
       * @description The password to authenticate the user https://username:password@www.example.com
       * @example 'password'
       */
      password?: string
    }

    /**
     * @description The scheme/protocol of the URL
     * @example 'https'
     */
    scheme: string

    /**
     * @description The domains of the URL (sub-domain, domain, and top level domain)
     * @example 'www.example.com'
     */
    domains: string
    
    /**
     * @description The port of the URL
     * @example 3000
     * 
     * @default Depends on the scheme:
     * 
     * http     ->   80
     * https    ->  443
     */
    port?: number
  }

  /**
   * @description The path of the URL https://www.example.com/path/to/resource
   * @example '/path/to/resource'
   * 
   * @default '/''
   */
  path?: string

  /**
   * @description The query of the URL https://www.example.com?query=value
   * @example { query: value }
   */
  query?: Record<string, string>

  /**
   * @description The fragment of the URL https://www.example.com#fragment
   * @example 'fragment'
   */
  fragment?: string
}

const hiddenPorts = new Set([
  'http:80',
  'https:443'
])

/**
 * @description Checks if a port is hidden
 * @param port a port number or undefined
 * @returns a boolean
 */
function isHiddenPort (schema: string, port?: number): boolean {
  if (typeof port === 'undefined') return false
  return hiddenPorts.has(`${schema}:${port}`)
}

/**
 * @description Builds a URL string
 * @param url an object of URL parameters
 * @returns a URL string
 */
export function URLBuilder (url: URLBuilderOptions): string {
  let firstHalf: string
  let secondHalf: string
  
  /** 
   * Generate the first half of the URL
   */

  switch (typeof url.base) {
    // Extract base URL from string
    case 'string':
      firstHalf = url.base
      break
    // Extract base URL from object
    case 'object':
      const scheme = url.base.scheme
      const domains = url.base.domains
      const port = url.base.port
        ? !isHiddenPort(url.base.scheme, url.base.port)
          ? `:${url.base.port}`
          : ''
        : ''

      // Handle authentication
      const username = url.base.authentication?.username
      const password = url.base.authentication?.password
      const authentication = typeof username !== 'undefined'
        ? typeof password !== 'undefined'
          ? `${username}:${password}@`
          : `${username}@`
        : ''

      firstHalf = `${scheme}://${authentication}${domains}${port}`
      break
  }

  /**
   * Generate the second half of the URL
   */

  const path = typeof url.path !== 'undefined'
    ? url.path
    : ''
  
  const query = typeof url.query !== 'undefined'
    ? `?${new URLSearchParams(url.query).toString()}`
    : ''

  const fragment = typeof url.fragment !== 'undefined'
    ? `#${url.fragment}`
    : ''

  secondHalf = `${path}${query}${fragment}`

  // Combine both halves of the URL
  return `${firstHalf}${secondHalf}`
}