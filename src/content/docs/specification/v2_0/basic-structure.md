---
title: Basic Structure
sidebar:
  order: 2
---

:::note
OAS **2** This page applies to OpenAPI Specification ver. 2 (fka Swagger). To learn about the latest version, visit [OpenAPI 3 pages](/specification/basic-structure).
:::

Swagger definitions can be written in [JSON](https://en.wikipedia.org/wiki/JSON) or [YAML](https://en.wikipedia.org/wiki/YAML). In this guide, we only use YAML examples, but JSON works equally well. A sample Swagger specification written in YAML looks like:

```yml
swagger: "2.0"
info:
  title: Sample API
  description: API description in Markdown.
  version: 1.0.0

host: api.example.com
basePath: /v1
schemes:
  - https

paths:
  /users:
    get:
      summary: Returns a list of users.
      description: Optional extended description in Markdown.
      produces:
        - application/json
      responses:
        200:
          description: OK
```

### Metadata

Every Swagger specification starts with the Swagger version, 2.0 being the latest version. A Swagger version defines the overall structure of an API specification – what you can document and how you document it.

```yml
swagger: "2.0"
```

Then, you need to specify the API `info` – `title`, `description` (optional), `version` (API version, not file revision or Swagger version).

```yaml
info:
  title: Sample API
  description: API description in Markdown.
  version: 1.0.0
```

`version` can be a random string. You can use _major.minor.patch_ (as in [semantic versioning](http://semver.org/)), or an arbitrary format like _1.0-beta_ or _2016.11.15_. `description` can be [multiline](http://stackoverflow.com/a/21699210) and supports [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/) for rich text representation. `info` also supports other fields for contact information, license and other details. _Reference:_ [Info Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#infoObject).

### Base URL

The base URL for all API calls is defined using `schemes`, `host` and `basePath`:

```yml
host: api.example.com
basePath: /v1
schemes:
  - https
```

All API paths are relative to the base URL. For example, _/users_ actually means _https://api.example.com/v1/users_. _More info:_ [API Host and Base URL](/specification/20/api-host-and-base-path/).

### Consumes, Produces

The `consumes` and `produces` sections define the MIME types supported by the API. The root-level definition can be overridden in individual operations.

```yml
consumes:
  - application/json
  - application/xml
produces:
  - application/json
  - application/xml
```

_More info:_ [MIME Types](/specification/20/mime-types/).

### Paths

The `paths` section defines individual endpoints (paths) in your API, and the HTTP methods (operations) supported by these endpoints. For example, _GET /users_ can be described as:

```yml
paths:
  /users:
    get:
      summary: Returns a list of users.
      description: Optional extended description in Markdown.
      produces:
        - application/json
      responses:
        200:
          description: OK
```

_More info:_ [Paths and Operations](/specification/20/paths-and-operations/).

### Parameters

Operations can have parameters that can be passed via URL path (`/users/{userId}`), query string (`/users?role=admin`), headers (`X-CustomHeader: Value`) and request body. You can define the parameter types, format, whether they are required or optional, and other details:

```yml
paths:
  /users/{userId}:
    get:
      summary: Returns a user by ID.
      parameters:
        - in: path
          name: userId
          required: true
          type: integer
          minimum: 1
          description: Parameter description in Markdown.
      responses:
        200:
          description: OK
```

_More info:_ [Describing Parameters](/specification/20/describing-parameters/).

### Responses

For each operation, you can define possible status codes, such as 200 OK or 404 Not Found, and `schema` of the response body. Schemas can be defined inline or referenced from an external definition via `$ref`. You can also provide example responses for different content types.

```yml
paths:
  /users/{userId}:
    get:
      summary: Returns a user by ID.
      parameters:
        - in: path
          name: userId
          required: true
          type: integer
          minimum: 1
          description: The ID of the user to return.
      responses:
        200:
          description: A User object.
          schema:
            type: object
            properties:
              id:
                type: integer
                example: 4
              name:
                type: string
                example: Arthur Dent
        400:
          description: The specified user ID is invalid (e.g. not a number).
        404:
          description: A user with the specified ID was not found.
        default:
          description: Unexpected error
```

_More info:_ [Describing Responses](/specification/20/describing-responses/).

### Input and Output Models

The global `definitions` section lets you define common data structures used in your API. They can be referenced via `$ref`whenever a `schema` is required – both for request body and response body. For example, this JSON object:

```json
{
  "id": 4,
  "name": "Arthur Dent"
}
```

can be represented as:

```yml
definitions:
  User:
    properties:
      id:
        type: integer
      name:
        type: string
    # Both properties are required
    required:
      - id
      - name
```

and then referenced in the request body schema and response body schema as follows:

```yml
paths:
  /users/{userId}:
    get:
      summary: Returns a user by ID.
      parameters:
        - in: path
          name: userId
          required: true
          type: integer
      responses:
        200:
          description: OK
          schema:
            $ref: '#/definitions/User'
  /users:
    post:
      summary: Creates a new user.
      parameters:
        - in: body
          name: user
          schema:
            $ref: '#/definitions/User'
      responses:
        200:
          description: OK
```

### Authentication

The `securityDefinitions` and `security` keywords are used to describe the authentication methods used in your API.

```yml
securityDefinitions:
  BasicAuth:
    type: basic

security:
  - BasicAuth: []
```

Supported authentication methods are:

- [Basic authentication](/specification/20/authentication/basic-authentication/)
- [API key](/specification/20/authentication/api-keys/) (as a header or query parameter)
- OAuth 2 common flows (implicit, password, application and access code)

_More info:_ [Authentication](/specification/20/authentication/).

_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)  
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)_
