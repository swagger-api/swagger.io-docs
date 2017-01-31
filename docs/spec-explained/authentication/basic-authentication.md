### Basic Authentication

[Basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication) is a very simple authentication scheme that is built into the HTTP protocol. The client sends HTTP requests with the Authorization header that contains the word `Basi` followed by a space and a base64-encoded string `username:password`. For example, a header containing the credentials `demo` / `p@55w0rd` would be encoded as:

```
Authorization: Basic ZGVtbzpwQDU1dzByZA==
```

**Note:** Because base64 is easily decoded, Basic authentication should only be used together with other security mechanisms such as HTTPS/SSL. 

Basic authentication is easy to define. In the global `securityDefinitions` section, add an entry with `type: basic` and an arbitrary name (in this example - *basicAuth*). Then apply security to the whole API or specific operations by using the `security` section.

```
securityDefinitions:
  basicAuth:
    type: basic

# To apply Basic auth to the whole API:
security:
  - basicAuth: []

paths:
  /something:
    get:
      # To apply Basic auth to an individual operation:
      security:
        - basicAuth: []
      responses:
        200:
          description: OK (successfully authenticated)
```

#### 401 Response

You can also define the 401 "Unauthorized" response returned for requests with missing or incorrect credentials. This response includes the `WWW-Authenticate` header, which you may want to mention.

As with other common responses, the 401 response can be defined in the global `responses` section and referenced from multiple operations.

```
paths:
  /something:
    get:
      ...
      responses:
        ...
        401:
           $ref: "#/responses/UnauthorizedError"
    post:
      ...
      responses:
        ...
        401:
          $ref: "#/responses/UnauthorizedError"
responses:
  UnauthorizedError:
    description: Authentication information is missing or invalid
    headers:
      WWW_Authenticate:
        type: string
```
