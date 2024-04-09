---
title: Paths and Operations
sidebar:
  order: 5
---

:::note
OAS **3** This page is about OpenAPI 3.0. If you use OpenAPI 2.0, see the [OpenAPI 2.0 guide](/specification/20/paths-and-operations/).
:::

In OpenAPI terms, **paths** are endpoints (resources), such as `/users` or `/reports/summary/`, that your API exposes, and **operations** are the HTTP methods used to manipulate these paths, such as GET, POST or DELETE.

### Paths

API paths and operations are defined in the global `paths` section of the API specification.

```yaml
paths:
  /ping:
    ...
  /users:
    ...
  /users/{id}:
    ...
```

All paths are relative to the [API server URL](/specification/api-host-and-base-path/). The full request URL is constructed as `<server-url>/path`. Global `servers` can also be overridden on the path level or operation level (more on that [below](#overriding-servers)). Paths may have an optional short `summary` and a longer `description` for documentation purposes. This information is supposed to be relevant to all operations in this path. `description` can be [multi-line](http://stackoverflow.com/questions/3790454/in-yaml-how-do-i-break-a-string-over-multiple-lines) and supports [Markdown](http://commonmark.org/help/) (CommonMark) for rich text representation.

```yaml
paths:
  /users/{id}:
    summary: Represents a user
    description: >
      This resource represents an individual user in the system.
      Each user is identified by a numeric `id`.

    get:
      ...
    patch:
      ...
    delete:
      ...
```

### Path Templating

You can use curly braces `{}` to mark parts of an URL as [path parameters](/specification/describing-parameters/#path-parameters):

```yaml
/users/{id}
/organizations/{orgId}/members/{memberId}
/report.{format}
```

The API client needs to provide appropriate parameter values when making an API call, such as `/users/5` or `/users/12`.

### Operations

For each path, you define operations (HTTP methods) that can be used to access that path. OpenAPI 3.0 supports `get`, `post`, `put`, `patch`, `delete`, `head`, `options`, and `trace`. A single path can support multiple operations, for example `GET /users` to get a list of users and `POST /users` to add a new user. OpenAPI defines a unique operation as a combination of a path and an HTTP method. This means that two GET or two POST methods for the same path are not allowed – even if they have different parameters (parameters have no effect on uniqueness). Below is a minimal example of an operation:

```yaml
paths:
  /ping:
    get:
      responses:
        '200':
          description: OK
```

Here is a more detailed example with parameters and response schema:

```yaml
paths:
  /users/{id}:
    get:
      tags:
        - Users
      summary: Gets a user by ID.
      description: >
        A detailed description of the operation.
        Use markdown for rich text representation,
        such as **bold**, *italic*, and [links](https://swagger.io).
      operationId: getUserById
      parameters:
        - name: id
          in: path
          description: User ID
          required: true
          schema:
            type: integer
            format: int64
      responses:
        '200':
          description: Successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
      externalDocs:
        description: Learn more about user operations provided by this API.
        url: http://api.example.com/docs/user-operations/

components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
      required:
        - id
        - name
```

Operations also support some optional elements for documentation purposes:

- A short `summary` and a longer `description` of what an operation does. `description` can be [multi-line](http://stackoverflow.com/questions/3790454/in-yaml-how-do-i-break-a-string-over-multiple-lines) and supports [Markdown](http://commonmark.org/help/) (CommonMark) for rich text representation.
- `tags` – used to group operations logically by resources or any other qualifier. See [Grouping Operations With Tags](/specification/grouping-operations-with-tags/).
- `externalDocs` – used to reference an external resource that contains additional documentation.

### Operation Parameters

OpenAPI 3.0 supports operation parameters passed via path, query string, headers, and cookies. You can also define the request body for operations that transmit data to the server, such as POST, PUT and PATCH. For details, see [Describing Parameters](/specification/describing-parameters/) and [Describing Request Body](/specification/describing-request-body/).

### Query String in Paths

Query string parameters **must not** be included in paths. They should be defined as [query parameters](/specification/describing-parameters/#query-parameters) instead.

Incorrect:

```yaml
paths:
  /users?role={role}:
```

Correct:

```yaml
paths:
  /users:
    get:
      parameters:
        - in: query
          name: role
          schema:
            type: string
            enum: [user, poweruser, admin]
          required: true
```

This also means that it is impossible to have multiple paths that differ only in query string, such as:

```yaml
GET /users?firstName=value&lastName=value
GET /users?role=value
```

This is because OpenAPI considers a unique operation as a combination of a path and the HTTP method, and additional parameters do not make the operation unique. Instead, you should use unique paths such as:

```yaml
GET /users/findByName?firstName=value&lastName=value
GET /users/findByRole?role=value
```

### operationId

`operationId` is an optional unique string used to identify an operation. If provided, these IDs must be unique among all operations described in your API.

```yaml
/users:
  get:
    operationId: getUsers
    summary: Gets all users
    ...
  post:
    operationId: addUser
    summary: Adds a new user
    ...
/user/{id}:
  get:
    operationId: getUserById
    summary: Gets a user by user ID
    ...
```

Some common use cases for operationId are:

- Some code generators use this value to name the corresponding methods in code.
- [Links](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#linkObject) can refer to the linked operations by `operationId`.

### Deprecated Operations

You can mark specific operations as `deprecated` to indicate that they should be transitioned out of usage:

```yaml
/pet/findByTags:
  get:
    deprecated: true
```

Tools may handle deprecated operations in a specific way. For example, Swagger UI displays them with a different style:

![Deprecated operation in Swagger UI](/swagger/media/Images/deprecated.png)

### Overriding Global Servers

The global `servers` array can be overridden on the path level or operation level. This is useful if some endpoints use a different server or base path than the rest of the API. Common examples are:

- Different base URL for file upload and download operations.
- Deprecated but still functional endpoints.

  servers:
    - url: https://api.example.com/v1

```yaml
paths:
  /files:
    description: File upload and download operations
    servers:
      - url: https://files.example.com
        description: Override base path for all operations with the /files path
    ...

/ping:
    get:
      servers:
        - url: https://echo.example.com
          description: Override base path for the GET /ping operation
```

_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)_
