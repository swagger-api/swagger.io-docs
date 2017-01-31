# Authentication

Swagger 2.0 lets you define the following authentication types for an API:

* [Basic authentication](basic-authentication.md)

* [API key](api-keys.md) (as a header or a query string parameter)

* [OAuth 2](oauth2.md) common flows (authorization code, implicit, resource owner password credentials, client credentials)

Follow the links above for examples specific to these authentication types, or continue reading to learn how to describe authentication in general.

 

Authentication is described by using the `securityDefinitions` and `security` keywords. You use `securityDefinitions` to define all authentication types supported by the API, then use `security` to apply specific authentication types to the whole API or individual operations.

## Defining Security Schemes

The `securityDefinitions` section is used to define all security schemes (authentication types) supported by the API. It is a name->definition map that maps arbitrary names to the security scheme definitions.

Here the API supports three security schemes named _BasicAuth_, _ApiKeyAuth_ and _OAuth2_, and these names will be used to refer to these security schemes from elsewhere:

``` 
securityDefinitions:
  BasicAuth:
    type: basic
  ApiKeyAuth:
    type: apiKey
    in: header
    name: X-API-Key
  OAuth2:
    type: oauth2
    flow: accessCode
    authorizationUrl: https://example.com/oauth/authorize
    tokenUrl: https://example.com/oauth/token
    scopes:
      read: Grants read access
      write: Grants write access
      admin: Grants read and write access to administrative information
```

Each security scheme can be of `type`:

* `basic` for Basic authentication

* `apiKey` for an API key

* `oauth2` for OAuth 2

Other required properties depend on the security type. For details, check the [Swagger Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#securitySchemeObject) or our examples for [Basic auth](basic-authentication.md), [API keys](api-keys.md) and [OAuth 2](oauth2.md).

## Applying Security Schemes

After you have defined the security schemes in `securityDefinitions`, you can apply them to the whole API or individual operations by adding the `security` section on the root level or operation level, respectively.

When used on the root level, `security` applies the specified security schemes globally to all API operations, unless overridden on the operation level. In the following example, the API calls can be authenticated using either an API key or OAuth 2. The names _ApiKeyAuth_ and _OAuth2_ refer to the security schemes previously defined in `securityDefinitions`.

``` 
security:
  - ApiKeyAuth: []
  - OAuth2: [read, write]
```

Global `security` can be overridden in individual operations to use a different authentication type, different OAuth 2 scopes, or no authentication at all:

``` 
 paths:
  /billing_info:
    get:
      summary: Gets the account billing info
      security:
        - OAuth2: [admin]   # Use OAuth with a different scope
      responses:
        200:
          description: OK
        401:
          description: Not authenticated
        403:
          description: Access token does not have the required scope

  /ping:
    get:
      summary: Checks if the server is running
      security: []   # No security
      responses:
        200:
          description: Server is up and running
        default:
          description: Something is wrong
```

## Using Multiple Authentication Types

Some REST APIs support several authentication types. The `security` section lets you combine the security requirements using logical OR and AND to achieve the desired result.

`security` uses the following logic:

``` 
security:
  - A
  - B

 # A OR B
```

``` 
security:
  - A
    B

 # A AND B
```

``` 
security:
  - A
    B
  - C
    D

 # (A AND B) OR (C AND D)
```

That is, `security` is an array of hashmaps, where each hashmap contain one or more named security schemes. Items in a hashmap are combined using logical AND, and array items are combined using logical OR. Security schemes combined via OR are alternatives -- any one can be used  in the given context. Security schemes combined via AND must be used simultaneously in the same request. 

Here we can use either Basic authentication or an API key:

``` 
security:
  - basicAuth: []
  - apiKey: []
```

Here the API requires a pair of API keys to be included in requests:

``` 
security:
  - apiKey1: []
    apiKey2: []
```

Here we can use either OAuth 2 or a pair of API keys:

``` 
security:
  - oauth2: [scope1, scope2]
  - apiKey1: []
    apiKey2: []
```

The [OAuth 2](oauth2.md) page has examples of assigning different scopes to different operations.

## FAQ

#### What does [] mean in `securitySchemeName: []`?

`[]` is YAML/JSON syntax for an empty array. The Swagger Specification requires that items in the `security` array specify a list of required scopes, as in:

``` 
security:
  - securityA: [scopeA1, scopeA2]
  - securityB: [scopeB1, scopeB2]
```

Scopes are only used with OAuth 2, so the Basic and API key `security` items use an empty array instead.

``` 
security:
  - oauth2: [scope1, scope2]
  - BasicAuth: []
  - ApiKeyAuth: []

```

## Reference

`securityDefinitions`: [https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#securityDefinitionsObject](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#securityDefinitionsObject)

`security`: [https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#securityRequirementObject](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#securityRequirementObject)
