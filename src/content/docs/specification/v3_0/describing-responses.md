---
title: Describing Responses
sidebar:
  order: 9
---

:::note
OAS **3** This guide is for OpenAPI 3.0. If you use OpenAPI 2.0, see our [OpenAPI 2.0 guide](/docs/specification/v2_0/describing-responses/).
:::

An API specification needs to specify the `responses` for all API operations. Each operation must have at least one response defined, usually a successful response. A response is defined by its HTTP status code and the data returned in the response body and/or headers. Here is a minimal example:

```yaml
paths:
  /ping:
    get:
      responses:
        "200":
          description: OK
          content:
            text/plain:
              schema:
                type: string
                example: pong
```

### Response Media Types

An API can respond with various media types. JSON is the most common format for data exchange, but not the only one possible. To specify the response media types, use the `content` keyword at the operation level.

```yaml
paths:
  /users:
    get:
      summary: Get all users
      responses:
        "200":
          description: A list of users
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ArrayOfUsers"
            application/xml:
              schema:
                $ref: "#/components/schemas/ArrayOfUsers"
            text/plain:
              schema:
                type: string

  # This operation returns image
  /logo:
    get:
      summary: Get the logo image
      responses:
        "200":
          description: Logo image in PNG format
          content:
            image/png:
              schema:
                type: string
                format: binary
```

_More info:_ [Media Types](/docs/specification/media-types/).

### HTTP Status Codes

Under `responses`, each response definition starts with a status code, such as 200 or 404. An operation typically returns one successful status code and one or more error statuses. To define a range of response codes, you may use the following range definitions: 1XX, 2XX, 3XX, 4XX, and 5XX. If a response range is defined using an explicit code, the explicit code definition takes precedence over the range definition for that code. Each response status requires a `description`. For example, you can describe the conditions for error responses. Markdown ([CommonMark](http://commonmark.org/help/)) can be used for rich text representation.

```yaml
responses:
  "200":
    description: OK
  "400":
    description: Bad request. User ID must be an integer and larger than 0.
  "401":
    description: Authorization information is missing or invalid.
  "404":
    description: A user with the specified ID was not found.
  "5XX":
    description: Unexpected error.
```

Note that an API specification does not necessarily need to cover _all possible_ HTTP response codes, since they may not be known in advance. However, it is expected to cover successful responses and any _known_ errors. By “known errors” we mean, for example, a 404 Not Found response for an operation that returns a resource by ID, or a 400 Bad Request response in case of invalid operation parameters.

### Response Body

The `schema` keyword is used to describe the response body. A schema can define:

- an `object` or an `array` — typically used with JSON and XML APIs,
- a primitive data type such as a number or string – used for plain text responses,
- a file – (see [below](/docs/specification/describing-responses/#response-that-returns-a-file)).

Schema can be defined inline in the operation:

```yaml
responses:
  "200":
    description: A User object
    content:
      application/json:
        schema:
          type: object
          properties:
            id:
              type: integer
              description: The user ID.
            username:
              type: string
              description: The user name.
```

or defined in the global `components.schemas` section and referenced via `$ref`. This is useful if multiple media types use the same schema.

```yaml
responses:
  "200":
    description: A User object
    content:
      application/json:
        schema:
          $ref: "#/components/schemas/User"
    components:
      schemas:
        User:
          type: object
          properties:
            id:
              type: integer
              description: The user ID.
            username:
              type: string
              description: The user name.
```

### Response That Returns a File

An API operation can return a file, such as an image or PDF. OpenAPI 3.0 defines file input/output content as `type: string` with `format: binary` or `format: base64`. This is in contrast with OpenAPI 2.0, which uses `type: file` to describe file input/output content. If the response returns the file alone, you would typically use a binary string schema and specify the appropriate media type for the response `content`:

```yaml
paths:
  /report:
    get:
      summary: Returns the report in the PDF format
      responses:
        "200":
          description: A PDF file
          content:
            application/pdf:
              schema:
                type: string
                format: binary
```

Files can also be embedded into, say, JSON or XML as a base64-encoded string. In this case, you would use something like:

```yaml
paths:
  /users/me:
    get:
      summary: Returns user information
      responses:
        "200":
          description: A JSON object containing user name and avatar
          content:
            application/json:
              schema:
                type: object
                properties:
                  username:
                    type: string
                  avatar: # <-- image embedded into JSON
                    type: string
                    format: byte
                    description: Base64-encoded contents of the avatar image
```

### anyOf, oneOf

OpenAPI 3.0 also supports `oneOf` and `anyOf`, so you can specify alternate schemas for the response body.

```yaml
responses:
  "200":
    description: A JSON object containing pet information
    content:
      application/json:
        schema:
          oneOf:
            - $ref: "#/components/schemas/Cat"
            - $ref: "#/components/schemas/Dog"
            - $ref: "#/components/schemas/Hamster"
```

### Empty Response Body

Some responses, such as 204 No Content, have no body. To indicate the response body is empty, do not specify a `content` for the response:

```yaml
responses:
  "204":
    description: The resource was deleted successfully.
```

### Response Headers

Responses from an API can include custom headers to provide additional information on the result of an API call. For example, a rate-limited API may provide the rate limit status via response headers as follows:

```yaml
HTTP 1/1 200 OK
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 2016-10-12T11:00:00Z

{ ... }
```

You can define custom `headers` for each response as follows:

```yaml
paths:
  /ping:
    get:
      summary: Checks if the server is alive.
      responses:
        "200":
          description: OK
          headers:
            X-RateLimit-Limit:
              schema:
                type: integer
              description: Request limit per hour.
            X-RateLimit-Remaining:
              schema:
                type: integer
              description: The number of requests left for the time window.
            X-RateLimit-Reset:
              schema:
                type: string
                format: date-time
              description: The UTC date/time at which the current rate limit window resets.
```

Note that, currently, OpenAPI Specification does not permit to define common response headers for different response codes or different API operations. You need to define the headers for each response individually.

### Default Response

Sometimes, an operation can return multiple errors with different HTTP status codes, but all of them have the same response structure:

```yaml
responses:
  "200":
    description: Success
    content:
      application/json:
        schema:
          $ref: "#/components/schemas/User"

  # These two error responses have the same schema
  "400":
    description: Bad request
    content:
      application/json:
        schema:
          $ref: "#/components/schemas/Error"
  "404":
    description: Not found
    content:
      application/json:
        schema:
          $ref: "#/components/schemas/Error"
```

You can use the `default` response to describe these errors collectively, not individually. “Default” means this response is used for all HTTP codes that are not covered individually for this operation.

```yaml
responses:
  "200":
    description: Success
    content:
      application/json:
        schema:
          $ref: "#/components/schemas/User"

  # Definition of all error statuses
  default:
    description: Unexpected error
    content:
      application/json:
        schema:
          $ref: "#/components/schemas/Error"
```

### Reusing Responses

If multiple operations return the same response (status code and data), you can define it in the `responses` section of the global `components` object and then reference that definition via `$ref` at the operation level. This is useful for error responses with the same status codes and response body.

```yaml
paths:
  /users:
    get:
      summary: Gets a list of users.
      response:
        "200":
          description: OK
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ArrayOfUsers"
        "401":
          $ref: "#/components/responses/Unauthorized" # <-----
  /users/{id}:
    get:
      summary: Gets a user by ID.
      response:
        "200":
          description: OK
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/User"
        "401":
          $ref: "#/components/responses/Unauthorized" # <-----
        "404":
          $ref: "#/components/responses/NotFound" # <-----

# Descriptions of common components
components:
  responses:
    NotFound:
      description: The specified resource was not found
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/Error"
    Unauthorized:
      description: Unauthorized
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/Error"

  schemas:
    # Schema for error response body
    Error:
      type: object
      properties:
        code:
          type: string
        message:
          type: string
      required:
        - code
        - message
```

Note that responses defined in `components.responses` are not automatically applied to all operations. These are just definitions that can be referenced and reused by multiple operations.

### Linking Response Values to Other Operations

Certain values in the response could be used as parameters to other operations. A typical example is the "create resource" operation that returns the ID of the created resource, and this ID can be used to get that resource, update or delete it. OpenAPI 3.0 provides the `links` keyword to describe such relationships between a response and other API calls. For more information, see [Links](/docs/specification/links/).

### FAQ

**Can I have different responses based on a request parameter? Such as:**

```yaml
GET /something -> {200, schema_1}
GET /something?foo=bar -> {200, schema_2}
```

In OpenAPI 3.0, you can use `oneOf` to specify alternate schemas for the response and document possible dependencies verbally in the response `description`. However, there is no way to link specific schemas to certain parameter combinations.

### Reference

[Response Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#responsesObject)

[MediaType Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#mediaTypeObject)

[Components Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#componentsObject)

_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)  
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)_
