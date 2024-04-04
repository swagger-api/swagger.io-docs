---
title: Cookie Authentication
sidebar:
  order: 6
---

OAS **3** This guide is for OpenAPI 3.0.

## Cookie Authentication

Cookie authentication uses [HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) to authenticate client requests and maintain session information. It works as follows:

1.  The client sends a login request to the server.
2.  On the successful login, the server response includes the [Set-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie) header that contains the cookie name, value, expiry time and some other info. Here is an example that sets the cookie named `JSESSIONID`:

```yaml
Set-Cookie: JSESSIONID=abcde12345; Path=/; HttpOnly
```

3.  The client needs to send this cookie in the `Cookie` header in all subsequent requests to the server.

```yaml
Cookie: JSESSIONID=abcde12345
```

4.  On the logout operation, the server sends back the `Set-Cookie` header that causes the cookie to expire.

**Note:** Cookie authentication is vulnerable to Cross-Site Request Forgeries (CSRF) attacks, so it should be used together with other security measures, such as [CSRF tokens](https://en.wikipedia.org/wiki/Cross-site_request_forgery#Prevention).

**Note for Swagger UI and Swagger Editor users:** Cookie authentication is currently not supported for "try it out" requests due to browser security restrictions. See [this issue](https://github.com/swagger-api/swagger-js/issues/1163) for more information. [SwaggerHub](https://swagger.io/tools/swaggerhub/) does not have this limitation.

### Describing Cookie Authentication

In OpenAPI 3.0 terms, cookie authentication is an [API key](/specification/authentication/api-keys/) that is sent `in: cookie`. For example, authentication via a cookie named `JSESSIONID` is defined as follows:

```yaml
    openapi: 3.0.0
    ...

    # 1) Define the cookie name
    components:
      securitySchemes:
        cookieAuth:         # arbitrary name for the security scheme; will be used in the "security" key later
          type: apiKey
          in: cookie
          name: JSESSIONID  # cookie name

    # 2) Apply cookie auth globally to all operations
    security:
      - cookieAuth: []
```

In this example, cookie authentication is applied globally to the whole API using the `security` key at the root level of the specification. If cookies are required for just a subset of operations, apply `security` on the operation level instead of doing it globally:

```yaml
paths:
  /users:
    get:
      security:
        - cookieAuth: []
      description: Returns a list of users.
      responses:
        "200":
          description: OK
```

Cookie authentication can be combined with other authentication methods as explained in [Using Multiple Authentication Types](/specification/authentication/#multiple).

### Describing the Set-Cookie Header

You may also want to document that your login operation returns the cookie in the `Set-Cookie` header. You can include this information in the `description`, and also define the `Set-Cookie` header in the response `headers`, like so:

```yaml
paths:
  /login:
    post:
      summary: Logs in and returns the authentication  cookie
      requestBody:
        required: true
        description: A JSON object containing the login and password.
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/LoginRequest"
      security: [] # no authentication
      responses:
        "200":
          description: >
            Successfully authenticated.
            The session ID is returned in a cookie named `JSESSIONID`. You need to include this cookie in subsequent requests.
          headers:
            Set-Cookie:
              schema:
                type: string
                example: JSESSIONID=abcde12345; Path=/; HttpOnly
```

Note that the `Set-Cookie` header and `securitySchemes` are not connected in any way, and the `Set-Header` definition is for documentation purposes only.

_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)  
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)_
