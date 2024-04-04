---
title: API Server and Base Path
sidebar:
  order: 3
---

:::note
OAS **3** This page is about OpenAPI 3.0. If you use OpenAPI 2.0, see the [OpenAPI 2.0 guide](/specification/20/api-host-and-base-path/).
:::

## API Server and Base URL

All API endpoints are relative to the base URL. For example, assuming the base URL of `https://api.example.com/v1`, the `/users` endpoint refers to `https://api.example.com/v1/users`.

```yaml
https://api.example.com/v1/users?role=admin&status=active
\________________________/\____/ \______________________/
server URL       endpoint    query parameters
path
```

In OpenAPI 3.0, you use the `servers` array to specify one or more base URLs for your API. `servers` replaces the `host`, `basePath` and `schemes` keywords used in OpenAPI 2.0. Each server has an `url` and an optional Markdown-formatted `description`.

```yaml
    servers:
      - url: https://api.example.com/v1    # The "url: " prefix is required
```

You can also have multiple servers, for example, production and sandbox:

```yaml
servers:
  - url: https://api.example.com/v1
    description: Production server (uses live data)
  - url: https://sandbox-api.example.com:8443/v1
    description: Sandbox server (uses test data)
```

### Server URL Format

Server URL format follows [RFC 3986](https://tools.ietf.org/html/rfc3986) and usually looks like this:

```yaml
scheme://host[:port][/path]
```

The host can be a name or IP address (IPv4 or IPv6). WebSocket schemes _ws://_ and _wss://_ from OpenAPI 2.0 are also supported in OpenAPI 3.0. Examples of valid server URLs:

```yaml
https://api.example.com
https://api.example.com:8443/v1/reports
http://localhost:3025/v1
http://10.0.81.36/v1
ws://api.example.com/v1
wss://api.example.com/v1
/v1/reports
/
//api.example.com
```

If the server URL is relative, it is resolved against the server where the given OpenAPI definition file is hosted (more on that [below](#relative-urls)). **Note:** Server URL must not include query string parameters. For example, this is invalid:

```yaml
https://api.example.com/v1?route=
```

If the `servers` array is not provided or is empty, the server URL defaults to `/`:

```yaml
servers:
  - url: /
```

### Server Templating

Any part of the server URL – scheme, host name or its parts, port, subpath – can be parameterized using variables. Variables are indicated by {curly braces} in the server url, like so:

```yaml
    servers:
      - url: https://{customerId}.saas-app.com:{port}/v2
        variables:
          customerId:
            default: demo
            description: Customer ID assigned by the service provider
          port:
            enum:
              - '443'
              - '8443'
            default: '443'
```

Unlike [path parameters](/specification/describing-parameters/#path), server variables do not use a `schema`. Instead, they are assumed to be strings. Variables can have arbitrary values, or may be restricted to an `enum`. In any case, a `default` value is required, which will be used if the client does not supply a value. Variable `description` is optional, but useful to have and supports Markdown ([CommonMark](http://commonmark.org/help/)) for rich text formatting. Common use cases for server templating:

- Specifying multiple protocols (such as HTTP vs HTTPS).
- SaaS (hosted) applications where each customer has their own subdomain.
- Regional servers in different geographical regions (example: Amazon Web Services).
- Single API definition for SaaS and on-premise APIs.

#### Examples

##### HTTPS and HTTP

```yaml
    servers:
      - url: http://api.example.com
      - url: https://api.example.com
```

Or using templating:

```yaml
    servers:
      - url: '{protocol}://api.example.com'
        variables:
          protocol:
            enum:
              - http
              - https
            default: https
```

**Note:** These two examples are semantically different. The second example explicitly sets the HTTPS server as `default`, whereas the first example does not have a default server.

##### Production, Development and Staging

```yaml
    servers:
      - url: https://{environment}.example.com/v2
        variables:
          environment:
            default: api    # Production server
            enum:
              - api         # Production server
              - api.dev     # Development server
              - api.staging # Staging server
```

##### SaaS and On-Premise

````yaml
    servers:
      - url: '{server}/v1'
        variables:
          server:
            default: https://api.example.com  # SaaS server
    ```

##### Regional Endpoints for Different Geographical Areas
```yaml
    servers:
      - url: https://{region}.api.cognitive.microsoft.com
        variables:
          region:
            default: westus
            enum:
              - westus
              - eastus2
              - westcentralus
              - westeurope
              - southeastasia
````

### Overriding Servers

The global `servers` array can be overridden on the path level or operation level. This is handy if some endpoints use a different server or base path than the rest of the API. Common examples are:

- Different base URL for file upload and download operations,
- Deprecated but still functional endpoints.

```yaml
  servers:
    - url: https://api.example.com/v1

  paths:
    /files:
      description: File upload and download operations
      servers:
        - url: https://files.example.com
          description: Override base path for all operations with the /files path
      ...

  /ping:
      get:
        servers:
          - url: https://echo.example.com
            description: Override base path for the GET /ping operation
```

### Relative URLs

The URLs in the `servers` array can be relative, such as `/v2`. In this case, the URL is resolved against the server that hosts the given OpenAPI definition. This is useful in on-premises installations hosted on your customer’s own servers. For example, if the definition hosted at `http://localhost:3001/openapi.yaml` specifies `url: /v2`, the `url` is resolved to `http://localhost:3001/v2`. Relative URL resolution rules follow [RFC 3986](https://tools.ietf.org/html/rfc3986). Moreover, almost all other URLs in an API definition, including OAuth 2 flow endpoints, `termsOfService`, external documentation URL and others, can be specified relative to the server URL.

```yaml
    servers:
      - url: https://api.example.com
      - url: https://sandbox-api.example.com

    # Relative URL to Terms of Service
    info:
      version: 0.0.0
      title: test
      termsOfService: /terms-of-use

    # Relative URL to external documentation
    externalDocs:
      url: /docs
      description: Find more info here

    # Relative URLs to OAuth2 authorization and token URLs
    components:
      securitySchemes:
        oauth2:
          type: oauth2
          flows:
            authorizationCode:
              authorizationUrl: /oauth/dialog
              tokenUrl: /oauth/token
```

Note that if using multiple servers, the resources specified by relative URLs are expected to exist on all servers.

### References

[Server Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#server-object)

[Relative References in URLs](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#relativeReferences)

_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)_

```

```
