---
title: OAuth 2.0
sidebar:
  order: 4
---

:::note
OAS **3** This guide is for OpenAPI 3.0.
:::

[OAuth 2.0](https://oauth.net/2/) is an authorization protocol that gives an API client limited access to user data on a web server. GitHub, Google, and Facebook APIs notably use it. OAuth relies on authentication scenarios called _flows_, which allow the resource owner (user) to share the protected content from the resource server without sharing their credentials. For that purpose, an OAuth 2.0 server issues access tokens that the client applications can use to access protected resources on behalf of the resource owner. For more information about OAuth 2.0, see [oauth.net](https://oauth.net/2) and [RFC 6749](https://tools.ietf.org/html/rfc6749).

### Flows

The _flows_ (also called _grant types_) are scenarios an API client performs to get an access token from the authorization server. OAuth 2.0 provides several flows suitable for different types of API clients:

- **Authorization code** – The most common flow, mostly used for server-side and mobile web applications. This flow is similar to how users sign up into a web application using their Facebook or Google account.
- **Implicit** – This flow requires the client to retrieve an access token directly. It is useful in cases when the user’s credentials cannot be stored in the client code because they can be easily accessed by the third party. It is suitable for web, desktop, and mobile applications that do not include any server component.
- **Resource owner password credentials** (or just **password**) – Requires logging in with a username and password. Since in that case the credentials will be a part of the request, this flow is suitable only for trusted clients (for example, official applications released by the API provider).
- **Client Credentials** – Intended for the server-to-server authentication, this flow describes an approach when the client application acts on its own behalf rather than on behalf of any individual user. In most scenarios, this flow provides the means to allow users specify their credentials in the client application, so it can access the resources under the client’s control.

### Describing OAuth 2.0 Using OpenAPI

To describe an API protected using OAuth 2.0, first, add a security scheme with `type: oauth2` to the global `components/securitySchemes` section. Then add the `security` key to apply security globally or to individual operations:

```yaml
# Step 1 - define the security scheme
components:
  securitySchemes:
    oAuthSample:    # <---- arbitrary name
      type: oauth2
      description: This API uses OAuth 2 with the implicit grant flow. [More info](https://api.example.com/docs/auth)
      flows:
        implicit:   # <---- OAuth flow(authorizationCode, implicit, password or clientCredentials)
          authorizationUrl: https://api.example.com/oauth2/authorize
          scopes:
            read_pets: read your pets
            write_pets: modify pets in your account

# Step 2 - apply security globally...
security:
  - oAuthSample:
    - write_pets
    - read_pets

# ... or to individual operations
paths:
  /pets:
    patch:
      summary: Add a new pet
      security:
        - oAuthSample:
          - write_pets
          - read_pets
      ...
```

The `flows` keyword specifies one or more named flows supported by this OAuth 2.0 scheme. The flow names are:

- `authorizationCode` – Authorization Code flow (previously called `accessCode` in OpenAPI 2.0)
- `implicit` – Implicit flow
- `password` – Resource Owner Password flow
- `clientCredentials` – Client Credentials flow (previously called `application` in OpenAPI 2.0)

The `flows` object can specify multiple flows, but only one of each type. Each flow contains the following information:

<table>
	<thead>
		<tr>
			<th rowspan="2">Field Name</th>
			<th rowspan="2">Description</th>
			<th colspan="4">Applies to flows</th>
		</tr>
		<tr>
			<th><code>authorizationCode</code></th>
			<th><code>implicit</code></th>
			<th><code>password</code></th>
			<th><code>clientCredentials</code></th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>authorizationUrl</code></td>
			<td>The authorization URL to use for this flow. Can be relative to the <a href="/specification/api-host-and-base-path/">API server URL</a>.</td>
			<td>+</td>
			<td>+</td>
			<td>-</td>
			<td>-</td>
		</tr>
		<tr>
			<td><code>tokenUrl</code></td>
			<td>The token URL to use for this flow. Can be relative to the API server URL.</td>
			<td>+</td>
			<td>-</td>
			<td>+</td>
			<td>+</td>
		</tr>
		<tr>
			<td><code>refreshUrl</code></td>
			<td>Optional. The URL to be used for obtaining refresh tokens. Can be relative to the API server URL.</td>
			<td>+</td>
			<td>+</td>
			<td>+</td>
			<td>+</td>
		</tr>
		<tr>
			<td><a href="#scopes-extra"><code>scopes</code></a></td>
			<td>The available scopes for the OAuth2 security scheme. A map between the scope name and a short description for it.</td>
			<td>+</td>
			<td>+</td>
			<td>+</td>
			<td>+</td>
		</tr>
	</tbody>
</table>

### About Scopes

With OpenAPI 3.0, a user can grant scoped access to their account, which can vary depending on the operation the client application wants to perform. Each OAuth access token can be tagged with multiple scopes. Scopes are access rights that control whether the credentials a user provides allow to perform the needed call to the resource server. They do not grant any additional permissions to the client except for those it already has. **Note**: In the _authorization code_ and _implicit_ flows, the requested scopes are listed on the authorization form displayed to the user. To apply the scopes, you need to perform two steps:

1.  Define all supported scopes in your OAuth security definition in the `components/securitySchemes` section:

```yaml
components:
  securitySchemes:
    oAuthSample:
      type: oauth2
      flows:
        implicit:
          authorizationUrl: https://api.example.com/oauth2/authorize
          scopes:
            read_pets: read pets in your account
            write_pets: modify pets in your account
```

2.  List the scopes required by each operation in the `security` section of that operation:

```yaml
paths:
  /pets/{petId}:
    patch:
      summary: Updates a pet in the store
      security:
        - oAuthSample: [write_pets]
      ...
```

If all API operations require the same scopes, you can add `security` on the root level of the API definition instead:

```yaml
security:
  - oAuthSample: [write_pets]
```

#### No Scopes

Scopes are optional, and your API may not use any. In this case, specify an empty object `{}` in the scopes definition, and an empty list of scopes `[]` in the `security` section:

```yaml
components:
  securitySchemes:
    oAuthNoScopes:
      type: oauth2
      flows:
        implicit:
          authorizationUrl: https://api.example.com/oauth2/authorize
          scopes: {} # <-----

security:
  - oAuthNoScopes: [] # <-----
```

### Relative Endpoint URLs

In OpenAPI 3.0, `authorizationUrl`, `tokenUrl` and `refreshUrl` can be specified relative to the [API server URL](/docs/specification/api-host-and-base-path/). This is handy if these endpoints are on same server as the rest of the API operations.

```yaml
servers:
  - url: https://api.example.com/v2

components:
  securitySchemes:
    oauth2sample:
      type: oauth2
      flows:
        authorizationCode:
          authorizationUrl: /oauth/authorize # <-----
          tokenUrl: /oauth/token # <-----
          scopes: ...
```

Relative URLs are resolved according to [RFC 3986](https://tools.ietf.org/html/rfc3986#section-4.2). In the example above, the endpoints will be resolved to:

`authorizationUrl: https://api.example.com/oauth/authorize`

`tokenUrl: https://api.example.com/oauth/token`

### Security Scheme Examples

#### Authorization Code Flow

The `authorization` flow uses `authorizationUrl`, `tokenUrl` and optional `refreshUrl`. Here is an example for [Slack API](https://api.slack.com/docs/oauth):

```yaml
components:
  securitySchemes:
    oAuth2AuthCode:
      type: oauth2
      description: For more information, see https://api.slack.com/docs/oauth
      flows:
        authorizationCode:
          authorizationUrl: https://slack.com/oauth/authorize
          tokenUrl: https://slack.com/api/oauth.access
          scopes:
            users:read: Read user information
            users:write: Modify user information
            im:read: Read messages
            im:write: Write messages
            im:history: Access the message archive
            search:read: Search messages, files, and so on
            # etc.
```

#### Implicit Flow

`implicit` flow defines `authorizationUrl` that is used to obtain the access token from the authorization server. Here is an example:

```yaml
components:
  securitySchemes:
    oAuth2Implicit:
      type: oauth2
      description: For more information, see https://developers.getbase.com/docs/rest/articles/oauth2/requests
      flows:
        implicit:
          authorizationUrl: https://api.getbase.com/oauth2/authorize
          scopes:
            read: Grant read-only access to all your data except for the account and user info
            write: Grant write-only access to all your data except for the account and user info
            profile: Grant read-only access to the account and user info only
```

#### Resource Owner Password Flow

The `password` flow uses `tokenUrl` and optional `refreshUrl`. Here is an example:

```yaml
components:
  securitySchemes:
    oAuth2Password:
      type: oauth2
      description: See https://developers.getbase.com/docs/rest/articles/oauth2/requests
      flows:
        password:
          tokenUrl: https://api.getbase.com/oauth2/token
          scopes:
            read: Grant read-only access to all your data except for the account and user info
            write: Grant write-only access to all your data except for the account and user info
            profile: Grant read-only access to the account and user info only
```

#### Client Credentials Flow

The `clientCredentials` flow uses `tokenUrl` and optional `refreshUrl`. Here is an example for [Getty Images API](http://developers.gettyimages.com/api/docs/v3/oauth2.html):

```yaml
components:
  securitySchemes:
    oAuth2ClientCredentials:
      type: oauth2
      description: See http://developers.gettyimages.com/api/docs/v3/oauth2.html
      flows:
        clientCredentials:
          tokenUrl: https://api.gettyimages.com/oauth2/token/
          scopes: {} # Getty Images does not use scopes
```

#### Multiple Flows

Below is an example of the OAuth 2.0 security definition that supports multiple flows. The clients can use any of these flows.

```yaml
components:
  securitySchemes:
    oAuth2:
      type: oauth2
      description: For more information, see https://developers.getbase.com/docs/rest/articles/oauth2/requests
      flows:
        implicit:
          authorizationUrl: https://api.getbase.com/oauth2/authorize
          scopes:
            read: Grant read-only access to all your data except for the account and user info
            write: Grant write-only access to all your data except for the account and user info
            profile: Grant read-only access to the account and user info only
        password:
          tokenUrl: https://api.getbase.com/oauth2/token
          scopes:
            read: Grant read-only access to all your data except for the account and user info
            write: Grant write-only access to all your data except for the account and user info
            profile: Grant read-only access to the account and user info only
```

### Frequently Asked Questions

**Should I additionally define `authorizationUrl` and `tokenUrl` as API operations?**

`authorizationUrl` is not an API endpoint but a special web page that requires user input. So, it cannot be described using OpenAPI. Still, you can describe `tokenUrl` if you need it.

**Should `authorizationUrl` and `tokenUrl` include query string parameters, such as `grant_type`, `client_id` and others?**

The OpenAPI Specification does not state this, so it is up to you and the tools you use.

_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)_
