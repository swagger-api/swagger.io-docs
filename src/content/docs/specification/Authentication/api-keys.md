---
title: API Keys
sidebar:
  order: 2
---

OAS **3** This guide is for OpenAPI 3.0. If you use OpenAPI 2.0, see our [OpenAPI 2.0 guide](/docs/specification/2-0/authentication/api-keys/).

## API Keys

Some APIs use API keys for authorization. An API key is a token that a client provides when making API calls. The key can be sent in the query string:

```yaml
GET /something?api_key=abcdef12345
```

or as a request header:

```yaml
    GET /something HTTP/1.1
    X-API-Key: abcdef12345
```

or as a [cookie](https://swagger.io/docs/specification/authentication/cookie-authentication/):

```yaml
    GET /something HTTP/1.1
    Cookie: X-API-KEY=abcdef12345
```

API keys are supposed to be a secret that only the client and server know. Like [Basic authentication](/docs/specification/authentication/basic-authentication/), API key-based authentication is only considered secure if used together with other security mechanisms such as HTTPS/SSL.

### Describing API Keys

In OpenAPI 3.0, API keys are described as follows:

```yaml
    openapi: 3.0.0
    ...

    # 1) Define the key name and location
    components:
      securitySchemes:
        ApiKeyAuth:        # arbitrary name for the security scheme
          type: apiKey
          in: header       # can be "header", "query" or "cookie"
          name: X-API-KEY  # name of the header, query parameter or cookie

    # 2) Apply the API key globally to all operations
    security:
      - ApiKeyAuth: []     # use the same name as under securitySchemes
```

This example defines an API key named `X-API-Key` sent as a request header `X-API-Key: <key>`. The key name _ApiKeyAuth_ is an arbitrary name for the security scheme (not to be confused with the API key name, which is specified by the `name` key). The name _ApiKeyAuth_ is used again in the `security` section to apply this security scheme to the API. **Note:** The `securitySchemes` section alone is not enough; you must also use `security` for the API key to have effect. `security` can also be set on the operation level instead of globally. This is useful if just a subset of the operations need the API key:

```yaml
paths:
  /something:
    get:
      # Operation-specific security:
      security:
        - ApiKeyAuth: []
      responses:
        "200":
          description: OK (successfully authenticated)
```

Note that it is possible to support multiple authorization types in an API. See [Using Multiple Authentication Types](/docs/specification/authentication/#multiple).

### Multiple API Keys

Some APIs use a pair of security keys, say, API Key and App ID. To specify that the keys are used together (as in logical AND), list them in the same array item in the `security` array:

```yaml
components:
  securitySchemes:
    apiKey:
      type: apiKey
      in: header
      name: X-API-KEY
    appId:
      type: apiKey
      in: header
      name: X-APP-ID

security:
  - apiKey: []
    appId: [] # <-- no leading dash (-)
```

Note the difference from:

```yaml
security:
  - apiKey: []
  - appId: []
```

which means either key can be used (as in logical OR). For more examples, see [Using Multiple Authentication Types](/docs/specification/authentication/#multiple).

### 401 Response

You can define the 401 “Unauthorized” response returned for requests with missing or invalid API key. This response includes the `WWW-Authenticate` header, which you may want to mention. As with other common responses, the 401 response can be defined in the global `components/responses` section and referenced elsewhere via `$ref`.

```yaml
    paths:
      /something:
        get:
          ...
          responses:
            ...
            '401':
               $ref: "#/components/responses/UnauthorizedError"
        post:
          ...
          responses:
            ...
            '401':
              $ref: "#/components/responses/UnauthorizedError"

    components:
      responses:
        UnauthorizedError:
          description: API key is missing or invalid
          headers:
            WWW_Authenticate:
              schema:
                type: string
```

To learn more about describing responses, see [Describing Responses](/docs/specification/describing-responses/).

_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)  
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)_
