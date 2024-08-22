---
title: OpenID Connect Discovery
sidebar:
  order: 5
---

:::note
OAS **3** This guide is for OpenAPI 3.0.
:::

[**OpenID Connect (OIDC)**](http://openid.net/connect/) is an identity layer built on top of the [OAuth 2.0](/specification/authentication/oauth2/) protocol and supported by some OAuth 2.0 providers, such as Google and Azure Active Directory. It defines a sign-in flow that enables a client application to authenticate a user, and to obtain information (or "claims") about that user, such as the user name, email, and so on. User identity information is encoded in a secure JSON Web Token (JWT), called ID token. OpenID Connect defines a discovery mechanism, called [**OpenID Connect Discovery**](https://openid.net/specs/openid-connect-discovery-1_0.html), where an OpenID server publishes its metadata at a well-known URL, typically

`https://server.com/.well-known/openid-configuration`

This URL returns a JSON listing of the OpenID/OAuth endpoints, supported scopes and claims, public keys used to sign the tokens, and other details. The clients can use this information to construct a request to the OpenID server. The field names and values are defined in the [OpenID Connect Discovery Specification](https://openid.net/specs/openid-connect-discovery-1_0.html). Here is an example of data returned:

```json
{
  "issuer": "https://example.com/",
  "authorization_endpoint": "https://example.com/authorize",
  "token_endpoint": "https://example.com/token",
  "userinfo_endpoint": "https://example.com/userinfo",
  "jwks_uri": "https://example.com/.well-known/jwks.json",
  "scopes_supported": ["pets_read", "pets_write", "admin"],
  "response_types_supported": ["code", "id_token", "token id_token"],
  "token_endpoint_auth_methods_supported": ["client_secret_basic"],
  ...,
}
```

### Describing OpenID Connect Discovery

OpenAPI 3.0 lets you describe OpenID Connect Discovery as follows:

```yaml
openapi: 3.0.0
---
# 1) Define the security scheme type and attributes
components:
  securitySchemes:
    openId: # <--- Arbitrary name for the security scheme. Used to refer to it from elsewhere.
      type: openIdConnect
      openIdConnectUrl: https://example.com/.well-known/openid-configuration

# 2) Apply security globally to all operations
security:
  - openId: # <--- Use the same name as specified in securitySchemes
      - pets_read
      - pets_write
      - admin
```

The first section, `components/securitySchemes`, defines the security scheme type (`openIdConnect`) and the URL of the discovery endpoint (`openIdConnectUrl`). Unlike OAuth 2.0, you do not need to list the available scopes in `securitySchemes` – the clients are supposed to read them from the discovery endpoint instead. The `security` section then applies the chosen security scheme to your API. The actual scopes required for API calls need to be listed here. These may be a subset of the scopes returned by the discovery endpoint. If different API operations require different scopes, you can apply `security` on the operation level instead of globally. This way you can list the relevant scopes for each operation:

```yaml
paths:
  /pets/{petId}:
    get:
      summary: Get a pet by ID
      security:
        - openId:
          - pets_read
      ...

    delete:
      summary: Delete a pet by ID
      security:
        - openId:
          - pets_write
      ...
```

### Relative Discovery URL

`openIdConnectUrl` can be specified relative to the [server URL](/specification/api-host-and-base-path/), like so:

```yaml
servers:
  - url: https://api.example.com/v2
```

```yaml
components:
  securitySchemes:
    openId:
      type: openIdConnect
      openIdConnectUrl: /.well-known/openid-configuration
```

Relative URLs are resolved according to [RFC 3986](https://tools.ietf.org/html/rfc3986#section-4.2). In the example above, it will be resolved to _https://api.example.com/.well-known/openid-configuration_.

### Swagger UI support

Support for OpenID Connect Discovery was added in Swagger UI v. 3.38.0 and Swagger Editor 3.14.8.

_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)  
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)_
