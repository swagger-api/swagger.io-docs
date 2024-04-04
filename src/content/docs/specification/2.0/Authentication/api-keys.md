---
title: API Keys
sidebar:
  order: 2
---

OAS **2** This page applies to OpenAPI Specification ver. 2 (fka Swagger). To learn about the latest version, visit [OpenAPI 3 pages](/specification/authentication/api-keys/).

### API Keys

Some APIs use API keys for authorization. An API key is a special token that the client needs to provide when making API calls. The key is usually sent as a request header:

    GET /something HTTP/1.1
    X-API-Key: abcdef12345

or as a query parameter:

    GET /something?api_key=abcdef12345

API keys are supposed to be a secret that only the client and server know. But, as well as Basic authentication, API key-based authentication is not considered secure unless used together with other security mechanisms such as HTTPS/SSL.

To define API key-based security:

- Add an entry with `type: apiKey` in the global `securityDefinitions` section. The entry name can be arbitrary (such as _APIKeyHeader_ in the example below) and is used to refer to this security definition from other parts of the spec.
- Specify whether the API key will be passed `in: header` or `in: query`.
- Specify a `name` for that parameter or header.

  securityDefinitions:

  # X-API-Key: abcdef12345

  APIKeyHeader:
  type: apiKey
  in: header
  name: X-API-Key

  # /path?api_key=abcdef12345

  APIKeyQueryParam:
  type: apiKey
  in: query
  name: api_key

Then, use the `security` section on the root level or operation level to apply API keys to the whole API or specific operations.

    # Global security (applies to all operations):
    security:
      - APIKeyHeader: []
    paths:
      /something:
        get:
          # Operation-specific security:
          security:
            - APIKeyQueryParam: []
          responses:
            200:
              description: OK (successfully authenticated)

Note that it is possible to support multiple authorization types in an API. See [Using Multiple Authentication Types](/specification/20/authentication/#multiple).

### Pair of API Keys

Some APIs use a pair of security keys, say, API Key and App ID. To specify that the keys are used together (as in logical AND), list them in the same array item in the `security` array:

    securityDefinitions:
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
        appId: []

Note the difference from:

    security:
      - apiKey: []
      - appId: []

which means either key can be used (as in logical OR). For more examples, see [Using Multiple Authentication Types](/specification/20/authentication/#multiple).

### 401 Response

You can also define the 401 "Unauthorized" response returned for requests with missing or invalid API key. This response includes the `WWW-Authenticate` header, which you may want to mention. As with other common responses, the 401 response can be defined in the global `responses` section and referenced from multiple operations.

    paths:
      /something:
        get:
          ...
          responses:
            ...
            401:
               $ref: '#/responses/UnauthorizedError'
        post:
          ...
          responses:
            ...
            401:
              $ref: '#/responses/UnauthorizedError'
    responses:
      UnauthorizedError:
        description: API key is missing or invalid
        headers:
          WWW_Authenticate:
            type: string

_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)  
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)_
