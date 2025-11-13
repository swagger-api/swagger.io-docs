---
title: Basic Authentication
sidebar:
  order: 1
---

:::note
OAS **3** This guide is for OpenAPI 3.0. If you use OpenAPI 2.0, see our [OpenAPI 2.0 guide](/docs/specification/v2_0/authentication/basic-authentication/).
:::

[Basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication) is a simple authentication scheme built into the HTTP protocol. The client sends HTTP requests with the `Authorization` header that contains the word `Basic` followed by a space and a base64-encoded string `username:password`. For example, to authorize as `demo / p@55w0rd` the client would send

```yaml
Authorization: Basic ZGVtbzpwQDU1dzByZA==
```

**Note:** Because base64 is easily decoded, Basic authentication should only be used together with other security mechanisms such as HTTPS/SSL.

### Describing Basic Authentication

Using OpenAPI 3.0, you can describe Basic authentication as follows:

```yaml
openapi: 3.0.4
---
components:
  securitySchemes:
    basicAuth: # <-- arbitrary name for the security scheme
      type: http
      scheme: basic

security:
  - basicAuth: [] # <-- use the same name here
```

The first section, `securitySchemes`, defines a security scheme named _basicAuth_ (an arbitrary name). This scheme must have `type: http` and `scheme: basic`. The `security` section then applies Basic authentication to the entire API. The square brackets `[]` denote the security scopes used; the list is empty because Basic authentication does not use scopes. `security` can be set globally (as in the example above) or on the operation level. The latter is useful if only a subset of operations require Basic authentication:

```yaml
paths:
  /something:
    get:
      security:
        - basicAuth: []
```

Basic authentication can also be combined with other authentication methods as explained in [Using Multiple Authentication Types](/docs/specification/authentication/#multiple).

### 401 Response

You can also define the 401 “Unauthorized” response returned for requests with missing or incorrect credentials. This response includes the `WWW-Authenticate` header, which you may want to mention. As with other common responses, the 401 response can be defined in the global `components/responses` section and referenced elsewhere via `$ref`.

```yaml
paths:
  /something:
    get:
      ...
      responses:
        ...
        '401':
            $ref: '#/components/responses/UnauthorizedError'
    post:
      ...
      responses:
        ...
        '401':
          $ref: '#/components/responses/UnauthorizedError'
...
components:
  responses:
    UnauthorizedError:
      description: Authentication information is missing or invalid
      headers:
        WWW_Authenticate:
          schema:
            type: string
```

To learn more about the `responses` syntax, see [Describing Responses](/docs/specification/describing-responses/).

_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)  
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)_
