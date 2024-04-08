---
title: Authentication
sidebar:
  order: 12
---

:::note
OAS **3** This guide is for OpenAPI 3.0. If you use OpenAPI 2.0, see our [OpenAPI 2.0 guide](/specification/20/authentication/).
:::

OpenAPI uses the term **security scheme** for authentication and authorization schemes. OpenAPI 3.0 lets you describe APIs protected using the following security schemes:

- HTTP authentication schemes (they use the `Authorization` header):
  - [Basic](/specification/authentication/basic-authentication/)
  - [Bearer](/specification/authentication/bearer-authentication/)
  - other HTTP schemes as defined by [RFC 7235](https://tools.ietf.org/html/rfc7235) and [HTTP Authentication Scheme Registry](https://www.iana.org/assignments/http-authschemes/http-authschemes.xhtml)
- [API keys](/specification/authentication/api-keys/) in headers, query string or cookies
  - [Cookie authentication](/specification/authentication/cookie-authentication/)
- [OAuth 2](/specification/authentication/oauth2/)
- [OpenID Connect Discovery](/specification/authentication/openid-connect-discovery/)

Follow the links above for the guides on specific security types, or continue reading to learn how to describe security in general.

### Changes from OpenAPI 2.0

If you used OpenAPI 2.0 before, here is a summary of changes to help you get started with OpenAPI 3.0:

- `securityDefinitions` were renamed to `securitySchemes` and moved inside `components`.
- `type: basic` was replaced with `type: http` and `scheme: basic`.
- The new `type: http` is an umbrella type for all HTTP security schemes, including Basic, Bearer and other, and the `scheme` keyword indicates the scheme type.
- API keys can now be sent `in: cookie`.
- Added support for OpenID Connect Discovery (`type: openIdConnect`).
- OAuth 2 security schemes can now define multiple `flows`.
- OAuth 2 flows were renamed to match the [OAuth 2 Specification](https://tools.ietf.org/html/rfc6749#section-1.3): `accessCode` is now `authorizationCode`, and `application` is now `clientCredentials`.

### Describing Security

Security is described using the `securitySchemes` and `security` keywords. You use `securitySchemes` to define all security schemes your API supports, then use `security` to apply specific schemes to the whole API or individual operations.

#### Step 1. Defining securitySchemes

All security schemes used by the API must be defined in the global `components/securitySchemes` section. This section contains a list of named security schemes, where each scheme can be of `type`:

- `http` – for [Basic](/specification/authentication/basic-authentication/), [Bearer](/specification/authentication/bearer-authentication/) and other HTTP authentications schemes
- `apiKey` – for [API keys](/specification/authentication/api-keys/) and [cookie authentication](/specification/authentication/cookie-authentication/)
- `oauth2` – for [OAuth 2](/specification/authentication/oauth2/)
- `openIdConnect` – for [OpenID Connect Discovery](/specification/authentication/openid-connect-discovery/)

Other required properties for security schemes depend on the `type`. The following example shows how various security schemes are defined. The _BasicAuth_, _BearerAuth_ names and others are arbitrary names that will be used to refer to these definitions from other places in the spec.

```yaml
components:
  securitySchemes:
    BasicAuth:
      type: http
      scheme: basic

    BearerAuth:
      type: http
      scheme: bearer

    ApiKeyAuth:
      type: apiKey
      in: header
      name: X-API-Key

    OpenID:
      type: openIdConnect
      openIdConnectUrl: https://example.com/.well-known/openid-configuration

    OAuth2:
      type: oauth2
      flows:
        authorizationCode:
          authorizationUrl: https://example.com/oauth/authorize
          tokenUrl: https://example.com/oauth/token
          scopes:
            read: Grants read access
            write: Grants write access
            admin: Grants access to admin operations
```

#### Step 2. Applying security

After you have defined the security schemes in the `securitySchemes` section, you can apply them to the whole API or individual operations by adding the `security` section on the root level or operation level, respectively. When used on the root level, `security` applies the specified security schemes globally to all API operations, unless overridden on the operation level. In the following example, the API calls can be authenticated using either an API key or OAuth 2. The _ApiKeyAuth_ and _OAuth2_ names refer to the schemes previously defined in `securitySchemes`.

```yaml
security:
  - ApiKeyAuth: []
  - OAuth2:
      - read
      - write
# The syntax is:
# - scheme name:
#     - scope 1
#     - scope 2
```

For each scheme, you specify a list of security scopes required for API calls (see [below](#scopes)). Scopes are used only for OAuth 2 and OpenID Connect Discovery; other security schemes use an empty array `[]` instead. Global `security` can be overridden in individual operations to use a different authentication type, different OAuth/OpenID scopes, or no authentication at all:

```yaml
paths:
  /billing_info:
    get:
      summary: Gets the account billing info
      security:
        - OAuth2: [admin] # Use OAuth with a different scope
      responses:
        "200":
          description: OK
        "401":
          description: Not authenticated
        "403":
          description: Access token does not have the required scope

  /ping:
    get:
      summary: Checks if the server is running
      security: [] # No security
      responses:
        "200":
          description: Server is up and running
        default:
          description: Something is wrong
```

### Scopes

OAuth 2 and OpenID Connect use _scopes_ to control permissions to various user resources. For example, the scopes for a pet store may include `read_pets`, `write_pets`, `read_orders`, `write_orders`, `admin`. When applying `security`, the entries corresponding to OAuth 2 and OpenID Connect need to specify a list of scopes required for a specific operation (if `security` is used on the operation level) or all API calls (if `security` is used on the root level).

```yaml
security:
  - OAuth2:
      - scope1
      - scope2
  - OpenId:
      - scopeA
      - scopeB
  - BasicAuth: []
```

- In case of OAuth 2, the scopes used in `security` must be previously defined in `securitySchemes`.
- In case of OpenID Connect Discovery, possible scopes are listed in the discovery endpoint specified by `openIdConnectUrl`.
- Other schemes (Basic, Bearer, API keys and others) do not use scopes, so their `security` entries specify an empty array `[]` instead.

Different operations typically require different scopes, such as read vs write vs admin. In this case, you should apply scoped `security` to specific operations instead of doing it globally.

```yaml
    # Instead of this:
    # security:
    #   - OAuth2:
    #       - read
    #       - write

    # Do this:
    paths:
      /users:
        get:
          summary: Get a list of users
          security:
            - OAuth2: [read]     # <------
          ...

        post:
          summary: Add a user
          security:
            - OAuth2: [write]    # <------
          ...
```

### Using Multiple Authentication Types

Some REST APIs support several authentication types. The `security` section lets you combine the security requirements using logical OR and AND to achieve the desired result. `security` uses the following logic:

```yaml
security: # A OR B
  - A
  - B
```

```yaml
security: # A AND B
  - A
    B
```

```yaml
security: # (A AND B) OR (C AND D)
  - A
    B
  - C
    D
```

That is, `security` is an array of hashmaps, where each hashmap contains one or more named security schemes. Items in a hashmap are combined using logical AND, and array items are combined using logical OR. Security schemes combined via OR are alternatives – any one can be used in the given context. Security schemes combined via AND must be used simultaneously in the same request. Here, we can use either Basic authentication or an API key:

```yaml
security:
  - basicAuth: []
  - apiKey: []
```

Here, the API requires a pair of API keys to be included in requests:

```yaml
security:
  - apiKey1: []
    apiKey2: []
```

Here, we can use either OAuth 2 or a pair of API keys:

```yaml
security:
  - oauth2: [scope1, scope2]
  - apiKey1: []
    apiKey2: []
```

### Reference

[Security Scheme Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#securitySchemeObject)

[Security Requirement Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#security-requirement-object)

_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)  
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)_
