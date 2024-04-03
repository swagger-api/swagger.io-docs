---
title: Describing Responses
sidebar:
  order: 9
---

OAS **2** This page applies to OpenAPI Specification ver. 2 (fka Swagger). To learn about the latest version, visit [OpenAPI 3 pages](/docs/specification/describing-responses).

## Describing Responses

An API specification needs to specify the `responses` for all API operations. Each operation must have at least one response defined, usually a successful response. A response is defined by its HTTP status code and the data returned in the response body and/or headers. Here is a minimal example:

```yaml
paths:
  /ping:
    get:
      produces:
        - application/json
      responses:
        200:
          description: OK
```

### Response Media Types

An API can respond with various media types. JSON is the most common format for data exchange, but not the only one possible. To specify the response media types, use the `produces` keyword on the root level or operation level. The global list can be overridden on the operation level.

```yaml
produces:
  - application/json

paths:
  # This operation returns JSON - as defined globally above
  /users:
    get:
      summary: Gets a list of users.
      responses:
        200:
          description: OK
  # Here, we override the "produces" array to specify other media types
  /logo:
    get:
      summary: Gets the logo image.
      produces:
        - image/png
        - image/gif
        - image/jpeg
      responses:
        200:
          description: OK
```

_More info:_ [MIME Types](/docs/specification/2-0/mime-types/).

### HTTP Status Codes

Under `responses`, each response definition starts with a status code, such as 200 or 404. An operation typically returns one successful status code and one or more error statuses. Each response status requires a `description`. For example, you can describe the conditions for error responses. [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/) can be used for rich text representation.

```yaml
responses:
  200:
    description: OK
  400:
    description: Bad request. User ID must be an integer and bigger than 0.
  401:
    description: Authorization information is missing or invalid.
  404:
    description: A user with the specified ID was not found.
```

Note that an API specification does not necessarily need to cover _all possible_ HTTP response codes, since they may not be known in advance. However, it is expected to cover successful responses and any _known_ errors. By "known errors" we mean, for example, a 404 Not Found response for an operation that returns a resource by ID, or a 400 Bad Request response in case of invalid operation parameters.

### Response Body

The `schema` keyword is used to describe the response body. A schema can define:

- `object` or `array` – typically used with JSON and XML APIs,
- a primitive such as a number or string – used for plain text responses,
- `file` (see [below](#response-that-returns-a-file)).

Schema can be defined inline in the operation:

```yaml
responses:
  200:
    description: A User object
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

or defined at the root level and referenced via `$ref`. This is useful if multiple responses use the same schema.

```yaml
          responses:
            200:
              description: A User object
              schema:
                $ref: '#/definitions/User'
    definitions:
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

An API operation can return a file, such as an image or PDF. In this case, define the response `schema` with `type: file` and specify the appropriate MIME types in the `produces` section.

```yaml
paths:
  /report:
    get:
      summary: Returns the report in the PDF format.
      produces:
        - application/pdf
      responses:
        200:
          description: A PDF file.
          schema:
            type: file
```

### Empty Response Body

Some responses, such as 204 No Content, have no body. To indicate the response body is empty, do not specify a `schema` for the response. Swagger treats no schema as a response without a body.

```yaml
responses:
  204:
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
        200:
          description: OK
          headers:
            X-RateLimit-Limit:
              type: integer
              description: Request limit per hour.
            X-RateLimit-Remaining:
              type: integer
              description: The number of requests left for the time window.
            X-RateLimit-Reset:
              type: string
              format: date-time
              description: The UTC date/time at which the current rate limit window resets.
```

Note that, currently, there is no way in Swagger to define common response headers for different response codes or different API operations. You need to define the headers for each response individually.

### Default Response

Sometimes, an operation can return multiple errors with different HTTP status codes, but all of them have the same response structure:

```yaml
responses:
  200:
    description: Success
    schema:
      $ref: "#/definitions/User"
  400:
    description: Bad request
    schema:
      $ref: "#/definitions/Error" # <-----
  404:
    description: Not found
    schema:
      $ref: "#/definitions/Error" # <-----
```

You can use the `default` response to describe these errors collectively, not individually. "Default" means this response is used for all HTTP codes that are not covered individually for this operation.

```yaml
responses:
  200:
    description: Success
    schema:
      $ref: "#/definitions/User"
  # Definition of all error statuses
  default:
    description: Unexpected error
    schema:
      $ref: "#/definitions/Error"
```

### Reusing Responses

If multiple operations return the same response (status code and data), you can define it in the global `responses` section and reference that definition via `$ref` at the operation level. This is useful for error responses with the same status codes and response body.

```yaml
paths:
  /users:
    get:
      summary: Gets a list of users.
      response:
        200:
          description: OK
          schema:
            $ref: "#/definitions/ArrayOfUsers"
        401:
          $ref: "#/responses/Unauthorized" # <-----
  /users/{id}:
    get:
      summary: Gets a user by ID.
      response:
        200:
          description: OK
          schema:
            $ref: "#/definitions/User"
        401:
          $ref: "#/responses/Unauthorized" # <-----
        404:
          $ref: "#/responses/NotFound" # <-----
# Descriptions of common responses
responses:
  NotFound:
    description: The specified resource was not found
    schema:
      $ref: "#/definitions/Error"
  Unauthorized:
    description: Unauthorized
    schema:
      $ref: "#/definitions/Error"
definitions:
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

Note that responses defined at the root level are not automatically applied to all operations. These are just definitions that can be referenced and reused by multiple operations.

### FAQ

**Can I have different responses based on a request parameter? Such as:**

```yaml
GET /something -> {200, schema_1}
GET /something?foo=bar -> {200, schema_2}
```

No, this is not supported.

### Reference

[https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#responsesDefinitionsObject](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#responsesDefinitionsObject)

[https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#responsesObject](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#responsesObject)

[https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#responseObject](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#responseObject)

_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)  
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)_
